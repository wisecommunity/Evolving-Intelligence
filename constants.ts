
import { Course, Event, StatItem, LeadershipEvent, WorkshopEvent, LunchGathering, CategoryNode, Article } from './types';

export const MISSION_STATEMENT = "致力於培養具有改變世界的領導者，透過持續度化創業家思維，致力於世界上值得的社會變革。";

export const STATS: StatItem[] = [
  { value: "1300+", label: "高潛力學子", description: "來自跨領域的學士、碩士、博士" },
  { value: "60+", label: "業師與創業家", description: "投入傳承的產業領袖" },
  { value: "150+", label: "創業團隊", description: "受益並實踐的創新團隊" },
];

export const COURSES: Course[] = [
  {
    id: "etepm",
    code: "ETEPM",
    title: "創業家思維與創業實務管理",
    description: "核心在於「實踐與行動」，協助學員從傳統管理經濟思維轉向創業經濟思維。訓練學員在效果邏輯和因果決策邏輯間靈活切換。",
    coreConcepts: ["創業家四大志業", "隨堂業師制度", "活體個案教學", "愛拼才會贏互動實踐"],
    link: "http://tiny.cc/etepm2025",
    highlight: "從 0 到 1 的創業家思維"
  },
  {
    id: "aixgs",
    code: "AI-X-Gs",
    title: "多面向思維：未來領導者的AI與地緣政治思考",
    description: "專為面對 AI 時代與地緣政治變局的未來領導者設計，強調跳脫單一維度，進行螺旋升維。",
    coreConcepts: ["AI-First 核心", "跨領域整合 (X)", "五大劇場 (Gs): Government, Geopolitics, Generations, Gender, Green", "S.O.F.T. 新世代管理框架"],
    link: "http://tiny.cc/aixgs2025",
    highlight: "從 1 到 N 的多面向思維"
  },
  {
    id: "psych",
    code: "Psychology",
    title: "度化智能：創業與創新心理學",
    description: "深入「內在心智與人性機制」，聚焦創業者在高度不確定環境下的心理歷程與決策模式。",
    coreConcepts: ["人格特質與動機", "認知偏誤與決策陷阱", "自我覺察", "創新創業領域中，心理學的發展脈絡"],
    highlight: "內在心智的修煉"
  },
  {
    id: "strategy",
    code: "Strategy",
    title: "當代企業策略",
    description: "不確定環境下的決策與領導。從宏觀多面向思維切入，再藉由訊息管理看創業家思維。",
    coreConcepts: ["動態競爭", "訊息管理", "烹飪實作決策分析"],
    link: "https://wisecommunity.github.io/WISKEY-NDHU-2025/",
    highlight: "理論與實務的交互驗證"
  }
];

// --- New Event Data Structures ---

export const LEADERSHIP_SERIES: LeadershipEvent[] = [
  {
    id: "lds-1",
    date: "2025年1月23日",
    title: "Better, Simpler Strategy",
    speaker: "Prof. Felix Oberholzer-Gee (HBS)",
    image: "https://raw.githubusercontent.com/wisecommunity/Evolving-Intelligence/main/images/LDS-Felix%20Oberholzer-Gee.JPG", 
    link: "https://leadershipdialogueseries.blogspot.com/2025/01/BetterSimplerStrategy.html",
    status: "completed"
  },
  {
    id: "lds-2",
    date: "2025年5月13日",
    title: "財務決策與企業領導力的交匯點",
    speaker: "Prof. Charles C.Y. Wang (HBS)",
    image: "https://raw.githubusercontent.com/wisecommunity/Evolving-Intelligence/main/images/LDS-Charles%20Wang.JPG", 
    link: "https://leadershipdialogueseries.blogspot.com/2025/03/leadership-dialogue-series.html",
    status: "completed"
  },
  {
    id: "lds-3",
    date: "2026年6月",
    title: "主題待定",
    speaker: "Prof. Zhu Feng (朱峰教授)",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800&auto=format&fit=crop", 
    status: "upcoming"
  }
];

export const WORKSHOPS: WorkshopEvent[] = [
  {
    id: "ws-1",
    date: "2025年1月19日",
    title: "Invest in Rest: 壓力調適與有效休息",
    image: "https://raw.githubusercontent.com/wisecommunity/Evolving-Intelligence/main/images/Workshop-2025InvestInRest.png",
    details: [
      "壓力調適：認識壓力、覺察身體壓力徵兆、處理壓力源",
      "有效休息：探索 7 種休息類型，找到適合你的方式",
      "個人計劃：盤點休息策略，將休息融入日常生活"
    ]
  },
  {
    id: "ws-2",
    date: "2025年1月22日",
    title: "海外線上座談會",
    image: "https://raw.githubusercontent.com/wisecommunity/Evolving-Intelligence/main/images/Workshop-2025%E6%B5%B7%E5%A4%96%E6%A5%AD%E5%B8%AB%E5%BA%A7%E8%AB%87%E6%9C%83.jpg",
    details: [
      "聆聽來自國外的創業、求職及升學實戰挑戰",
      "開拓您的國際視野並掌握實戰秘訣",
      "佈局未來"
    ]
  }
];

