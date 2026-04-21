import React from 'react';
import { motion } from 'motion/react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { Zap, Tag, Gift, Percent, Flame as Fire, Timer } from 'lucide-react';

interface OffersPageProps {
  products: Product[];
  onAddToCart: (product: Product, event: React.MouseEvent | React.PointerEvent) => void;
  onViewDetails: (product: Product) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({ products, onAddToCart, onViewDetails }) => {
  const offerProducts = products.map(p => ({
    ...p,
    discountPrice: Math.floor(p.price * 0.8),
    discountPercent: 20
  }));

  return (
    <div className="min-h-screen bg-dark-bg pt-20 md:pt-32 pb-20 px-6 md:px-10 overflow-hidden relative">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full -translate-x-1/2" />
      <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-orange-600/5 blur-[120px] rounded-full translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Mega Sale Hero Section */}
        <section className="relative mb-20 md:mb-32 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-orange-600/30 rounded-[32px] md:rounded-[40px] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[32px] md:rounded-[40px] p-8 md:p-24 overflow-hidden">
            <div className="grid lg:grid-cols-2 items-center gap-12 md:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6 md:space-y-8 text-center lg:text-right"
              >
                <div className="inline-flex items-center gap-3 px-5 py-2 bg-primary text-black rounded-full font-black text-[9px] md:text-xs uppercase tracking-[2px] md:tracking-[3px] shadow-[0_10px_30px_rgba(255,122,0,0.3)]">
                  <Timer size={14} md:size={16} />
                  عرض لفترة محدودة
                </div>
                <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-none text-white">
                  عروض <br /> <span className="text-primary italic">الموسم</span>
                </h1>
                <p className="text-white/40 text-base md:text-xl font-medium max-w-md mx-auto lg:mx-0">
                  استمتع بخصومات حصرية تصل إلى <span className="text-white font-black hover:text-primary transition-colors cursor-default">٥٠٪</span> على أرقى الإلكترونيات.
                </p>
                <div className="flex justify-center lg:justify-start gap-3 md:gap-4">
                  <div className="bg-white/5 border border-white/10 px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl">
                    <span className="text-xl md:text-2xl font-black block">٢٤</span>
                    <span className="text-[8px] md:text-[10px] text-white/30 uppercase font-black tracking-widest">ساعة</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl">
                    <span className="text-xl md:text-2xl font-black block">٥٩</span>
                    <span className="text-[8px] md:text-[10px] text-white/30 uppercase font-black tracking-widest">دقيقة</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl">
                    <span className="text-xl md:text-2xl font-black block">٣٧</span>
                    <span className="text-[8px] md:text-[10px] text-white/30 uppercase font-black tracking-widest">ثانية</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0,
                  y: [0, -20, 0]
                }}
                transition={{ 
                  duration: 1,
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="relative flex justify-center"
              >
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-125"></div>
                <img 
                  src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Fire/3D/fire_3d.png" 
                  alt="Mega Sale"
                  className="w-48 h-48 md:w-80 md:h-80 relative z-10 drop-shadow-[0_20px_50px_rgba(255,122,0,0.4)]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Elements Around Fire */}
                <motion.div 
                  animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-10 -right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl z-20"
                >
                  <img 
                    src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Wrapped%20gift/3D/wrapped_gift_3d.png" 
                    alt="Gift"
                    className="w-12 h-12 md:w-16 md:h-16"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                
                <motion.div 
                  animate={{ y: [0, 20, 0], rotate: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute -bottom-10 -left-10 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-full shadow-2xl z-20"
                >
                  <span className="text-3xl font-black text-primary">%</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Offers Grid Title */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-12 md:mb-16 gap-6 md:gap-0">
          <div className="space-y-2 text-center md:text-right">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">أقوى <span className="text-primary">الخصومات</span></h2>
            <div className="h-1 w-24 bg-primary rounded-full mx-auto md:mr-0"></div>
          </div>
          <div className="flex items-center gap-4 text-white/40 font-black text-[9px] md:text-[10px] uppercase tracking-[3px] md:tracking-[4px]">
            <span className="hidden md:inline">التصنيف</span>
            <div className="flex gap-2">
              <button className="px-5 py-2 md:px-4 md:py-2 bg-white text-black rounded-full">الكل</button>
              <button className="px-5 py-2 md:px-4 md:py-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">إلكترونيات</button>
              <button className="px-5 py-2 md:px-4 md:py-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">موضة</button>
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-12 gap-y-12 md:gap-y-24">
          {offerProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Custom Sale Badge for each card */}
              <div className="absolute -top-4 -right-4 bg-primary text-black font-black py-2 px-4 rounded-xl rotate-12 z-20 shadow-xl border-4 border-dark-bg cursor-default select-none transition-transform hover:scale-110 hover:-rotate-12">
                -{product.discountPercent}%
              </div>
              <ProductCard 
                product={product} 
                onAddToCart={onAddToCart} 
                onViewDetails={onViewDetails} 
              />
              <div className="mt-4 flex items-center gap-3 px-6">
                <span className="text-primary font-black text-xl">{product.discountPrice} ريال</span>
                <span className="text-white/20 line-through text-xs">{product.price} ريال</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us / Trust Banner */}
        <div className="mt-24 md:mt-40 grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            { icon: <Zap size={28} />, title: "توصيل سريع", desc: "شحن مجاني خلال ٢٤ ساعة" },
            { icon: <Tag size={28} />, title: "أفضل الأسعار", desc: "نضمن لك السعر الأفضل دائماً" },
            { icon: <Gift size={28} />, title: "هدايا حصرية", desc: "هدية مع كل طلب فوق ٥٠٠ ريال" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-[32px] md:rounded-[40px] flex flex-col items-center text-center space-y-4 md:space-y-6 hover:bg-white/10 transition-all group"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                {item.icon}
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-black uppercase mb-1 tracking-tight">{item.title}</h4>
                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
