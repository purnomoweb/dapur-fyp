import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown, Menu } from 'lucide-react';
import { Recipe } from '../data/recipes';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, category?: string) => void;
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  recipes,
  onSelectRecipe,
  searchQuery,
  onSearchChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut '/' or 'Ctrl+K' / 'Cmd+K' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape') {
        setIsSearchFocused(false);
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter recipes for the live search dropdown
  const filteredSearchRecipes = searchQuery.trim()
    ? recipes.filter((r) => {
        const q = searchQuery.toLowerCase();
        const inTitle = r.title.toLowerCase().includes(q);
        const inCategory = r.categoryLabel.toLowerCase().includes(q);
        const inSummary = r.summary.toLowerCase().includes(q);
        const inTags = r.tags.some((t) => t.toLowerCase().includes(q));
        const inIngredients = r.ingredientGroups.some((g) =>
          g.items.some((i) => i.toLowerCase().includes(q))
        );
        return inTitle || inCategory || inSummary || inTags || inIngredients;
      })
    : [];

  const handleSelectSearchResult = (recipe: Recipe) => {
    onSelectRecipe(recipe);
    setIsSearchFocused(false);
    onSearchChange('');
    searchInputRef.current?.blur();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#121316] border-b border-[#262830]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Zone 1: Wordmark Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('jelajah', 'semua')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold tracking-tight text-[#ededef] group-hover:text-[#f59e0b] transition-colors">
                  DapurFYP
                </span>
                <span className="text-xs font-medium text-[#71717a] hidden sm:inline">
                  · Resep Viral
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Global Search Bar in Header (border radius 0) */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-sm mx-2">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-[#71717a] pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Cari resep viral, bahan, bumbu... (/)"
                className="w-full bg-[#181a1f] text-[#ededef] placeholder-[#71717a] text-xs pl-9 pr-8 py-2 rounded-none border border-[#262830] focus:border-[#f59e0b] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    onSearchChange('');
                    searchInputRef.current?.focus();
                  }}
                  className="absolute right-2.5 p-1 text-[#9ca3af] hover:text-[#ededef]"
                  title="Hapus pencarian"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Instant Search Results Dropdown (border-radius 0) */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-[#181a1f] border border-[#262830] rounded-none shadow-2xl overflow-hidden z-50">
                <div className="px-3 py-2 text-xs font-medium text-[#9ca3af] border-b border-[#262830] flex items-center justify-between">
                  <span>Hasil ({filteredSearchRecipes.length})</span>
                  <span className="text-[10px] text-[#71717a]">ESC untuk tutup</span>
                </div>

                {filteredSearchRecipes.length > 0 ? (
                  <div className="max-h-72 overflow-y-auto divide-y divide-[#262830]">
                    {filteredSearchRecipes.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => handleSelectSearchResult(r)}
                        className="w-full text-left px-3 py-2.5 hover:bg-[#202228] transition-colors flex items-start gap-3 cursor-pointer group rounded-none"
                      >
                        <img
                          src={r.image}
                          alt={r.title}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 object-cover rounded-none bg-[#262830] shrink-0 border border-[#262830]"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] text-[#f59e0b] font-medium truncate">
                            {r.categoryLabel}
                          </div>
                          <div className="text-xs font-semibold text-[#ededef] group-hover:text-[#f59e0b] transition-colors truncate">
                            {r.title}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-5 text-center text-xs text-[#9ca3af]">
                    Tidak ditemukan resep untuk &quot;{searchQuery}&quot;.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Zone 3: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-[#a1a1aa] shrink-0">
            {/* Jelajah Dapur with Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-1 py-1 transition-colors hover:text-[#ededef] ${
                  currentView === 'jelajah' ? 'text-[#ededef] font-semibold' : ''
                }`}
              >
                <span>Jelajah Dapur</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#181a1f] border border-[#262830] rounded-none shadow-xl py-1 z-50">
                  <button
                    onClick={() => {
                      onNavigate('jelajah', 'semua');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-[#ededef] hover:bg-[#202228] transition-colors rounded-none"
                  >
                    Semua Resep
                  </button>
                  <div className="h-px bg-[#262830] my-1" />
                  <button
                    onClick={() => {
                      onNavigate('jelajah', 'makanan-utama');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-[#d1d5db] hover:text-[#ededef] hover:bg-[#202228] transition-colors rounded-none"
                  >
                    Makanan Utama
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('jelajah', 'minuman-kekinian');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-[#d1d5db] hover:text-[#ededef] hover:bg-[#202228] transition-colors rounded-none"
                  >
                    Minuman Kekinian
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('jelajah', 'cemilan-jajanan');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-[#d1d5db] hover:text-[#ededef] hover:bg-[#202228] transition-colors rounded-none"
                  >
                    Cemilan & Jajanan
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('jelajah', 'kue-dessert');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-[#d1d5db] hover:text-[#ededef] hover:bg-[#202228] transition-colors rounded-none"
                  >
                    Kue & Dessert
                  </button>
                </div>
              )}
            </div>

            {/* Kebutuhan Dapur */}
            <button
              onClick={() => onNavigate('kebutuhan')}
              className={`py-1 transition-colors hover:text-[#ededef] ${
                currentView === 'kebutuhan' ? 'text-[#ededef] font-semibold' : ''
              }`}
            >
              Kebutuhan Dapur
            </button>

            {/* Tentang */}
            <button
              onClick={() => onNavigate('tentang')}
              className={`py-1 transition-colors hover:text-[#ededef] ${
                currentView === 'tentang' ? 'text-[#ededef] font-semibold' : ''
              }`}
            >
              Tentang
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#9ca3af] hover:text-[#ededef] transition-colors rounded-none"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer (border-radius 0) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#262830] py-3 space-y-2">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#71717a] px-3 pt-1">
              Jelajah Kategori
            </div>
            <div className="grid grid-cols-2 gap-1 px-2">
              <button
                onClick={() => {
                  onNavigate('jelajah', 'semua');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 text-xs text-[#d1d5db] hover:bg-[#181a1f] hover:text-[#ededef] rounded-none"
              >
                Semua Resep
              </button>
              <button
                onClick={() => {
                  onNavigate('jelajah', 'makanan-utama');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 text-xs text-[#d1d5db] hover:bg-[#181a1f] hover:text-[#ededef] rounded-none"
              >
                Makanan Utama
              </button>
              <button
                onClick={() => {
                  onNavigate('jelajah', 'minuman-kekinian');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 text-xs text-[#d1d5db] hover:bg-[#181a1f] hover:text-[#ededef] rounded-none"
              >
                Minuman Kekinian
              </button>
              <button
                onClick={() => {
                  onNavigate('jelajah', 'cemilan-jajanan');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 text-xs text-[#d1d5db] hover:bg-[#181a1f] hover:text-[#ededef] rounded-none"
              >
                Cemilan & Jajanan
              </button>
              <button
                onClick={() => {
                  onNavigate('jelajah', 'kue-dessert');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 text-xs text-[#d1d5db] hover:bg-[#181a1f] hover:text-[#ededef] rounded-none"
              >
                Kue & Dessert
              </button>
            </div>

            <div className="h-px bg-[#262830] my-2" />

            <div className="px-2 space-y-1">
              <button
                onClick={() => {
                  onNavigate('kebutuhan');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs font-medium text-[#d1d5db] hover:bg-[#181a1f] hover:text-[#ededef] rounded-none"
              >
                Kebutuhan Dapur (Solusi Bumbu & Alat)
              </button>
              <button
                onClick={() => {
                  onNavigate('tentang');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs font-medium text-[#d1d5db] hover:bg-[#181a1f] hover:text-[#ededef] rounded-none"
              >
                Tentang DapurFYP
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
