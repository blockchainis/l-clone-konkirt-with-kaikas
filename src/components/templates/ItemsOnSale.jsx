import styled from "styled-components";
import * as colors from "@styles/colors";
const Container = styled.div`
  width: 100%;
  height: 394px;
  padding: 40px 16px;
  background-color: blue;
`;

const SectionTopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
`;
const ShowAllText = styled.span`
  font-size: 14px;
  color: ${colors.textSecondary};
  margin-right: 4px;
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

const CardWrapper = styled.div`
  border-radius: 16px;
  flex-shrink: 0;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
  vertical-align: middle;
`;

const InfoBox = styled.div`
  width: 150px;
  height: 73px;
  padding: 16px;
  background-color: ${colors.bgSecondary};
`;

const PriceBox = styled.div`
  padding: 8px 16px 16px 16px;
  width: 150px;
  height: 50px;
  background-color: ${colors.bgSecondary};
`;

const CollectionTitle = styled.div`
  font-size: 12px;
  color: ${colors.textSecondary};
`;

const Title = styled.div`
  font-family: MarkPro-Heavy;
  font-size: 14px;
  margin-top: 4px;
`;
const Wrapper = styled.div`
  background-color: ${colors.bgSecondary};
`;

function ItemsOnSale() {
  return (
    <Container>
      <SectionTopWrapper>
        <SectionTitle>지금 판매중인 아이템</SectionTitle>
        <ShowAllText>아이템 전체보기</ShowAllText>
      </SectionTopWrapper>
      <EventCardsWrapper>
        <CardWrapper>
          <CardImage src="https://konkrit-prod-itemmedia-t837t51tz51i.s3.ap-northeast-2.amazonaws.com/0x1fec856e25f757fed06eb90548b0224e91095738/0x1fec856e25f757fed06eb90548b0224e91095738-6741.png"></CardImage>

          <InfoBox>
            <CollectionTitle>
              FrankenPunksFrankenPunksFrankenPunksFrankenPunks FrankenPunks
            </CollectionTitle>
            <Title>#6741</Title>
          </InfoBox>
          <PriceBox></PriceBox>
        </CardWrapper>
      </EventCardsWrapper>
    </Container>
  );
}

export default ItemsOnSale;
