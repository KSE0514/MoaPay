import { useState } from "react";
import { useAuthStore } from "../../../store/AuthStore";
import { useSavingStore } from "../../../store/SavingStore";
import {
  FirstStep,
  PreView,
  SecondStep,
  LastStep,
  AlramModal,
  Wrapper,
} from "./Saving.styles"; // LastStep 추가
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../constants/path";
import SmallBarGraph from "../../../components/statistics/Chart/BarGraph/SmallBarGraph";

const Saving = () => {
  const navigate = useNavigate();
  const { savingMode, savingAlram, setSavingAlram, setSavingMode } =
    useSavingStore();
  const [settingStep, setSettingStep] = useState<number>(1);
  const { name } = useAuthStore();
  const [consumptionList] = useState<number[]>([
    20000, 14000, 5000, 10140, 12100, 13563, 53019,
  ]);
  return (
    <>
      {savingMode == false ? (
        <PreView>
          {settingStep !== 3 ? (
            <header>
              <div
                onClick={() => {
                  navigate(PATH.HOME);
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </div>
            </header>
          ) : (
            <></>
          )}

          {settingStep === 1 ? (
            <FirstStep>
              <div className="title">
                도전!
                <br />
                이번 달 소비 줄이기
              </div>
              <div className="sub">
                <img src="/assets/image/prinre.png" />
                <p className="name">모아 공주</p>
                <p>
                  {name}님이 돈을 덜 쓰도록, <br />
                  제가 도와드릴게요
                </p>
              </div>
              <div className="bottom">
                <button
                  onClick={() => {
                    setSettingStep(2);
                  }}
                >
                  시작하기
                </button>
              </div>
            </FirstStep>
          ) : settingStep === 2 ? (
            <SecondStep>
              <div className="sub">
                <img src="/assets/image/prinreface.png" />
                <p className="name">모아 공주</p>
                <p>
                  목표금액을 설정해볼까요? <br />
                  저번 달엔 {300000}원 사용했어요.
                </p>
              </div>
              <div className="setting-price">
                <p>목표금액</p>
                <div>
                  <input />
                  <span>만원</span>
                </div>
              </div>
              <div className="bottom">
                <button
                  onClick={() => {
                    setSettingStep(3);
                  }}
                >
                  설정하기
                </button>
              </div>
            </SecondStep>
          ) : settingStep === 3 ? (
            <LastStep>
              <p>
                목표설정 완료 !<br />
                {name}님은 분명 성공할거예요!
              </p>
              <div className="bottom">
                <button
                  onClick={() => {
                    setSavingMode(true);
                  }}
                >
                  이동하기
                </button>
              </div>
            </LastStep>
          ) : (
            <></>
          )}
        </PreView>
      ) : (
        <Wrapper>
          {savingAlram === null && (
            <AlramModal className={savingAlram === false ? "close" : ""}>
              <p>
                {name}님이 돈을 많이 쓰면
                <br />
                알려드릴까요?{" "}
              </p>
              <img src="/assets/image/prinreface.png" />
              <button
                onClick={() => {
                  setSavingAlram(true);
                }}
                style={{ backgroundColor: "#DB94EF" }}
              >
                동의하고 알림받기
              </button>
              <button
                onClick={() => {
                  setSavingAlram(false);
                }}
              >
                닫기
              </button>
            </AlramModal>
          )}
          <>
            <div className="choice-week">
              <FontAwesomeIcon
                icon={faCaretLeft}
                style={{ fontSize: "18px" }}
              />
              <p>1월 첫째 주</p>
              <FontAwesomeIcon
                icon={faCaretRight}
                style={{ fontSize: "18px" }}
              />
            </div>
            <div className="total">
              <p>한 주 동안</p>
              <p>42,600원 썼어요</p>
            </div>
            <div className="avg">
              <p>하루 평균 결제💸</p>
              <p>6,085원</p>
            </div>
            <SmallBarGraph consumptionList={consumptionList} />
          </>
        </Wrapper>
      )}
    </>
  );
};

export default Saving;
