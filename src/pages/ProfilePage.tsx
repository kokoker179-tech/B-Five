import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Shield, Package, Settings, LogOut, HelpCircle, ChevronLeft, CreditCard, ShoppingBag } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { OrderStatusTracker } from '../components/OrderStatusTracker';
import { Order } from '../types';

export const ProfilePage: React.FC = () => {
  const { user, profile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('حسابي');
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (user && activeTab === 'طلباتي') {
      fetchOrders();
    }
  }, [user, activeTab]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', user?.uid),
        orderBy('createdAt', 'desc'),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  if (!user || !profile) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <User size={30} className="text-primary animate-pulse" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">يرجى تسجيل الدخول لعرض بياناتك</h2>
        </div>
      </div>
    );
  }

  const profileItems = [
    { label: 'الاسم الكامل', value: profile.displayName, icon: User },
    { label: 'البريد الإلكتروني', value: profile.email, icon: Mail },
    { label: 'رقم الهاتف', value: profile.phone || 'غير مسجل', icon: Phone },
    { label: 'المحافظة', value: profile.governorate, icon: MapPin },
    { label: 'المدينة', value: profile.city, icon: MapPin },
    { label: 'العنوان بالتفصيل', value: profile.address, icon: MapPin },
    { label: 'تاريخ الانضمام', value: profile.createdAt?.seconds ? new Date(profile.createdAt.seconds * 1000).toLocaleDateString('ar-EG') : 'اليوم', icon: Calendar },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'طلباتي':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase tracking-tighter">قائمة الطلبات</h2>
                <div className="w-12 h-1 bg-primary rounded-full" />
              </div>
              <button 
                onClick={fetchOrders}
                className="text-[9px] font-black uppercase tracking-[2px] text-white/40 hover:text-primary transition-colors"
              >
                تحديث القائمة
              </button>
            </div>
            
            <div className="space-y-4">
              {loadingOrders ? (
                <div className="py-20 text-center animate-pulse text-white/20 font-black uppercase tracking-[4px]">جاري تحميل الطلبات...</div>
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-6 group hover:border-primary/20 transition-all">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-6 w-full md:w-auto">
                        <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <Package size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm mb-1 uppercase tracking-wider text-white/90">طلب رقم #{order.id ? order.id.slice(-6).toUpperCase() : 'غير معروف'}</h4>
                          <p className="text-[10px] text-white/40 font-black uppercase tracking-[2px]">
                            {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleDateString('ar-EG') : 'قيد المعالجة'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-full md:w-auto md:gap-12">
                        <div className="text-left">
                          <div className="text-[10px] text-white/30 font-black uppercase tracking-[2px] mb-1">الإجمالي</div>
                          <div className="text-lg font-black text-primary">{order.total.toLocaleString()} ج.م</div>
                        </div>
                      </div>
                    </div>
                    {/* Order Tracker */}
                    <div className="w-full border-t border-white/5 pt-6">
                      <OrderStatusTracker status={order.status} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/10">
                    <ShoppingBag size={24} />
                  </div>
                  <p className="text-[10px] text-white/20 font-black uppercase tracking-[3px]">لا توجد طلبات سابقة حتى الآن</p>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'المساعدة':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase tracking-tighter">مركز المساعدة</h2>
                <div className="w-12 h-1 bg-primary rounded-full" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { q: 'كيف يمكنني تتبع طلبي؟', a: 'يمكنك تتبع طلبك من خلال قسم "طلباتي" في ملفك الشخصي.' },
                { q: 'ما هي طرق الدفع المتاحة؟', a: 'نقبل الدفع عند الاستلام، والبطاقات الائتمانية قريباً.' },
                { q: 'هل يمكنني إلغاء الطلب؟', a: 'نعم، يمكنك إلغاء الطلب خلال ساعة من إتمامه عبر التواصل معنا.' },
                { q: 'كم تستغرق مدة الشحن؟', a: 'يستغرق الشحن عادة من ٢ إلى ٥ أيام عمل حسب المحافظة.' }
              ].map((faq, idx) => (
                <div key={idx} className="p-6 bg-white/5 border border-white/5 rounded-2xl space-y-2 hover:border-primary/20 transition-all cursor-help group">
                  <h4 className="text-xs font-black uppercase tracking-wider text-primary">{faq.q}</h4>
                  <p className="text-[11px] text-white/40 leading-relaxed font-medium">{faq.a}</p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-black/40 border border-white/5 rounded-3xl text-center space-y-6">
              <h4 className="text-sm font-black uppercase tracking-[2px]">هل تحتاج إلى مساعدة إضافية؟</h4>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-8 py-4 bg-primary text-black font-black uppercase text-[10px] tracking-[2px] rounded-xl">محادثة مباشرة</button>
                <button className="px-8 py-4 bg-white/5 text-white font-black uppercase text-[10px] tracking-[2px] rounded-xl border border-white/10">إرسال بريد</button>
              </div>
            </div>
          </div>
        );
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase tracking-tighter">إعدادات الحساب</h2>
                <div className="w-12 h-1 bg-primary rounded-full" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[3px] text-white/30">اللغة المفضلة</label>
                  <select className="w-full bg-white/5 border border-white/10 p-4 rounded-xl font-bold text-sm focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                    <option value="ar">العربية</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[3px] text-white/30">الإشعارات</label>
                  <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                    <span className="text-xs font-bold text-white/70">تلقي إشعارات العروض</span>
                    <div className="w-10 h-5 bg-primary rounded-full relative">
                      <div className="absolute left-1 top-1 w-3 h-3 bg-black rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[3px] text-primary">وضع المطور</h4>
                <p className="text-[11px] text-white/40 leading-relaxed font-medium">
                  يمكنك الوصول إلى ميزات تجريبية من خلال تفعيل وضع المطور. سيتم تسجيل جميع الأنشطة لأغراض التحسين.
                </p>
                <button className="w-full py-4 bg-primary text-black font-black uppercase text-[10px] tracking-[2px] rounded-xl shadow-lg ring-1 ring-primary/50">تفعيل الوضع المتقدم</button>
              </div>
            </div>
          </div>
        );

      case 'الأمان':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase tracking-tighter">الأمان والخصوصية</h2>
                <div className="w-12 h-1 bg-primary rounded-full" />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl relative overflow-hidden group">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="space-y-2 text-center md:text-right">
                    <h4 className="font-black text-lg">تغيير كلمة المرور</h4>
                    <p className="text-sm text-white/40 font-medium">قم بتحديث كلمة المرور بانتظام لحماية حسابك من الاختراق.</p>
                  </div>
                  <button className="px-10 py-5 bg-white text-black font-black uppercase text-[10px] tracking-[2px] rounded-full hover:scale-105 transition-all shadow-xl">تغيير الآن</button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-primary/10 transition-all" />
              </div>

              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="space-y-2 text-center md:text-right">
                    <h4 className="font-black text-lg">التحقق بخطوتين</h4>
                    <p className="text-sm text-white/40 font-medium">أضف طبقة إضافية من الأمان عبر ربط هاتفك بحسابك الشخصي.</p>
                  </div>
                  <div className="flex items-center gap-4 text-primary text-[10px] font-black uppercase tracking-[2px]">
                    <span className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                    نشط حالياً
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-12">
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase tracking-tighter">بيانات الملف الشخصي</h2>
                <div className="w-12 h-1 bg-primary rounded-full" />
              </div>
              <button className="text-[10px] font-black uppercase tracking-[3px] py-3 px-6 border border-white/10 rounded-full hover:bg-white/5 transition-all">تعديل البيانات</button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {profileItems.map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx} 
                  className="space-y-2 p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-primary/20 transition-all"
                >
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[3px] text-white/30 group-hover:text-primary transition-colors">
                    <item.icon size={12} />
                    {item.label}
                  </div>
                  <div className="text-sm font-bold tracking-wide text-white/80">{item.value}</div>
                </motion.div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-20 bg-dark-bg">
      <div className="grid lg:grid-cols-4 gap-8 md:gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 text-center space-y-6">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-orange-400 flex items-center justify-center text-black text-3xl font-black shadow-2xl mx-auto">
                {profile.displayName?.charAt(0) || user.email?.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 border-4 border-[#0a0a0a] rounded-full" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter">{profile.displayName}</h3>
              <p className="text-[10px] font-black uppercase tracking-[3px] text-white/30 mt-1">مشترك متميز</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-row lg:flex-col overflow-x-auto no-scrollbar">
            {[
              { label: 'حسابي', icon: User },
              { label: 'طلباتي', icon: Package },
              { label: 'المساعدة', icon: HelpCircle },
              { label: 'الإعدادات', icon: Settings },
              { label: 'الأمان', icon: Shield },
            ].map((item, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveTab(item.label)}
                className={`flex-shrink-0 lg:w-full flex items-center justify-center lg:justify-start gap-4 px-6 md:px-8 py-4 md:py-5 text-[10px] md:text-xs font-black uppercase tracking-[2px] transition-all border-r lg:border-r-0 lg:border-b border-white/5 last:border-0 ${activeTab === item.label ? 'bg-primary text-black' : 'hover:bg-white/5 text-white/60'}`}
              >
                <item.icon size={16} />
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            ))}
            <button 
              onClick={() => {
                logout();
                window.location.href = '/';
              }}
              className="flex-shrink-0 lg:w-full flex items-center justify-center lg:justify-start gap-4 px-6 md:px-8 py-4 md:py-5 text-[10px] md:text-xs font-black uppercase tracking-[2px] text-red-500 hover:bg-red-500/10 transition-all text-right"
            >
              <LogOut size={16} />
              <span className="whitespace-nowrap">خروج</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 relative overflow-hidden h-full min-h-[400px] md:min-h-[500px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {activeTab === 'حسابي' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-primary/20 to-transparent border border-primary/10 rounded-3xl p-8 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[3px] text-primary mb-2">إجمالي الطلبات</div>
                  <div className="text-3xl font-black tracking-tighter">٠٦ طلبات</div>
                </div>
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                  <Package size={30} />
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[3px] text-white/30 mb-2">نقاط الولاء</div>
                  <div className="text-3xl font-black tracking-tighter">١,٢٥٠ نقطة</div>
                </div>
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white/30">
                  <Shield size={30} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