export const LUNCH_GATHERINGS: LunchGathering = {
  title: "AI無法取代的能力 — 軟實力",
  dates: ["2025年1月24日", "2025年10月4日"],
  image: "https://raw.githubusercontent.com/wisecommunity/Evolving-Intelligence/main/images/LunchEvent2025.jpg"
};

// Deprecated UPCOMING_EVENTS kept empty or removed in usage, keeping simple exports for others
export const LOGIC_COMPARISON = [
  {
    perspective: "資源",
    concept: "Bird in hand\n手中鳥原則",
    effectuation: "Start with means\n從現有方法開始",
    causation: "Pre-Set Goals\n預先設定的目標"
  },
  {
    perspective: "虧損",
    concept: "Affordable Loss\n可承受損失原則",
    effectuation: "Downside Risk\n下行風險",
    causation: "Expected Return\n預期收益"
  },
  {
    perspective: "上中下游夥伴",
    concept: "Crazy Quilt\n拼布原則",
    effectuation: "Forming Partnership\n形成夥伴關係",
    causation: "Competitive Analysis\n競爭分析"
  },
  {
    perspective: "意外事件",
    concept: "Lemonade\n檸檬水原則",
    effectuation: "Leverage Contingencies\n利用偶發事件",
    causation: "Avoiding Surprises\n避免意外事件"
  },
  {
    perspective: "領導組織",
    concept: "Pilot-in-the-Plane\n飛行員原則",
    effectuation: "Control\n控制",
    causation: "Predict\n預測"
  }
];

export const MANTRAS = [
  { phrase: "讓我來處理...", intent: "承擔責任" },
  { phrase: "想想為什麼？", intent: "多層次思考" },
  { phrase: "我不太了解...", intent: "解決難題" },
  { phrase: "我講個例子...", intent: "故事力" },
  { phrase: "我的理解是...", intent: "傳道解惑" },
  { phrase: "你怎麼看呢？", intent: "串連成員" },
  { phrase: "失敗的轉機！", intent: "從失敗中學習" },
  { phrase: "我應該是誰？", intent: "成為自己" },
  { phrase: "要改變什麼？", intent: "思考反問" },
];


// --- Review Page Taxonomy and Data ---

