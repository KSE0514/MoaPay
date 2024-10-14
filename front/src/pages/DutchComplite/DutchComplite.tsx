import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/path";
import { useAuthStore } from "../../store/AuthStore";
import apiClient from "../../axios";
import { AxiosError } from "axios";

interface DutchCompliteProps {
  roomId: string; // roomId를 props로 받음
}

const DutchComplite = ({ roomId }: DutchCompliteProps) => {
  const navigate = useNavigate();
  const [roomInfo, setRoomInfo] = useState<any | null>(null); // 방 정보를 저장하는 state (타입을 any로 설정)
  const { accessToken, mode, setPaymentType } = useAuthStore();

  // 컴포넌트가 처음 마운트될 때 실행
  useEffect(() => {
    getRoomInfo();
  }, []); // roomId가 변경될 때마다 실행

  const getRoomInfo = async () => {
    try {
      const response = await apiClient.get(
        `/api/moapay/core/getDutchRoomInfo/${roomId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 Bearer 토큰 추가
          },
        }
      );
      if (response?.status === 200) {
        // JSON 데이터 그대로 저장
        const roomData = response.data;
        setRoomInfo(roomData);
      }
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
    }
  };

  // 버튼 클릭 시 실행될 함수
  const handleButtonClick = () => {
    getRoomInfo();
  };

  return (
    <div>
      {/* 방 정보를 JSON으로 그대로 출력 */}
      {roomInfo ? (
        <pre>{JSON.stringify(roomInfo, null, 2)}</pre> // JSON 데이터를 포맷팅하여 출력
      ) : (
        <p>Loading room info...</p>
      )}

      {/* 버튼 클릭 시 getRoomInfo 실행 */}
      <button onClick={handleButtonClick}>Get Room Info Again</button>
    </div>
  );
};

export default DutchComplite;
