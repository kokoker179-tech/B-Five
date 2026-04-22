import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingBag, DollarSign, PackagePlus, Pencil, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

export const AdminPage: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const ADMIN_EMAIL = 'kokoker179@gmail.com';
  
  useEffect(() => {
    if (!loading) {
      if (!user || user.email !== ADMIN_EMAIL) {
        navigate('/');
      }
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return <div className="min-h-screen bg-dark-bg flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="min-h-screen bg-dark-bg p-8 pt-32 text-white" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
              <LayoutDashboard className="text-primary" size={32} />
              لوحة التحكم
            </h1>
            <p className="text-white/40 mt-2 text-sm">مرحباً بك يا مدير النظام، هنا يمكنك إدارة المتجر بالكامل.</p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-full font-black text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,122,0,0.3)]">
            <PackagePlus size={18} />
            إضافة منتج جديد
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                <DollarSign size={24} />
              </div>
              <div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">إجمالي المبيعات</p>
                <p className="text-2xl font-black">٤٥,٢٠٠ ج.م</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
                <ShoppingBag size={24} />
              </div>
              <div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">إجمالي الطلبات</p>
                <p className="text-2xl font-black">١٢٨ طلب</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">العملاء المسجلين</p>
                <p className="text-2xl font-black">٨٥ عميل</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-black">إدارة المنتجات</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-white/5 text-white/40 text-[10px] uppercase tracking-widest">
                  <th className="p-4 font-black">المنتج</th>
                  <th className="p-4 font-black">التصنيف</th>
                  <th className="p-4 font-black">السعر</th>
                  <th className="p-4 font-black">الكمية</th>
                  <th className="p-4 font-black text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {[1, 2, 3].map((item) => (
                  <tr key={item} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 overflow-hidden">
                        <img src={`https://picsum.photos/seed/prod${item}/100/100`} alt="Product" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-bold">منتج تجريبي {item}</span>
                    </td>
                    <td className="p-4 text-white/60">إلكترونيات</td>
                    <td className="p-4 font-bold text-primary">٤٥٠ ج.م</td>
                    <td className="p-4">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-xs font-bold">متوفر (١٢)</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <button className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center hover:bg-blue-500/40 transition-colors">
                          <Pencil size={14} />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center hover:bg-red-500/40 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
