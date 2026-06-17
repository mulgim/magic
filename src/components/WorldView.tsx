import React, { useState } from 'react';
import { motion } from 'motion/react';
import { dormitoriesData, magicRulesData, worldLoreData } from '../data/worldview';
import { Shield, BookOpen, FlaskConical, Scale, Scroll, Skull, Flame, Compass, HelpCircle } from 'lucide-react';

export default function WorldView() {
  const [selectedDorm, setSelectedDorm] = useState<'Ephress' | 'Arkento' | 'Dipane'>('Ephress');

  const getDormIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return <Shield className="w-10 h-10" />;
      case 'BookOpen': return <BookOpen className="w-10 h-10" />;
      case 'FlaskConical': return <FlaskConical className="w-10 h-10" />;
      default: return <Compass className="w-10 h-10" />;
    }
  };

  return (
    <div id="worldview-wrapper" className="space-y-12 pb-12">
      {/* Intro Header */}
      <section id="worldview-header" className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-widest uppercase">
          Worldview & Lore <br/>
          <span className="text-xs font-sans tracking-widest text-arcane-gold block mt-2">
            아르카디아 마법 세계의 숨겨진 이면 기둥들
          </span>
        </h2>
        <div className="w-24 h-[1px] bg-arcane-gold mx-auto" />
      </section>

      {/* World Overview Section */}
      <section id="world-intro-card" className="bg-slate-950/80 border border-arcane-border rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-2/3 space-y-4">
            <h3 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
              <Compass className="w-5 h-5 text-arcane-gold" />
              숨겨진 문명: 21세기의 보존된 신비와 초대장 규칙
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {worldLoreData.intro}
            </p>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {worldLoreData.history}
            </p>
          </div>
          <div className="md:w-1/3 bg-slate-900/60 p-6 rounded-xl border border-arcane-border/50 text-center space-y-4">
            <Scroll className="w-12 h-12 text-arcane-gold mx-auto opacity-80" />
            <h4 className="text-sm font-bold text-slate-200">기억 소거 강제 통치</h4>
            <p className="text-xs text-slate-400 font-light leading-normal">
              20세가 되는 해에 아카데미 초대장을 수락하지 않는 이들은, 마법의 수작과 사회 동요를 차단하기 위해 <strong>기억 소거 파견반</strong>에 의해 평생의 마력 적성과 기억을 영구 삭제 당한 채 모조리 세속인으로 되돌려 보내집니다.
            </p>
          </div>
        </div>
      </section>

      {/* Dormitories Interactive Tabs & Details */}
      <section id="dormitories-section" className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-serif font-bold text-slate-100">삼대 성도 기숙사 (Dormitories)</h3>
          <p className="text-xs text-slate-400">
            아르카디아는 학풍과 추구하는 인격적 미덕에 대응하는 3개의 장엄한 기숙사 체제를 운영합니다.
          </p>
        </div>

        {/* Dorm Selector Buttons with specialized Dorm Theme Colors */}
        <div className="flex flex-wrap justify-center gap-3">
          {dormitoriesData.map((dorm) => (
            <button
              key={dorm.id}
              id={`tab-dorm-${dorm.id}`}
              onClick={() => setSelectedDorm(dorm.id)}
              className={`px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all border cursor-pointer select-none ${
                selectedDorm === dorm.id
                  ? dorm.id === 'Ephress'
                    ? 'bg-blue-900/30 text-blue-300 border-blue-400 shadow-md shadow-blue-500/10'
                    : dorm.id === 'Arkento'
                      ? 'bg-red-900/30 text-red-300 border-red-500 shadow-md shadow-red-500/10'
                      : 'bg-emerald-900/30 text-emerald-300 border-emerald-500 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-950 text-slate-400 border-arcane-border hover:border-slate-800'
              }`}
            >
              {dorm.name} ({dorm.nameEn})
            </button>
          ))}
        </div>

        {/* Active Dormitory Detailed Panel with Motion */}
        <div id="dorm-details-panel">
          {dormitoriesData.map((dorm) => {
            if (dorm.id !== selectedDorm) return null;
            return (
              <motion.div
                key={dorm.id}
                id={`dorm-panel-${dorm.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-950/80 border border-arcane-border rounded-2xl p-6 md:p-8 shadow-xl"
              >
                {/* Left Side: Crest Icon & Virtue */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-4 border-b lg:border-b-0 lg:border-r border-arcane-border/50 pb-6 lg:pb-0 lg:pr-8">
                  <div className={`p-6 rounded-2xl bg-slate-900 border ${dorm.borderColor} ${dorm.textColor}`}>
                    {getDormIcon(dorm.crestIcon)}
                  </div>
                  <h4 className="text-2xl font-serif font-black text-white">{dorm.name} 기숙사</h4>
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">{dorm.nameEn} Crest</p>
                  <div className="mt-2 space-y-1">
                    <span className="text-[11px] text-slate-500 uppercase block tracking-wider">추구하는 가치</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 border ${dorm.borderColor} ${dorm.textColor}`}>
                      {dorm.virtue}
                    </span>
                  </div>
                  <p className={`text-xs font-mono mt-4 font-bold border border-slate-900 bg-slate-900/40 px-3 py-1.5 rounded-lg ${dorm.textColor}`}>
                    {dorm.scoreStatus}
                  </p>
                </div>

                {/* Right Side: Narrative Details & Facilities list */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs uppercase text-arcane-gold font-bold tracking-wider">기숙사 개론</span>
                    <p className="text-sm text-slate-300 leading-relaxed font-light">{dorm.description}</p>
                  </div>



                  <div className="bg-slate-900/50 p-4 border-l-4 border-amber-500/60 rounded-r-xl space-y-1">
                    <h5 className="text-xs font-bold text-amber-500">기숙사 정세 속사정 (상벌점 역학)</h5>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      {dorm.notableFact}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Magic Law & Unforgivable Curses */}
      <section id="magical-laws-section" className="space-y-8">
        <div className="text-center space-y-2">
          <Scale className="w-10 h-10 text-red-500/80 mx-auto" strokeWidth={1.5} />
          <h3 className="text-2xl font-serif font-bold text-slate-100">위대한 마법 사법 전당 (The Rules)</h3>
          <p className="text-xs text-slate-400">
            아르카디아 소속 마법 학사 및 졸업 공직자가 항구적으로 순종해야 하는 세 속 절대 규칙입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {magicRulesData.map((rule) => (
            <div 
              key={rule.id}
              id={`rule-card-${rule.id}`}
              className={`p-6 bg-slate-950 border rounded-2xl shadow-lg flex flex-col justify-between space-y-4 transition-all ${
                rule.isUnforgivable 
                  ? 'border-red-900 bg-linear-to-b from-slate-950 to-red-950/20 hover:border-red-500/50' 
                  : 'border-arcane-border hover:border-arcane-gold/30'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs">
                  {rule.isUnforgivable ? (
                    <span className="flex items-center gap-1 text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20 font-bold font-mono">
                      <Skull className="w-3.5 h-3.5" />
                      엄벌 금지
                    </span>
                  ) : (
                    <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-semibold font-mono">
                      규정헌장
                    </span>
                  )}
                  <span className="text-slate-500 font-mono">조항 {rule.id}</span>
                </div>

                <h4 className={`text-base font-bold ${rule.isUnforgivable ? 'text-red-300' : 'text-slate-200'}`}>
                  {rule.title}
                </h4>
                
                <p className="text-xs text-slate-400 leading-relaxed font-light">{rule.description}</p>
              </div>


            </div>
          ))}
        </div>
      </section>

      {/* Hidden 4th Dormitory & Criminal Watcher System */}
      <section id="watcher-history-section" className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-arcane-border/50 pt-10">
        <div className="space-y-4">
          <h4 className="text-lg font-serif font-bold text-slate-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            치안 수단 워쳐(Watcher) 부대 전술
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed font-light bg-slate-900/30 p-4 rounded-xl border border-arcane-border/40">
            {worldLoreData.watcherSystem}
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-serif font-bold text-slate-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-600 animate-pulse" />
            이름을 소거한 제4기숙사와 최악의 자
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed font-light bg-slate-900/30 p-4 rounded-xl border border-arcane-border/40">
            {worldLoreData.curseDetail}
          </p>
        </div>
      </section>
    </div>
  );
}
