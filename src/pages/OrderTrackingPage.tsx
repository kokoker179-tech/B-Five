import React from 'react';
import { motion } from 'motion/react';
import { OrderStatusTracker } from '../components/OrderStatusTracker';
import { Order } from '../types';

// Mock function - in a real app this would fetch the order from firestore
const getMockOrder = (): Order => ({
  id: 'B5-8829-XJ',
  userId: 'user123',
  items: [],
  total: 4500,
  status: 'shipped',
  createdAt: new Date(),
  address: 'القاهرة، الزمالك، شارع التجربة'
});

export const OrderTrackingPage: React.FC = () => {
  const order = getMockOrder(); // For now

  return (
    <div className="min-h-screen py-32 px-6 bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0F0F0F] rounded-[40px] p-8 md:p-12 border border-white/10"
        >
          <div className="flex justify-between items-start mb-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[4px] text-primary mb-2">رقم الطلب</p>
              <h1 className="text-3xl md:text-5xl font-black">{order.id}</h1>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-[4px] text-white/40 mb-2">التاريخ</p>
              <p className="text-lg font-bold">{order.createdAt.toLocaleDateString('ar-EG')}</p>
            </div>
          </div>

          <OrderStatusTracker status={order.status} />

          <div className="mt-12 pt-12 border-t border-white/10 space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 rounded-2xl p-6">
                <p className="text-[10px] font-black uppercase tracking-[4px] text-white/40 mb-2">عنوان التوصيل</p>
                <p className="text-sm font-bold leading-relaxed">{order.address}</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6">
                <p className="text-[10px] font-black uppercase tracking-[4px] text-white/40 mb-2">إجمالي الطلب</p>
                <p className="text-2xl font-black text-primary tracking-tighter">{order.total} ج.م</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
