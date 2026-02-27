import React from 'react';
import { useCartStore } from '@/app/store/useCartStore';

export default function Cartdrawer() {
    const { items, isOpen, setOpen, removeItem, updateQuantity, clearCart } = useCartStore();
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  return (
    <div>Cartdrawer</div>
  )
}
