import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShoppingCart, ShoppingBag, Package, Box, Sparkles } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

interface HomeProps {
  products: Product[];
  onAddToCart: (product: Product, event: React.MouseEvent | React.PointerEvent) => void;
  onViewDetails: (product: Product) => void;
  cartCount: number;
}

export const Home: React.FC<HomeProps> = ({ products, onAddToCart, onViewDetails, cartCount }) => {
  return (
    <>
      {/* Hero Section */}
      <header className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-10 py-32 bg-[#0a0a0a]">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[180px] rounded-full z-0 opacity-50" />
        
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              {/* Modern Zigzag Lines */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[140%] w-[120%] h-40 opacity-20 pointer-events-none z-0">
                <svg viewBox="0 0 400 100" className="w-full h-full">
                  <motion.path
                    d="M 0 50 Q 25 25 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                    strokeDasharray="10 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M 0 70 Q 25 45 50 70 T 100 70 T 150 70 T 200 70 T 250 70 T 300 70 T 350 70 T 400 70"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  />
                </svg>
              </div>

              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: -40 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-primary text-2xl md:text-6xl font-black font-display uppercase tracking-tight mb-4 block drop-shadow-[0_10px_40px_rgba(255,122,0,0.5)] relative z-10"
              >
                مكانك الأول في التسوق
              </motion.span>
              <h1 className="text-[80px] md:text-[220px] font-black leading-[0.8] tracking-[-0.05em] uppercase text-white mb-4">
                B-Five
              </h1>
              
              {/* Floating Icons Container - Scaled for tighter spaces */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                {/* Left Side: Google Search Simulation */}
                <motion.div
                  animate={{ 
                    y: [10, -10, 10], 
                    x: [-5, 5, -5] 
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-16 -left-16 md:-top-8 md:-left-80 z-30 pointer-events-auto"
                >
                  <div className="relative flex items-center bg-white rounded-full px-3 py-1.5 md:px-6 md:py-3 shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-white/20 scale-[0.4] md:scale-100 origin-left">
                    <div className="flex gap-1 md:gap-1.5 mr-2">
                      <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#4285F4]"></span>
                      <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#EA4335]"></span>
                      <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#FBBC05]"></span>
                      <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#34A853]"></span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 bg-gray-100/50 rounded-full px-3 py-1 md:px-4 md:py-1.5">
                      <img 
                        src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Magnifying%20glass%20tilted%20left/3D/magnifying_glass_tilted_left_3d.png" 
                        alt="Search"
                        className="w-4 h-4 md:w-6 md:h-6"
                      />
                      <span className="text-black font-black text-xs md:text-sm tracking-widest italic uppercase">B-Five</span>
                    </div>
                    {/* Floating Cursor Effect */}
                    <motion.div 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-[2px] h-4 bg-primary ml-1"
                    />
                  </div>
                </motion.div>

                {/* Left Side: Shopping Bags */}
                <motion.div
                  animate={{ 
                    y: [10, -10, 10],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-24 -left-10 md:top-52 md:-left-60 z-20 origin-left pointer-events-auto"
                >
                  <img 
                    src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Shopping%20bags/3D/shopping_bags_3d.png" 
                    alt="3D Shopping Bags"
                    className="w-[50px] h-[50px] md:w-[160px] md:h-[160px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] select-none pointer-events-none scale-75 md:scale-100"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Right Side: Shopping Cart */}
                <motion.div
                  animate={{ 
                    y: [-15, 15, -15],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-16 -right-16 md:-top-28 md:-right-64 z-30 origin-right pointer-events-auto"
                >
                  <div className="relative group scale-[0.5] md:scale-100">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-125 opacity-30" />
                    <img 
                      src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Shopping%20cart/3D/shopping_cart_3d.png" 
                      alt="3D Shopping Cart"
                      className="w-[90px] h-[90px] md:w-[180px] md:h-[180px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative z-10 select-none pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-0 right-0 w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-xl z-20 border-2 border-primary">
                      <span className="text-black text-[14px] md:text-[20px] font-black italic">{cartCount}</span>
                    </div>
                  </div>
                </motion.div>
                
                {/* Right Side: Package */}
                <motion.div
                  animate={{ 
                    scale: [0.95, 1.05, 0.95],
                    rotate: [0, 10, 0],
                    y: [5, -5, 5]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute top-24 -right-10 md:top-52 md:-right-60 z-20 origin-right pointer-events-auto"
                >
                  <img 
                    src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Package/3D/package_3d.png" 
                    alt="3D Package"
                    className="w-12 h-12 md:w-36 md:h-36 drop-shadow-[0_15px_30px_rgba(255,122,0,0.2)] select-none pointer-events-none scale-75 md:scale-100"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full max-w-5xl relative group"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-1000" />
            <div className="relative rounded-[40px] overflow-hidden border border-white/10 bg-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.6)] aspect-video md:aspect-[21/9]">
              <img 
                src="https://i.postimg.cc/0y2k2jqr/7B5AFF74-0FC5-4FA7-98F4-2985E14DF002.jpg" 
                alt="B-Five Brand Image" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[3s] ease-out"
                referrerPolicy="no-referrer"
                loading="eager"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('picsum')) {
                    target.src = "https://picsum.photos/seed/b-five-fashion/1920/1080?brightness=0.8";
                  }
                }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
              
            </div>
          </motion.div>
        </div>

        {/* Hero Decoration Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />

        {/* Hero Stats */}
        <div className="absolute bottom-10 left-10 right-10 flex justify-end gap-16 text-right hidden lg:flex">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-white/40">الخامة</span>
            <p className="text-xl font-bold tracking-tight">ألياف كربونية</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-white/40">الوزن</span>
            <p className="text-xl font-bold tracking-tight">١٨٠ جرام</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-white/40">التوصيل</span>
            <p className="text-xl font-bold tracking-tight">مجاني وسريع</p>
          </div>
        </div>
      </header>

      {/* Featured Section */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-6 md:px-10 w-full">
        <div className="flex flex-col gap-2 md:gap-4 mb-12 md:mb-20">
          <h2 className="text-4xl md:text-[60px] font-black uppercase leading-none tracking-tighter">المجموعة المختارة</h2>
          <div className="w-20 md:w-40 h-1 bg-primary" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 md:gap-x-12 gap-y-8 md:gap-y-24">
          {(products || []).slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onViewDetails={onViewDetails} />
          ))}
        </div>
      </section>
    </>
  );
};
