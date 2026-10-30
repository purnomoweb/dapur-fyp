import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, ArrowUp, Share2, Check, Copy, X } from 'lucide-react';
import { Recipe } from '../data/recipes';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({
  recipe,
  onBack,
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll to top when recipe loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [recipe.id]);

  // Track scroll position for 'Scroll ke atas' (Back to top) button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync page metadata (title, description, canonical, OpenGraph) and inject Recipe Schema.org JSON-LD
  useEffect(() => {
    // 1. Update Document Title
    const originalTitle = document.title;
    document.title = `${recipe.title} – Resep Viral DapurFYP`;

    // 2. Helper to set or update meta tag content
    const setMetaTag = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          const name = selector.match(/meta\[name="([^"]+)"\]/)?.[1];
          if (name) el.setAttribute('name', name);
        } else if (selector.startsWith('meta[property=')) {
          const prop = selector.match(/meta\[property="([^"]+)"\]/)?.[1];
          if (prop) el.setAttribute('property', prop);
        }
        document.head.appendChild(el);
      }
      const prevVal = el.getAttribute(attr);
      el.setAttribute(attr, value);
      return () => {
        if (prevVal !== null) {
          el?.setAttribute(attr, prevVal);
        }
      };
    };

    // Helper for canonical link
    const originalCanonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || 'https://purnomoweb.github.io/dapurfyp/';
    const currentUrl = `https://purnomoweb.github.io/dapurfyp/#resep/${recipe.slug}`;
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', currentUrl);
    }

    const restoreDesc = setMetaTag('meta[name="description"]', 'content', recipe.summary);
    const restoreOgTitle = setMetaTag('meta[property="og:title"]', 'content', `${recipe.title} – Resep Viral DapurFYP`);
    const restoreOgDesc = setMetaTag('meta[property="og:description"]', 'content', recipe.summary);
    const restoreOgUrl = setMetaTag('meta[property="og:url"]', 'content', currentUrl);
    const restoreTwTitle = setMetaTag('meta[name="twitter:title"]', 'content', `${recipe.title} – Resep Viral DapurFYP`);
    const restoreTwDesc = setMetaTag('meta[name="twitter:description"]', 'content', recipe.summary);

    // 3. Inject Google Recipe Schema.org JSON-LD dynamically for Google Search indexing
    const scriptId = 'dynamic-recipe-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const flatIngredients = recipe.ingredientGroups.flatMap((group) => group.items);

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      'name': recipe.title,
      'description': recipe.summary,
      'image': [window.location.origin + recipe.image],
      'recipeCategory': recipe.categoryLabel,
      'recipeIngredient': flatIngredients,
      'recipeInstructions': recipe.instructions.map((step) => ({
        '@type': 'HowToStep',
        'position': step.stepNumber,
        'name': step.title,
        'text': step.description,
      })),
      'author': {
        '@type': 'Organization',
        'name': 'DapurFYP',
        'url': 'https://purnomoweb.github.io/dapurfyp/',
      },
    };

    scriptTag.textContent = JSON.stringify(schemaData);

    return () => {
      document.title = originalTitle;
      if (canonicalLink) {
        canonicalLink.setAttribute('href', originalCanonical);
      }
      restoreDesc();
      restoreOgTitle();
      restoreOgDesc();
      restoreOgUrl();
      restoreTwTitle();
      restoreTwDesc();
      const tag = document.getElementById(scriptId);
      if (tag) tag.remove();
    };
  }, [recipe]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get current recipe URL
  const getShareUrl = () => {
    return window.location.href;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getShareUrl());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleNativeOrModalShare = async () => {
    const shareData = {
      title: recipe.title,
      text: `${recipe.title} - Resep Masakan Viral di DapurFYP`,
      url: getShareUrl(),
    };

    if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to modal if cancelled or unsupported
      }
    }
    setIsShareModalOpen(true);
  };

  const shareUrl = encodeURIComponent(getShareUrl());
  const shareText = encodeURIComponent(`${recipe.title} - Resep Masakan Viral`);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 relative">
      {/* Tombol Navigasi Atas & Tombol Bagikan */}
      <div className="mb-6 pb-4 border-b border-[#262830] flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs text-[#9ca3af] hover:text-[#ededef] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Jelajah Dapur</span>
        </button>

        <button
          onClick={handleNativeOrModalShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#ededef] bg-[#181a1f] hover:bg-[#202228] border border-[#262830] hover:border-[#f59e0b] rounded-none transition-colors cursor-pointer"
          title="Bagikan resep ini"
        >
          <Share2 className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span>Bagikan</span>
        </button>
      </div>

      {/* Header Artikel */}
      <header className="mb-8">
        <div className="text-xs font-semibold text-[#f59e0b] mb-2 uppercase tracking-wide">
          {recipe.categoryLabel}
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#ededef] leading-tight mb-3">
          {recipe.title}
        </h1>

        <p className="text-sm text-[#9ca3af] leading-relaxed mb-6">
          {recipe.summary}
        </p>

        {/* Gambar Utama (Border radius 0) */}
        <div className="border border-[#262830] rounded-none overflow-hidden bg-[#181a1f]">
          <img
            src={recipe.image}
            alt={recipe.title}
            referrerPolicy="no-referrer"
            className="w-full h-64 sm:h-84 object-cover rounded-none"
          />
        </div>
      </header>

      {/* DAFTAR ISI (Klik otomatis smooth scroll ke ID tertentu) */}
      <nav aria-label="Daftar Isi" className="mb-10 p-4 border border-[#262830] rounded-none bg-[#16171b]">
        <div className="text-xs font-bold uppercase tracking-wider text-[#ededef] mb-2">
          Daftar Isi
        </div>
        <ol className="space-y-1 text-xs text-[#9ca3af]">
          {recipe.tableOfContents.map((toc, index) => (
            <li key={toc.id}>
              <a
                href={`#${toc.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo(toc.id);
                }}
                className="hover:text-[#f59e0b] transition-colors inline-flex items-baseline gap-2 py-0.5 cursor-pointer"
              >
                <span className="text-[#71717a] font-mono">{index + 1}.</span>
                <span>{toc.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* 1. BAHAN-BAHAN */}
      <section id="bahan" className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-[#ededef] tracking-tight pb-2 mb-5 border-b border-[#262830]">
          Bahan-Bahan
        </h2>

        <div className="space-y-5">
          {recipe.ingredientGroups.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#f59e0b]">
                {group.groupName}
              </h3>
              <ul className="space-y-1.5 pl-4 list-disc marker:text-[#71717a] text-xs sm:text-sm text-[#d1d5db]">
                {group.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 2. CARA PEMBUATAN */}
      <section id="cara-pembuatan" className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-[#ededef] tracking-tight pb-2 mb-5 border-b border-[#262830]">
          Cara Pembuatan
        </h2>

        <ol className="space-y-5 text-xs sm:text-sm text-[#d1d5db]">
          {recipe.instructions.map((step) => (
            <li key={step.stepNumber} className="space-y-1">
              <div className="font-semibold text-[#ededef]">
                {step.stepNumber}. {step.title}
              </div>
              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed pl-4">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* 3. CATATAN (WAJIB DIBACA) */}
      <section id="catatan" className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-[#ededef] tracking-tight pb-2 mb-4 border-b border-[#262830]">
          Catatan (Wajib Dibaca)
        </h2>

        <div className="p-4 border border-[#262830] bg-[#16171b] rounded-none space-y-3">
          {recipe.criticalNotes.map((note, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-xs sm:text-sm font-semibold text-[#fef3c7]">
                {idx + 1}. {note.title}
              </div>
              <p className="text-xs text-[#a1a1aa] leading-relaxed pl-3.5">
                {note.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. KEBUTUHAN DAPUR (Daftar produk, bentuknya teks link langsung ke tautan produk) */}
      <section id="kebutuhan-dapur" className="mb-12 scroll-mt-24 pt-2 border-t border-[#262830]">
        <h2 className="text-lg font-bold text-[#ededef] tracking-tight mb-2">
          Kebutuhan Dapur
        </h2>
        <p className="text-xs text-[#71717a] mb-4">
          Rekomendasi bahan dan perlengkapan untuk resep ini:
        </p>

        <ul className="space-y-2 text-xs sm:text-sm">
          {recipe.productLinks.map((prod, idx) => (
            <li key={idx}>
              <a
                href={prod.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f59e0b] hover:text-[#d97706] hover:underline cursor-pointer inline-flex items-center gap-1 transition-colors"
              >
                <span>{prod.productName}</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Tombol Bagikan di Bagian Bawah Artikel */}
      <div className="mt-8 pt-6 border-t border-[#262830] flex items-center justify-between">
        <span className="text-xs text-[#71717a]">Suka resep ini? Bagikan kepada teman atau keluarga:</span>
        <button
          onClick={handleNativeOrModalShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#ededef] bg-[#181a1f] hover:bg-[#202228] border border-[#262830] hover:border-[#f59e0b] rounded-none transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span>Bagikan Resep</span>
        </button>
      </div>

      {/* TOMBOL SCROLL KE ATAS (Back to Top) */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll ke atas"
          className="fixed bottom-6 right-6 z-40 p-3 bg-[#181a1f] text-[#ededef] hover:text-[#f59e0b] border border-[#262830] hover:border-[#f59e0b] rounded-none shadow-2xl transition-all cursor-pointer flex items-center justify-center group"
          title="Scroll ke atas"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* POPUP MODAL BAGIKAN */}
      {isShareModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#000000]/80 flex items-center justify-center p-4"
          onClick={() => setIsShareModalOpen(false)}
        >
          <div
            className="bg-[#181a1f] border border-[#262830] rounded-none max-w-sm w-full p-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-[#9ca3af] hover:text-[#ededef] transition-colors cursor-pointer"
              title="Tutup"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-sm font-bold text-[#ededef] mb-1">
              Bagikan Resep
            </h3>
            <p className="text-xs text-[#71717a] mb-4">
              {recipe.title}
            </p>

            {/* Salin Tautan Langsung */}
            <div className="mb-4">
              <label className="text-[11px] text-[#9ca3af] block mb-1.5">
                Salin Tautan:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={getShareUrl()}
                  className="w-full bg-[#121316] text-[#ededef] text-xs px-2.5 py-1.5 border border-[#262830] rounded-none focus:outline-none select-all"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 bg-[#202228] text-[#ededef] hover:bg-[#282a32] border border-[#262830] rounded-none text-xs font-medium flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#10b981]" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#9ca3af]" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Pilihan Media Sosial */}
            <div className="space-y-2 pt-2 border-t border-[#262830]">
              <div className="text-[11px] text-[#9ca3af] mb-1">
                Kirim langsung ke:
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* WhatsApp */}
                <a
                  href={`https://api.whatsapp.com/send?text=${shareText}%0A${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-[#121316] hover:bg-[#202228] border border-[#262830] text-[#ededef] hover:text-[#f59e0b] rounded-none flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3 h-3 text-[#71717a]" />
                </a>

                {/* Twitter / X */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-[#121316] hover:bg-[#202228] border border-[#262830] text-[#ededef] hover:text-[#f59e0b] rounded-none flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>X (Twitter)</span>
                  <ArrowUpRight className="w-3 h-3 text-[#71717a]" />
                </a>

                {/* Telegram */}
                <a
                  href={`https://t.me/share/url?url=${shareUrl}&text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-[#121316] hover:bg-[#202228] border border-[#262830] text-[#ededef] hover:text-[#f59e0b] rounded-none flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Telegram</span>
                  <ArrowUpRight className="w-3 h-3 text-[#71717a]" />
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-[#121316] hover:bg-[#202228] border border-[#262830] text-[#ededef] hover:text-[#f59e0b] rounded-none flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Facebook</span>
                  <ArrowUpRight className="w-3 h-3 text-[#71717a]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
