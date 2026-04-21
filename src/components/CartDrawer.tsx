import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Minus, Plus, CreditCard, Sparkles, Truck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  count: number;
  total: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onUpdateQuantity,
  count,
  total
}) => {
  const FREE_SHIPPING_THRESHOLD = 5000;
  const progress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-[12px] z-[100]"
          />
          
          {/* Premium Drawer Container */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.8 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-[#080808] z-[101] shadow-[-40px_0_100px_rgba(0,0,0,0.9)] flex flex-col border-l border-white/5"
          >
            {/* Coordination Label - Floating vertical text */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-full flex items-center pointer-events-none group">
               <span className="vertical-text text-[120px] font-black text-white/[0.02] tracking-widest uppercase leading-none select-none">
                 B-Five Elite
               </span>
            </div>

            {/* Header Section */}
            <div className="relative p-8 md:p-12 flex items-center justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-1 px-1 bg-primary/20 rounded-full">
                    <motion.div 
                      animate={{ x: [0, 40, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-4 h-full bg-primary rounded-full shadow-[0_0_10px_rgba(255,122,0,0.8)]"
                    />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[5px] text-primary">B-Five Elite System</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.8] drop-shadow-2xl">
                  حقيبة <br /> <span className="text-primary italic">التسوق</span>
                </h2>
                <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[3px] text-white/20">
                  <div className="w-1 h-1 bg-white/20 rounded-full" />
                  <span>بروتوكول الطلب النشط</span>
                  <div className="w-1 h-1 bg-white/20 rounded-full" />
                  <span>{count} قطع تقنية</span>
                </div>
              </div>

              <motion.button 
                whileHover={{ rotate: 90, scale: 1.1, backgroundColor: 'rgba(255,122,0,0.1)' }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-[28px] md:rounded-[32px] flex items-center justify-center text-white/50 hover:text-primary transition-all duration-500 shadow-2xl backdrop-blur-3xl group"
              >
                <X size={28} className="md:size-[36px] group-hover:scale-110 transition-transform" />
              </motion.button>
            </div>

            {/* Shipping Progress - Coordinated with ProductsPage Spotlight */}
            <div className="px-8 md:px-12 mb-8">
              <div className="relative p-6 bg-white/[0.02] border border-white/5 rounded-[32px] overflow-hidden group/ship">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover/ship:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${total >= FREE_SHIPPING_THRESHOLD ? 'bg-primary text-black' : 'bg-white/5 text-white/40'}`}>
                        <Truck size={16} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[2px] text-white/50">
                        {total >= FREE_SHIPPING_THRESHOLD ? "لقد حصلت على شحن مجاني!" : `يتبقى ${FREE_SHIPPING_THRESHOLD - total} ج.م للشحن المجاني`}
                      </span>
                    </div>
                    {total >= FREE_SHIPPING_THRESHOLD && (
                      <motion.div 
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest"
                      >
                        مؤهل
                      </motion.div>
                    )}
                  </div>
                  <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden p-[1px]">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(255,122,0,0.5)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-grow overflow-y-auto px-6 md:px-12 pb-12 space-y-4 md:space-y-6 custom-scrollbar relative z-10">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-10"
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="absolute w-32 h-32 md:w-40 md:h-40 bg-primary/20 blur-[80px] rounded-full animate-pulse" />
                      <ShoppingBag size={80} className="md:size-[120px] text-white/5 relative z-10" />
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">حقيبتكم خالية من <span className="text-primary italic">التكنولوجيا</span></h3>
                      <button 
                        onClick={onClose}
                        className="px-10 py-4 md:px-12 md:py-5 bg-white text-black text-[10px] font-black uppercase tracking-[4px] rounded-2xl hover:bg-primary transition-all duration-500 hover:scale-105 active:scale-95"
                      >
                        ابدأ بتنسيق مجموعتك
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  items.map((item, idx) => (
                    <motion.div 
                      layout
                      key={item.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50, scale: 0.9 }}
                      transition={{ delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative bg-white/[0.01] border border-white/[0.03] rounded-[32px] md:rounded-[48px] overflow-hidden flex flex-col sm:flex-row items-center p-5 md:p-6 gap-6 md:gap-8 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
                    >
                      {/* Item Background Glow */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      {/* Item Numbering for Coordination */}
                      <div className="absolute right-6 top-6 md:right-8 md:top-8 flex flex-col items-end gap-1 opacity-20 group-hover:opacity-60 transition-opacity">
                        <span className="text-[8px] font-black text-white uppercase tracking-[4px]">ID SEC://</span>
                        <span className="text-[14px] font-black text-primary uppercase tracking-tighter">0{idx + 1}</span>
                      </div>

                      <div className="relative w-full sm:w-28 sm:h-28 md:w-32 md:h-32 aspect-square bg-[#101010] rounded-[24px] md:rounded-[32px] overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-700 shadow-2xl ring-1 ring-white/5">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                      </div>
                      
                      <div className="flex-grow flex flex-col justify-between w-full h-full py-1 relative z-10">
                        <div className="space-y-1">
                          <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-white group-hover:text-primary transition-colors truncate max-w-[220px]">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 bg-primary/40 rounded-full" />
                             <span className="text-[9px] text-white/30 font-black uppercase tracking-[3px]">{item.category}</span>
                          </div>
                        </div>

                        <div className="flex items-end justify-between mt-4 sm:mt-0">
                          <div className="space-y-1">
                            <span className="text-[8px] text-white/20 uppercase font-black tracking-widest block">القيمة التقنية</span>
                            <div className="text-xl md:text-2xl font-black text-white tracking-tighter">
                              {item.price.toLocaleString()} <span className="text-[12px] text-primary italic mr-1">ج.م</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="flex items-center bg-black/60 border border-white/5 rounded-[16px] md:rounded-[20px] p-1 md:p-1.5 gap-2 md:gap-3 ring-1 ring-white/10 backdrop-blur-xl">
                              <motion.button 
                                whileTap={{ scale: 0.8 }}
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center hover:bg-white/10 rounded-[12px] md:rounded-[14px] transition-colors text-white/20 hover:text-white"
                              >
                                <Minus size={12} md:size={14} />
                              </motion.button>
                              <span className="font-black text-sm w-5 md:w-6 text-center text-white/90">{item.quantity}</span>
                              <motion.button 
                                whileTap={{ scale: 0.8 }}
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center hover:bg-white/10 rounded-[12px] md:rounded-[14px] transition-colors text-white/20 hover:text-white"
                              >
                                <Plus size={12} md:size={14} />
                              </motion.button>
                            </div>
                            <button 
                              onClick={() => onRemove(item.id)}
                              className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl md:rounded-2xl bg-white/5 text-white/10 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
                            >
                              <Trash2 size={14} md:size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer Summary Section - Coordinated with CheckoutPage */}
            {items.length > 0 && (
              <div className="relative p-8 md:p-12 bg-[#050505] border-t border-white/5 space-y-8 md:space-y-12">
                 <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none opacity-50" />
                
                <div className="relative space-y-4 md:space-y-6">
                  <div className="flex justify-between items-center text-white/20 group/row">
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[4px] group-hover/row:text-white transition-colors">إجمالي المشتريات المحددة</span>
                    <span className="text-base md:text-lg font-black tracking-tighter text-white/60">{total.toLocaleString()} <span className="text-[10px]">ج.م</span></span>
                  </div>
                  <div className="flex justify-between items-center text-white/20 group/row">
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[4px] group-hover/row:text-white transition-colors">بروتوكول الشحن الفاخر</span>
                    <span className="text-base md:text-lg font-black tracking-tighter text-primary">
                      {total >= FREE_SHIPPING_THRESHOLD ? 'مجاني بالكامل' : '٣٥٠ ج.م'}
                    </span>
                  </div>
                  
                  <div className="pt-6 md:pt-8 border-t border-white/10 flex justify-between items-end relative">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Sparkles size={12} className="text-primary animate-pulse" />
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[6px] md:tracking-[8px] text-primary">نظام الإجمالي</span>
                      </div>
                      <h4 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none flex items-baseline gap-2">
                        {(total + (total >= FREE_SHIPPING_THRESHOLD ? 0 : 350)).toLocaleString()} 
                        <span className="text-[12px] md:text-[14px] text-white/20 uppercase font-black tracking-widest italic">ج.م</span>
                      </h4>
                    </div>
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-[28px] md:rounded-[32px] flex items-center justify-center text-primary/40">
                      <CreditCard size={28} md:size={32} />
                    </div>
                  </div>
                </div>

                <div className="relative group/checkout">
                   <div className="absolute -inset-1 bg-primary rounded-[28px] md:rounded-[32px] blur-2xl md:blur-3xl opacity-20 group-hover/checkout:opacity-60 transition-all duration-700" />
                   <Link 
                    to="/checkout"
                    onClick={onClose}
                    className="relative w-full h-20 md:h-24 bg-white text-black font-black text-sm uppercase tracking-[6px] md:tracking-[8px] flex items-center justify-center gap-4 md:gap-6 rounded-[28px] md:rounded-[32px] hover:bg-primary transition-all duration-500 shadow-[0_30px_100px_rgba(0,0,0,0.6)]"
                  >
                    إتمام الدفع الآمن
                    <ArrowRight size={20} md:size={24} className="group-hover/checkout:translate-x-3 transition-transform" />
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-8 opacity-10 group-hover:opacity-30 transition-all">
                   <div className="flex flex-col items-center gap-1">
                     <span className="text-[8px] font-black uppercase tracking-widest">SECURE CHECKOUT</span>
                     <div className="flex gap-4">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 brightness-0 invert" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 brightness-0 invert" />
                     </div>
                   </div>
                   <div className="w-[1px] h-8 bg-white/10" />
                   <div className="flex flex-col items-start gap-0.5">
                      <span className="text-[7px] font-black text-white uppercase tracking-widest leading-none">Powered by B-Five</span>
                      <span className="text-[8px] font-black text-primary uppercase tracking-[2px] leading-none">Elite Platform</span>
                   </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
