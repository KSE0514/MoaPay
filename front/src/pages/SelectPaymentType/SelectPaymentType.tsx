import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { SelectView, Wrapper, Button, Title } from "./SelectPaymentType.styles";
import { PATH } from "../../constants/path";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // ES Modules
import axios from "axios";
import { useAuthStore } from "../../store/AuthStore";

/**
 *
 * QR을 찍으면 해당 페이지로 이동
 * sse 구독하기 - requestId
 * 결제수단 선택 후 결제하기를 누르면 결제 요청을 보냄
 * 이때 isLoding 페이지로 변경
 * sse로 결제 응답이 오면 isLoding faslse
 * 결과뿌리기
 */
const SelectPaymentType = () => {
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
      //  `api/moapay/pay/notification/subscribe/${requestId}}`
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
        // 수신된 데이터를 상태에 추가

        // 결제가 완료된 후에는 loading 을 false로 변경하고
        setIsLoading(false);
        //결과를 보여줄 수 있도록 isEnd를 true로 변경
        setIsEnd(true);
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
      //
    }
  };

  return (
    <Wrapper>
      {isLoading ? (
        <>
          <div>결제 진행 중입니다.</div>
        </>
      ) : (
        <>
          {isEnd ? (
            <>
              <div>결제완료창</div>
            </>
          ) : (
            <>
              <SelectView>
                <Title>MoA Pay</Title>
                <div
                  onClick={() => {
                    setSelectedPayType("single");
                  }}
                >
                  단일결제
                </div>
                <div
                  onClick={() => {
                    setSelectedPayType("multi");
                  }}
                >
                  추천결제
                </div>
                <div
                  onClick={() => {
                    setSelectedPayType("dutch");
                  }}
                >
                  더치페이
                </div>
              </SelectView>
              <button
                onClick={() => {
                  startPay();
                }}
              >
                결제하기
              </button>
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};
export default SelectPaymentType;
