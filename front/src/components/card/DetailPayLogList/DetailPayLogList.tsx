import axios from "axios";
import { useState, useRef, useEffect } from "react";

import {
  Wrapper,
  Log,
  Content,
  Date,
  Detail,
} from "./DetailPayLogList.styles";

type LogItem = {
  vendor: string;
  category: string;
  time: string;
  payment: number;
};

type LogByDate = {
  [key: string]: LogItem[]; // key는 string으로 된 날짜, 값은 LogItem 배열
};

const testLog: LogByDate[] = [
  {
    '20240830': [
      { vendor: '롯데시네마', category: '취미', time: '16:07', payment: 2000 },
      { vendor: '쿠팡', category: '쇼핑', time: '10:11', payment: 13000 },
    ],
  },
  {
    '20240829': [
      { vendor: '롯데시네마', category: '취미', time: '15:07', payment: 32000 },
    ],
  },
  {
    '20240826': [
      { vendor: '롯데시네마', category: '취미', time: '16:07', payment: 2000 },
      { vendor: '쿠팡', category: '쇼핑', time: '10:11', payment: 13000 },
    ],
  },
  {
    '20240825': [
      { vendor: '롯데시네마', category: '취미', time: '16:07', payment: 2000 },
      { vendor: '쿠팡', category: '쇼핑', time: '10:11', payment: 13000 },
    ],
  },
];

const DetailPayLogList = () => {
  const [cardHistory, setCardHistory] = useState<LogByDate[]>(testLog); // 카드 결제 내역을 받을 변수
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]); // 여러 이미지를 참조하는 배열

  useEffect(() => {
    imgRefs.current.forEach((imgElement) => {
      if (imgElement) {
        // 이미지의 naturalWidth와 naturalHeight를 사용하여 크기를 조정
        const naturalWidth = imgElement.naturalWidth;
        const naturalHeight = imgElement.naturalHeight;

        if (naturalWidth > 50 || naturalHeight > 50) {
          // 너비 또는 높이가 50px 이상인 경우 가로 55%로 설정
          imgElement.style.width = "60%";
          imgElement.style.height = "auto"; // 높이를 자동으로 조정하여 비율 유지
        } else {
          // 너비와 높이가 모두 50px 이하인 경우 세로 55%로 설정
          imgElement.style.height = "60%";
          imgElement.style.width = "auto"; // 너비는 자동으로 조정하여 비율 유지
        }
      }
    });
  }, [cardHistory]); // cardHistory가 변경될 때마다 실행

  const getCardHistory = async (year: number, month: number) => {
    try {
      const response = await axios.get(`요청 api 주소 입력`, {
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true, // 쿠키를 포함하여 요청 <--- 필요한가?
      });
      if (response.status === 200) {
        console.log("삭제 완료");
      }
    } catch (err) {
      console.error("에러 발생", err);
    }
  };

  return (
    <Wrapper>
      {cardHistory.length > 0 ? (
        cardHistory.map((dateLog, index) => {
          // 날짜를 key로 추출
          const date = Object.keys(dateLog)[0];
          const month = date.slice(4, 6);
          const day = date.slice(6, 8);
          const logs = dateLog[date];

          return (
            <Log key={index}>
              <Date>{month}월 {day}일</Date>
              {logs.map((logItem: LogItem, logIndex: number) => {
                // index + logIndex로 고유한 인덱스 생성
                const refIndex = index * 100 + logIndex;

                return (
                  <Content key={logIndex}>
                    <div>
                      <div style={{ backgroundColor: 'pink' }}>
                        <img
                          ref={(el) => (imgRefs.current[refIndex] = el)} // 고유한 인덱스 할당
                          src={`/assets/image/category/${logItem.category}.png`}
                          alt=""
                        />
                      </div>
                      <Detail>
                        <div>{logItem.vendor}</div>
                        <div>{logItem.time}</div>
                        <div>{logItem.payment.toLocaleString()}원</div>
                      </Detail>
                    </div>
                    <hr />
                  </Content>
                );
              })}
            </Log>
          );
        })
      ) : (
        <div>결제 내역이 없습니다.</div>
      )}
    </Wrapper>
  );
};

export default DetailPayLogList;
