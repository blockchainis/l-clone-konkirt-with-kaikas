import styled from "styled-components";
import useCountDown from "@hooks/useCountDown";

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

function formatCount(count) {
  if (count < 10 && count > 0) {
    return `0${count}`;
  }
  return `${count}`;
}

export default function CountDown({targetDate}) {
  //month같은 경우에는 index이기때문에 11월 => 10으로 작성해주셔야 합니다.
  const { days, hours, minutes, seconds } = useCountDown(targetDate);

  return (
    <CountDownWrapper>
      <EachCountWrapper>
        <CountText>{formatCount(days)}</CountText>
        <UnitText>일</UnitText>
      </EachCountWrapper>
      <EachCountWrapper>
        <CountText>{formatCount(hours)}</CountText>
        <UnitText>시</UnitText>
      </EachCountWrapper>
      <EachCountWrapper>
        <CountText>{formatCount(minutes)}</CountText>
        <UnitText>분</UnitText>
      </EachCountWrapper>
      <EachCountWrapper>
        <CountText>{formatCount(seconds)}</CountText>
        <UnitText>초</UnitText>
      </EachCountWrapper>
    </CountDownWrapper>
  );
}
