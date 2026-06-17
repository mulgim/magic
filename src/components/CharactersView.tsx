import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { charactersData } from '../data/characters';
import { Character } from '../types';
import { X, Key, Lock } from 'lucide-react';

export default function CharactersView({ onNavigateToTab }: { onNavigateToTab: (tabId: string) => void }) {
  const [activeChar, setActiveChar] = useState<Character | null>(null);

  const filteredCharacters = charactersData;

  const getDormTheme = (dorm: string | undefined) => {
    switch (dorm) {
      case 'Ephress':
        return {
          textColor: 'text-blue-400',
          borderColor: 'border-blue-500/30',
          bgColor: 'bg-blue-950/20',
          tagBg: 'bg-blue-900/20 text-blue-300 border-blue-800/40',
        };
      case 'Arkento':
        return {
          textColor: 'text-red-400',
          borderColor: 'border-red-500/30',
          bgColor: 'bg-red-950/20',
          tagBg: 'bg-red-900/20 text-red-300 border-red-800/40',
        };
      case 'Dipane':
        return {
          textColor: 'text-emerald-400',
          borderColor: 'border-emerald-500/30',
          bgColor: 'bg-emerald-950/20',
          tagBg: 'bg-emerald-900/20 text-emerald-300 border-emerald-800/40',
        };
      default:
        return {
          textColor: 'text-slate-400',
          borderColor: 'border-slate-800',
          bgColor: 'bg-slate-900/20',
          tagBg: 'bg-slate-800 text-slate-300 border-slate-700/50',
        };
    }
  };

  return (
    <div id="characters-tab-wrapper" className="space-y-8 pb-12">
      {/* Tab Header */}
      <section id="character-header" className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-widest uppercase">
          Accredited Roster <br/>
          <span className="text-xs font-sans tracking-widest text-arcane-gold block mt-2">
            아르카디아 소속 총람 및 인물 성향 대장
          </span>
        </h2>
        <div className="w-16 h-[1px] bg-arcane-gold mx-auto" />
      </section>

      {/* Roster Grid */}
      <section id="character-roster-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCharacters.map((char) => {
            const theme = getDormTheme(char.dormitory);
            return (
              <motion.div
                key={char.id}
                id={`char-card-${char.id}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveChar(char)}
                className={`p-5 bg-radial from-slate-950 via-slate-950 to-slate-950/60 border ${theme.borderColor} hover:border-arcane-gold/50 rounded-2xl cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group h-[280px] relative overflow-hidden`}
              >
                {/* Floating Decorative Circle */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-arcane-gold/5 rounded-full blur-xl group-hover:bg-arcane-gold/10 transition-all" />

                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-slate-500 tracking-wider">SEC-REG-404</span>
                    <span className={`text-[10px] uppercase font-bold tracking-wider font-mono ${theme.textColor}`}>
                      {char.dormitory || 'CORE'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-serif font-bold text-slate-100 flex items-baseline gap-2">
                      {char.name}
                      <span className="text-xs font-sans text-slate-500 font-light">{char.nameEn}</span>
                    </h3>
                    <p className={`text-[11px] font-mono mt-1 ${theme.textColor}`}>
                      {char.role}
                    </p>
                  </div>

                  {/* Character short Trait Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {char.traits.map((trait, index) => (
                      <span key={index} className={`px-2 py-0.5 rounded text-[10px] font-medium border ${theme.tagBg}`}>
                        #{trait}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium border bg-slate-900 text-slate-400 border-slate-800">
                      {char.species}
                    </span>
                  </div>

                  {/* Bubble quote preview */}
                  <p className="text-xs text-slate-400 italic line-clamp-2 pl-3 border-l-2 border-arcane-border group-hover:text-slate-300 transition-colors">
                    "{char.quotes[0]}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-900/60 flex items-center justify-between text-[11px] text-slate-500 relative z-10">
                  <span className="font-mono">나이: {char.age} ({char.gender})</span>
                  <span className="text-arcane-gold group-hover:text-arcane-gold-light group-hover:translate-x-1 transition-all font-bold">
                    기록 첩 보관관 →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </section>

      {/* Roster Character Detailed Modal Overlay */}
      <AnimatePresence>
        {activeChar && (() => {
          const theme = getDormTheme(activeChar.dormitory);
          return (
            <div id="character-detail-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
              <motion.div
                id="character-detail-modal"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="w-full max-w-2xl bg-slate-950 border border-arcane-border rounded-3xl p-6 md:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto space-y-6"
              >
                {/* Close Button */}
                <button
                  id="btn-close-modal"
                  onClick={() => setActiveChar(null)}
                  className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-200 hover:bg-slate-900 rounded-full transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Cover Banner Area */}
                <div className="border-b border-arcane-border pb-6 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${theme.tagBg}`}>
                      {activeChar.dormitory || '교무부 행정실'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-3xl font-serif font-black text-white flex items-baseline gap-2">
                      {activeChar.name}
                      <span className="text-sm font-sans text-slate-500 font-light">{activeChar.nameEn}</span>
                    </h3>
                    <p className={`text-xs font-mono mt-1 ${theme.textColor}`}>
                      {activeChar.role}
                    </p>
                  </div>
                </div>

                {/* Grid Core Body */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  {/* Left Column: Physical visual traits & Quotes */}
                  <div className="space-y-6">
                    <div className="space-y-3 bg-slate-900/40 p-4 rounded-xl border border-arcane-border/50">
                      <span className="text-xs uppercase font-serif font-bold text-arcane-gold block">
                        인물 신상 및 외형 묘사항
                      </span>
                      <ul className="space-y-2 text-xs text-slate-300 font-light">
                        <li>
                          <strong>종족 / 성별:</strong> {activeChar.species} / {activeChar.gender} ({activeChar.age})
                        </li>
                        <li>
                          <strong>모질 / 장발:</strong> {activeChar.appearance.hair}
                        </li>
                        <li>
                          <strong>동공 / 인상:</strong> {activeChar.appearance.eyes}
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <p className="p-3 bg-slate-900/20 border border-slate-900 rounded-lg text-xs italic text-slate-300 pl-4 border-l-2 border-arcane-gold-light">
                        "{activeChar.quotes[0]}"
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Character Background Details */}
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <span className="text-xs uppercase font-serif font-bold text-arcane-gold block">
                        동기 배경 및 사서 기록
                      </span>
                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 text-xs text-slate-400 font-light leading-relaxed">
                        {activeChar.details.map((detail, index) => (
                          <div key={index} className="flex gap-2 items-start bg-slate-900/10 p-2.5 rounded-lg border border-slate-900 hover:border-slate-850">
                            <span className="text-arcane-gold text-xs leading-none">✦</span>
                            <p>{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Secret Locks Warning/Teaser (Promoted the Spoiler tab) */}
                    {activeChar.secret && (
                      <div className="p-4 bg-linear-to-r from-red-950/20 to-amber-950/20 border border-red-900/30 rounded-xl space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                          <Lock className="w-4 h-4 animate-pulse" />
                          <span>비공개 기밀 보고서 봉인 상태</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-normal">
                          교장 {activeChar.name === '유진' ? '유진' : '유진'} 전속 결재 하에 이 인물의 과거 비화와 진실 보고서가 결박 장치 뒤에 차단되어 있습니다.
                        </p>
                        <button
                          id="btn-alert-spoiler-redirect"
                          onClick={() => {
                            setActiveChar(null);
                            onNavigateToTab('secret');
                          }}
                          className="px-3 py-1 bg-slate-950 text-amber-500 hover:text-amber-400 border border-amber-900/40 text-[10px] font-bold rounded hover:bg-slate-900 transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Key className="w-3 h-3" />
                          교장실 기밀 인장 사슬 해독 탭으로 이동
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
