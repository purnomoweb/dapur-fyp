import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, category?: string) => void;
}

type ModalType = 'disclaimer' | 'privasi' | 'syarat' | null;

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <footer className="bg-[#0e0f12] border-t border-[#262830] mt-16 text-xs text-[#a1a1aa] no-print">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            {/* Brand Info */}
            <div className="space-y-2">
              <span className="text-base font-bold text-[#ededef]">DapurFYP</span>
              <p className="text-xs text-[#71717a] leading-relaxed">
                Koleksi resep masakan viral media sosial dengan rangkuman bahan, cara pembuatan, dan catatan penting.
              </p>
            </div>

            {/* Jelajah Kategori */}
            <div className="space-y-2">
              <div className="font-semibold text-[#ededef] text-xs">
                Jelajah Kategori
              </div>
              <ul className="space-y-1.5 text-xs text-[#9ca3af]">
                <li>
                  <button
                    onClick={() => onNavigate('jelajah', 'makanan-utama')}
                    className="hover:text-[#f59e0b] transition-colors cursor-pointer text-left"
                  >
                    Makanan Utama
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('jelajah', 'minuman-kekinian')}
                    className="hover:text-[#f59e0b] transition-colors cursor-pointer text-left"
                  >
                    Minuman Kekinian
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('jelajah', 'cemilan-jajanan')}
                    className="hover:text-[#f59e0b] transition-colors cursor-pointer text-left"
                  >
                    Cemilan & Jajanan
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('jelajah', 'kue-dessert')}
                    className="hover:text-[#f59e0b] transition-colors cursor-pointer text-left"
                  >
                    Kue & Dessert
                  </button>
                </li>
              </ul>
            </div>

            {/* Informasi & Kebijakan */}
            <div className="space-y-2">
              <div className="font-semibold text-[#ededef] text-xs">
                Informasi & Legal
              </div>
              <ul className="space-y-1.5 text-xs text-[#9ca3af]">
                <li>
                  <button
                    onClick={() => onNavigate('kebutuhan')}
                    className="hover:text-[#f59e0b] transition-colors cursor-pointer text-left"
                  >
                    Kebutuhan Dapur
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('tentang')}
                    className="hover:text-[#f59e0b] transition-colors cursor-pointer text-left"
                  >
                    Tentang DapurFYP
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('disclaimer')}
                    className="hover:text-[#f59e0b] transition-colors cursor-pointer text-left"
                  >
                    Disclaimer
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('privasi')}
                    className="hover:text-[#f59e0b] transition-colors cursor-pointer text-left"
                  >
                    Kebijakan Privasi
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('syarat')}
                    className="hover:text-[#f59e0b] transition-colors cursor-pointer text-left"
                  >
                    Syarat & Ketentuan
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar (Bagian berlebihan & label takaran dihapus) */}
          <div className="pt-6 border-t border-[#262830] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#71717a]">
            <div>
              &copy; {new Date().getFullYear()} DapurFYP. Blog resep viral sosial media.
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveModal('disclaimer')}
                className="hover:text-[#ededef] transition-colors cursor-pointer"
              >
                Disclaimer
              </button>
              <span>·</span>
              <button
                onClick={() => setActiveModal('privasi')}
                className="hover:text-[#ededef] transition-colors cursor-pointer"
              >
                Kebijakan Privasi
              </button>
              <span>·</span>
              <button
                onClick={() => setActiveModal('syarat')}
                className="hover:text-[#ededef] transition-colors cursor-pointer"
              >
                Syarat & Ketentuan
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* POPUP MODAL: Disclaimer, Kebijakan Privasi, Syarat & Ketentuan */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 bg-[#000000]/80 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-[#181a1f] border border-[#262830] rounded-none max-w-lg w-full p-6 relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-1 text-[#9ca3af] hover:text-[#ededef] transition-colors cursor-pointer"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'disclaimer' && (
              <div>
                <h3 className="text-base font-bold text-[#ededef] mb-3 pb-2 border-b border-[#262830]">
                  Disclaimer (Penafian)
                </h3>
                <div className="text-xs text-[#a1a1aa] leading-relaxed space-y-3">
                  <p>
                    Website <strong className="text-[#ededef]">DapurFYP</strong> merupakan media blog kurasi yang merangkum aneka resep masakan yang sedang populer atau viral di berbagai platform sosial media (seperti TikTok, Instagram, dan YouTube).
                  </p>
                  <p>
                    Seluruh informasi bahan dan cara pembuatan disajikan untuk tujuan referensi dan inspirasi memasak rumahan semata. Hasil akhir masakan dapat bervariasi bergantung pada kualitas bahan, jenis kompor, pengaturan api, serta peralatan yang digunakan oleh masing-masing individu.
                  </p>
                  <p>
                    Tautan pada halaman Kebutuhan Dapur merupakan tautan rekomendasi yang mengarah ke platform marketplace eksternal. DapurFYP tidak memiliki kendali langsung atas transaksi jual beli, pengiriman barang, atau ketersediaan stok pada platform pihak ketiga tersebut.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'privasi' && (
              <div>
                <h3 className="text-base font-bold text-[#ededef] mb-3 pb-2 border-b border-[#262830]">
                  Kebijakan Privasi
                </h3>
                <div className="text-xs text-[#a1a1aa] leading-relaxed space-y-3">
                  <p>
                    Privasi pengunjung adalah hal yang sangat kami hargai di <strong className="text-[#ededef]">DapurFYP</strong>.
                  </p>
                  <p>
                    Blog ini tidak mengumpulkan data pribadi sensitif seperti nama lengkap, nomor telepon, atau data keuangan Anda. Situs ini hanya menggunakan penyimpanan browser lokal standar untuk kenyamanan navigasi dan riwayat pencarian resep pada perangkat Anda.
                  </p>
                  <p>
                    Situs ini dapat memuat tautan menuju situs atau marketplace pihak ketiga. Kebijakan privasi pihak ketiga tersebut berada di luar wewenang kami, dan kami menyarankan Anda meninjau kebijakan privasi masing-masing situs yang Anda kunjungi.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'syarat' && (
              <div>
                <h3 className="text-base font-bold text-[#ededef] mb-3 pb-2 border-b border-[#262830]">
                  Syarat & Ketentuan
                </h3>
                <div className="text-xs text-[#a1a1aa] leading-relaxed space-y-3">
                  <p>
                    Dengan mengakses dan menggunakan situs <strong className="text-[#ededef]">DapurFYP</strong>, Anda menyetujui ketentuan berikut:
                  </p>
                  <p>
                    1. Seluruh resep dan konten di blog ini disediakan untuk penggunaan pribadi dan non-komersial.
                  </p>
                  <p>
                    2. Rangkuman teks artikel ditulis secara independen oleh tim DapurFYP berdasarkan tren resep yang beredar di media sosial.
                  </p>
                  <p>
                    3. Dilarang melakukan scraping otomatis atau memperbanyak konten situs secara massal untuk tujuan komersial tanpa izin tertulis dari pihak pengelola situs.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 pt-3 border-t border-[#262830] flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-1.5 text-xs font-medium bg-[#202228] text-[#ededef] hover:bg-[#282a32] border border-[#262830] rounded-none cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
