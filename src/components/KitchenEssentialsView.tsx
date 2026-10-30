import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { KITCHEN_PRODUCTS, KitchenProduct } from '../data/kitchenEssentials';

export const KitchenEssentialsView: React.FC = () => {
  const handleProductClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-[#262830]">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#ededef] mb-2">
          Kebutuhan Dapur
        </h1>
        <p className="text-xs sm:text-sm text-[#9ca3af]">
          Rekomendasi bahan dan peralatan dapur untuk membuat resep viral sosial media.
        </p>
      </div>

      {/* Daftar Produk: 2 Kolom di Mobile, 3 Kolom di Desktop/PC/Tablet */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {KITCHEN_PRODUCTS.map((product: KitchenProduct) => (
          <a
            key={product.id}
            href={product.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#181a1f] border border-[#262830] rounded-none p-3 flex flex-col justify-between hover:border-[#f59e0b] transition-colors group cursor-pointer"
          >
            <div>
              {/* Thumbnail (Border-radius 0) */}
              <div className="w-full aspect-[4/3] bg-[#121316] border border-[#262830] overflow-hidden mb-3 rounded-none">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-none group-hover:scale-103 transition-transform duration-300"
                />
              </div>

              {/* Judul Saja (Tanpa Deskripsi) */}
              <h2 className="text-xs sm:text-sm font-semibold text-[#ededef] group-hover:text-[#f59e0b] transition-colors leading-snug">
                {product.name}
              </h2>
            </div>

            <div className="mt-3 pt-2 border-t border-[#262830] flex items-center justify-between text-[11px] text-[#9ca3af] group-hover:text-[#f59e0b] transition-colors">
              <span>Beli Produk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
