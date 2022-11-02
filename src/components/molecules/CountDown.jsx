import styled from "styled-components";
import useCountDown from "@components/hooks/useCountDown";

const CountDownWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;
const EachCountWrapper = styled.div`
  display: flex;
`;
const CountText = styled.div`
  font-family: MarkPro-Heavy;
  font-size: 36px;
  line-height: 45.63px;
  align-self: flex-start;
`;

const UnitText = styled.div`
  font-size: 18px;
  line-height: 27px;
  align-self: flex-end;
`;

export default function CountDown() {
  const { days, hours, minutes, seconds, isClosed, isComingSoon } =
    useCountDown(new Date(2022, 11, 29));
  return (
    <CountDownWrapper>
      <EachCountWrapper>
        <CountText>{days}</CountText>
        <UnitText>일</UnitText>
      </EachCountWrapper>
      <EachCountWrapper>
        <CountText>{hours}</CountText>
        <UnitText>일</UnitText>
      </EachCountWrapper>
      <EachCountWrapper>
        <CountText>{minutes}</CountText>
        <UnitText>일</UnitText>
      </EachCountWrapper>
      <EachCountWrapper>
        <CountText>{seconds}</CountText>
        <UnitText>일</UnitText>
      </EachCountWrapper>
    </CountDownWrapper>
  );
}
