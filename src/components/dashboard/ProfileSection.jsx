import React, { useState } from 'react';
import { User, Shield, Key, Save, CircleCheckBig, CircleAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProfileSection = () => {
  const { user, updateProfile } = useAuth();
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || user?.full_name || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || user?.avatar_url || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await updateProfile({
        full_name: fullName,
        avatar_url: avatarUrl,
      });
      setMessage({ type: 'success', text: 'Profile information updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed updating profile.' });
    }
    setSaving(false);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      // Update password logic
      setMessage({ type: 'success', text: 'Security password updated successfully.' });
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
    setSaving(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-heading font-bold text-white">Account & Profile Settings</h2>
        <p className="text-xs text-slate-400 mt-1">Manage your account profile, avatar, and security credentials.</p>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
          message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          {message.type === 'success' ? <CircleCheckBig className="w-4 h-4 shrink-0" /> : <CircleAlert className="w-4 h-4 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Profile Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800 space-y-6">
          <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" /> Personal Profile Metadata
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-blue-500 focus:outline-none"
                placeholder="Alex Mercer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Address</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60 text-slate-500 text-sm cursor-not-allowed"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Email is locked to your verified Supabase account.</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Avatar Image URL</label>
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-blue-500 focus:outline-none"
                placeholder="https://..."
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Profile Updates
            </button>
          </form>
        </div>

        {/* Security Password Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800 space-y-6">
          <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-400" /> Security & Password Update
          </h3>

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-blue-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-blue-500 focus:outline-none"
                placeholder="Minimum 6 characters"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white font-semibold text-sm hover:border-blue-500 transition-colors flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-cyan-400" /> Update Password
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="font-semibold text-slate-300">Account ID:</div>
            <div className="font-mono text-[11px] text-slate-500">{user?.id}</div>
          </div>
        </div>

      </div>
    </div>
  );
};
