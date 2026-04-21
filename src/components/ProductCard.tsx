import React from 'react';
import { motion } from 'motion/react';
import { Plus, Eye, Star, ArrowUpRight } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, event: React.MouseEvent | React.PointerEvent) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col h-full bg-[#0d0d0d] border border-white/5 rounded-[40px] overflow-hidden hover:bg-white/[0.03] transition-all duration-700 hover:border-white/10"
    >
      {/* Product Image Section */}
      <div 
        className="relative aspect-[4/5] overflow-hidden cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        {/* Subtle Inner Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent z-10 opacity-80" />
        
        <motion.img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        
        {/* Floating Category Tag */}
        <div className="absolute top-6 left-6 z-20">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 text-white/50 text-[8px] font-black uppercase tracking-[3px] px-4 py-2 rounded-full">
            {product.category}
          </div>
        </div>

        {/* Quality Badge */}
        <div className="absolute top-6 right-6 z-20">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="bg-primary/10 backdrop-blur-2xl border border-primary/20 text-primary text-[8px] font-black uppercase tracking-[2px] px-4 py-2 rounded-full flex items-center gap-2"
          >
            <Star size={10} className="fill-primary" />
            B-Five Elite
          </motion.div>
        </div>

        {/* Premium Detail Link Icon */}
        <div className="absolute bottom-6 right-6 z-20">
          <motion.div 
            whileHover={{ rotate: 45 }}
            className="w-12 h-12 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl flex items-center justify-center text-white/50 group-hover:text-primary group-hover:border-primary/20 transition-all"
          >
            <ArrowUpRight size={20} />
          </motion.div>
        </div>

        {/* Quick Details Eye Overlay (Desktop) */}
        <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
          <div className="bg-primary/20 blur-3xl rounded-full w-32 h-32" />
        </div>
      </div>

      {/* Product Info Section */}
      <div className="p-8 md:p-10 flex flex-col flex-grow space-y-8">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <h3 
              className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-[0.9] text-white/90 group-hover:text-white transition-colors cursor-pointer"
              onClick={() => onViewDetails(product)}
            >
              {product.name}
            </h3>
            <div className="flex items-center gap-1.5 text-primary">
              <Star size={10} fill="currentColor" />
              <Star size={10} fill="currentColor" />
              <Star size={10} fill="currentColor" />
              <Star size={10} fill="currentColor" />
              <Star size={10} />
            </div>
          </div>
          
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-black text-white tracking-tighter group-hover:text-primary transition-colors">
              {product.price.toLocaleString()}
            </span>
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[4px]">ج.م</span>
          </div>
        </div>

        <p className="text-[12px] text-white/30 leading-relaxed uppercase tracking-wider line-clamp-2 font-medium">
          {product.description}
        </p>

        {/* Modern Action Bar */}
        <div className="pt-4 mt-auto">
          <motion.button 
            whileHover={{ y: -5, backgroundColor: '#ff7a00', color: '#000' }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => onAddToCart(product, e)}
            className="w-full h-16 bg-white/[0.03] border border-white/5 text-white/50 font-black uppercase text-[10px] tracking-[5px] flex items-center justify-center gap-4 rounded-3xl transition-all duration-500 overflow-hidden relative group/btn"
          >
            <Plus size={18} className="transition-transform duration-500 group-hover/btn:rotate-180" />
            إضافة للحقيبة
          </motion.button>
        </div>
      </div>

      {/* Mobile Detail Access */}
      <button 
        onClick={() => onViewDetails(product)}
        className="lg:hidden absolute bottom-24 right-8 z-30 w-12 h-12 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl flex items-center justify-center text-white/50"
      >
        <Eye size={20} />
      </button>
    </motion.div>
  );
};
