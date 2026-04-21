import React from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Phone, Mail, Clock, MessageSquare, Headphones } from 'lucide-react';
import { toast } from 'sonner';

export const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم إرسال رسالتك بنجاح", {
      description: "سيتواصل معك فريق الدعم الفني خلال ٢٤ ساعة.",
    });
  };
  return (
    <div className="relative min-h-screen bg-dark-bg pt-20 md:pt-32 pb-20 px-6 md:px-10 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section with 3D Icon */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-6 text-center md:text-right"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mx-auto md:mr-0">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[3px] text-primary">نحن متاحون الآن</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white">
              دعنا <br /> <span className="text-primary italic">نتحدث</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg max-w-lg font-medium leading-relaxed mx-auto md:mr-0">
              هل لديك استفسار؟ فريق الدعم الفني لمتجر <span className="text-white font-black">B-Five</span> جاهز للإجابة على جميع تساؤلاتك.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: 1,
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-110" />
            <img 
              src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Robot/3D/robot_3d.png" 
              alt="Professional Support Robot"
              className="w-48 h-48 md:w-80 md:h-80 relative z-10 drop-shadow-[0_20px_60px_rgba(255,122,0,0.4)] transition-transform hover:scale-110 duration-700"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4 md:space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[24px] md:rounded-[32px] hover:bg-white/10 transition-all duration-500 cursor-pointer overflow-hidden relative"
            >
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:rotate-12 transition-transform">
                  <img 
                    src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Envelope/3D/envelope_3d.png" 
                    alt="Email"
                    className="w-10 h-10 md:w-12 md:h-12"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-white font-black uppercase text-[10px] tracking-[2px] mb-1 opacity-40">تواصل عبر البريد</h3>
                  <p className="text-lg md:text-xl font-black tracking-tight">Support@B-Five.io</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[24px] md:rounded-[32px] hover:bg-white/10 transition-all duration-500 cursor-pointer overflow-hidden relative"
            >
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:-rotate-12 transition-transform">
                  <img 
                    src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile%20phone/3D/mobile_phone_3d.png" 
                    alt="Phone"
                    className="w-10 h-10 md:w-12 md:h-12"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-white font-black uppercase text-[10px] tracking-[2px] mb-1 opacity-40">اتصل بنا مباشرة</h3>
                  <p className="text-lg md:text-xl font-black tracking-tight" dir="ltr">+966 50 000 0000</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[24px] md:rounded-[32px] hover:bg-white/10 transition-all duration-500 cursor-pointer overflow-hidden relative"
            >
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                  <img 
                    src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Alarm%20clock/3D/alarm_clock_3d.png" 
                    alt="Hours"
                    className="w-10 h-10 md:w-12 md:h-12"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-white font-black uppercase text-[10px] tracking-[2px] mb-1 opacity-40">ساعات العمل</h3>
                  <p className="text-lg md:text-xl font-black tracking-tight">متاح ٢٤/٧ طوال الأسبوع</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-7 bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[40px] relative overflow-hidden group/form"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover/form:opacity-100 transition-opacity duration-1000" />
            
            <form className="relative z-10 space-y-8" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[3px] text-white/30 block mr-2">الاسم الكامل</label>
                  <input 
                    type="text" 
                    placeholder="أدخل اسمك هنا"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 font-bold text-sm focus:border-primary focus:bg-white/10 outline-none transition-all placeholder:text-white/10" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[3px] text-white/30 block mr-2">البريد الإلكتروني</label>
                  <input 
                    type="email" 
                    placeholder="email@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 font-bold text-sm focus:border-primary focus:bg-white/10 outline-none transition-all placeholder:text-white/10" 
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[3px] text-white/30 block mr-2">كيف يمكننا مساعدتك؟</label>
                <textarea 
                  rows={4} 
                  placeholder="اكتب رسالتك بالتفصيل..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 font-bold text-sm focus:border-primary focus:bg-white/10 outline-none transition-all resize-none placeholder:text-white/10"
                ></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-6 bg-primary text-black font-black uppercase text-xs tracking-[5px] rounded-2xl flex items-center justify-center gap-4 transition-all shadow-[0_20px_40px_rgba(255,122,0,0.2)] hover:shadow-primary/40"
              >
                إرسال الآن
                <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center">
                  <Send size={16} />
                </div>
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="mt-32 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">الأسئلة <span className="text-primary italic">الشائعة</span></h2>
            <p className="text-white/30 text-xs font-black uppercase tracking-[4px]">إليك بعض الإجابات المختصرة</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: "ما هي مدة التوصيل؟", a: "نحرص على توصيل طلباتكم خلال ٢-٤ أيام عمل كحد أقصى لجميع مناطق المملكة." },
              { q: "هل المنتجات أصلية؟", a: "جميع المنتجات في B-Five أصلية ١٠٠٪ ومضمونة من الوكلاء المعتمدين مباشرة." },
              { q: "ما هي سياسة الاسترجاع؟", a: "نوفر لكم خدمة استبدال واسترجاع سهلة خلال ١٤ يوماً من استلام الطلب." },
              { q: "هل تتوفر خدمة الدفع عند الاستلام؟", a: "نعم، ندعم الدفع عند الاستلام بالإضافة لجميع وسائل الدفع الإلكتروني الآمنة." }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-[32px] hover:bg-white/10 transition-colors"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-black shrink-0">
                    ؟
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg mb-2">{faq.q}</h4>
                    <p className="text-white/40 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
