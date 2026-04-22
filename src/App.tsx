import React, { useState, useRef, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  Home as HomeIcon,
  X,
  User as UserIcon,
  LogOut
} from 'lucide-react';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import type { Product, CartItem } from './types';
import { Toaster, toast } from 'sonner';

// Lazy loading pages
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const OffersPage = lazy(() => import('./pages/OffersPage').then(m => ({ default: m.OffersPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const AuthPage = lazy(() => import('./pages/AuthPage').then(m => ({ default: m.AuthPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));

// Mock Data
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'ساعة ذكية ألترا 2',
    price: 1299,
    image: 'https://picsum.photos/seed/watch7/600/600',
    category: 'إلكترونيات',
    description: 'أحدث ساعة ذكية مع ميزات تتبع الصحة المتقدمة وشاشة فائقة الوضوح.'
  },
  {
    id: '2',
    name: 'سماعات بلوتوث برو',
    price: 450,
    image: 'https://picsum.photos/seed/audio2/600/600',
    category: 'إلكترونيات',
    description: 'صوت محيطي نقي مع ميزة إلغاء الضوضاء النشطة.'
  },
  {
    id: '3',
    name: 'حقيبة ظهر عصرية',
    price: 250,
    image: 'https://picsum.photos/seed/bag1/600/600',
    category: 'إكسسوارات',
    description: 'تصميم مريح وأنيق يتناسب مع أسلوب حياتك اليومي.'
  },
  {
    id: '4',
    name: 'نظارات شمسية طيار',
    price: 180,
    image: 'https://picsum.photos/seed/glass1/600/600',
    category: 'موضة',
    description: 'حماية كاملة من الأشعة فوق البنفسجية مع تصميم كلاسيكي جذاب.'
  },
  {
    id: '5',
    name: 'كاميرا احترافية Z9',
    price: 3500,
    image: 'https://picsum.photos/seed/cam1/600/600',
    category: 'تصوير',
    description: 'دقة لا تضاهى مع قدرات تصوير فيديو 8K.'
  },
  {
    id: '6',
    name: 'حذاء ركض رياضي',
    price: 320,
    image: 'https://picsum.photos/seed/shoes1/600/600',
    category: 'رياضة',
    description: 'خفة وزن وثبات عالي لأداء رياضي متميز.'
  }
];

interface FlyingItem {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  image: string;
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const cartIconRef = useRef<HTMLDivElement>(null);

  const addToCart = (product: Product, event: React.MouseEvent | React.PointerEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const targetRect = cartIconRef.current?.getBoundingClientRect();

    if (targetRect) {
      const newItem: FlyingItem = {
        id: Date.now(),
        startX: rect.left + rect.width / 2,
        startY: rect.top + rect.height / 2,
        endX: targetRect.left + targetRect.width / 2,
        endY: targetRect.top + targetRect.height / 2,
        image: product.image
      };
      setFlyingItems(prev => [...prev, newItem]);

      setTimeout(() => {
        setFlyingItems(prev => prev.filter(item => item.id !== newItem.id));
        setCartItems(prev => {
          const existing = prev.find(item => item.id === product.id);
          if (existing) {
            toast.success(`تم التحديث: ${product.name}`, {
              description: "تمت زيادة الكمية في حقيبتك بنجاح.",
            });
            return prev.map(item => 
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
          }
          toast.success(`تم الإضافة: ${product.name}`, {
            description: "تمت إضافة المنتج إلى حقيبتك بنجاح.",
          });
          return [...prev, { ...product, quantity: 1 }];
        });
      }, 700);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => {
      const item = prev.find(i => i.id === id);
      if (item) {
        toast.error(`تم الحذف: ${item.name}`, {
          description: "تمت إزالة المنتج من حقيبتك.",
        });
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        if (newQty !== item.quantity) {
           // Silently update or show subtle toast if needed, but let's keep it clean
        }
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const clearCart = () => setCartItems([]);

  return (
    <Router>
      <AuthProvider>
        <AppContent 
          PRODUCTS={PRODUCTS}
          cartItems={cartItems}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          clearCart={clearCart}
          cartCount={cartCount}
          cartTotal={cartTotal}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          flyingItems={flyingItems}
          cartIconRef={cartIconRef}
        />
      </AuthProvider>
    </Router>
  );
}

function AppContent({ 
  PRODUCTS, cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
  cartCount, cartTotal, isCartOpen, setIsCartOpen, flyingItems, cartIconRef 
}: any) {
  const { user, profile, loginWithGoogle, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
      <div className="min-h-screen flex flex-col font-sans bg-dark-bg text-white" dir="rtl">
        <Toaster position="top-right" theme="dark" closeButton richColors />
        <div className="fixed left-8 bottom-32 vertical-text text-[10px] tracking-[4px] text-white/30 hidden lg:block z-40">
          نظام تجارة حديث ٢٠٢٦
        </div>

        <nav className="relative z-50 mx-auto w-[95%] max-w-7xl pt-4">
          <div className="relative group">
            {/* Curved Glow Background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-orange-500/10 to-primary/20 rounded-[32px] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-dark-bg/40 backdrop-blur-2xl border border-white/10 rounded-[28px] px-8 md:px-12 h-20 flex items-center justify-between shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
              {/* Modern Curved Decorative Lines inside Nav */}
              <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
              
              <div className="flex items-center gap-12">
                <div className="flex items-center gap-6 text-[12px] font-black uppercase tracking-[1px] text-white">
                  <NavLink to="/" className={({ isActive }) => `mr-[-22px] ${isActive ? "text-primary relative py-1" : "hover:text-primary transition-colors py-1"}`}>
                    الرئيسية
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary scale-x-0 transition-transform origin-right group-hover:scale-x-100"></div>
                  </NavLink>
                  <NavLink to="/products" className={({ isActive }) => isActive ? "text-primary transition-colors" : "hover:text-primary transition-colors"}>المنتجات</NavLink>
                  <NavLink to="/offers" className={({ isActive }) => isActive ? "text-primary transition-colors" : "hover:text-primary transition-colors"}>العروض</NavLink>
                  <NavLink to="/contact" className={({ isActive }) => isActive ? "text-primary transition-colors" : "hover:text-primary transition-colors"}>تواصل معنا</NavLink>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {/* Auth Button */}
                {user ? (
                  <div className="relative">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                      className="mr-[25px] flex items-center gap-2 bg-white/5 pl-4 pr-1 py-1 border border-white/10 rounded-full cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary to-orange-400 flex items-center justify-center text-black shadow-lg">
                        <UserIcon size={12} />
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest hidden lg:block">
                        {profile?.displayName || user.displayName}
                      </span>
                    </motion.div>
                    <AnimatePresence>
                      {isProfileMenuOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-14 left-0 w-48 bg-[#1A1A1A] border border-white/10 rounded-2xl shadow-2xl p-2 z-50"
                        >
                          <button 
                            onClick={() => { setIsProfileMenuOpen(false); navigate('/profile'); }}
                            className="w-full text-right p-3 hover:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-[2px] transition-colors"
                          >
                            عرض الملف الشخصي
                          </button>
                          <button 
                            onClick={() => {
                              setIsProfileMenuOpen(false);
                              logout().then(() => {
                                 toast.success("تم تسجيل الخروج بنجاح");
                              });
                              navigate('/');
                            }}
                            className="w-full text-right p-3 hover:bg-red-500/10 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-[2px] transition-colors"
                          >
                            تسجيل الخروج
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/auth')}
                    className="flex items-center gap-2 px-6 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-[2px] rounded-full hover:bg-primary transition-colors mr-4 md:mr-0"
                  >
                    <UserIcon size={14} />
                    <span className="hidden sm:inline">تسجيل الدخول</span>
                  </motion.button>
                )}

                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  className="mr-[19px] p-2 text-white/50 hover:text-white transition-colors hidden sm:flex"
                >
                  <Search size={20} className="pb-0" />
                </motion.button>
                
              </div>
            </div>
          </div>
        </nav>
        
        {/* Floating Cart Button */}
        <motion.button 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-24 right-6 z-[150] w-14 h-14 bg-primary text-black rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(255,122,0,0.4)] border-4 border-[#0c0c0c]"
        >
          <ShoppingBag size={24} className="stroke-[2.5px]" />
          <AnimatePresence>
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#0c0c0c]"
              >
                {cartCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
        
        <main className="flex-grow">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home products={PRODUCTS} onAddToCart={addToCart} onViewDetails={handleViewDetails} cartCount={cartCount} />} />
              <Route path="/products" element={<ProductsPage products={PRODUCTS} onAddToCart={addToCart} onViewDetails={handleViewDetails} />} />
              <Route path="/offers" element={<OffersPage products={PRODUCTS} onAddToCart={addToCart} onViewDetails={handleViewDetails} />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} total={cartTotal} clearCart={clearCart} />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminPage />} />
              {/* Catch-all route to prevent 404 pages */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>

        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={addToCart} 
        />

        <footer className="bg-black text-white/40 py-12">
          <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <Link to="/" className="text-xl font-black text-white uppercase tracking-tighter">
                B-Five
              </Link>
              {/* Desktop Footer Links */}
              <div className="hidden md:flex flex-col items-start gap-2 text-[11px] font-bold uppercase tracking-widest pl-8">
                <Link to="/" className="hover:text-primary transition-colors py-1">الرئيسية</Link>
                <Link to="/products" className="hover:text-primary transition-colors py-1">المنتجات</Link>
                <Link to="/offers" className="hover:text-primary transition-colors py-1">العروض</Link>
                <Link to="/contact" className="hover:text-primary transition-colors py-1">تواصل معنا</Link>
              </div>

              {/* Mobile/Tablet Footer Icons */}
              <div className="md:hidden flex items-center justify-around w-full gap-4 text-[9px] font-bold uppercase tracking-widest">
                <Link to="/" className="flex flex-col items-center gap-1 hover:text-primary transition-colors">
                  <div className="p-2 bg-white/5 rounded-full"><HomeIcon size={16} /></div>
                  <span>الرئيسية</span>
                </Link>
                <Link to="/products" className="flex flex-col items-center gap-1 hover:text-primary transition-colors">
                  <div className="p-2 bg-white/5 rounded-full"><ShoppingBag size={16} /></div>
                  <span>المنتجات</span>
                </Link>
                <Link to="/offers" className="flex flex-col items-center gap-1 hover:text-primary transition-colors">
                  <div className="p-2 bg-white/5 rounded-full"><Search size={16} /></div>
                  <span>العروض</span>
                </Link>
                <Link to="/contact" className="flex flex-col items-center gap-1 hover:text-primary transition-colors">
                  <div className="p-2 bg-white/5 rounded-full"><UserIcon size={16} /></div>
                  <span>تواصل</span>
                </Link>
              </div>
              <p className="max-w-xs text-[10px] leading-relaxed uppercase tracking-wider mt-4">
                نظام تجارة حديث مصمم للسرعة والأداء العالي.
              </p>
            </div>
            
            <div className="text-[10px] font-bold uppercase tracking-[2px]">
              <div>© ٢٠٢٦ B-Five</div>
            </div>
          </div>
        </footer>

        <CartDrawer 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          count={cartCount}
          total={cartTotal}
        />

        <div className="fixed inset-0 pointer-events-none z-[200]">
          <AnimatePresence>
            {flyingItems.map(item => (
              <motion.div
                key={item.id}
                initial={{ x: item.startX, y: item.startY, scale: 1, opacity: 1, rotate: 0 }}
                animate={{ 
                  x: item.endX, 
                  y: item.endY, 
                  scale: 0.1, 
                  opacity: 0,
                  rotate: 720,
                  transition: { duration: 0.7, ease: "circIn" }
                }}
                exit={{ opacity: 0 }}
                className="absolute top-0 left-0 w-16 h-16 pointer-events-none"
              >
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl ring-2 ring-primary bg-white">
                  <img src={item.image} alt="" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100]"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-full max-w-[320px] bg-[#0c0c0c] z-[110] p-10 flex flex-col border-l border-white/5 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-20">
                  <div className="text-xl font-black italic tracking-tighter uppercase text-primary">B-Five Elite</div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/30 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex flex-col gap-8 items-start pl-8">
                  {[
                    { label: 'الرئيسية', path: '/' },
                    { label: 'المنتجات', path: '/products' },
                    { label: 'العروض', path: '/offers' },
                    { label: 'تواصل معنا', path: '/contact' }
                  ].map((link, i) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <NavLink 
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) => 
                          `text-2xl font-black uppercase tracking-tighter transition-all ${isActive ? 'text-primary italic scale-105' : 'text-white/40 hover:text-white'}`
                        }
                      >
                        {link.label}
                      </NavLink>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto space-y-6">
                   <div className="h-[1px] bg-white/5 w-full" />
                   <p className="text-[10px] text-white/20 font-black uppercase tracking-[4px] leading-relaxed">
                     نظام تجارة حديث مصمم للمستقبل. تجربة عالمية بين يديك.
                   </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
  );
}
