import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { CartItem } from '../types';
import { CheckCircle2, ShoppingBag, MapPin, Phone, ChevronDown, ArrowRight, Sparkles, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { EGYPT_GOVERNORATES } from '../constants/egyptData';
import { toast } from 'sonner';

interface CheckoutPageProps {
  cartItems: CartItem[];
  total: number;
  clearCart: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, total, clearCart }) => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [address, setAddress] = useState({
    governorate: profile?.governorate || '',
    city: profile?.city || '',
    street: profile?.address || '',
    phone: profile?.phone || ''
  });

  // Sync with profile if it loads late
  useEffect(() => {
    if (profile) {
      setAddress(prev => ({
        ...prev,
        governorate: prev.governorate || profile.governorate || '',
        city: prev.city || profile.city || '',
        street: prev.street || profile.address || '',
        phone: prev.phone || profile.phone || ''
      }));
    }
  }, [profile]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("خطأ في المصادقة", {
        description: "الرجاء تسجيل الدخول أولاً لإكمال عملية الشراء."
      });
      return;
    }
    if (cartItems.length === 0) {
      toast.error("العربة فارغة", {
        description: "لا يوجد منتجات في حقيبتك لإتمام الشراء."
      });
      return;
    }

    setIsProcessing(true);
    const orderId = `B5-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    try {
      await addDoc(collection(db, 'orders'), {
        orderNumber: orderId,
        userId: user.uid,
        userEmail: user.email,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total,
        shippingAddress: address,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      toast.success("تم تأكيد الطلب بنجاح", {
        description: `رقم طلبك هو ${orderId}. تم إرسال التفاصيل إلى بريدك الإلكتروني.`,
      });
      setIsSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Order failed:", error);
      toast.error("فشل تأكيد الطلب", {
        description: "حدث خطأ غير متوقع في النظام. يرجى المحاولة مرة أخرى.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 md:p-10 bg-[#0a0a0a] text-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full" />

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 text-center space-y-10 md:space-y-12 max-w-xl"
        >
          <div className="relative inline-block">
             <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ type: 'spring', damping: 10 }}
               className="w-24 h-24 md:w-32 md:h-32 bg-primary text-black rounded-[32px] md:rounded-[40px] flex items-center justify-center shadow-[0_20px_60px_rgba(255,122,0,0.4)] relative z-10"
             >
               <CheckCircle2 size={48} md:size={64} strokeWidth={2.5} />
             </motion.div>
             <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full animate-pulse" />
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              طلبتم <br /> <span className="text-primary italic">بنجاح!</span>
            </h1>
            <p className="text-white/30 uppercase tracking-[3px] md:tracking-[4px] text-[9px] md:text-[10px] font-black leading-relaxed max-w-sm mx-auto">
              تم استلام طلبكم في نظام B-Five Elite. سيتم التوصيل إلى <span className="text-white">{address.city}, {address.governorate}</span> قريباً جداً.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/profile')}
              className="px-8 py-5 md:px-10 md:py-6 bg-white text-black font-black uppercase tracking-[4px] text-[9px] md:text-[10px] rounded-2xl md:rounded-3xl shadow-2xl flex items-center justify-center gap-3"
            >
              تتبع الطلب <ArrowRight size={16} />
            </motion.button>
            <Link 
              to="/" 
              className="px-8 py-5 md:px-10 md:py-6 bg-white/5 border border-white/10 text-white font-black uppercase tracking-[4px] text-[9px] md:text-[10px] rounded-2xl md:rounded-3xl hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              العودة للمتجر
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const selectedGov = EGYPT_GOVERNORATES.find(g => g.governorate_name_ar === address.governorate);

  return (
    <div className="py-24 max-w-7xl mx-auto px-6 md:px-10 w-full min-h-screen relative overflow-hidden bg-[#0a0a0a]">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[180px] rounded-full pointer-events-none" />
      
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
        {/* Left Side: Checkout Form */}
        <div className="lg:col-span-7 space-y-12 md:space-y-16">
          <div className="space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-3xl">
              <ShoppingBag size={14} className="text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[4px] text-white/40">تأمين الخروج الآمن</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] text-white">
              إتمام <br /> <span className="text-primary italic">الشراء</span>
            </h1>
          </div>

          <form className="space-y-12" onSubmit={handleCheckout}>
            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">بيانات الشحن</h3>
                  <p className="text-[10px] text-white/30 uppercase tracking-[2px]">أين تريد استلام طلبك؟</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[4px] text-white/30 block mr-2">المحافظة</label>
                  <div className="relative group">
                    <select 
                      required
                      value={address.governorate}
                      onChange={(e) => setAddress({...address, governorate: e.target.value, city: ''})}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-3xl p-5 font-bold text-sm text-white focus:border-primary/50 focus:bg-white/10 ring-0 outline-none appearance-none cursor-pointer transition-all"
                    >
                      <option value="" className="bg-black">اختر المحافظة</option>
                      {EGYPT_GOVERNORATES.map(gov => (
                        <option key={gov.id} value={gov.governorate_name_ar} className="bg-black">{gov.governorate_name_ar}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none group-focus-within:text-primary" />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[4px] text-white/30 block mr-2">المدينة / المنطقة</label>
                  <div className="relative group">
                    <select 
                      required
                      disabled={!address.governorate}
                      value={address.city}
                      onChange={(e) => setAddress({...address, city: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-3xl p-5 font-bold text-sm text-white focus:border-primary/50 focus:bg-white/10 ring-0 outline-none appearance-none disabled:opacity-20 cursor-pointer transition-all"
                    >
                      <option value="" className="bg-black">اختر المدينة</option>
                      {selectedGov?.cities.map(city => (
                        <option key={city} value={city} className="bg-black">{city}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none group-focus-within:text-primary" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[4px] text-white/30 block mr-2">العنوان التفصيلي</label>
                <input 
                  required
                  type="text" 
                  value={address.street}
                  onChange={(e) => setAddress({...address, street: e.target.value})}
                  placeholder="رقم الشارع، المبنى، الشقة..."
                  className="w-full bg-white/[0.03] border border-white/5 rounded-3xl p-5 font-bold text-sm text-white focus:border-primary/50 focus:bg-white/10 ring-0 outline-none transition-all placeholder:text-white/10" 
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[4px] text-white/30 block mr-2 flex items-center gap-2">
                  <Phone size={10} className="text-primary" /> رقم الهاتف النشط
                </label>
                <input 
                  required
                  type="tel" 
                  value={address.phone}
                  onChange={(e) => setAddress({...address, phone: e.target.value})}
                  placeholder="01xxxxxxxxx"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-3xl p-5 font-bold text-sm text-white focus:border-primary/50 focus:bg-white/10 ring-0 outline-none transition-all placeholder:text-white/10" 
                />
              </div>
            </div>

            <div className="relative group/btn">
              <div className="absolute -inset-1 bg-primary rounded-[24px] md:rounded-[32px] blur-xl opacity-20 group-hover/btn:opacity-40 transition-opacity" />
              <button 
                type="submit"
                disabled={isProcessing || cartItems.length === 0}
                className="relative w-full h-16 md:h-20 bg-white text-black font-black uppercase text-[10px] md:text-[11px] tracking-[4px] md:tracking-[5px] rounded-[24px] md:rounded-[28px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary transition-all duration-500 shadow-2xl flex items-center justify-center gap-4"
              >
                {isProcessing ? 'جاري المعالجة...' : 'تأكيد الطلب والحجز الآمن'}
                {!isProcessing && <ArrowRight size={18} />}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5 h-fit lg:sticky lg:top-32">
          <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[32px] md:rounded-[48px] p-6 md:p-10 space-y-8 md:space-y-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
            
            <div>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">ملخص <br /> <span className="text-primary italic">الطلب</span></h3>
              <div className="mt-4 w-12 h-1 bg-primary opacity-50" />
            </div>

            <div className="space-y-4 md:space-y-6 max-h-[300px] md:max-h-[350px] overflow-y-auto pr-2 md:pr-4 custom-scrollbar">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4 md:gap-6 items-center group/item hover:bg-white/5 p-3 md:p-4 rounded-2xl md:rounded-3xl transition-colors">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-black rounded-2xl overflow-hidden shrink-0 shadow-xl ring-1 ring-white/5 group-hover/item:scale-105 transition-transform duration-500">
                    <img src={item.image} alt="" className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all" />
                  </div>
                  <div className="flex-grow space-y-1">
                    <h4 className="font-black text-xs md:text-sm uppercase text-white truncate max-w-[150px]">{item.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] md:text-[10px] text-white/30 font-bold uppercase tracking-widest">({item.quantity} قطع)</span>
                      <span className="font-black text-primary text-xs md:text-sm">{item.price.toLocaleString()} ج.م</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 md:pt-8 border-t border-white/10 space-y-4 md:space-y-6">
              <div className="flex justify-between items-center text-white/30">
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[3px]">المجموع الفرعي</span>
                <span className="text-sm md:text-base font-bold tracking-tighter">{total.toLocaleString()} ج.م</span>
              </div>
              <div className="flex justify-between items-center text-white/30">
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[3px]">رسوم الخدمة وتوصيل</span>
                <span className="text-sm md:text-base font-bold tracking-tighter">مجاني كعرض ترحيبي</span>
              </div>
              
              <div className="flex justify-between items-end pt-4">
                <div className="space-y-1">
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[4px] md:tracking-[5px] text-primary">المجموع الكلي</span>
                  <h4 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
                    {total.toLocaleString()} <span className="text-xs text-white/20 uppercase">ج.م</span>
                  </h4>
                </div>
                <div className="bg-white/5 p-2.5 md:p-3 rounded-xl md:rounded-2xl border border-white/10">
                  <CreditCard size={20} md:size={24} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="p-6 bg-primary/5 border border-primary/20 rounded-3xl flex items-center gap-4">
               <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary shrink-0">
                  <Sparkles size={18} />
               </div>
               <p className="text-[9px] font-black uppercase tracking-widest leading-loose text-white/60">كل الطلبيات تخضع لفحص د جودة شامل قبل الشحن لضمان تجربة عالمية فاخرة.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
