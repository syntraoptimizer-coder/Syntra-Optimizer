// Local Storage Mock Database for local demo & smooth testing

const STORAGE_KEYS = {
  USERS: 'syntra_mock_users',
  SESSION: 'syntra_mock_session',
  PURCHASES: 'syntra_mock_purchases',
  DOWNLOADS: 'syntra_mock_downloads',
};

// Seed initial demo data
const initMockStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const defaultUsers = [
      {
        id: 'user-demo-123',
        email: 'alex.gamer@gmail.com',
        full_name: 'Alex Mercer',
        avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
  }

  if (!localStorage.getItem(STORAGE_KEYS.PURCHASES)) {
    const defaultPurchases = {
      'user-demo-123': {
        planId: 'self-service',
        planName: 'Self-Service License',
        price: 15,
        status: 'active',
        purchasedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        licenseKey: 'SYN-9948-X821-P902',
        downloadAccess: true,
      }
    };
    localStorage.setItem(STORAGE_KEYS.PURCHASES, JSON.stringify(defaultPurchases));
  }

  if (!localStorage.getItem(STORAGE_KEYS.DOWNLOADS)) {
    const defaultDownloads = {
      'user-demo-123': [
        {
          id: 'dl-1',
          version: 'v2.4.1',
          fileName: 'SyntraOptimizer_Setup_v2.4.1.exe',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        }
      ]
    };
    localStorage.setItem(STORAGE_KEYS.DOWNLOADS, JSON.stringify(defaultDownloads));
  }
};

initMockStorage();

export const mockDb = {
  // Session
  getSession: () => {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
    return raw ? JSON.parse(raw) : null;
  },

  setSession: (user) => {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    } else {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
    }
  },

  // Auth operations
  login: (email, _password) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      // For easy demoing: if user doesn't exist, create account on the fly or reject
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        full_name: email.split('@')[0],
        avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
        created_at: new Date().toISOString(),
      };
      users.push(newUser);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      mockDb.setSession(newUser);
      return { user: newUser, error: null };
    }

    mockDb.setSession(user);
    return { user, error: null };
  },

  register: (full_name, email, _password) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    
    if (existing) {
      return { user: null, error: { message: 'An account with this email already exists.' } };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      email,
      full_name: full_name || email.split('@')[0],
      avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
      created_at: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    // Auto buy standard trial or initial plan for quick testing
    const purchases = JSON.parse(localStorage.getItem(STORAGE_KEYS.PURCHASES) || '{}');
    purchases[newUser.id] = {
      planId: 'self-service',
      planName: 'Self-Service License',
      price: 15,
      status: 'active',
      purchasedAt: new Date().toISOString(),
      licenseKey: `SYN-${Math.floor(1000 + Math.random() * 9000)}-X${Math.floor(1000 + Math.random() * 9000)}`,
      downloadAccess: true,
    };
    localStorage.setItem(STORAGE_KEYS.PURCHASES, JSON.stringify(purchases));

    mockDb.setSession(newUser);
    return { user: newUser, error: null };
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  updateProfile: (userId, updates) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const index = users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      mockDb.setSession(users[index]);
      return users[index];
    }
    return null;
  },

  // Plan / Purchase
  getUserPlan: (userId) => {
    const purchases = JSON.parse(localStorage.getItem(STORAGE_KEYS.PURCHASES) || '{}');
    return purchases[userId] || null;
  },

  purchasePlan: (userId, planId) => {
    const purchases = JSON.parse(localStorage.getItem(STORAGE_KEYS.PURCHASES) || '{}');
    const isDfy = planId === 'done-for-you';
    
    purchases[userId] = {
      planId: isDfy ? 'done-for-you' : 'self-service',
      planName: isDfy ? 'Done-For-You Remote Optimization' : 'Self-Service License',
      price: isDfy ? 6 : 15,
      status: 'active',
      purchasedAt: new Date().toISOString(),
      licenseKey: isDfy ? 'REMOTE-DFY-EXPERT' : `SYN-${Math.floor(1000 + Math.random() * 9000)}-PRO`,
      downloadAccess: true,
      remoteStatus: isDfy ? 'Pending Expert Appointment' : 'Self-Installation Ready'
    };

    localStorage.setItem(STORAGE_KEYS.PURCHASES, JSON.stringify(purchases));
    return purchases[userId];
  },

  // Downloads
  getUserDownloads: (userId) => {
    const downloads = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOWNLOADS) || '{}');
    return downloads[userId] || [];
  },

  logDownload: (userId, version = 'v2.4.1') => {
    const downloads = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOWNLOADS) || '{}');
    if (!downloads[userId]) {
      downloads[userId] = [];
    }
    const record = {
      id: `dl-${Date.now()}`,
      version,
      fileName: `SyntraOptimizer_Setup_${version}.exe`,
      timestamp: new Date().toISOString(),
    };
    downloads[userId].unshift(record);
    localStorage.setItem(STORAGE_KEYS.DOWNLOADS, JSON.stringify(downloads));
    return record;
  }
};
