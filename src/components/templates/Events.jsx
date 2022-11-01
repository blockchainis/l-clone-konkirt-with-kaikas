import styled from "styled-components";
import * as colors from "@styles/colors";
const Container = styled.div`
  width: 100%;
  height: 398px;
  font-size: 32px;
  padding: 40px 16px;
`;

const EventsTopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GradientSectionTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
  background: ${colors.textGradient};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ShowAllText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${colors.textSecondary};
`;

const EventCardsWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 16px;

  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const EventCardWrapper = styled.div`
  width: 320px;
  height: 200px;
  border-radius: 14px;
  justify-content: center;
  align-items: center;
  display: flex;
  background: ${colors.cardGradient};

  flex-shrink: 0;
  overflow: hidden;
`;

const EventTitles = styled.div`
  margin-top: 16px;
`;

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

const EventSubTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: ${colors.textSecondary};
`;

const EventTitle = styled.div`
  margin-top: 4px;
  font-weight: 700;
  font-size: 16px;
`;

function Events() {
  return (
    <Container>
      <EventsTopWrapper>
        <GradientSectionTitle>KONKRIT ORIGINALS</GradientSectionTitle>
        <ShowAllText>이벤트 전체보기</ShowAllText>
      </EventsTopWrapper>
      <EventCardsWrapper>
        {[1, 2, 3, 4].map((num) => (
          <div>
            <EventCardWrapper>
              <CountDownWrapper>
                <EachCountWrapper>
                  <CountText>08</CountText>
                  <UnitText>일</UnitText>
                </EachCountWrapper>
                <EachCountWrapper>
                  <CountText>08</CountText>
                  <UnitText>일</UnitText>
                </EachCountWrapper>
                <EachCountWrapper>
                  <CountText>08</CountText>
                  <UnitText>일</UnitText>
                </EachCountWrapper>
                <EachCountWrapper>
                  <CountText>08</CountText>
                  <UnitText>일</UnitText>
                </EachCountWrapper>
              </CountDownWrapper>
            </EventCardWrapper>
            <EventTitles>
              <EventSubTitle>Medistock</EventSubTitle>
              <EventTitle>메디소사이어티 NFT 프로젝트</EventTitle>
            </EventTitles>
          </div>
        ))}
      </EventCardsWrapper>
    </Container>
  );
}

export default Events;
