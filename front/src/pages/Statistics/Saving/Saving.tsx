import { useState } from "react";
import { useAuthStore } from "../../../store/AuthStore";
import { useSavingStore } from "../../../store/SavingStore";
import { FirstStep, PreView, SecondStep, LastStep } from "./Saving.styles"; // LastStep 추가
import { Wrapper } from "../Statistics.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../constants/path";

const Saving = () => {
  const navigate = useNavigate();
  const { savingMode, savingAlram, setSavingAlram, setSavingMode } =
    useSavingStore();
  const [settingStep, setSettingStep] = useState<number>(1);
  const { name } = useAuthStore();

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
        <Wrapper></Wrapper>
      )}
    </>
  );
};

export default Saving;
