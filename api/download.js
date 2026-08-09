export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const keyId = process.env.B2_APPLICATION_KEY_ID;
    const appKey = process.env.B2_APPLICATION_KEY;
    const bucketName = process.env.B2_BUCKET_NAME;
    const fileName = process.env.B2_FILE_NAME || 'SyntraOptimizer_Setup_v2.4.1.exe';

    if (!keyId || !appKey || !bucketName) {
      console.error('Missing B2 environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const credentials = Buffer.from(`${keyId}:${appKey}`).toString('base64');

    const authResponse = await fetch('https://api.backblazeb2.com/b2api/v2/b2_authorize_account', {
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    });

    if (!authResponse.ok) {
      const errorText = await authResponse.text();
      console.error('B2 authorization failed:', authResponse.status, errorText);
      return res.status(500).json({ error: 'Storage authorization failed' });
    }

    const authData = await authResponse.json();
    const { authorizationToken, downloadUrl } = authData;

    const encodedBucket = encodeURIComponent(bucketName);
    const encodedFileName = encodeURIComponent(fileName);
    const b2FileUrl = `${downloadUrl}/file/${encodedBucket}/${encodedFileName}`;

    const fileResponse = await fetch(b2FileUrl, {
      headers: {
        'Authorization': authorizationToken
      }
    });

    if (!fileResponse.ok) {
      const errorText = await fileResponse.text();
      console.error('B2 file download failed:', fileResponse.status, errorText);
      return res.status(500).json({ error: 'File not found' });
    }

    const contentType = fileResponse.headers.get('content-type') || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Access-Control-Allow-Origin', '*');

    const contentLength = fileResponse.headers.get('content-length');
    if (contentLength) {
      res.setHeader('Content-Length', contentLength);
    }

    const reader = fileResponse.body.getReader();
    const pump = () => reader.read().then(({ done, value }) => {
      if (done) {
        res.end();
        return;
      }
      res.write(Buffer.from(value));
      return pump();
    });

    await pump();
  } catch (error) {
    console.error('Download error:', error);
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.end();
  }
}
