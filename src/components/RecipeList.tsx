import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Recipe, CATEGORIES } from '../data/recipes';

interface RecipeListProps {
  recipes: Recipe[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  searchQuery: string;
  onClearSearch: () => void;
}

export const RecipeList: React.FC<RecipeListProps> = ({
  recipes,
  selectedCategory,
  onSelectCategory,
  onSelectRecipe,
  searchQuery,
  onClearSearch,
}) => {
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === 'semua' || recipe.category === selectedCategory;

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch =
      recipe.title.toLowerCase().includes(q) ||
      recipe.categoryLabel.toLowerCase().includes(q) ||
      recipe.summary.toLowerCase().includes(q) ||
      recipe.tags.some((t) => t.toLowerCase().includes(q)) ||
      recipe.ingredientGroups.some((g) =>
        g.items.some((i) => i.toLowerCase().includes(q))
      );

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Category Navigation (Border-radius 0) */}
      <nav aria-label="Kategori Resep" className="mb-8 border-b border-[#262830]">
        <div className="flex items-center overflow-x-auto pb-2 scrollbar-none gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border-b-2 rounded-none -mb-px ${
                  isActive
                    ? 'border-[#f59e0b] text-[#f59e0b] font-semibold'
                    : 'border-transparent text-[#9ca3af] hover:text-[#ededef]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Active Search Query Bar */}
      {searchQuery && (
        <div className="mb-6 p-3 bg-[#181a1f] border border-[#262830] rounded-none flex items-center justify-between text-xs text-[#d1d5db]">
          <div>
            Pencarian: <span className="text-[#f59e0b] font-medium">&quot;{searchQuery}&quot;</span>
            <span className="text-[#71717a] ml-2">({filteredRecipes.length} resep)</span>
          </div>
          <button
            onClick={onClearSearch}
            className="text-xs text-[#9ca3af] hover:text-[#ededef] underline cursor-pointer"
          >
            Hapus Pencarian
          </button>
        </div>
      )}

      {/* Daftar Artikel Resep dengan BORDER dan TANPA BORDER RADIUS (No portions, no minutes, no levels) */}
      {filteredRecipes.length > 0 ? (
        <section className="space-y-6" aria-label="Daftar Artikel Resep">
          {filteredRecipes.map((recipe) => (
            <article
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              className="bg-[#181a1f] border border-[#262830] rounded-none p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-start cursor-pointer hover:border-[#3f3f46] transition-colors group"
            >
              {/* Thumbnail (Border-radius 0) */}
              <div className="w-full sm:w-52 aspect-[4/3] bg-[#121316] border border-[#262830] shrink-0 overflow-hidden rounded-none">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-none group-hover:scale-102 transition-transform duration-300"
                />
              </div>

              {/* Recipe Meta & Excerpt */}
              <div className="flex-1 flex flex-col justify-between self-stretch">
                <div>
                  <div className="text-xs font-medium text-[#f59e0b] mb-1.5">
                    {recipe.categoryLabel}
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-[#ededef] group-hover:text-[#f59e0b] transition-colors leading-snug mb-2">
                    {recipe.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#9ca3af] line-clamp-2 leading-relaxed mb-4">
                    {recipe.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#262830] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#71717a]">{recipe.sourceViral}</span>
                  <span className="text-[#f59e0b] font-medium inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Baca Resep</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="py-12 text-center border border-[#262830] rounded-none bg-[#181a1f]">
          <p className="text-sm font-semibold text-[#ededef] mb-1">
            Tidak ada resep yang ditemukan
          </p>
          <p className="text-xs text-[#71717a] mb-4">
            Silakan coba kata kunci lain atau pilih Semua Kategori.
          </p>
          <button
            onClick={() => {
              onClearSearch();
              onSelectCategory('semua');
            }}
            className="px-4 py-2 bg-[#f59e0b] text-[#121316] font-semibold text-xs rounded-none hover:bg-[#d97706] transition-colors cursor-pointer"
          >
            Lihat Semua Resep
          </button>
        </div>
      )}
    </div>
  );
};
