import styled from "styled-components";
import * as colors from "@styles/colors";
import modernLionImage from "@assets/image/modern_lion_logo.png";
import Divider from "@components/atoms/Divider";
const Container = styled.div`
  margin-top: 100px;
  background-color: ${colors.bgBlack};
  padding: 16px;
  width: 100%;
`;

const ModernLionLogoImage = styled.img`
  height: 14px;
  margin-bottom: 14px;
`;

const FooterTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
`;
const FooterText = styled.span`
  color: ${colors.textSecondary};
  font-size: 14px;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 260px;
  margin-top: 26px;
`;

export default function Footer() {
  return (
    <Container>
      <ModernLionLogoImage src={modernLionImage} />
      <FooterTextWrapper>
        <FooterText>대표이사</FooterText>
        <FooterText>이두희</FooterText>
      </FooterTextWrapper>
      <FooterTextWrapper>
        <FooterText>사업자 등록번호</FooterText>
        <FooterText>393-86-02511</FooterText>
      </FooterTextWrapper>
      <FooterTextWrapper>
        <FooterText>주소</FooterText>
        <FooterText>서울 종로구 종로3길 17 디타워 16층</FooterText>
      </FooterTextWrapper>
      <FooterTextWrapper>
        <FooterText>이메일</FooterText>
        <FooterText>modernlion@modernlion.io</FooterText>
      </FooterTextWrapper>
      <FooterTextWrapper>
        <FooterText>전화번호</FooterText>
        <FooterText>02-6203-3222</FooterText>
      </FooterTextWrapper>
      <FooterLinks>
        <FooterText>이용약관</FooterText>
        <Divider />
        <FooterText>개인정보처리방침</FooterText>
        <Divider />
        <FooterText>자주묻는질문</FooterText>
      </FooterLinks>
    </Container>
  );
}
