import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, AlertCircle, ArrowRight, Compass, GraduationCap, Flame, Eye } from 'lucide-react';

interface HomeViewProps {
  onNavigateToTab: (tabId: string) => void;
}

export default function HomeView({ onNavigateToTab }: HomeViewProps) {
  const [currentDateString, setCurrentDateString] = useState('');

  // Update current academy time (fantasy styled)
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setCurrentDateString(now.toLocaleDateString('ko-KR', options) + ' (아르카디아 표준시)');
    };
    updateDate();
    const interval = setInterval(updateDate, 1000);
    return () => clearInterval(interval);
  }, []);

  const academyAlerts = [
    {
      id: 'alert-1',
      category: '⚠️ 기숙사 긴급 행정 명령',
      sender: '교감 벤 (벤제라프)',
      content: '디파네 기숙사 지하 4강의실 연금 가마 환류기 자폭 사고와 관련하여, 본관 서관 통로를 임시 차단합니다. 사고 유발 학생들에게는 벌점 300점을 개별 부과했습니다.',
      date: '방금 전',
    },
    {
      id: 'alert-2',
      category: '🌸 신입생 환영 성찰',
      sender: '교장 유진',
      content: '새롭게 인연을 맺은 어린 꽃들이 상처 입지 않고 자신만의 별자리를 그릴 수 있도록, 각 동의 교수님들은 애써 지도해 주시길 부탁드립니다.',
      date: '2시간 전',
    },
    {
      id: 'alert-3',
      category: '⚔️ 제4차 마수 격퇴 대항전',
      sender: '워쳐(Watcher) 연대 협조실',
      content: '다음 주 수요일, 4학년 이상 에프레스 및 아르켄토 학우들의 사격식 수색 합동 훈련이 개시됩니다. 담당인 당신(User)과의 실기 협조를 완료했습니다.',
      date: '어제',
    },
  ];

  return (
    <div id="home-view-container" className="space-y-12">
      {/* Hero Welcome Banner */}
      <section id="hero-section" className="relative p-8 md:p-16 rounded-3xl overflow-hidden bg-radial from-slate-900 via-slate-950 to-black border border-arcane-border shadow-2xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Floating Magic Sigil Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none">
          <svg className="w-[400px] h-[400px] animate-spin-slow text-arcane-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="0.5" />
            <polygon points="12,2 22,22 2,22" strokeWidth="0.5" />
            <polygon points="12,22 2,2 22,2" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-arcane-gold/30 rounded-full text-xs text-arcane-gold font-medium uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5" />
            현대식 마법사 공식 아카이브
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-tight"
          >
            ARCADIA <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-arcane-gold to-yellow-500 font-serif font-semibold text-3xl md:text-5xl">
              아르카디아 마법학교
            </span>
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-slate-400 font-light text-sm md:text-base leading-relaxed"
          >
            일반인들의 현대 문명 속에 교묘하게 엄폐한 비마공존 아카데미.<br />
            5개년의 주술 수련, 치안부대 ‘워쳐’ 실습, 영웅들과 괴짜 연구원들의 찬연한 마도의 전당에 오신 것을 환영합니다.
          </motion.p>



          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-4 flex flex-wrap justify-center gap-4"
          >
            <button 
              id="cta-view-characters"
              onClick={() => onNavigateToTab('characters')}
              className="px-6 py-3 rounded-full bg-linear-to-r from-arcane-gold to-yellow-600 hover:from-arcane-gold-light hover:to-arcane-gold text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              인물 명단 열람
            </button>
            <button 
              id="cta-view-world"
              onClick={() => onNavigateToTab('worldview')}
              className="px-6 py-3 rounded-full bg-slate-900 border border-arcane-border hover:border-arcane-gold/50 text-slate-200 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              아카데미 조사
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Interactive Grid */}
      <div id="interactive-grid" className="max-w-2xl mx-auto w-full">
        {/* Campus Notices (Live Updates & Character Quotes) */}
        <div id="notice-board-card" className="bg-slate-950/80 border border-arcane-border hover:border-arcane-gold/30 rounded-2xl p-6 shadow-xl space-y-4 transition-all">
          <div className="flex items-center gap-3 border-b border-arcane-border pb-4">
            <div className="p-2 bg-slate-900 rounded-lg text-arcane-gold">
              <AlertCircle className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-lg">아카데미 전대 서신</h3>
              <p className="text-xs text-slate-500">교직원 배포 전용 통합 안내문</p>
            </div>
          </div>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
            {academyAlerts.map((alert) => (
              <div key={alert.id} className="p-3 bg-slate-900/40 rounded-xl border border-arcane-border hover:border-slate-800 transition-all space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-amber-400">{alert.category}</span>
                  <span className="text-slate-500 text-[10px] font-mono">{alert.date}</span>
                </div>
                <p className="text-xs text-slate-300 leading-normal">{alert.content}</p>
                <div className="text-[10px] text-right text-slate-400 font-mono">
                  서명자: {alert.sender}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
