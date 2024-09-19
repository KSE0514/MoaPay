const userCardList = [
  {
    name: "신한카드 Mr.Life",
    image_url: "/assets/image/cards/신용카드이미지/1_신한카드_Mr.Life.png", // 이미지 URL을 추가할 수 있습니다.
    type: 0, // 카드 종류가 명시되지 않았으므로 가정했습니다.
    annual_fee: 15000,
    performance: 500000, // 전월실적
    benefits: [
      {
        category: "주거·통신",
        explanation: "월납요금(공과금) 10% 할인서비스",
      },
      {
        category: "마트·편의점",
        explanation: "편의점 10% 할인",
      },
      {
        category: "의료",
        explanation: "병원/약국업종 10% 할인",
      },
      {
        category: "생활",
        explanation: "세탁소 업종 10% 할인",
      },
      {
        category: "쇼핑",
        explanation: "온라인 쇼핑 10% 할인",
      },
      {
        category: "교통",
        explanation: "택시 10% 할인",
      },
      {
        category: "식비",
        explanation: "식음료 10% 할인",
      },
      {
        category: "마트·편의점",
        explanation: "3대 마트 10% 할인",
      },
      {
        category: "자동차",
        explanation: "4대 정유사 리터당 60원 할인",
      },
      {
        category: "쇼핑",
        explanation: "인테이크몰 20% 할인",
      },
    ],
  },
  {
    name: "삼성카드 & MILEAGE PLATINUM (스카이패스)",
    image_url:
      "/assets/image/cards/신용카드이미지/2_삼성카드_&_MILEAGE_PLATINUM_(스카이패스).png", // 이미지 URL을 추가할 수 있습니다.
    type: 0, // 카드 종류가 명시되지 않았으므로 가정했습니다.
    annual_fee: 47000,
    performance: 0, // 전월실적
    benefits: [
      {
        category: "항공·여행",
        explanation: "모든 가맹점 이용금액 1,000원당 1마일리지 기본적립",
      },
      {
        category: "쇼핑",
        explanation: "백화점 이용금액 1,000원당 2마일리지 특별적립",
      },
      {
        category: "자동차",
        explanation: "주유 이용금액 1,000원당 2마일리지 특별적립",
      },
      {
        category: "카페",
        explanation: "커피 이용금액 1,000원당 2마일리지 특별적립",
      },
      {
        category: "마트·편의점",
        explanation: "편의점 이용금액 1,000원당 2마일리지 특별적립",
      },
      {
        category: "교통",
        explanation: "택시 이용금액 1,000원당 2마일리지 특별적립",
      },
    ],
  },
  {
    name: "KB국민 My WE:SH 카드",
    image_url: "/assets/image/cards/신용카드이미지/3_KB국민_My_WE_SH_카드.png", // 이미지 URL을 추가할 수 있습니다.
    type: 0, // 카드 종류가 명시되지 않았으므로 가정했습니다.
    annual_fee: 15000,
    performance: 400000, // 전월실적
    benefits: [
      {
        category: "간편결제",
        explanation: "KB Pay 10% 할인",
      },
      {
        category: "마트·편의점",
        explanation: "편의점 10% 할인",
      },
      {
        category: "식비",
        explanation: "음식점 10% 할인",
      },
      {
        category: "주거·통신",
        explanation: "이동통신요금 10% 할인",
      },
      {
        category: "생활",
        explanation: "OTT 30% 할인",
      },
    ],
  },
  {
    name: "삼성카드 taptap O",
    image_url: "/assets/image/cards/신용카드이미지/5_삼성카드_taptap_O.png", // 이미지 URL을 추가할 수 있습니다.
    type: 0, // 카드 종류가 명시되지 않았으므로 가정했습니다.
    annual_fee: 10000,
    performance: 300000, // 전월실적
    benefits: [
      {
        category: "교통",
        explanation: "대중교통·택시 10% 결제일할인",
      },
      {
        category: "주거·통신",
        explanation: "이동통신요금 10% 결제일할인",
      },
      {
        category: "취미",
        explanation: "CGV 및 롯데시네마 5,000원 결제일할인",
      },
    ],
  },
];
const RecommendedCardList = [
  {
    name: "현대카드 Summit",
    image_url: "/assets/image/cards/신용카드이미지/17_현대카드_Summit.png", // 이미지 URL을 추가할 수 있습니다.
    type: 0, // 카드 종류 가정
    annual_fee: 200000,
    performance: 500000,
    benefits: [
      { category: "all", explanation: "적립한도 제한 없는 1.5% M포인트 적립" },
      {
        category: "교육",
        explanation: "[추가 혜택] 학원/유치원 업종 5% M포인트 적립",
      },
      {
        category: "의료",
        explanation: "[추가혜택] 병원/약국 업종 5% M포인트 적립",
      },
      {
        category: "항공·여행",
        explanation: "[추가혜택] 국내 항공사/여행사 업종 5% M포인트 적립",
      },
      {
        category: "숙박",
        explanation: "[추가혜택] 특급호텔 업종 5% M포인트 적립",
      },
    ],
  },
  {
    name: "LOCA 365 카드",
    image_url: "/assets/image/cards/신용카드이미지/18_LOCA_365_카드.png",
    type: 0,
    annual_fee: 20000,
    performance: 500000,
    benefits: [
      { category: "주거·통신", explanation: "[생활업종]아파트관리비 10% 할인" },
      {
        category: "주거·통신",
        explanation: "[생활업종]공과금(도시가스비, 전기료) 10% 할인",
      },
      { category: "교통", explanation: "[생활업종]대중교통 10% 할인" },
      {
        category: "주거·통신",
        explanation: "[생활업종]SKT, KT, LG U+ 10% 할인",
      },
      {
        category: "식비",
        explanation: "[생활업종]배달의 민족, 요기요, 쿠팡이츠 10% 할인",
      },
      {
        category: "보험",
        explanation: "[생활업종]생명보험, 손해보험 10% 할인",
      },
      { category: "교육", explanation: "[생활업종]학습지 10% 할인" },
      {
        category: "생활",
        explanation:
          "[생활업종]넷플릭스, 유튜브, 왓챠, 멜론, 지니뮤직, 디즈니 플러스 1,500원 할인",
      },
    ],
  },
  {
    name: "현대카드Z family Edition2",
    image_url:
      "/assets/image/cards/신용카드이미지/19_현대카드Z_family_Edition2.png",
    type: 0,
    annual_fee: 20000,
    performance: 500000,
    benefits: [
      { category: "쇼핑", explanation: "온라인 쇼핑몰 10% 청구 할인" },
      { category: "의료", explanation: "병원・약국 10% 청구 할인" },
      { category: "교육", explanation: "학원 10% 청구 할인" },
      { category: "자동차", explanation: "주유 10% 청구 할인" },
      {
        category: "주거·통신",
        explanation: "생활 요금 정기 결제 10% 청구 할인",
      },
    ],
  },
  {
    name: "다담카드",
    image_url: "/assets/image/cards/신용카드이미지/21_다담카드.png",
    type: 0,
    annual_fee: 15000,
    performance: 300000,
    benefits: [
      { category: "교통", explanation: "버스, 지하철 10% 청구할인" },
      {
        category: "주거·통신",
        explanation: "SKT, KT Olleh, LG U+ 10% 청구할인",
      },
      {
        category: "자동차",
        explanation: "SK주유소(충전소) 리터당 60원 청구할인",
      },
      {
        category: "취미",
        explanation:
          "CGV/메가박스 온라인 영화예매시 승인건당 3,500원 청구 할인",
      },
      {
        category: "항공·여행",
        explanation: "롯데월드, 에버랜드, 캐리비안베이 30~50% 할인",
      },
      { category: "해외", explanation: "해외가맹점 5% 할인캐시백" },
    ],
  },
  {
    name: "신한카드 The BEST-F",
    image_url: "/assets/image/cards/신용카드이미지/22_신한카드_The_BEST-F.png",
    type: 0,
    annual_fee: 202000,
    performance: 300000,
    benefits: [
      {
        category: "카페",
        explanation:
          "스타벅스 커피 할인 / 이마트 피자 무료 제공 서비스 / 특급호텔 베이커리 특별 할인 서비스",
      },
      { category: "쇼핑", explanation: "주요 백화점, 할인점, 아울렛 할인" },
      {
        category: "항공·여행",
        explanation: "JDC 면세점 / 아시아나, 이스타 항공 할인",
      },
    ],
  },
  {
    name: "신한카드 The BEST-F",
    image_url: "/assets/image/cards/신용카드이미지/22_신한카드_The_BEST-F.png",
    type: 0,
    annual_fee: 202000,
    performance: 300000,
    benefits: [
      {
        category: "카페",
        explanation:
          "스타벅스 커피 할인 / 이마트 피자 무료 제공 서비스 / 특급호텔 베이커리 특별 할인 서비스",
      },
      { category: "쇼핑", explanation: "주요 백화점, 할인점, 아울렛 할인" },
      {
        category: "항공·여행",
        explanation: "JDC 면세점 / 아시아나, 이스타 항공 할인",
      },
    ],
  },
];

export { userCardList, RecommendedCardList };
