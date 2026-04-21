import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Mail, MapPin, Lock, ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, HelpCircle, ChevronDown } from 'lucide-react';
import { EGYPT_GOVERNORATES } from '../constants/egyptData';
import { toast } from 'sonner';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFixer, setShowFixer] = useState(false);
  const { register, login, loginWithGoogle, loginAsGuest, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    governorate: '',
    city: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error('يرجى إدخال البريد الإلكتروني أولاً');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(formData.email);
      toast.success('تم إرسال رابط إعادة تعيين كلمة المرور', {
        description: 'تحقق من بريدك الإلكتروني للحصول على تعليمات الاستعادة.'
      });
      setIsForgotPassword(false);
    } catch (err: any) {
      toast.error('حدث خطأ أثناء إرسال الرابط', {
        description: 'تأكد من صحة البريد الإلكتروني والمحاولة مرة أخرى.'
      });
    } finally {
      setLoading(false);
    }
  };

  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success("أهلاً بك مرة أخرى!", {
          description: "تم تسجيل الدخول بنجاح إلى نظام B-Five."
        });
        navigate(from, { replace: true });
      } else {
        if (formData.password.length < 6) {
          toast.error("كلمة مرور ضعيفة", {
            description: "كلمة المرور يجب أن تكون ٦ أحرف أو أرقام على الأقل لضمان الأمن."
          });
          setLoading(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          toast.error("كلمات المرور غير متطابقة", {
            description: "يرجى التأكد من تطابق كلمتي المرور."
          });
          setLoading(false);
          return;
        }
        await register(formData);
        toast.success("تم إنشاء الحساب بنجاح", {
          description: "مرحباً بك في عالم B-Five Elite."
        });
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      console.error("Auth Error:", err.code, err.message);
      let errorMessage = 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى';
      
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          errorMessage = 'البريد الإلكتروني أو كلمة المرور غير صحيحة. تأكد من صحة البيانات أو قم بإنشاء حساب جديد إذا كنت تسجل لأول مرة.';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'هذا البريد مسجل بالفعل، يرجى تسجيل الدخول';
          break;
        case 'auth/invalid-email':
          errorMessage = 'البريد الإلكتروني غير صالح';
          break;
        case 'auth/weak-password':
          errorMessage = 'كلمة المرور ضعيفة جداً';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'يجب تفعيل خاصية "Email/Password" من لوحة تحكم Firebase أولاً';
          setShowFixer(true);
          break;
        default:
          if (err.message === 'رقم الهاتف غير صحيح') {
            errorMessage = err.message;
          }
      }
      toast.error("خطأ في المصادقة", {
        description: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-6 flex items-center justify-center bg-dark-bg text-white relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <AnimatePresence>
        {showFixer && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-md bg-[#1A1A1A] border border-primary/30 rounded-[32px] p-8 space-y-6 shadow-[0_0_100px_rgba(255,122,0,0.2)]"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 ring-4 ring-primary/5">
                <HelpCircle className="text-primary w-8 h-8" />
              </div>
              
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-black uppercase tracking-tighter">تفعيل نظام الدخول</h2>
                <p className="text-sm text-white/60 leading-relaxed font-medium">
                  يجب تفعيل "البريد الإلكتروني" في لوحة تحكم فيربيز ليعمل التسجيل بشكل صحيح.
                </p>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-2xl p-4 space-y-3">
                <h3 className="text-[10px] font-black uppercase tracking-[2px] text-white">الخطوات:</h3>
                <ul className="text-xs text-white/40 space-y-2 font-medium">
                  <li className="flex items-start gap-2">• اضغط على الزر أدناه لفتح الإعدادات</li>
                  <li className="flex items-start gap-2">• اختر "Email/Password" من القائمة</li>
                  <li className="flex items-start gap-2">• فعل خيار "Enable" ثم احفظ (Save)</li>
                </ul>
              </div>

              <div className="space-y-3">
                <a 
                  href="https://console.firebase.google.com/project/gen-lang-client-0152329917/authentication/providers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-primary text-black font-black uppercase text-[10px] tracking-[2px] flex items-center justify-center gap-2 rounded-xl hover:scale-[1.02] transition-transform"
                >
                  فتح لوحة تحكم Firebase <ExternalLink size={14} />
                </a>

                <button 
                  onClick={() => {
                    loginAsGuest();
                    navigate(from, { replace: true });
                  }}
                  className="w-full py-4 bg-white/5 text-primary font-black uppercase text-[10px] tracking-[2px] rounded-xl hover:bg-white/10 transition-colors border border-primary/20"
                >
                  تخطي والدخول كزائر (وضع التجربة)
                </button>

                <button 
                  onClick={() => setShowFixer(false)}
                  className="w-full py-4 bg-transparent text-white/40 font-black uppercase text-[10px] tracking-[2px] rounded-xl hover:text-white/60 transition-colors"
                >
                  إغلاق والمحاولة لاحقاً
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-[#0F0F0F]/60 border border-white/10 backdrop-blur-2xl relative z-10 overflow-hidden rounded-[32px] md:rounded-[40px] shadow-[0_0_80px_rgba(255,122,0,0.15)] ring-1 ring-white/5"
      >
        <div className="grid md:grid-cols-5 h-auto md:h-[650px]">
          {/* Side Branding */}
          <div className="hidden md:flex md:col-span-2 bg-primary p-12 flex-col justify-between text-black relative overflow-hidden group">
            {/* Animated Glow behind content */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent mix-blend-overlay" />
            
            <div className="relative z-10 space-y-6">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-5xl font-black uppercase leading-none tracking-tighter mb-4 italic">
                  {isLogin ? 'أهلاً بك\nمن جديد' : 'إنشاء\nحساب جديد'}
                </h2>
                <p className="text-[11px] font-bold uppercase tracking-[4px] text-[#D2BA4E] leading-relaxed max-w-[180px]">
                  {isLogin 
                    ? 'ادخل إلى عالم التجارة الحديثة مع بي-فايف.' 
                    : 'ابدأ رحلتك نحو تجربة تسوق متميزة وفريدة.'}
                </p>
              </motion.div>
            </div>
            
            <div className="relative z-10">
              <div className="w-16 h-1.5 bg-black mb-6" />
              <div className="text-[10px] font-black uppercase tracking-[5px]">بي-فايف للتجارة</div>
            </div>

            {/* Futuristic Label - Vertical, adjusted position and size */}
            <div className="absolute top-[55%] left-[55%] -translate-x-1/2 -translate-y-1/2 text-[130px] font-black text-black/5 leading-none select-none -rotate-90 tracking-tighter whitespace-nowrap pointer-events-none">
              B-FIVE
            </div>
          </div>

          {/* Form Content */}
          <div className="md:col-span-3 p-8 md:p-14 overflow-y-auto custom-scrollbar">
            <div className="mb-8 md:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter inline-block bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                  {isForgotPassword ? 'استعادة كلمة السر' : (isLogin ? 'تسجيل الدخول' : 'حساب جديد')}
                </h1>
                <div className="w-12 h-1 bg-primary rounded-full" />
              </div>
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setIsForgotPassword(false);
                }}
                className="text-[9px] md:text-[10px] font-black uppercase tracking-[2px] md:tracking-[3px] text-primary/80 hover:text-white transition-all py-1 md:py-2 border-b border-transparent hover:border-primary w-fit"
              >
                {isLogin ? 'إنشاء حساب جديد' : 'العودة للتسجيل'}
              </button>
            </div>

            <form onSubmit={isForgotPassword ? handleResetPassword : handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {isForgotPassword ? (
                  <motion.div 
                    key="forgot"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-base font-black uppercase tracking-[4px] text-white flex items-center gap-2">
                        <Mail size={10} className="text-primary" /> البريد الإلكتروني
                      </label>
                      <input 
                        required
                        type="email" 
                        placeholder="example@mail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl font-bold text-[17px] text-white focus:border-primary outline-none transition-all placeholder:opacity-20"
                      />
                    </div>
                    <button 
                      type="button"
                      onClick={() => setIsForgotPassword(false)}
                      className="text-[10px] font-black uppercase tracking-[3px] text-white/40 hover:text-primary transition-colors"
                    >
                      العودة لتسجيل الدخول
                    </button>
                  </motion.div>
                ) : isLogin ? (
                  <motion.div 
                    key="login"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-base font-black uppercase tracking-[4px] text-white flex items-center gap-2">
                        <Mail size={10} className="text-primary" /> البريد الإلكتروني
                      </label>
                      <input 
                        required
                        type="email" 
                        placeholder="example@mail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl font-bold text-[17px] text-white focus:border-primary outline-none transition-all placeholder:opacity-20"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-base font-black uppercase tracking-[4px] text-white flex items-center gap-2">
                          <Lock size={10} className="text-primary" /> كلمة المرور
                        </label>
                        <button 
                          type="button"
                          onClick={() => setIsForgotPassword(true)}
                          className="text-[10px] font-black uppercase tracking-[2px] text-primary/60 hover:text-primary transition-colors"
                        >
                          نسيت كلمة السر؟
                        </button>
                      </div>
                      <input 
                        required
                        type="password" 
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl font-bold text-[17px] text-white focus:border-primary outline-none transition-all placeholder:opacity-20"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="register"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[4px] text-white/40 flex items-center gap-2">
                        <User size={10} className="text-primary" /> الاسم ثلاثي
                      </label>
                      <input 
                        required
                        type="text" 
                        placeholder="الاسم الثلاثي"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl font-bold text-sm focus:border-primary outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[4px] text-white/40 flex items-center gap-2">
                        <Mail size={10} className="text-primary" /> البريد الإلكتروني
                      </label>
                      <input 
                        required
                        type="email" 
                        placeholder="example@mail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl font-bold text-sm focus:border-primary outline-none transition-all"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[4px] text-white/40">رقم الهاتف</label>
                        <input 
                          required
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl font-bold text-sm focus:border-primary outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[4px] text-white/40">المحافظة</label>
                        <div className="relative">
                          <select 
                            required
                            value={formData.governorate}
                            onChange={(e) => setFormData({...formData, governorate: e.target.value, city: ''})}
                            className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl font-bold text-sm focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                          >
                            <option value="">اختر المحافظة</option>
                            {EGYPT_GOVERNORATES.map(gov => (
                              <option key={gov.id} value={gov.governorate_name_ar}>
                                {gov.governorate_name_ar}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[4px] text-white/40">المدينة</label>
                        <div className="relative">
                          <select 
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                            disabled={!formData.governorate}
                            className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl font-bold text-sm focus:border-primary outline-none transition-all appearance-none disabled:opacity-50 cursor-pointer"
                          >
                            <option value="">اختر المدينة</option>
                            {EGYPT_GOVERNORATES.find(gov => gov.governorate_name_ar === formData.governorate)?.cities.map(city => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[4px] text-white/40">العنوان بالتفصيل</label>
                        <input 
                          required
                          type="text" 
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl font-bold text-sm focus:border-primary outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[4px] text-white/40">كلمة المرور</label>
                        <input 
                          required
                          type="password" 
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl font-bold text-sm focus:border-primary outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[4px] text-white/40">تأكيد المرور</label>
                        <input 
                          required
                          type="password" 
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl font-bold text-sm focus:border-primary outline-none transition-all"
                        />
                      </div>
                    </div>
                    {!isLogin && (
                      <p className="text-[9px] text-white/30 uppercase tracking-[2px]">
                        * كلمة المرور يجب أن لا تقل عن ٦ خانات للأمان
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-6 bg-primary text-black font-black uppercase text-[27px] tracking-[4px] flex items-center justify-center gap-3 transition-all hover:gap-6 disabled:opacity-50 rounded-2xl"
              >
                {loading ? 'جاري التحميل...' : (isForgotPassword ? 'إرسال رابط الاستعادة' : (isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'))}
                <ArrowLeft size={16} />
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[3px]">
                  <span className="bg-[#0F0F0F] px-4 text-white/30">أو عبر</span>
                </div>
              </div>

              <button 
                type="button"
                onClick={async () => {
                  setLoading(true);
                  try {
                    await loginWithGoogle();
                    toast.success("تم الدخول عبر جوجل بنجاح");
                    navigate(from, { replace: true });
                  } catch (err: any) {
                    if (err.code === 'auth/popup-closed-by-user') {
                      return; // Handle silently
                    }
                    console.error("Google Auth Error:", err);
                    toast.error("حدث خطأ أثناء تسجيل الدخول عبر جوجل");
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
                className="w-full py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs tracking-[2px] flex items-center justify-center gap-3 transition-all rounded-2xl"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google" />
                الدخول عبر جوجل
              </button>

              <button 
                type="button"
                onClick={() => {
                  loginAsGuest();
                  navigate(from, { replace: true });
                }}
                className="w-full py-4 text-primary/60 hover:text-primary transition-colors text-[9px] font-black uppercase tracking-[3px] flex items-center justify-center gap-2"
              >
                دخول سريع للتجربة كزائر (بدون حساب)
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
