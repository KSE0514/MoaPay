import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  SelectView,
  Wrapper,
  Button,
  Title,
  Loading,
  Result,
  ResultBox,
  ResultBoxInner,
  CardImg,
  Content,
  Record,
  Etc,
  DotNav,
  HomeBtn,
} from "./SelectPaymentType.styles";
import { PATH } from "../../constants/path";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // ES Modules
import axios from "axios";
import { useAuthStore } from "../../store/AuthStore";
import { Swiper as SwiperInstance } from "swiper/types"; // Swiper 타입 불러오기
import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from 'swiper';  // Pagination 모듈을 swiper 패키지에서 불러오기
// import 'swiper/swiper-bundle.min.css';
import "../../../node_modules/swiper/swiper-bundle.min.css";
import ParticleCanvas from "../../components/ParticleCanvas";
interface BenefitDetail {
  discount: number; // long, 할인 금액
  point: number; // long, 적립 포인트
  cashback: number; // long, 캐시백 금액
}

interface PaymentResultCardInfo {
  paymentId: string; // UUID, 결제 ID
  cardName: string; // String, 카드 이름
  imageUrl: string; // String, 카드 이미지 URL
  cardId: string; // UUID, 카드 ID
  cardNumber: string; // String, 카드 번호
  amount: number; // long, 결제 금액
  actualAmount: number; // long, 실제 결제 금액
  performance: number; // long, 카드 성능 (혜택 관련 성능 지표)
  usedAmount: number; // long, 사용 금액
  benefitActivated: boolean; // 혜택 활성화 여부
  benefitUsage: number; // long, 혜택 사용량
  benefitDetail: BenefitDetail; // 혜택 상세 정보
}

interface AppClientResponse {
  requestId: string; // UUID, 요청 ID
  paymentId: string; // UUID, 결제 ID
  merchantName: string; // String, 가맹점 이름
  totalPrice: number; // long, 총 결제 금액
  createTime: string; // LocalDateTime, 결제 생성 시간
  usedCardCount: number; // int, 사용된 카드 개수
  paymentResultCardInfoList: PaymentResultCardInfo[]; // 결제 카드 정보 리스트
}
/**
 *
 * QR을 찍으면 해당 페이지로 이동
 * sse 구독하기 - requestId false false
 * 결제수단 선택 후 결제하기를 누르면 결제 요청을 보냄  true false
 * sse로 결제 응답이 오면 isEnd true  true true
 * 딜레이 2초 걸어서 isLoading false
 * 결과뿌리기
 *
 *
 * isLoading, isEnd
 * false false=> 결제수단 고르기
 * true false => 결제 진행중
 * true true => 결제 완료 애니메이션
 * false true => 결제 완료  창
 */
