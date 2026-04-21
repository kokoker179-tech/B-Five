import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const ADMIN_EMAIL = 'kokoker179@gmail.com';

  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-dark-bg p-8 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
          <LayoutDashboard className="text-primary" />
          لوحة تحكم المتجر
        </h1>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-white/60">أهلاً بك في لوحة تحكم B-Five. سيتم إضافة أدوات إدارة المنتجات هنا قريباً.</p>
        </div>
      </div>
    </div>
  );
};
