import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat, faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Top,
  Bottom,
  BarcordArea,
  Barcord,
  Time,
  ButtonArea,
  Wrapper,
  CardList,
  PlusIcon,
  QrContainer,
} from "./Home.styles";
import Modal from "../../components/dutch/Modal/Modal";
import barcode from "../../assets/image/barcode.png";
import { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { Card, useCardStore } from "../../store/CardStore";

const Home = () => {
  const navigate = useNavigate();
  const { cardWithDividPay, cardWithNullName, cardList } = useCardStore();
  const [showCards, setShowCards] = useState<Card[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false); // 카메라 상태 추가
  const [qrResult, setQrResult] = useState<string | null>(null); // QR 코드 결과 추가
  const qrScannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false); // QR 모달창 열림 닫힘 여부
  const [rotate, setRotate] = useState<{ [key: number]: boolean }>({}); // 이미지 회전 여부 저장

  // 이미지 로드 후 크기를 비교하여 회전 여부 결정

  let startY = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    startY = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endY = e.changedTouches[0].clientY;
    const deltaY = startY - endY;

    if (deltaY > 30) {
      handleSlideUp();
    } else if (deltaY < -30) {
      handleSlideDown();
    }
  };

  const handleSlideUp = () => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".card");
      if (cards.length > 0) {
        containerRef.current.append(cards[0]);
      }
    }
  };

  const handleSlideDown = () => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".card");
      if (cards.length > 0) {
        containerRef.current.prepend(cards[cards.length - 1]);
      }
    }
  };

  const onclose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const cardArray: Card[] = [];

    // cardWithNullName과 cardWithDividPay를 배열에 추가

    cardArray.push(cardWithNullName);
    cardArray.push(cardWithDividPay);

    // cardList의 모든 카드를 배열에 추가
    cardArray.push(...cardList);

    // showCards 상태 업데이트
    setShowCards(cardArray); // 상태 불변성을 유지하며 새 배열로 설정
  }, []);
  useEffect(() => {}, [showCards]); // showCards가 변경될 때마다 실행
  // 카메라 켜기
  const handleToggleCamera = () => {
    setIsCameraOn((prevState) => !prevState);
    setIsOpen(true); // 이걸로 할 건지 위에 걸로 할 건지 고르기
  };

  // QR 코드 스캐너 초기화
  useEffect(() => {
    if (isCameraOn && !qrScannerRef.current) {
      console.log("카메라가 켜졌습니다."); // 디버깅 로그
      qrScannerRef.current = new Html5QrcodeScanner(
        "qr-reader", // 첫 번째 인자: HTML element id
        {
          fps: 10,
          qrbox: 250,
        },
        false // 세 번째 인자: verbose를 false로 설정 (로그 최소화)
      );
      qrScannerRef.current.render(
        (decodedText) => {
          console.log("QR 코드 인식 성공:", decodedText); // 디버깅 로그
          setQrResult(decodedText); // QR 코드 결과를 상태에 저장
          setIsCameraOn(false); // QR 코드 인식 후 카메라 끔

          // QR 코드 결과가 URL일 경우 해당 페이지로 이동
          if (isValidUrl(decodedText)) {
            window.location.href = decodedText;
          }
        },
        (error) => {
          console.log("QR 코드 인식 실패:", error); // 디버깅 로그
        }
      );
    }

    // DOM 요소 텍스트 수정
    const updateQrScannerText = () => {
      // 'Scan an Image File' 텍스트 수정 (잘 적용된 부분)
      const scanTypeSpan = document.getElementById(
        "html5-qrcode-anchor-scan-type-change"
      );
      if (scanTypeSpan) {
        scanTypeSpan.innerText = "다른 방식으로 스캔하기";
      }

      // 'Start Scanning' 버튼 텍스트 수정
      const startScanButton = document.getElementById(
        "html5-qrcode-button-camera-start"
      );
      if (startScanButton) {
        startScanButton.innerText = "스캔 시작하기";
      }

      // 'Stop Scanning' 버튼 텍스트 수정
      const stopScanButton = document.getElementById(
        "html5-qrcode-button-camera-stop"
      );
      if (stopScanButton) {
        stopScanButton.innerText = "스캔 중지하기";
      }

      // 'Choose Image - No image chosen' 텍스트 수정
      const ScanButton = document.getElementById(
        "html5-qrcode-button-camera-permission"
      );
      if (ScanButton) {
        ScanButton.innerText = "QR 스캔하기";
      }

      // 'Choose Image - No image chosen' 텍스트 수정
      const fileButton = document.getElementById(
        "html5-qrcode-button-file-selection"
      );
      if (fileButton) {
        fileButton.innerText = "이미지 선택하기";
      }

      // 'Or drop an image to scan' 텍스트 수정
      const fileScanLabel = document.querySelector(
        '#qr-reader__dashboard_section_csr div[style*="Or drop an image"]'
      );
      if (fileScanLabel) {
        fileScanLabel.textContent = "또는 이미지를 끌어다 놓으세요";
      }

      // MutationObserver를 사용하여 'Requesting camera permissions...' 텍스트 변경 감지
      const cameraPermissionMessage = document.getElementById(
        "qr-reader__header_message"
      );
      if (cameraPermissionMessage) {
        cameraPermissionMessage.innerText = "카메라 권한 요청 중...";
      }

      // MutationObserver 생성
      const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach((mutation) => {
          if (
            mutation.type === "childList" ||
            mutation.type === "attributes" ||
            mutation.type === "characterData"
          ) {
            const cameraPermissionMessage = document.getElementById(
              "qr-reader__header_message"
            );
            if (
              cameraPermissionMessage &&
              cameraPermissionMessage.innerText.includes("Requesting")
            ) {
              cameraPermissionMessage.innerText = "카메라 권한 요청 중...";
            }
          }
        });
      });

      // DOM 변화를 감시할 대상 설정
      const targetNode = document.getElementById("qr-reader");
      if (targetNode) {
        observer.observe(targetNode, {
          childList: true,
          subtree: true,
        });
      }

      // 컴포넌트가 언마운트될 때 MutationObserver 해제
      return () => observer.disconnect();
    };

    // 요소가 비동기적으로 렌더링될 수 있으므로 약간의 지연 후 텍스트 수정
    const intervalId = setInterval(() => {
      updateQrScannerText();
    }, 500);

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.clear();
        qrScannerRef.current = null;
        console.log("카메라가 종료되었습니다."); // 디버깅 로그
      }
      clearInterval(intervalId); // 컴포넌트가 언마운트될 때 타임아웃 제거
    };
  }, [isCameraOn]);

  // URL 유효한지 검사
  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <Wrapper>
      <Top className="top">
        <BarcordArea>
          <Barcord>
            <img src={barcode} alt="barcode" />
          </Barcord>
          <Time>
            <div>2:04</div>
            <button>
              <FontAwesomeIcon icon={faRepeat} />
            </button>
          </Time>
        </BarcordArea>
        <ButtonArea>
          <button onClick={handleToggleCamera}>QR 인식하기</button>
          <button>결제코드 입력하기</button>
        </ButtonArea>
      </Top>
      <Bottom>
        <div className="edit-card">
          <FontAwesomeIcon icon={faBars} />
          <p>편집</p>
        </div>
        <CardList>
          <div
            className="container"
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {showCards.map((card, index) =>
              card.id == "add-card" ? (
                <div
                  onClick={() => {
                    navigate("/add-card");
                  }}
                  className="card add-card"
                  key={index}
                >
                  <div>
                    <PlusIcon icon={faPlus} />
                  </div>
                  <p>카드 등록하기</p>
                </div>
              ) : card.id === "recommended-card" ? (
                <div className="card recommended-card" key={index}>
                  <img src={`/assets/image/card.png`} alt={`card-${index}`} />
                </div>
              ) : (
                <div className="card" key={index}>
                  <img
                    src={`/assets/image/longWidth/신용카드이미지/${card.cardProduct.cardProductImgUrl}.png`}
                    alt={`card-${index}`}
                  />
                </div>
              )
            )}
          </div>
        </CardList>
        <div className="remaining-performance">다음 실적까지 100,000원</div>
        <div className="tri tri-left"></div>
        <div className="tri tri-right"></div>
      </Bottom>

      {/* 모달 */}
      <Modal isOpen={isOpen} onClose={onclose}>
        {/* 카메라가 켜졌을 때 QR 코드 스캐너 표시 */}
        {isCameraOn && (
          <QrContainer id="qr-reader" style={{ width: "100%" }}></QrContainer>
        )}

        {/* QR 코드 인식 결과 표시 */}
        {qrResult && <div>QR 코드 결과: {qrResult}</div>}
      </Modal>
    </Wrapper>
  );
};

export default Home;
