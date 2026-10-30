import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { RecipeList } from './components/RecipeList';
import { RecipeDetail } from './components/RecipeDetail';
import { KitchenEssentialsView } from './components/KitchenEssentialsView';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';
import { RECIPES_DATA, Recipe } from './data/recipes';

export default function App() {
  const [currentView, setCurrentView] = useState<'jelajah' | 'kebutuhan' | 'tentang' | 'detail'>('jelajah');
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle URL hash changes for deep linking (e.g. #resep/mie-jebew-garut)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('resep/')) {
        const slug = hash.replace('resep/', '');
        const matched = RECIPES_DATA.find((r) => r.slug === slug || r.id === slug);
        if (matched) {
          setActiveRecipe(matched);
          setCurrentView('detail');
          return;
        }
      }
      if (hash === 'kebutuhan') {
        setCurrentView('kebutuhan');
        setActiveRecipe(null);
      } else if (hash === 'tentang') {
        setCurrentView('tentang');
        setActiveRecipe(null);
      } else if (hash.startsWith('kategori/')) {
        const cat = hash.replace('kategori/', '');
        setSelectedCategory(cat);
        setCurrentView('jelajah');
        setActiveRecipe(null);
      } else {
        setCurrentView('jelajah');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: string, category?: string) => {
    if (view === 'jelajah') {
      setCurrentView('jelajah');
      setActiveRecipe(null);
      if (category) {
        setSelectedCategory(category);
        window.location.hash = category === 'semua' ? 'jelajah' : `kategori/${category}`;
      } else {
        window.location.hash = 'jelajah';
      }
    } else if (view === 'kebutuhan') {
      setCurrentView('kebutuhan');
      setActiveRecipe(null);
      window.location.hash = 'kebutuhan';
    } else if (view === 'tentang') {
      setCurrentView('tentang');
      setActiveRecipe(null);
      window.location.hash = 'tentang';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    setActiveRecipe(recipe);
    setCurrentView('detail');
    window.location.hash = `resep/${recipe.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setCurrentView('jelajah');
    setActiveRecipe(null);
    window.location.hash = selectedCategory === 'semua' ? 'jelajah' : `kategori/${selectedCategory}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && currentView !== 'jelajah' && currentView !== 'detail') {
      setCurrentView('jelajah');
    }
  };

  return (
    <div className="min-h-screen bg-[#121316] text-[#ededef] flex flex-col font-['Lexend',sans-serif]">
      {/* Header with Global Search and Navigation */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        recipes={RECIPES_DATA}
        onSelectRecipe={handleSelectRecipe}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'detail' && activeRecipe ? (
          <RecipeDetail
            recipe={activeRecipe}
            onBack={handleBackToList}
          />
        ) : currentView === 'kebutuhan' ? (
          <KitchenEssentialsView />
        ) : currentView === 'tentang' ? (
          <AboutView />
        ) : (
          <RecipeList
            recipes={RECIPES_DATA}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              window.location.hash = cat === 'semua' ? 'jelajah' : `kategori/${cat}`;
            }}
            onSelectRecipe={handleSelectRecipe}
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery('')}
          />
        )}
      </main>

      {/* Footer with Popups for Disclaimer, Privacy, Terms */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
