import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Mail, ArrowLeft, CircleAlert, CircleCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ForgotPasswordPage = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 relative overflow-hidden bg-grid-mesh">
      {/* Glow backgrounds */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 p-0.5 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              <div className="w-full h-full bg-[#0a0a0f] rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-400 fill-blue-400/20" />
              </div>
            </div>
            <span className="font-heading font-black text-2xl tracking-widest text-white">SYNTRA</span>
          </Link>
          <h1 className="text-2xl font-heading font-bold text-white pt-2">Reset Password</h1>
          <p className="text-xs text-slate-400">Enter your email to receive password reset instructions</p>
        </div>

        {/* Glass Card Form */}
        <div className="glass-panel-glow rounded-3xl p-7 border border-blue-500/30 space-y-5 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-2">
              <CircleAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <CircleCheck className="w-4 h-4 shrink-0" />
              <span>Password reset instructions sent to {email}. Check your inbox!</span>
            </div>
          )}

          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.gamer@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2"
              >
                <span>{loading ? "Sending..." : "Send Reset Instructions"}</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-sm text-slate-300">
                We've sent password reset instructions to your email. 
                Please check your inbox and follow the link to reset your password.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Login</span>
              </button>
            </div>
          )}

        </div>

        {/* Footer text */}
        <p className="text-center text-xs text-slate-400">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-400 font-semibold hover:underline">
            Sign in here
          </Link>
        </p>

      </div>
    </div>
  );
};