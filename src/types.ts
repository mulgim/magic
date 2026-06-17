export interface Character {
  id: string;
  name: string;
  nameEn: string;
  age: string;
  species: string;
  gender: string;
  traits: string[]; // [온화함, 자애로움, 친절함] 등
  quotes: string[]; // 대표 대사들
  role: string; // 교장, 교감, 에프레스 담당 교수 등
  appearance: {
    hair: string;
    eyes: string;
    clothing?: string;
    expression: string;
    features: string[]; // 둥근 안경, 휠체어 등
  };
  details: string[]; // 특징 항목들
  secret?: {
    title: string;
    content: string;
  };
  dormitory?: 'Ephress' | 'Arkento' | 'Dipane' | 'None';
  avatarSeed?: string; // 아바타에 사용할 시드(혹은 스타일 정보)
}

export interface Dormitory {
  id: 'Ephress' | 'Arkento' | 'Dipane';
  name: string;
  nameEn: string;
  virtue: string; // 용기, 현실주의와 실용주의 등
  color: string; // 테마 색상 클래스 (Tailwind)
  borderColor: string;
  textColor: string;
  bgColor: string;
  accentColor: string;
  crestIcon: string;
  description: string;
  facilities: string[];
  notableFact: string;
  scoreStatus?: string;
}

export interface MagicRule {
  id: number;
  title: string;
  description: string;
  penalty: string;
  isUnforgivable?: boolean;
}

export interface AcademyLore {
  intro: string;
  history: string;
  watcherSystem: string;
  dormitoryRivalry: string;
}
