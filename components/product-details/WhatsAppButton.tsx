'use client';

import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  productTitle: string;
  selectedVariants: Record<string, string>;
}

export function WhatsAppButton({ productTitle, selectedVariants }: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const variantsText = Object.entries(selectedVariants)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    const message = `Hi! I'm interested in the ${productTitle} with the following configuration: ${variantsText}. Could you please provide more information?`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-lg shadow-green-600/20"
    >
      <MessageCircle className="w-6 h-6" />
      <span>Contact Us on WhatsApp</span>
    </button>
  );
}
