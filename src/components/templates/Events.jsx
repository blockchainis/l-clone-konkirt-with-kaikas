import styled, { keyframes } from "styled-components";
import * as colors from "@styles/colors";
import SectionLayout from "@components/molecules/SectionLayout";
import HideScrollX from "@components/molecules/HideScrollX";
import EventCard from "@components/molecules/EventCard";
import eventImageOne from "@assets/image/event_one.png";
import eventImageTwo from "@assets/image/event_two.png";
import eventImageThree from "@assets/image/event_three.png";

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

const eventData = [
  {
    id: 1,
    imgUrl: eventImageOne,
    title: "메디소사이어티 NFT 프로젝트",
    subtitle: "Medistock",
    targetDate: new Date(2022, 10, 11),
  },
  {
    id: 2,
    imgUrl: eventImageTwo,
    title: "아티스트 Ohnim 프로젝트",
    subtitle: "YG K+",
  },
  {
    id: 3,
    imgUrl: eventImageThree,
    title: "아비투스 프리미엄 골프 멤버십 NFT",
    subtitle: "Habitus",
  },
];

function Events() {
  return (
    <SectionLayout>
      <EventsTopWrapper>
        <GradientSectionTitle>KONKRIT ORIGINALS</GradientSectionTitle>
        <ShowAllText>이벤트 전체보기</ShowAllText>
      </EventsTopWrapper>
      <HideScrollX>
        {eventData.map((event) => (
          <EventCard {...event} key={event.id} />
        ))}
      </HideScrollX>
    </SectionLayout>
  );
}

export default Events;
