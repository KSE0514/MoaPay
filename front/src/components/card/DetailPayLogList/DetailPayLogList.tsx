import axios from "axios";
import { useState } from "react";

import {
  Wrapper,
  Log,
  Content,
  Date,
  Detail,
} from "./DetailPayLogList.styles";

const testLog = [
  {
    '20240830': [
      {
        vendor: '롯데시네마',
        category: 'hobby',
        time: '16:07',
        payment: 2000,
      },
      {
        vendor: '쿠팡',
        category: 'shopping',
        time: '10:11',
        payment: 13000,
      },
    ],
  },
  {
    '20240829': [
      {
        vendor: '롯데시네마',
        category: 'hobby',
        time: '15:07',
        payment: 32000,
      },
    ],
  },
  {
    '20240826': [
      {
        vendor: '롯데시네마',
        category: 'hobby',
        time: '16:07',
        payment: 2000,
      },
      {
        vendor: '쿠팡',
        category: 'shopping',
        time: '10:11',
        payment: 13000,
      },
    ],
  },
  {
    '20240825': [
      {
        vendor: '롯데시네마',
        category: 'hobby',
        time: '16:07',
        payment: 2000,
      },
      {
        vendor: '쿠팡',
        category: 'shopping',
        time: '10:11',
        payment: 13000,
      },
    ],
  },
];

const DetailPayLogList = () => {
  const [cardHistory, setCardHistory] = useState(testLog);

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
              {logs.map((logItem, logIndex) => (
                <Content key={logIndex}>
                  <div>
                    {/* <img src="" alt="" /> */}
                    <div></div>
                    <Detail>
                      <div>{logItem.vendor}</div>
                      <div>{logItem.time}</div>
                      <div>{logItem.payment.toLocaleString()}원</div>
                    </Detail>
                  </div>
                  <hr />
                </Content>
              ))}
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
