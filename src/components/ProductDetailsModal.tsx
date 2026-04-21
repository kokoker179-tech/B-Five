import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Star, ShieldCheck, Truck, RotateCcw, Share2, Heart, Award } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, event: React.MouseEvent | React.PointerEvent) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8 lg:p-12 pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/95 backdrop-blur-3xl pointer-events-auto"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-7xl bg-[#080808] border border-white/5 md:rounded-[60px] overflow-hidden relative z-10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] pointer-events-auto flex flex-col md:flex-row h-full md:h-[90vh] overflow-y-auto md:overflow-visible"
        >
          {/* Decorative Backglow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          {/* Close Button - Elite Style */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-50 w-12 h-12 md:w-14 md:h-14 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all group"
          >
            <X size={24} className="md:size-[28px] group-hover:rotate-90 transition-transform duration-500" />
          </button>

          {/* Left Column: Immersive Visuals */}
          <div className="w-full md:w-[55%] h-[40vh] md:h-full relative bg-[#0c0c0c] overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#080808]/20 z-10" />
            
            <motion.img 
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            
            {/* Dynamic Labels */}
            <div className="absolute top-12 left-12 z-20 flex flex-col gap-4">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-2xl border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[3px] text-white">متوفر حالياً</span>
              </motion.div>
              
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-primary px-6 py-3 text-black rounded-2xl font-black uppercase text-[10px] tracking-[4px] shadow-2xl"
              >
                {product.category}
              </motion.div>
            </div>

            {/* Photo Gallery Indicator (Mock) */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`h-1.5 transition-all duration-500 rounded-full ${i === 0 ? 'w-12 bg-primary' : 'w-3 bg-white/20'}`} />
              ))}
            </div>
          </div>

          {/* Right Column: Premium Details */}
          <div className="w-full md:w-[45%] p-6 md:p-16 lg:p-20 md:overflow-y-auto custom-scrollbar flex flex-col relative">
            <div className="space-y-8 md:space-y-12">
              {/* Top Meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} md:size={14} fill={i < 4 ? "currentColor" : "none"} className={i >= 4 ? "text-white/20" : ""} />
                  ))}
                  <span className="text-[10px] md:text-[11px] font-black tracking-[2px] text-white/40 ml-4">(٤.٨ - ١٨٢ رأي)</span>
                </div>
                <div className="flex gap-4">
                  <button className="text-white/30 hover:text-primary transition-colors"><Heart size={20} /></button>
                  <button className="text-white/30 hover:text-primary transition-colors"><Share2 size={20} /></button>
                </div>
              </div>

              {/* Title & Price */}
              <div className="space-y-4 md:space-y-6">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white"
                >
                  {product.name.split(' ').map((word, i) => (
                    <span key={i} className={i % 2 !== 0 ? 'text-primary italic' : ''}>{word} </span>
                  ))}
                </motion.h2>
                
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">{product.price.toLocaleString()}</span>
                    <span className="text-xs md:text-sm font-black text-white/30 uppercase tracking-[4px]">ج.م</span>
                  </div>
                  <div className="hidden md:block h-12 w-[1px] bg-white/10" />
                  <div className="w-fit bg-white/5 border border-white/5 px-4 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-[2px] text-green-500">
                    أفضل سعر مضمون
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[4px] text-white/30">التفاصيل الفنية</h4>
                  <div className="h-[1px] flex-grow bg-white/5" />
                </div>
                <p className="text-base text-white/50 leading-relaxed font-medium">
                  {product.description} يتم إنتاج هذه القطعة بمعايير جودة استثنائية من متجر <span className="text-white font-black">B-Five</span> العالمي. تم تصميمها لتوفير مزيج متوازن بين الأداء القوي والمظهر الفاخر الذي يلبي طموحات عملائنا.
                </p>
              </div>

              {/* Trust Badges - 3D Style */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: "🚚", label: "شحن سريع", sub: "٤٨ ساعة" },
                  { icon: "🛡️", label: "ضمان عامين", sub: "وكيل معتمد" },
                  { icon: "🔄", label: "استبدال سهل", sub: "١٤ يوم" }
                ].map((item, i) => (
                  <div key={i} className="group/badge p-5 bg-white/5 border border-white/5 rounded-[24px] flex flex-col items-center text-center gap-3 hover:bg-white/10 hover:border-white/20 transition-all">
                    <span className="text-3xl group-hover/badge:scale-110 transition-transform duration-500">{item.icon}</span>
                    <div>
                      <h5 className="text-[10px] font-black uppercase tracking-[1px] text-white">{item.label}</h5>
                      <p className="text-[8px] text-white/30 font-bold uppercase">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Exclusive Features Staggered List */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[4px] text-white/30">لماذا هذا المنتج؟</h4>
                <div className="grid grid-cols-1 gap-3">
                  {['تقنية المعالجة المتقدمة 2026', 'تصميم انسيابي يوفر راحة قصوى', 'تكامل كامل مع جميع الأجهزة'].map((feat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + (i * 0.1) }}
                      className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-primary/5 transition-colors"
                    >
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                        <Award size={16} />
                      </div>
                      <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest">{feat}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

              {/* Footer Action Bar - Fixed Bottom on Mobile / Normal on Desktop */}
            <div className="mt-12 md:mt-20 flex flex-col sm:flex-row gap-4 md:gap-6">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-1 md:p-2 shrink-0">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                >
                  <Minus size={18} md:size={20} />
                </button>
                <span className="w-10 md:w-12 text-center font-black text-lg md:text-xl">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-primary group"
                >
                  <Plus size={18} md:size={20} />
                </button>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  onAddToCart(product, e);
                  onClose();
                }}
                className="flex-grow py-5 md:py-6 bg-primary text-black font-black uppercase text-[10px] md:text-xs tracking-[4px] md:tracking-[5px] flex items-center justify-center gap-4 transition-all rounded-2xl shadow-[0_20px_50px_rgba(255,122,0,0.3)] hover:shadow-primary/50 group"
              >
                أضف إلى حقيبة التسوق
                <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <Plus size={16} md:size={18} />
                </div>
              </motion.button>
            </div>
            
            {/* Disclaimer */}
            <p className="mt-8 text-center text-[8px] font-black uppercase tracking-[3px] text-white/20">
              * تم تسجير هذا المنتج بضمان رسمي من B-Five لمدة ٢٤ شهر
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
