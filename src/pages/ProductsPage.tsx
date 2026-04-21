import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { LayoutGrid, Camera, Watch, Headphones, Smartphone, Monitor, Filter, Sparkles, Search, ArrowUpDown, ChevronDown } from 'lucide-react';

interface ProductsPageProps {
  products: Product[];
  onAddToCart: (product: Product, event: React.MouseEvent | React.PointerEvent) => void;
  onViewDetails: (product: Product) => void;
}

const categoryIcons: Record<string, any> = {
  'الكل': <LayoutGrid size={16} />,
  'ساعات': <Watch size={16} />,
  'كاميرات': <Camera size={16} />,
  'سماعات': <Headphones size={16} />,
  'هواتف': <Smartphone size={16} />,
  'شاشات': <Monitor size={16} />,
};

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

export const ProductsPage: React.FC<ProductsPageProps> = ({ products, onAddToCart, onViewDetails }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  
  const categories = ['الكل', ...new Set(products.map(p => p.category))];

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchCategory = selectedCategory === 'الكل' || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [products, selectedCategory, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-dark-bg pt-24 md:pt-32 pb-20 px-6 md:px-10 overflow-hidden relative">
      {/* Premium Background Atmosphere */}
      <div className="absolute top-0 right-0 w-full h-[1000px] bg-linear-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[20%] left-[-15%] w-[500px] h-[500px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumbs - World Class Standard */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 mb-12 text-[10px] font-black uppercase tracking-[3px] text-white/20"
        >
          <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <ChevronDown size={10} className="-rotate-90" />
          <span className="text-white/60">كتالوج المنتجات</span>
        </motion.div>

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 md:gap-12 mb-12 md:mb-20 text-center lg:text-right">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 md:space-y-6 max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl">
              <Sparkles size={16} className="text-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[4px] text-white/50 text-center">تكنولوجيا تفوق التوقعات</span>
            </div>
            <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] text-white">
              كتالوج <br /> 
              <span className="text-primary italic">المستقبل</span>
            </h1>
            <p className="text-white/40 text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              استكشف أكثر من {products.length} قطعة تقنية منسقة بعناية لتعكس فخامة متجر <span className="text-white font-black whitespace-nowrap">B-Five Premium</span>.
            </p>
          </motion.div>

          {/* 3D Decorative Floating Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: 1.2,
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-110"></div>
            <img 
              src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Shopping%20bags/3D/shopping_bags_3d.png" 
              alt="Shop Logo"
              className="w-72 h-72 relative z-10 drop-shadow-[0_20px_40px_rgba(255,122,0,0.2)]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Featured Spotlight - rhythm and coordination */}
        {selectedCategory === 'الكل' && !searchTerm && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-24 p-1 rounded-[48px] bg-gradient-to-r from-primary/20 via-transparent to-primary/20"
          >
            <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[44px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />
              
              <div className="md:w-1/2 space-y-8 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[2px] bg-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[5px] text-primary">وصل حديثاً</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white">إصدارات <span className="text-primary italic">بريميوم</span> ٢٠٢٦</h2>
                <p className="text-white/40 text-sm md:text-base font-medium">نقدم لكم أحدث ما توصلت إليه التكنولوجيا من ساعات ذكية وسماعات محيطية بأداء لا يضاهى.</p>
                <div className="flex gap-4">
                   <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-[2px] text-white/50">مواد مستدامة</div>
                   <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-[2px] text-white/50">ضمان ذهبي</div>
                </div>
              </div>
              
              <div className="md:w-1/2 relative group-hover:scale-110 transition-transform duration-1000">
                <img 
                  src="https://picsum.photos/seed/tech-hero/800/600" 
                  alt="Featured" 
                  className="w-full h-full object-cover rounded-[32px] shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Coordinated Search & Filter Section */}
        <div className="flex flex-col gap-6 md:gap-10 mb-12 md:mb-20 sticky top-24 z-30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 p-4 bg-dark-bg/80 backdrop-blur-3xl border border-white/5 rounded-[32px] md:rounded-[40px] shadow-2xl">
            {/* Search Bar */}
            <div className="lg:col-span-7 relative">
              <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="text"
                placeholder="ابحث..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-14 md:h-16 bg-white/[0.02] border border-white/10 rounded-2xl md:rounded-3xl pr-14 md:pr-16 pl-4 md:pl-6 text-white font-bold placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm md:text-base"
              />
            </div>

            {/* Sort Controls */}
            <div className="lg:col-span-3 flex items-center px-4 bg-white/[0.02] border border-white/10 rounded-2xl md:rounded-3xl">
              <ArrowUpDown size={18} className="text-primary ml-3" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-transparent border-none text-white/50 font-black h-14 md:h-16 focus:ring-0 appearance-none text-[9px] md:text-[10px] uppercase tracking-[1px] md:tracking-[2px] cursor-pointer"
              >
                <option value="default" className="bg-dark-bg">الترتيب الافتراضي</option>
                <option value="price-asc" className="bg-dark-bg">السعر: تصاعدي</option>
                <option value="price-desc" className="bg-dark-bg">السعر: تنازلي</option>
                <option value="name-asc" className="bg-dark-bg">الاسم: أ - ي</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="lg:col-span-2 flex items-center justify-center bg-primary/10 border border-primary/20 rounded-2xl md:rounded-3xl text-[9px] font-black uppercase tracking-[2px] md:tracking-[3px] text-primary h-12 md:h-16">
              {filteredAndSortedProducts.length} نتيحة
            </div>
          </div>

          {/* Categories Bar */}
          <div className="flex flex-wrap gap-4 overflow-x-auto pb-4 no-scrollbar">
            {categories.map(cat => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[2px] transition-all duration-500 border whitespace-nowrap ${
                  selectedCategory === cat 
                  ? 'bg-primary text-black border-primary shadow-[0_10px_30px_rgba(255,122,0,0.3)]' 
                  : 'bg-white/5 text-white/30 border-white/5 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {categoryIcons[cat as keyof typeof categoryIcons] || <LayoutGrid size={16} />}
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Products Grid with Entrance Animation */}
        <motion.div 
          layout
          className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-12 gap-y-12 md:gap-y-32"
        >
          <AnimatePresence mode='popLayout'>
            {filteredAndSortedProducts.map((product, index) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index % 6 * 0.1,
                  type: 'spring',
                  damping: 20
                }}
              >
                <div className="group relative">
                  <ProductCard 
                    product={product} 
                    onAddToCart={onAddToCart} 
                    onViewDetails={onViewDetails} 
                  />
                  {/* Floating Number/Index Badge - Premium Detail */}
                  <div className="absolute -left-10 top-1/2 -translate-y-1/2 vertical-text pointer-events-none opacity-0 group-hover:opacity-10 shadow-sm transition-all duration-700 blur-[2px] group-hover:blur-0 hidden xl:block">
                    <span className="text-9xl font-black text-white font-mono leading-none tracking-tighter">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredAndSortedProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-40 text-center space-y-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-150 animate-pulse"></div>
              <img 
                src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Magnifying%20glass%20tilted%20left/3D/magnifying_glass_tilted_left_3d.png" 
                alt="Empty"
                className="w-48 h-48 relative z-10 mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-black uppercase text-white tracking-tighter">عذراً، لم نجد نتائج لـ "{searchTerm}"</h3>
              <p className="text-white/30 font-medium uppercase tracking-widest">جرب البحث بكلمات مختلفة أو تغيير القسم</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('الكل'); }}
                className="mt-8 px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-[4px] rounded-2xl hover:bg-primary transition-colors"
              >
                عرض كل المنتجات
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