export const ARTICLE_CATEGORIES: CategoryNode[] = [
  {
    id: "evolving-decision",
    name: "度化決策——因果邏輯／效果邏輯",
    children: [
      { id: "causation", name: "因果邏輯" },
      { id: "effectuation", name: "效果邏輯" },
      { 
        id: "mantras", 
        name: "行動實務口訣",
        children: [
          { id: "mantra-1", name: "讓我來處理" },
          { id: "mantra-2", name: "想想為什麼？" },
          { id: "mantra-3", name: "我不太了解" },
          { id: "mantra-4", name: "我講個例子" },
          { id: "mantra-5", name: "我的理解是" },
          { id: "mantra-6", name: "你怎麼看呢？" },
          { id: "mantra-7", name: "失敗的轉機" },
          { id: "mantra-8", name: "我應該是誰？" },
          { id: "mantra-9", name: "要改變什麼？" },
        ]
      },
    ]
  },
  {
    id: "entrepreneurial-mindset",
    name: "創業家思維",
    children: [
      { id: "create-opp", name: "創造機會" },
      { id: "org-team", name: "組織團隊" },
      { id: "solve-prob", name: "解決難題" },
      { id: "legacy", name: "傳承價值" },
    ]
  },
  {
    id: "multi-dimensional",
    name: "多面向思維",
    children: [
      { 
        id: "ai-x-gs", 
        name: "AI-X-Gs 模型",
        children: [
          { id: "ai-first", name: "AI-First" },
          { 
            id: "gs-theater", 
            name: "Gs（五大劇場）",
            children: [
               { id: "govt", name: "政府" },
               { id: "geopolitics", name: "地緣政治" },
               { id: "generations", name: "世代" },
               { id: "gender", name: "性別" },
               { id: "green", name: "永續" },
            ]
          }
        ]
      },
      { id: "soft-model", name: "S.O.F.T. 分析模型" },
      { id: "clear-model", name: "C.L.E.A.R. 決策模型" },
    ]
  },
  {
    id: "psychology",
    name: "創業與創新心理學",
    children: []
  },
  {
    id: "value-of-life",
    name: "生命的價值",
    children: [
      { 
        id: "philosophy-life", 
        name: "生命哲學",
        children: [
          { id: "time-value", name: "生命的時間價值" },
          { id: "question-value", name: "生命的思問價值" },
          { id: "imagery-value", name: "生命的意向價值" },
        ]
      },
      { id: "tao-te-ching", name: "道德經" },
      { id: "growth-parenting", name: "跟孩子學成長，跟爸媽學成熟" },
    ]
  },
  {
    id: "art-thinking",
    name: "藝術思考 Art Thinking",
    children: []
  },
  {
    id: "strategy-issues",
    name: "當代策略議題",
    children: [
      { id: "global-health", name: "全球健康發展研究" },
      { id: "kennedy-school", name: "甘迺迪政治學院" },
      { id: "everything-is-possible", name: "Everything is Possible" },
    ]
  },
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: "art-001",
    title: "在不確定中尋找確定：效果邏輯的實踐藝術",
    date: "2025.02.15",
    image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=800&auto=format&fit=crop",
    excerpt: "當市場數據失效時，創業家如何運用「手中鳥」與「可承受損失」原則，開展下一步？本文探討 Sarasvathy 的核心理論在後疫情時代的應用。",
    categories: ["effectuation", "evolving-decision"],
    tags: ["效果邏輯", "創業實戰", "決策"],
    isNew: true
  },
  {
    id: "art-002",
    title: "AI-First 時代的組織重構：從 SOFT 模型看轉型",
    date: "2025.02.14",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    excerpt: "傳統的產銷人發財資已不足以應對 AI 衝擊。透過 Strategy, Organization, Finance, Technology 四維度的動態協作，打造敏捷組織。",
    categories: ["ai-first", "soft-model", "multi-dimensional"],
    tags: ["AI", "組織變革", "SOFT"],
    isNew: true
  },
  {
    id: "art-003",
    title: "口訣實戰：「讓我來處理」背後的責任意識",
    date: "2025.02.10",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    excerpt: "一句簡單的「讓我來處理」，往往是領導力展現的起點。這不僅是承擔工作，更是建立團隊信任與心理安全感的關鍵時刻。",
    categories: ["mantra-1", "mantras", "evolving-decision"],
    tags: ["行動口訣", "領導力", "團隊信任"],
  },
  {
    id: "art-004",
    title: "地緣政治劇場：台積電與全球供應鏈的賽局",
    date: "2025.02.08",
    image: "https://images.unsplash.com/photo-1526304640152-d4619684e484?q=80&w=800&auto=format&fit=crop",
    excerpt: "在 Gs 五大劇場中，地緣政治 (Geopolitics) 正以前所未有的力度影響商業決策。我們如何從半導體產業看見未來的權力板塊移動？",
    categories: ["geopolitics", "gs-theater", "multi-dimensional"],
    tags: ["地緣政治", "半導體", "全球化"],
  },
  {
    id: "art-005",
    title: "跟孩子學成長：重拾「為什麼」的好奇心",
    date: "2025.02.01",
    image: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=800&auto=format&fit=crop",
    excerpt: "隨著年歲增長，我們往往失去了提問的能力。觀察孩子探索世界的過程，或許能找回創業初期那份純粹的探索精神。",
    categories: ["growth-parenting", "value-of-life"],
    tags: ["親子教育", "終身學習", "好奇心"],
  },
  {
    id: "art-006",
    title: "失敗的轉機：檸檬水原則的心理學解析",
    date: "2025.01.28",
    image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=800&auto=format&fit=crop",
    excerpt: "面對意外與挫折，心理韌性是如何運作的？結合行動口訣「失敗的轉機」，我們探討如何將負面情緒轉化為修正行動的動能。",
    categories: ["mantra-7", "psychology", "evolving-decision"],
    tags: ["心理韌性", "挫折復原", "檸檬水原則"],
  },
  {
    id: "art-007",
    title: "道德經與現代領導：無為而無不為",
    date: "2025.01.20",
    image: "https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?q=80&w=800&auto=format&fit=crop",
    excerpt: "東方哲學如何啟發當代管理？「無為」並非不作為，而是順勢而為，在生態系中找到最適切的介入點。",
    categories: ["tao-te-ching", "value-of-life"],
    tags: ["東方哲學", "領導心法", "道德經"],
  },
];