const SelectPaymentType = () => {
  const mockAppClientResponse: AppClientResponse = {
    requestId: "b2d4e9d0-7f5d-11ec-90d6-0242ac120003",
    paymentId: "a4b6f8e2-7f5d-11ec-90d6-0242ac120003",
    merchantName: "Sample Store",
    totalPrice: 150000,
    createTime: "2024-10-08T15:30:00",
    usedCardCount: 2,
    paymentResultCardInfoList: [
      {
        paymentId: "c8d5f3d1-7f5d-11ec-90d6-0242ac120003",
        cardName: "Sample Card 1",
        imageUrl: "1_신한카드_Mr.Life",
        cardId: "d9a3b1f4-7f5d-11ec-90d6-0242ac120003",
        cardNumber: "1234-5678-9012-3456",
        amount: 100000,
        actualAmount: 95000,
        performance: 500000,
        usedAmount: 100000,
        benefitActivated: true,
        benefitUsage: 5000,
        benefitDetail: {
          discount: 2000,
          point: 1500,
          cashback: 1500,
        },
      },
      {
        paymentId: "e5f6a2c7-7f5d-11ec-90d6-0242ac120003",
        cardName: "삼성카드&MILEAGE PLATINUM(스카이패스)",
        imageUrl: "2_삼성카드_&_MILEAGE_PLATINUM_(스카이패스)",
        cardId: "e7b8c6d8-7f5d-11ec-90d6-0242ac120003",
        cardNumber: "9876-5432-1098-7654",
        amount: 50000,
        actualAmount: 48000,
        performance: 2000,
        usedAmount: 50000,
        benefitActivated: true,
        benefitUsage: 2000,
        benefitDetail: {
          discount: 1000,
          point: 500,
          cashback: 500,
        },
      },
    ],
  };

  const { accessToken, id, paymentType } = useAuthStore();
  const navigate = useNavigate();

  // 쿼리 파라미터 값 읽기
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const totalPrice = searchParams.get("totalPrice");
  const categoryId = searchParams.get("categoryId");
  const merchantId = searchParams.get("merchantId");
  const QRCode = searchParams.get("QRCode");

  // 단일결제 = single , 분할결제 = multi , 분할결제 = dutch
  const [selectedPayType, setSelectedPayType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  //구독 시 필요한 id
  const storeRequestId = localStorage.getItem("reqeustId"); //저장된 결제 요청 값 => 결제 끝나고 지워야함
  const [requestId, setRequestId] = useState<string>("");

  //결제 결과
  const [paymentResult, setPaymentResult] =
    useState<AppClientResponse | null>();

  /**
   *
   * requestId가 없을 경우 발급
   */
  const settingStoreRequestId = (): string => {
    const newRequestId = uuidv4();
    localStorage.setItem("reqeustId", newRequestId);
    return newRequestId;
  };

  /**
   * sse 구독하기
   */
  useEffect(() => {
    setRequestId(
      storeRequestId !== null ? storeRequestId : settingStoreRequestId()
    );

    //페이먼트 연결
    const eventSource = new EventSource(
      `http://localhost:18010/moapay/pay/notification/subscribe/${requestId}}`
      // `api/moapay/pay/notification/subscribe/${requestId}}`
    );

    //페이 연결 열기
    eventSource.onopen = async () => {
      await console.log(
        "==============pay - SSE connection opened!=============="
      );
      console.log(eventSource);
    };

    // 'payment-completed' 이벤트를 수신할 때 실행될 로직 (이벤트 이름을 'payment-completed'로 변경)
    // 결제 완료를 보내주는 것
    eventSource.addEventListener("payment-completed", (event) => {
      console.log("Received 'sse' event:", event.data, "");
      try {
        const data = JSON.parse(event.data);
        console.log("Parsed data: ", data);
        setPaymentResult(data);

        // 결제가 완료된 후에는 loading 을 false로 변경하고
        setIsLoading(false);

        //결과를 보여줄 수 있도록 isEnd를 true로 변경
        setTimeout(() => {
          setIsEnd(true);
        }, 2000); // 2000 밀리초 = 2초
        // 결제 requestId 삭제하기
        localStorage.removeItem("requestId");
        //결과 담기
      } catch (error) {
        console.error("Data is not valid JSON:", event.data);
        // 만약 데이터가 JSON이 아니라 문자열인 경우 그대로 저장
      }
    });

    // 'sse' 이벤트를 수신할 때 실행될 로직
    eventSource.addEventListener("sse", (event) => {
      console.log("Received 'sse' event:", event.data);
      try {
        const data = JSON.parse(event.data);
        console.log("Parsed data: ", data);
      } catch (error) {
        console.error("Data is not valid JSON:", event.data);
      }
    });

    // 페이에서 에러 발생 시 실행될 로직
    eventSource.onerror = async (e) => {
      await console.log("Error with pay SSE", e);
      // 에러가 발생하면 SSE를 닫음
      eventSource.close();
    };
  }, []);

  /**
   * 결제 진행 함수
   */
  const startPay = async () => {
    if (selectedPayType == "single") {
      //카드 선택할 수 있도록 함
    } else if (selectedPayType == "multi") {
      console.log("=======================multi payment gogo=================");
      try {
        setIsLoading(true);
        const response = await axios.post(
          // `api/moapay/core/generalpay/pay`,
          `http://localhost:8765/moapay/core/generalpay/pay`,
          {
            requestId: requestId,
            orderId: orderId,
            merchantId: merchantId,
            categoryId: categoryId,
            totalPrice: totalPrice,
            memberId: id,
            cardSelectionType: "RECOMMEND",
            recommendType: paymentType, // RECOMMEND인 경우 사용, BENEFIT / PERFORM
            cardNumber: "", // FIX인 경우 사용
            cvc: "", // FIX인 경우 사용
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
      } catch (e) {
        console.log(e);
      }

      // 요청보내기
    } else if (selectedPayType == "dutch") {
      //더치페이지로 이동할때 필요한 정보 들고 가세용
    }
  };

  // DotNav를 위한 변수들
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance>(); // 초기값을 undefined로 설정
  const [activeIndex, setActiveIndex] = useState(0); // 화면에 띄워지고 있는 결과 페이지를 지정하기 위한 변수

  const handleNavClick = (index: number) => {
    swiperInstance?.slideTo(index); // swiperInstance가 존재할 때만 slideTo 호출
  };

  return (
    <Wrapper>
      <SelectView>
        <Title>MoA PaY</Title>
        <div
          className="type-btn"
          onClick={() => {
            setSelectedPayType("single");
          }}
        >
          <label className="container">
            <input checked={selectedPayType === "single"} type="checkbox" />
            <div className="checkmark"></div>
          </label>
          <p>단일결제</p>
        </div>
        <div
          className="type-btn"
          onClick={() => {
            setSelectedPayType("multi");
          }}
        >
          <label className="container">
            <input checked={selectedPayType === "multi"} type="checkbox" />
            <div className="checkmark"></div>
          </label>
          <p>추천결제</p>
        </div>
        <div
          className="type-btn"
          onClick={() => {
            setSelectedPayType("dutch");
          }}
        >
          <label className="container">
            <input checked={selectedPayType === "dutch"} type="checkbox" />
            <div className="checkmark"></div>
          </label>
          <p>더치페이</p>
        </div>
        <Button
          onClick={() => {
            startPay();
          }}
        >
          결제하기
        </Button>
      </SelectView>
      {isLoading && (
        <Loading>
          <div className="container">
            <div className="left-side">
              <div
                className={isLoading && isEnd ? "card card-fadeout" : "card "}
              >
                <div className="card-line"></div>
                <div className="buttons"></div>
              </div>
              <div className="post">
                <div className="post-line"></div>
                <div className="screen">
                  <div className={isLoading && isEnd ? "dollar " : ""}>
                    {isLoading && isEnd ? "$" : ""}
                  </div>
                </div>
                <div className="numbers"></div>
                <div className="numbers-line2"></div>
                <div className="numbers-line3"></div>
              </div>
              {!isEnd && (
                <div className="text">
                  <span>결</span>
                  <span>제</span>
                  <span>를</span>
                  <span> </span>
                  <span>진</span>
                  <span>행</span>
                  <span>중</span>
                  <span> </span>
                  <span>입</span>
                  <span>니</span>
                  <span>다</span>
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              )}
            </div>
          </div>
        </Loading>
      )}
      {isEnd && !isLoading && (
        <>
          <Result>
            <ResultBox>
              <Swiper
                onSwiper={(swiper) => setSwiperInstance(swiper)} // Swiper 인스턴스 저장
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // 슬라이드 변경 시 인덱스 업데이트
                spaceBetween={50}
                slidesPerView={1}
              >
                {mockAppClientResponse.paymentResultCardInfoList?.map(
                  (result, index) => (
                    <SwiperSlide key={index}>
                      <ResultBoxInner>
                        <div>{result.cardName}</div>
                        <CardImg>
                          <img
                            src={`/assets/image/longHeight/신용카드이미지/${result.imageUrl}.png`}
                            alt={result.cardName}
                          />
                        </CardImg>
                        <Content>
                          <Record>
                            <div>결제 금액</div>
                            <div> {result.actualAmount.toLocaleString()}원</div>
                          </Record>
                          <Record>
                            <div>받은 혜택 금액</div>
                            <div style={{ color: "#a959ff" }}>
                              {(
                                result.amount - result.actualAmount
                              ).toLocaleString()}
                              원
                            </div>
                          </Record>
                          <Record>
                            <div>실적</div>
                            <div>
                              {result.usedAmount.toLocaleString()} /{" "}
                              {result.performance.toLocaleString()}원
                            </div>
                          </Record>

                          <Etc>
                            <div>
                              {new Date().getMonth() + 1}월동안 총{" "}
                              <span>
                                {result.benefitUsage.toLocaleString()}원
                              </span>
                              의
                            </div>
                            <div>혜택을 받았어요!</div>
                          </Etc>
                        </Content>
                      </ResultBoxInner>
                    </SwiperSlide>
                  )
                )}
              </Swiper>
              {/* 하단 네브바 (점) */}
            </ResultBox>
            <DotNav>
              {mockAppClientResponse.paymentResultCardInfoList.map(
                (_, index) => (
                  <span
                    key={index}
                    onClick={() => handleNavClick(index)}
                    style={{
                      backgroundColor:
                        activeIndex === index ? "purple" : "white",
                    }}
                  ></span>
                )
              )}
            </DotNav>
            <HomeBtn
              onClick={() => {
                navigate(PATH.HOME);
              }}
            >
              <div>홈으로</div>
            </HomeBtn>
          </Result>
        </>
      )}
    </Wrapper>
  );
};
export default SelectPaymentType;
