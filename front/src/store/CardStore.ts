import { create } from "zustand";
import { persist } from "zustand/middleware";

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
export interface CardProduct {
  cardProductUuid: string;
  cardProductName: string; // 카드명
  cardProductCompanyName: string; // 카드 발급사
  cardProductBenefitTotalLimit: number | null; // 혜택 한도 (nullable)
  cardProductType: string; // 카드 종류 (신용, 체크 등)
  cardProductAnnualFee: number; // 국내 연회비
  cardProductAnnualFeeForeign: number; // 해외 연회비
  cardProductPerformance: number; // 전월 실적
  cardProductImgUrl: string; // 이미지 url
  benefits: Benefit[]; // 혜택 목록
}

export interface Accounts {
  accountUuid: string;
  accountNumber: string;
  balance: number;
}
// 카드 객체 타입 정의
export interface Card {
  id: string; //uuid 카드 식별자
  cardNumber: string; // 카드번호
  cvc: string; // CVC 코드 추가
  performanceFlag: boolean; // 실적 달성 여부
  cardLimit: number; // 카드 한도
  amount: number; // 사용 금액
  benefitUsage: number; // 사용한 혜택량
  cardProduct: CardProduct; // 카드 정보 객체
  accounts: Accounts;
}

// 카드 상태 인터페이스 정의
interface CardState {
  cardList: Card[]; // 카드 리스트 배열
  setCardList: (newCardList: Card[]) => void; // 받아온 카드 리스트를 설정하는 함수
  addCard: (card: Card) => void; // 카드 추가 함수
  removeCard: (index: number) => void; // 카드 삭제 함수
  clearCards: () => void; // 카드 리스트 초기화 함수
}

export const useCardStore = create<CardState>()(
  persist(
    (set) => ({
      cardList: [],
      setCardList: (newCardList: Card[]) => set({ cardList: newCardList }),
      addCard: (card: Card) =>
        set((state) => ({ cardList: [...state.cardList, card] })),
      removeCard: (index) =>
        set((state) => {
          const newCardList = [...state.cardList]; // Create a copy of the current cardList
          newCardList.splice(index, 1); // Remove the card at the specified index
          return { cardList: newCardList }; // Return the updated state
        }),
      clearCards: () => set(() => ({ cardList: [] })),
    }),
    {
      name: "card-storage", // localStorage에 저장될 키 이름
      getStorage: () => localStorage, // 기본적으로 localStorage에 저장
    }
  )
);
