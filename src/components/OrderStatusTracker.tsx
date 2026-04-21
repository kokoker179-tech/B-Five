import React from 'react';
import { motion } from 'motion/react';
import { Check, Package, Truck, Clock } from 'lucide-react';
import { OrderStatus } from '../types';

interface StatusTrackerProps {
  status: OrderStatus;
}

const statusConfig: { label: string; icon: React.ReactNode }[] = [
  { label: 'قيد المراجعة', icon: <Clock size={20} /> },
  { label: 'جاري التجهيز', icon: <Package size={20} /> },
  { label: 'تم الشحن', icon: <Truck size={20} /> },
  { label: 'تم التوصيل', icon: <Check size={20} /> },
];

const statusMap: Record<OrderStatus, number> = {
  pending: 0,
  processing: 1,
  shipped: 2,
  delivered: 3,
};

export const OrderStatusTracker: React.FC<StatusTrackerProps> = ({ status }) => {
  const currentStep = statusMap[status];

  return (
    <div className="w-full py-10">
      <div className="relative flex justify-between items-center max-w-2xl mx-auto">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 z-0" />
        <motion.div 
          className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / 3) * 100}%` }}
          transition={{ duration: 0.5 }}
        />

        {statusConfig.map((step, index) => (
          <div key={step.label} className="relative z-10 flex flex-col items-center gap-3">
            <motion.div
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                index <= currentStep 
                  ? 'bg-primary border-primary text-black' 
                  : 'bg-[#1A1A1A] border-white/20 text-white/40'
              }`}
              initial={{ scale: 0.8 }}
              animate={{ scale: index === currentStep ? 1.1 : 1 }}
            >
              {step.icon}
            </motion.div>
            <span className={`text-[10px] font-black uppercase tracking-[2px] ${
              index <= currentStep ? 'text-white' : 'text-white/40'
            }`}>
              {step.label}
            </span>
            <span className="text-[8px] font-bold text-white/20 tracking-widest">
              {index <= currentStep ? 'تم' : '--:--'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
