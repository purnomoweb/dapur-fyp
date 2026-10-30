import React from 'react';
import { BookOpen, Sparkles, ChefHat } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <section className="mb-8 pb-6 border-b border-[#262830]">
        <div className="text-xs font-semibold text-[#f59e0b] tracking-wider uppercase mb-2">
          Tentang DapurFYP
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#ededef] mb-3">
          Koleksi Resep Masakan Viral Medsos
        </h1>
        <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
          DapurFYP adalah blog sederhana yang merangkum berbagai resep masakan yang sedang tren dan viral di media sosial.
        </p>
      </section>

      {/* Deskripsi Blog */}
      <section className="mb-8 pb-6 border-b border-[#262830] space-y-3 text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
        <p>
          Banyak resep menarik berseliweran di linimasa TikTok, Instagram Reels, maupun YouTube Shorts. Kami merangkum resep-resep populer tersebut ke dalam bentuk teks yang terstruktur agar mudah dibaca kapan saja saat Anda ingin memasak di rumah.
        </p>
        <p>
          Setiap artikel berfokus pada tiga bagian utama: <strong className="text-[#ededef]">bahan-bahan</strong>, <strong className="text-[#ededef]">cara pembuatan</strong>, dan <strong className="text-[#ededef]">catatan penting</strong> untuk diperhatikan saat mencoba memasak di rumah.
        </p>
      </section>

      {/* Poin Utama */}
      <section className="mb-8 pb-6 border-b border-[#262830]">
        <h2 className="text-xs font-bold text-[#71717a] uppercase tracking-wide mb-4">
          Fokus DapurFYP
        </h2>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="flex items-start gap-3">
            <BookOpen className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[#ededef]">Format Ringkas & Jelas</div>
              <p className="text-xs text-[#9ca3af] mt-0.5">
                Menyajikan daftar bahan dan tahapan memasak tanpa berbelit-belit.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[#ededef]">Resep Populer Sosial Media</div>
              <p className="text-xs text-[#9ca3af] mt-0.5">
                Mengumpulkan aneka masakan, minuman, cemilan, dan dessert yang banyak dicari warganet.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ChefHat className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[#ededef]">Catatan Praktis</div>
              <p className="text-xs text-[#9ca3af] mt-0.5">
                Poin-poin penting yang perlu diperhatikan agar masakan berhasil saat dicoba.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
