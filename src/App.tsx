/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Compass, Users, Lock, Sparkles, ShieldCheck } from 'lucide-react';
import HomeView from './components/HomeView';
import WorldView from './components/WorldView';
import CharactersView from './components/CharactersView';
import SecretView from './components/SecretView';

type TabId = 'home' | 'worldview' | 'characters' | 'secret';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');

  const navigationTabs = [
    { id: 'home', label: '메인 전당', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'worldview', label: '세계관', icon: <Compass className="w-4 h-4" /> },
    { id: 'characters', label: '인물 총람', icon: <Users className="w-4 h-4" /> },
    { id: 'secret', label: '기밀 사슬방', icon: <Lock className="w-4 h-4" /> },
  ];

  return (
    <div id="full-app-root" className="min-h-screen bg-gradient-to-b from-[#090B10] via-[#0D111C] to-[#05060A] text-slate-200 relative flex flex-col justify-between">
      
      {/* Absolute Ambient Background Sparks */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Glassmorphic Navigation Header bar */}
      <header id="primary-navigator" className="sticky top-0 z-40 bg-[#090B10]/80 backdrop-blur-md border-b border-arcane-border/80">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand Title */}
          <div 
            id="brand-logo"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2 bg-gradient-to-r from-arcane-gold to-yellow-600 rounded-xl shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-all">
              <Sparkles className="w-5 h-5 text-slate-950 animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-white tracking-widest uppercase group-hover:text-arcane-gold-light transition-colors leading-none">
                ARCADIA
              </h1>
              <span className="text-[10px] font-sans tracking-widest text-slate-500 uppercase">
                Arcane Academy Library
              </span>
            </div>
          </div>

          {/* Navigation Items with Animated Underline pill */}
          <nav id="nav-pills-row" className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-2xl border border-arcane-border/80 text-xs">
            {navigationTabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-btn-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as TabId)}
                  className={`px-4 py-2.5 rounded-xl font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer relative select-none ${
                    isSelected ? 'text-arcane-gold' : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                  
                  {/* Active highlight background pill movement via Framer Motion */}
                  {isSelected && (
                    <motion.div
                      layoutId="active-nav-layer"
                      className="absolute inset-0 bg-slate-900 border border-arcane-gold/20 rounded-xl -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Narrative Display Area */}
      <main id="primary-content-viewport" className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-10 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'home' && (
              <HomeView onNavigateToTab={(tabId) => setActiveTab(tabId as TabId)} />
            )}
            
            {activeTab === 'worldview' && (
              <WorldView />
            )}
            
            {activeTab === 'characters' && (
              <CharactersView onNavigateToTab={(tabId) => setActiveTab(tabId as TabId)} />
            )}
            
            {activeTab === 'secret' && (
              <SecretView />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Aesthetic Secrecy Warning Footer */}
      <footer id="primary-footer" className="border-t border-arcane-border/50 bg-black/60 py-6 text-center text-[11px] text-slate-600 font-sans tracking-wide space-y-2 relative z-10">
        <div className="flex items-center justify-center gap-2 text-slate-500 max-w-md mx-auto">
          <ShieldCheck className="w-4 h-4 text-slate-650" />
          <span>지정 1급 비밀 엄수 연방법 및 비마공 관리 제42조에 의한 암호화 보존 구역</span>
        </div>
        <p className="font-light">
          본 포털은 아르카디아 마법 위원회에서 사법 승인한 아카이브입니다. 학생 사생활 누출 시 즉각 지옥의 크라우센 감옥 구금이 적용됩니다.
        </p>
        <p className="font-mono text-[10px] text-slate-700">
          © Arcadia Academy, Established 1904. All Security Certificates Valid.
        </p>
      </footer>
    </div>
  );
}

