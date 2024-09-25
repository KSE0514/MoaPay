import { create } from "zustand";
export interface benefit {
  categoryName: string;
  benefitDesc: string;
  categoryType: "string";
  benefitType: "string";
  benefitValue: "string";
}
// 카드 객체 타입 정의
export interface card {
  cardNumber: string; // 카드 식별자
  performanceOk: true; //실적달성여부
  cardName: string; //카드명
  imageUrl: string; //이미지 url
  cardType: string; //카드 종류 - 신용, 체크
  annualFee: number; //연회비
  performance: number; //전월실적
  benefits: benefit[]; //혜택
  benefitUsage: number; //사용한 혜택량
  charges: number; //사용금액
}

interface CardState {
  cardList: card[]; // 카드 리스트 배열
  setCardList: (newCardList: card[]) => void; // 받아온 카드 리스트를 설정하는 함수
  addCard: (card: card) => void; // 카드 추가 함수
  removeCard: (id: string) => void; // 카드 삭제 함수
  clearCards: () => void; // 카드 리스트 초기화 함수
}

export const useCardStore = create<CardState>((set) => ({
  cardList: [], // 초기 카드 리스트는 빈 배열

  //백엔드에서 받아온 전체 카드리스트
  setCardList: (newCardList) => set({ cardList: newCardList }),

  // 카드 추가 함수
  addCard: (card) => set((state) => ({ cardList: [...state.cardList, card] })),

  // 카드 삭제 함수 (id로 삭제)
  removeCard: (cardNumber) =>
    set((state) => ({
      cardList: state.cardList.filter((card) => card.cardNumber !== cardNumber),
    })),

  // 카드 리스트 초기화 함수
  clearCards: () => set(() => ({ cardList: [] })),
}));
