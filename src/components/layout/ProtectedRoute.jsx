import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Zap } from 'lucide-react';

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center gap-4">
        <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 border border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
          <Zap className="w-8 h-8 text-blue-400 animate-pulse" />
        </div>
        <p className="text-sm font-medium text-slate-400 tracking-wider">Verifying Syntra License...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
