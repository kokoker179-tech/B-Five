import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingBag, DollarSign, PackagePlus, Pencil, Trash2, KeyRound } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'sonner';

export const AdminPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'products' | 'customers'>('products');
  const [customers, setCustomers] = useState<any[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [isAdminVerified, setIsAdminVerified] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  useEffect(() => {
    if (activeTab === 'customers' && isAdminVerified) {
      fetchCustomers();
    }
  }, [activeTab, isAdminVerified]);

  const fetchCustomers = async () => {
    setLoadingCustomers(true);
    try {
      const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const usersData: any[] = [];
      querySnapshot.forEach((doc) => {
        usersData.push(doc.data());
      });
      setCustomers(usersData);
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast.error('حدث خطأ أثناء جلب بيانات العملاء. المرجو التأكد من صلاحيات المدير.');
    } finally {
      setLoadingCustomers(false);
    }
  };

  const handleSendPasswordReset = async (email: string) => {
    try {
      await resetPassword(email);
      toast.success(`تم إرسال رابط إعادة تعيين كلمة المرور إلى ${email}`);
    } catch (error) {
      toast.error('حدث خطأ أثناء إرسال الرابط');
    }
  };

  const handleChangeCustomerPasswordDirectly = async (email: string) => {
    const newPassword = window.prompt("أدخل كلمة المرور الجديدة للعميل:");
    if (!newPassword || newPassword.length < 6) {
      toast.error("كلمة المرور يجب أن تكون 6 أحرف على الأقل.");
      return;
    }

    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword, adminSecret: 'kerolos1122' }),
      });

      let data;
      const textResponse = await response.text();
      try {
        data = JSON.parse(textResponse);
      } catch (e) {
        console.error("Non-JSON response from server:", textResponse);
        const snippet = textResponse.substring(0, 100);
        toast.error(`خطأ غير متوقع. استجابة السيرفر: ${snippet}`);
        return;
      }

      if (response.ok) {
        toast.success(`تم تغيير كلمة سر العميل ${email} بنجاح!`);
      } else {
        toast.error(`خطأ: ${data.error || 'فشل تغيير كلمة السر'}`);
      }
    } catch (error) {
      toast.error('لم يتم الاتصال بالسيرفر. حاول مرة أخرى.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'kerolos1122') {
      setIsLoggingIn(true);
      const adminEmail = 'admin@b-five.io';
      try {
        await signInWithEmailAndPassword(auth, adminEmail, passwordInput);
        setIsAdminVerified(true);
        toast.success('تم التأكد من صلاحيات المدير عبر الخادم');
      } catch (error: any) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
          try {
            await createUserWithEmailAndPassword(auth, adminEmail, passwordInput);
            setIsAdminVerified(true);
            toast.success('تم تفعيل حساب الإدارة والدخول بنجاح');
          } catch (createError) {
            console.error('Error creating admin account:', createError);
            toast.error('حدث خطأ في مزامنة حساب الإدارة.');
          }
        } else {
          console.error('Error signing in as admin:', error);
          toast.error('حدث خطأ أثناء الاتصال بالخادم. حاول مجدداً.');
        }
      } finally {
        setIsLoggingIn(false);
      }
    } else {
      toast.error('كلمة المرور غير صحيحة');
    }
  };

  if (!isAdminVerified) {
    return (
      <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-8 text-white text-center" dir="rtl">
        <LayoutDashboard className="text-primary mb-6" size={64} />
        <h1 className="text-4xl font-black uppercase mb-4 text-white">تسجيل دخول الإدارة</h1>
        <p className="text-md text-white/40 mb-8 max-w-sm">
          برجاء إدخال كلمة المرور السريّة للوصول إلى لوحة التحكم
        </p>
        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-xs">
          <input 
            type="password" 
            value={passwordInput} 
            onChange={(e) => setPasswordInput(e.target.value)} 
            placeholder="كلمة المرور" 
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center text-white focus:outline-none focus:border-primary transition-colors tracking-widest text-lg" 
            dir="ltr" 
            autoFocus
          />
          <button 
            type="submit" 
            className="bg-primary text-black px-8 py-3 rounded-xl font-black hover:scale-105 transition-transform w-full shadow-[0_0_20px_rgba(255,122,0,0.3)]"
          >
            دخول للوحة
          </button>
        </form>
        <button 
          onClick={() => navigate('/')} 
          className="mt-6 text-white/40 hover:text-white text-sm underline transition-colors"
        >
          العودة للمتجر
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg p-8 pt-32 text-white" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
              <LayoutDashboard className="text-primary" size={32} />
              لوحة التحكم
            </h1>
            <p className="text-white/40 mt-2 text-sm">مرحباً بك يا مدير النظام، هنا يمكنك إدارة المتجر بالكامل.</p>
          </div>
          {activeTab === 'products' && (
            <button className="flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-full font-black text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,122,0,0.3)]">
              <PackagePlus size={18} />
              إضافة منتج جديد
            </button>
          )}
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
                <p className="text-2xl font-black">{customers.length > 0 ? customers.length : '٨٥'} عميل</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Custom Tabs Navigation */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-widest transition-colors ${activeTab === 'products' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10 text-white/60'}`}
          >
            إدارة المنتجات
          </button>
          <button 
            onClick={() => setActiveTab('customers')}
            className={`px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-widest transition-colors ${activeTab === 'customers' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10 text-white/60'}`}
          >
            العملاء والحسابات
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden min-h-[400px]">
          
          {activeTab === 'products' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="bg-white/5 text-white/40 text-[10px] uppercase tracking-widest border-b border-white/5">
                    <th className="p-5 font-black">المنتج</th>
                    <th className="p-5 font-black">التصنيف</th>
                    <th className="p-5 font-black">السعر</th>
                    <th className="p-5 font-black">الكمية</th>
                    <th className="p-5 font-black text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {[1, 2, 3].map((item) => (
                    <tr key={item} className="hover:bg-white/5 transition-colors group">
                      <td className="p-5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 overflow-hidden">
                          <img src={`https://picsum.photos/seed/prod${item}/100/100`} alt="Product" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold">منتج تجريبي {item}</span>
                      </td>
                      <td className="p-5 text-white/60">إلكترونيات</td>
                      <td className="p-5 font-bold text-primary">٤٥٠ ج.م</td>
                      <td className="p-5">
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-xs font-bold">متوفر (١٢)</span>
                      </td>
                      <td className="p-5">
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
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="bg-white/5 text-white/40 text-[10px] uppercase tracking-widest border-b border-white/5">
                    <th className="p-5 font-black">اسم العميل</th>
                    <th className="p-5 font-black">البريد الإلكتروني</th>
                    <th className="p-5 font-black">رقم الهاتف</th>
                    <th className="p-5 font-black text-center">أمان الحساب (الباسورد)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {loadingCustomers ? (
                    <tr><td colSpan={4} className="p-8 text-center text-white/40">جاري جلب بيانات العملاء...</td></tr>
                  ) : customers.length === 0 ? (
                    <tr><td colSpan={4} className="p-8 text-center text-white/40">لا يوجد عملاء مسجلين حتى الآن</td></tr>
                  ) : (
                    customers.map((customer, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors group">
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-orange-400 flex items-center justify-center text-black font-black text-xs">
                              {customer.displayName?.charAt(0) || 'U'}
                            </div>
                            <span className="font-bold">{customer.displayName || 'بدون اسم'}</span>
                          </div>
                        </td>
                        <td className="p-5 text-white/60 font-mono text-xs">{customer.email}</td>
                        <td className="p-5 text-white/60 font-mono text-xs" dir="ltr">{customer.phone || 'غير محدد'}</td>
                        <td className="p-5">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <button 
                              onClick={() => handleSendPasswordReset(customer.email)}
                              className="flex items-center justify-center gap-2 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 px-3 py-1.5 rounded-lg text-xs font-black transition-colors w-full"
                              title="إرسال رابط آمن للعميل"
                            >
                              <KeyRound size={14} />
                              رابط ضبط كلمة المرور
                            </button>
                            <button 
                              onClick={() => handleChangeCustomerPasswordDirectly(customer.email)}
                              className="flex items-center justify-center gap-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 px-3 py-1.5 rounded-lg text-xs font-black transition-colors w-full"
                            >
                              <Pencil size={14} />
                              تغيير الباسورد مباشرة
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
