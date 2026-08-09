import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { mockDb } from '../lib/mockDb';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userPlan, setUserPlan] = useState(null);
  const [userDownloads, setUserDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize session on mount
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser(session.user);
            await fetchSupabaseUserData(session.user.id);
          }
        } catch (error) {
          console.error("Supabase auth error, falling back to mock storage:", error);
          loadMockUser();
        }
      } else {
        loadMockUser();
      }
      setLoading(false);
    };

    initAuth();

    // Supabase auth state listener
    let authListener = null;
    if (isSupabaseConfigured && supabase) {
      authListener = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await fetchSupabaseUserData(session.user.id);
        } else {
          setUser(null);
          setUserPlan(null);
          setUserDownloads([]);
        }
      });
    }

    return () => {
      if (authListener?.data?.subscription) {
        authListener.data.subscription.unsubscribe();
      }
    };
  }, []);

  const loadMockUser = () => {
    const mockUser = mockDb.getSession();
    if (mockUser) {
      setUser(mockUser);
      setUserPlan(mockDb.getUserPlan(mockUser.id));
      setUserDownloads(mockDb.getUserDownloads(mockUser.id));
    } else {
      setUser(null);
      setUserPlan(null);
      setUserDownloads([]);
    }
  };

  const fetchSupabaseUserData = async (userId) => {
    try {
      // Fetch plan
      const { data: planData } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (planData) {
        setUserPlan(planData);
      } else {
        // Default plan for demo if database record missing
        setUserPlan({
          planId: 'self-service',
          planName: 'Self-Service License',
          price: 15,
          status: 'active',
          purchasedAt: new Date().toISOString(),
          licenseKey: 'SYN-8842-DEMO-SUPA',
          downloadAccess: true
        });
      }

      // Fetch download logs
      const { data: downloads } = await supabase
        .from('download_logs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (downloads) {
        setUserDownloads(downloads);
      }
    } catch (e) {
      console.warn("Failed fetching Supabase extra tables, using mock fallback:", e);
      setUserPlan(mockDb.getUserPlan(userId));
      setUserDownloads(mockDb.getUserDownloads(userId));
    }
  };

  const login = async (email, password) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUser(data.user);
      await fetchSupabaseUserData(data.user.id);
      return data;
    } else {
      const res = mockDb.login(email, password);
      if (res.error) throw res.error;
      setUser(res.user);
      setUserPlan(mockDb.getUserPlan(res.user.id));
      setUserDownloads(mockDb.getUserDownloads(res.user.id));
      return res;
    }
  };

  const signup = async (fullName, email, password) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });
      if (error) throw error;
      
      // Insert profile row into database
      if (data.user) {
        await supabase.from('profiles').insert([
          { id: data.user.id, full_name: fullName, email }
        ]);
        // Insert default purchase
        await supabase.from('purchases').insert([
          {
            user_id: data.user.id,
            plan_id: 'self-service',
            plan_name: 'Self-Service License',
            price: 15,
            status: 'active',
            license_key: `SYN-${Math.floor(1000 + Math.random() * 9000)}-SUPA`
          }
        ]);
      }
      return data;
    } else {
      const res = mockDb.register(fullName, email, password);
      if (res.error) throw res.error;
      setUser(res.user);
      setUserPlan(mockDb.getUserPlan(res.user.id));
      setUserDownloads(mockDb.getUserDownloads(res.user.id));
      return res;
    }
  };

  const loginWithOAuth = async (provider) => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
    } else {
      // Mock OAuth login
      const mockOAuthEmail = `alex.${provider}@gmail.com`;
      const res = mockDb.login(mockOAuthEmail, 'oauth123');
      setUser(res.user);
      setUserPlan(mockDb.getUserPlan(res.user.id));
      return res;
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    mockDb.logout();
    setUser(null);
    setUserPlan(null);
    setUserDownloads([]);
  };

  const updateProfile = async (updates) => {
    if (!user) return;
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.updateUser({
        data: updates
      });
      if (error) throw error;
      setUser((prev) => ({ ...prev, user_metadata: { ...prev.user_metadata, ...updates } }));
    } else {
      const updated = mockDb.updateProfile(user.id, updates);
      setUser(updated);
    }
  };

  const purchasePlan = async (planId) => {
    if (!user) return null;
    const plan = mockDb.purchasePlan(user.id, planId);
    setUserPlan(plan);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('purchases').upsert({
          user_id: user.id,
          plan_id: plan.planId,
          plan_name: plan.planName,
          price: plan.price,
          status: 'active',
          license_key: plan.licenseKey,
          updated_at: new Date().toISOString()
        });
      } catch (e) {
        console.warn("Supabase plan upsert skipped:", e);
      }
    }
    return plan;
  };

  const triggerAppDownload = async () => {
    if (!user) return;
    const version = 'v2.4.1';
    
    // Log download to local storage / DB
    const log = mockDb.logDownload(user.id, version);
    setUserDownloads(mockDb.getUserDownloads(user.id));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('download_logs').insert([
          {
            user_id: user.id,
            version: version,
            file_name: log.fileName
          }
        ]);
      } catch (e) {
        console.warn("Supabase download log failed:", e);
      }
    }

    // Trigger real installer download via B2 API
    const link = document.createElement('a');
    link.href = '/api/download';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetPassword = async (email) => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      return { success: true };
    } else {
      // Mock password reset
      console.log(`Mock password reset email sent to ${email}`);
      return { success: true };
    }
  };

  const updatePassword = async (newPassword) => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) throw error;
      return { success: true };
    } else {
      // Mock password update
      console.log('Mock password updated');
      return { success: true };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userPlan,
        userDownloads,
        loading,
        login,
        signup,
        loginWithOAuth,
        logout,
        updateProfile,
        purchasePlan,
        triggerAppDownload,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// oxlint-disable-next-line react/only-export-components
export const useAuth = () => useContext(AuthContext);
