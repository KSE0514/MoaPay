import { create } from "zustand";
// 혜택 인터페이스 정의
export interface Benefit {
  categoryName: string;
  benefitDesc: string;
  categoryType: string; // 카테고리 타입은 실제 문자열
  benefitType: string; // 혜택 타입도 문자열
  benefitValue: number; // 혜택 값은 실제로 숫자형
  benefitPoint: number; // 혜택 포인트 추가
}

// 카드 객체 타입 정의
export interface CardInfo {
  cardName: string; // 카드명
  companyName: string; // 카드 발급사
  benefitTotalLimit: number | null; // 혜택 한도 (nullable)
  cardType: string; // 카드 종류 (신용, 체크 등)
  annualFee: number; // 국내 연회비
  annualFeeForeign: number; // 해외 연회비
  performance: number; // 전월 실적
  imageUrl: string; // 이미지 url
  benefits: Benefit[]; // 혜택 목록
}

// 카드 객체 타입 정의
export interface Card {
  cardNumber: string; // 카드 식별자
  cvc: string; // CVC 코드 추가
  performanceOk: boolean; // 실적 달성 여부
  cardLimit: number; // 카드 한도
  charges: number; // 사용 금액
  benefitUsage: number; // 사용한 혜택량
  cardInfo: CardInfo; // 카드 정보 객체
}

// 카드 상태 인터페이스 정의
interface CardState {
  cardList: Card[]; // 카드 리스트 배열
  setCardList: (newCardList: Card[]) => void; // 받아온 카드 리스트를 설정하는 함수
  addCard: (card: Card) => void; // 카드 추가 함수
  removeCard: (index: number) => void; // 카드 삭제 함수
  clearCards: () => void; // 카드 리스트 초기화 함수
}

export const useCardStore = create<CardState>((set) => ({
  cardList: [], // 초기 카드 리스트는 빈 배열

  //백엔드에서 받아온 전체 카드리스트
  setCardList: (newCardList) => set({ cardList: newCardList }),

  // 카드 추가 함수
  addCard: (card) => set((state) => ({ cardList: [...state.cardList, card] })),

  // 카드 삭제 함수 (id로 삭제)
  removeCard: (index) =>
    set((state) => {
      const newCardList = [...state.cardList]; // Create a copy of the current cardList
      newCardList.splice(index, 1); // Remove the card at the specified index
      return { cardList: newCardList }; // Return the updated state
    }),

  // 카드 리스트 초기화 함수
  clearCards: () => set(() => ({ cardList: [] })),
}));
