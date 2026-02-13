
import React, { useState, useEffect } from 'react';
import { View, Memory, LoveNote } from './types';
import { FEATURED_MEMORY, GALLERY_MEMORIES, INITIAL_LOVE_NOTES, HERO_IMAGE, BACKGROUND_MUSIC } from './constants';
import Polaroid from './components/Polaroid';
import StickyNote from './components/StickyNote';
import MusicPlayer from './components/MusicPlayer';
import { generateLoveLetter } from './services/geminiService';

const RANDOM_LABELS = [
  "Bebi ko",
  "Bebi",
  "Plat stagephi",
  "Pride Sicken",
  "Love yarn?",
  "Baliw yarn?",
  "Epal yarn?"
];

const getRandomLabel = (index: number) => RANDOM_LABELS[index % RANDOM_LABELS.length];

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.HOME);
  const [loveNotes, setLoveNotes] = useState<LoveNote[]>(INITIAL_LOVE_NOTES);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [manualNote, setManualNote] = useState("");
  const [noteMode, setNoteMode] = useState<'manual' | 'ai'>('manual');
  const [errorMsg, setErrorMsg] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<{ url: string; caption: string }[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (view: View) => {
    setActiveView(view);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLightbox = (images: { url: string; caption: string }[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') setLightboxIndex(i => (i + 1) % lightboxImages.length);
      if (e.key === 'ArrowLeft') setLightboxIndex(i => (i - 1 + lightboxImages.length) % lightboxImages.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, lightboxImages.length]);

  const handleGenerateNote = async () => {
    if (!customPrompt.trim()) return;
    setIsGenerating(true);
    setErrorMsg("");
    try {
      const newContent = await generateLoveLetter(customPrompt);
      const newNote: LoveNote = {
        id: Date.now().toString(),
        content: newContent,
        icon: 'auto_awesome',
        color: loveNotes.length % 2 === 0 ? 'bg-pink-50' : 'bg-orange-50',
        rotation: Math.random() > 0.5 ? 'rotate-2' : '-rotate-2'
      };
      setLoveNotes([newNote, ...loveNotes]);
      setCustomPrompt("");
    } catch (err) {
      setErrorMsg("Oops! Couldn't generate a note right now. Try writing one manually instead! 💕");
    }
    setIsGenerating(false);
  };

  const handleAddManualNote = () => {
    if (!manualNote.trim()) return;
    const colors = ['bg-pink-50', 'bg-orange-50', 'bg-[#fff9c4]', 'bg-purple-50', 'bg-red-50'];
    const icons = ['favorite', 'edit', 'push_pin', 'auto_awesome', 'star'];
    const newNote: LoveNote = {
      id: Date.now().toString(),
      content: manualNote,
      icon: icons[Math.floor(Math.random() * icons.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() > 0.5 ? 'rotate-2' : '-rotate-2'
    };
    setLoveNotes([newNote, ...loveNotes]);
    setManualNote("");
  };

  const handleDeleteNote = (id: string) => {
    setLoveNotes(loveNotes.filter(note => note.id !== id));
  };

  const renderHome = () => (
    <>
      {/* Featured Memory Section */}
      <section className="relative flex flex-col lg:flex-row items-center gap-12 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="w-full lg:w-1/2">
          <Polaroid
            imageUrl={FEATURED_MEMORY.imageUrl}
            caption={RANDOM_LABELS[0]}
            size="lg"
            hasWashiTape
            rotation="rotate-[-2deg]"
            onClick={() => openLightbox([{ url: FEATURED_MEMORY.imageUrl, caption: RANDOM_LABELS[0] }], 0)}
          />
        </div>
        <div className="w-full lg:w-1/2 space-y-6">
          <span className="text-primary font-bold uppercase tracking-widest text-sm">Featured Memory</span>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">Where It All Changed</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed italic">
            {FEATURED_MEMORY.description}
          </p>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="space-y-10 pt-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold italic font-display border-b-2 border-primary/20 inline-block pb-2">Cherished Moments</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_MEMORIES.slice(0, 6).map((memory, i) => (
            <Polaroid
              key={memory.id}
              imageUrl={memory.imageUrl}
              caption={getRandomLabel(i)}
              rotation={memory.rotation}
              onClick={() => openLightbox(GALLERY_MEMORIES.slice(0, 6).map((m, j) => ({ url: m.imageUrl, caption: getRandomLabel(j) })), i)}
            />
          ))}
        </div>
        <div className="flex justify-center pt-8">
          <button
            onClick={() => setActiveView(View.GALLERY)}
            className="text-primary font-bold flex items-center gap-1 hover:underline underline-offset-4"
          >
            View Full Gallery
            <span className="material-symbols-outlined">collections</span>
          </button>
        </div>
      </section>

      {/* Love Notes Preview */}
      <section className="space-y-10 pt-20 pb-12">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold italic font-display">Love Notes</h2>
          <div className="h-0.5 grow bg-primary/10"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loveNotes.slice(0, 4).map((note) => (
            <StickyNote
              key={note.id}
              content={note.content}
              icon={note.icon}
              color={note.color}
              rotation={note.rotation}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => setActiveView(View.MESSAGES)}
            className="bg-white dark:bg-black/20 border border-primary/20 px-6 py-2 rounded-full font-medium hover:bg-primary/5 transition-colors"
          >
            Add Your Own Note
          </button>
        </div>
      </section>
    </>
  );

  const renderGallery = () => (
    <section className="space-y-10 py-12 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold italic font-display">Our Memories</h2>
        <p className="text-gray-500">Every picture tells a part of our story.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {GALLERY_MEMORIES.map((memory, i) => (
          <Polaroid
            key={memory.id}
            imageUrl={memory.imageUrl}
            caption={getRandomLabel(i)}
            rotation={memory.rotation || (i % 2 === 0 ? 'rotate-1' : '-rotate-2')}
            onClick={() => openLightbox(GALLERY_MEMORIES.map((m, j) => ({ url: m.imageUrl, caption: getRandomLabel(j) })), i)}
          />
        ))}
      </div>
    </section>
  );

  const renderMessages = () => (
    <section className="max-w-4xl mx-auto space-y-12 py-12 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold italic font-display">Love Letters</h2>
        <p className="text-gray-500">A space for sweet words and hidden thoughts.</p>
      </div>

      {/* Mode Toggle */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setNoteMode('manual')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${noteMode === 'manual' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white dark:bg-black/20 border border-primary/20 hover:bg-primary/5'}`}
        >
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">edit</span>
            Write a Note
          </span>
        </button>
        <button
          onClick={() => setNoteMode('ai')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${noteMode === 'ai' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white dark:bg-black/20 border border-primary/20 hover:bg-primary/5'}`}
        >
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            AI Generate
          </span>
        </button>
      </div>

      {/* Manual Note Input */}
      {noteMode === 'manual' && (
        <div className="bg-white dark:bg-black/20 p-8 rounded-2xl shadow-sm border border-primary/5 animate-in fade-in duration-300">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">edit</span>
            Write Your Love Note
          </h3>
          <p className="text-sm text-gray-500 mb-4">Write a sweet message straight from the heart. 💕</p>
          <div className="flex flex-col gap-4">
            <textarea
              value={manualNote}
              onChange={(e) => setManualNote(e.target.value)}
              placeholder="Write something sweet... ❤️"
              className="w-full bg-background-light dark:bg-white/5 border border-primary/10 rounded-xl p-4 focus:ring-2 focus:ring-primary focus:border-primary min-h-[120px] transition-all resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) handleAddManualNote();
              }}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Press Ctrl+Enter to send</span>
              <button
                disabled={!manualNote.trim()}
                onClick={handleAddManualNote}
                className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                <span className="material-symbols-outlined">send</span>
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Note Generator */}
      {noteMode === 'ai' && (
        <div className="bg-white dark:bg-black/20 p-8 rounded-2xl shadow-sm border border-primary/5 animate-in fade-in duration-300">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
            Gemini Love Note Generator
          </h3>
          <p className="text-sm text-gray-500 mb-4">Type a memory or a feeling, and let Gemini craft a romantic note for you.</p>
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 mb-4 flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-sm">warning</span>
              {errorMsg}
            </div>
          )}
          <div className="flex flex-col gap-4">
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="E.g., The time we watched the stars in the backyard..."
              className="w-full bg-background-light dark:bg-white/5 border border-primary/10 rounded-xl p-4 focus:ring-2 focus:ring-primary focus:border-primary min-h-[120px] transition-all resize-none"
            />
            <button
              disabled={isGenerating || !customPrompt.trim()}
              onClick={handleGenerateNote}
              className="bg-primary text-white py-3 rounded-full font-bold hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin material-symbols-outlined">sync</span>
                  Writing...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">draw</span>
                  Generate Note
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Notes Count */}
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">{loveNotes.length} Love Notes</h3>
        <div className="h-0.5 grow bg-primary/10"></div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {loveNotes.map((note) => (
          <div key={note.id} className="relative group">
            <StickyNote
              content={note.content}
              icon={note.icon}
              color={note.color}
              rotation={note.rotation}
            />
            <button
              onClick={() => handleDeleteNote(note.id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-100 hover:bg-red-200 text-red-500 rounded-full w-7 h-7 flex items-center justify-center text-xs shadow-sm"
              title="Delete note"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="layout-container flex h-full grow flex-col">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 md:px-20 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3 text-primary cursor-pointer" onClick={() => handleNavClick(View.HOME)}>
          <span className="material-symbols-outlined text-3xl">favorite</span>
          <h1 className="text-2xl font-bold italic tracking-tight font-display">Ang KwinTuh</h1>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {Object.values(View).map((view) => (
            <button
              key={view}
              onClick={() => handleNavClick(view)}
              className={`text-sm font-medium transition-colors ${activeView === view ? 'text-primary border-b-2 border-primary pb-1' : 'hover:text-primary'}`}
            >
              {view}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="rounded-full border-2 border-primary p-0.5">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{ backgroundImage: `url("${HERO_IMAGE}")` }}
            ></div>
          </div>
          {/* Hamburger Button (Mobile) */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-primary/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-primary rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-primary rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-primary rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-xl">
          <nav className="flex flex-col items-center justify-center gap-8 pt-20">
            {Object.values(View).map((view) => (
              <button
                key={view}
                onClick={() => handleNavClick(view)}
                className={`text-2xl font-display italic font-bold transition-all duration-300 ${activeView === view ? 'text-primary scale-110' : 'text-gray-500 hover:text-primary hover:scale-105'}`}
              >
                {view}
              </button>
            ))}
          </nav>
          <div className="flex justify-center gap-4 mt-16 text-primary/30">
            <span className="material-symbols-outlined">favorite</span>
            <span className="material-symbols-outlined">favorite</span>
            <span className="material-symbols-outlined">favorite</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-grow w-full">
        {activeView === View.HOME && renderHome()}
        {activeView === View.GALLERY && renderGallery()}
        {activeView === View.MESSAGES && renderMessages()}
      </main>

      <MusicPlayer
        src={BACKGROUND_MUSIC}
        title="Love Never Felt So Good"
        artist="Michael Jackson, Justin Timberlake"
        coverParams={HERO_IMAGE}
      />

      {/* Lightbox Modal */}
      {lightboxOpen && lightboxImages.length > 0 && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
          >
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>

          {/* Previous arrow */}
          {lightboxImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => (i - 1 + lightboxImages.length) % lightboxImages.length); }}
              className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-10"
            >
              <span className="material-symbols-outlined text-5xl">chevron_left</span>
            </button>
          )}

          {/* Image */}
          <div className="max-w-[90vw] max-h-[85vh] flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImages[lightboxIndex].url}
              alt={lightboxImages[lightboxIndex].caption}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />
            <p className="text-white/80 font-display italic text-xl">"{lightboxImages[lightboxIndex].caption}"</p>
            {lightboxImages.length > 1 && (
              <p className="text-white/40 text-sm">{lightboxIndex + 1} / {lightboxImages.length}</p>
            )}
          </div>

          {/* Next arrow */}
          {lightboxImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => (i + 1) % lightboxImages.length); }}
              className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-10"
            >
              <span className="material-symbols-outlined text-5xl">chevron_right</span>
            </button>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="mt-20 py-12 border-t border-primary/10 text-center space-y-4 bg-white/30 dark:bg-black/10">
        <div className="flex justify-center gap-4 text-primary">
          <span className="material-symbols-outlined">favorite</span>
          <span className="material-symbols-outlined">favorite</span>
          <span className="material-symbols-outlined">favorite</span>
        </div>
        <p className="text-xl font-display italic text-primary font-bold">Happy Valentine's Day Bebi ko!</p>
        <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">Est. 2024 • © Bimbang Uldi</p>
      </footer>
    </div>
  );
};

export default App;
