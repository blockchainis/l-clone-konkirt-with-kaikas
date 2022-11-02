import styled, { keyframes } from "styled-components";
import * as colors from "@styles/colors";
import SectionLayout from "@components/molecules/SectionLayout";
import HideScrollX from "@components/molecules/HideScrollX";
import EventCard from "@components/organisms/EventCard";

const EventsTopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const shine = keyframes`
  from {
    background-position: 0%;
   
  }
  to {
    background-position: 200%;
  
  }
`;

const GradientSectionTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
  background: ${colors.textGradient};
  background-clip: text;
  background-size: 200% auto;
  background-position: 200%;
  animation: ${shine} 4s linear infinite;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
`;

const ShowAllText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${colors.textSecondary};
`;

function Events() {
  return (
    <SectionLayout>
      <EventsTopWrapper>
        <GradientSectionTitle>KONKRIT ORIGINALS</GradientSectionTitle>
        <ShowAllText>이벤트 전체보기</ShowAllText>
      </EventsTopWrapper>
      <HideScrollX>
        {[1, 2, 3, 4].map((num) => (
          <EventCard key={num} />
        ))}
      </HideScrollX>
    </SectionLayout>
  );
}

export default Events;
