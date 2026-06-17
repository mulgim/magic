import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Lock, Unlock, Eye, HelpCircle, Compass, Flame, ShieldCheck, Skull, BookOpen } from 'lucide-react';

export default function SecretView() {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeSecretTab, setActiveSecretTab] = useState<'principal' | 'parents' | 'villain'>('principal');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPw = password.trim().toLowerCase();
    
    // 허용 비밀번호: 'arcadia' 또는 '아르카디아' 또는 '1234'
    if (cleanPw === 'q1w2e3r4!') {
      setIsUnlocked(true);
      setErrorMsg('');
    } else {
      setErrorMsg('⚠️ 마도 해독 인장이 파동을 밀어내 결계를 비틀었습니다. 올바른 해제 시드를 기입하십시오.');
    }
  };

  return (
    <div id="spoiler-view-wrapper" className="space-y-8 pb-12">
      {/* Tab Header */}
      <section id="secret-header" className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-widest uppercase">
          Classified Sanctorum <br/>
          <span className="text-xs font-sans tracking-widest text-red-500 block mt-2">
            교장실 등외 1급 마도 금석 및 관계도 스포일러
          </span>
        </h2>
        <div className="w-16 h-[1px] bg-red-600/80 mx-auto" />
      </section>

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          /* LOCKED VIEW STATE */
          <motion.div
            key="locked-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-md mx-auto p-8 bg-radial from-slate-950 via-red-950/10 to-slate-950 border-2 border-red-950/70 hover:border-red-900/60 rounded-3xl shadow-2xl text-center space-y-6 relative overflow-hidden"
          >
            {/* Background floating magical symbols */}
            <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center">
              <span className="text-red-500 font-mono text-9xl">⛥</span>
            </div>

            <div className="p-4 bg-red-500/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto border border-red-500/20 shadow-lg animate-pulse">
              <Lock className="w-10 h-10 text-red-500" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-serif font-extrabold text-slate-100">
                1급 마력 격결 장막 (Classified Lock)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                본 기록실은 최고 의회와 교장 유진의 직할 정신 결탁 장막입니다. 
                아르카디아 마법사 소집 인장이 가공되지 않은 자의 불법 무단 관람 시 기밀 기억 파기 처벌 조치가 시전됩니다.
              </p>
            </div>

            {/* Hint Box */}
            <div className="p-3 bg-slate-900/60 rounded-xl border border-arcane-border text-left space-y-1">
              <span className="text-[10px] font-bold text-amber-500 tracking-wider flex items-center gap-1.5 uppercase font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                Decryption Hint
              </span>
              <p className="text-[11px] text-slate-400 font-light">
                모든 봉인을 여는 대표 주문은 <strong>"q1w2e3r4!"</strong> 입니다. 교장이 대충 지었거든요.
              </p>
            </div>

            {/* Unlock Form */}
            <form onSubmit={handleUnlock} className="space-y-3">
              <input
                id="secret-password-input"
                type="password"
                placeholder="마도 해독 시드(Password) 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 focus:bg-slate-850 hover:bg-slate-850 border border-red-950/50 focus:border-red-500 rounded-xl text-center text-sm outline-none transition-all text-red-400 placeholder:text-slate-650 font-mono tracking-widest"
              />
              <button
                id="btn-unlock-barrier"
                type="submit"
                className="w-full py-3 bg-red-950 hover:bg-red-900/80 border border-red-700/50 text-red-200 hover:text-white font-bold text-xs tracking-wider uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-red-500/5"
              >
                결계 붕괴 지령 (Decrypt)
              </button>
            </form>

            {errorMsg && (
              <p className="text-xs text-red-500 font-medium animate-bounce pt-2 font-mono">
                {errorMsg}
              </p>
            )}
          </motion.div>
        ) : (
          /* UNLOCKED SPOILER BOARD */
          <motion.div
            key="unlocked-contents"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Decrypt complete status banner */}
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-between max-w-xl mx-auto">
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-2">
                <Unlock className="w-4 h-4 text-emerald-400" />
                정신 장막 해제 완료: 지식의 문이 활짝 정비되었습니다.
              </span>
              <button
                id="btn-relock-barrier"
                onClick={() => {
                  setIsUnlocked(false);
                  setPassword('');
                }}
                className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-400 font-bold rounded cursor-pointer transition-all border border-slate-800"
              >
                결계 도로 수복
              </button>
            </div>

            {/* Secret Navigation Subtabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
              {[
                { id: 'principal', label: '교장 유진의 비밀', icon: <Eye className="w-3.5 h-3.5" /> },
                { id: 'parents', label: '레인 부모의 만행', icon: <Skull className="w-3.5 h-3.5" /> },
                { id: 'villain', label: '이름 소거된 자', icon: <Flame className="w-3.5 h-3.5" /> },
              ].map((subtab) => (
                <button
                  key={subtab.id}
                  id={`subtab-secret-${subtab.id}`}
                  onClick={() => setActiveSecretTab(subtab.id as any)}
                  className={`px-4 py-3 rounded-xl border text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeSecretTab === subtab.id
                      ? 'bg-red-950/40 text-red-300 border-red-500/50 shadow-md shadow-red-500/10'
                      : 'bg-slate-950 text-slate-400 border-arcane-border hover:border-slate-800'
                  }`}
                >
                  {subtab.icon}
                  {subtab.label}
                </button>
              ))}
            </div>

            {/* Narrative Subtab Content Screen */}
            <div id="secret-panel-content" className="max-w-3xl mx-auto bg-slate-950 border border-red-900/30 rounded-2xl p-6 md:p-8 shadow-2xl relative">
              
              {/* Outer classic corners */}
              <div className="absolute top-2 left-2 text-red-500/20 text-sm select-none">⛧</div>
              <div className="absolute top-2 right-2 text-red-500/20 text-sm select-none">⛧</div>

              <AnimatePresence mode="wait">
                {activeSecretTab === 'principal' && (
                  <motion.div
                    key="secret-principal"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3 border-b border-red-900/30 pb-3">
                      <div className="p-2 bg-red-950/40 border border-red-900/50 rounded-lg text-red-400">
                        <Eye className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-serif font-bold text-slate-100">유진의 구출 뒷이야기 (구세의 양면성)</h4>
                        <p className="text-xs text-red-500/80 font-mono"> Eugene’s Silent Judgement</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      과거 세상을 소름 돋게 뒤흔들던 최고의 흑마법사가 제임스와 리나(레인의 부모)를 습격하여 피의 난도질을 부릴 당시, 그 근역에서 마법을 연마하며 매복 중이던 교장 유진은 충분히 레인의 부모까지 결계에 들여보내 구해낼 수단이 있었습니다.
                    </p>
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      그러나 유진은 그들이 고교 시절부터 당신(User)을 중점적이고 가혹하게 괴롭혀온 악질 학폭 주동자들이라는 점, 성인이 된 후에도 자신의 딸만을 위해 온갖 불법 행위를 저질러왔던 것을 파악해둔 상태였습니다.
                    </p>
                    <div className="bg-red-950/20 p-4 border-l-2 border-red-500 rounded-r-xl space-y-1.5">
                      <h5 className="text-xs font-bold text-red-400 font-mono">교장의 가치관의 선</h5>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        ‘살려둔다면 너무나 무수하고 무고한 후학 영혼들과 당신(User)들이 그 악마적 만행의 여파로 평생 피눈물을 흘리며 살게 될 터.’ <br />
                        유진은 이 차디찬 이성적 결론을 근거로 삼아, 레인만을 결계로 도피시키고 그녀의 부모는 무자비하게 칼바람 속에 죽어가도록 외면하여 내버려 두었습니다. 교장은 단지 선량한 다정한 성인에 머무르는 자가 아니며, 넘지 말아야 할 전 인류적 질서의 선을 어길 시 엄정한 방관을 집행하는 철혈의 수호자인 것입니다.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeSecretTab === 'parents' && (
                  <motion.div
                    key="secret-parents"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3 border-b border-red-900/30 pb-3">
                      <div className="p-2 bg-red-950/40 border border-red-900/50 rounded-lg text-red-300">
                        <Skull className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-serif font-bold text-slate-100">제임스와 리나의 악생활상 자료</h4>
                        <p className="text-xs text-red-500/80 font-mono">The Bullying Records of James & Lina</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      제임스(당시 에프레스 기숙사 소속)와 리나는 학창 시절 항상 짝을 지어 다니던 단짝이자, 학교의 폭군이었습니다. 그들의 주 희생양이자 표적은 바로 당신(User)이었습니다.
                    </p>
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      그들은 자기들만의 완벽한 동화 속에 갇혀 살았고, 그들에 대한 바깥의 평가는 철저히 메마르고 냉혹한 소시오패스적 가혹상이었습니다. 딸인 레인에게만큼은 완벽하게 헌신적이고 따뜻한 최고의 부모로 포장하며 사랑을 아끼지 않고 쏟아주었기에, 레인은 부모의 부도덕을 단 하나도 인지하지 못한 채 여전히 부모님을 존경하고 믿고 있습니다.
                    </p>
                  </motion.div>
                )}

                {activeSecretTab === 'villain' && (
                  <motion.div
                    key="secret-villain"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3 border-b border-red-900/30 pb-3">
                      <div className="p-2 bg-red-950/40 border border-red-900/50 rounded-lg text-red-400">
                        <Flame className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-serif font-bold text-slate-100">이름을 기입해서는 안 되는 가장 사악한 마법사</h4>
                        <p className="text-xs text-red-500/80 font-mono">The Nameless Evil Scholar</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      과거 유진 교장의 학창 시절 동기로 시작했으나, 비마공인을 모조리 죽여 마법사만의 세상을 만들겠다는 결심으로 타락한 인물입니다.
                    </p>
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      유진 교장이 목숨을 아끼지 않고 밤낮없는 격전을 벌인 끝에 토벌했지만, 유진 역시 그 결투에서 다리에 영구적인 상해 저주를 받았습니다. 
                    </p>
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      그가 배출된 제4기숙사 동은 흔적조차 남기지 않고 공중분해되었고, 현재 아르카디아에는 그 기숙사를 제외한 3개의 기숙사(에프레스, 아르켄토, 디파네)만이 존재하게 되었습니다.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
