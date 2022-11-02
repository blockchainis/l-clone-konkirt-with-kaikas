import styled from "styled-components";
import SectionLayout from "@components/molecules/SectionLayout";
import SectionTop from "@components/molecules/SectionTop";

import onBoardNftImage from "@assets/image/onboard_nft.png";
import onBoardKonkritImage from "@assets/image/onboard_konkrit.png";
import onBoardWalletImage from "@assets/image/onboard_wallet.png";
import onBoardFaqImage from "@assets/image/onboard_faq.png";

const OnBoardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 24px;
  gap: 24px;
  width: 100%;
`;

const OnBoardImage = styled.img`
  display: block;
  margin-bottom: 8px;
  width: 100%;
`;

const OnBoardText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const onBoardData = [
  { id: 1, imgUrl: onBoardNftImage, title: "NFT란?" },
  { id: 2, imgUrl: onBoardWalletImage, title: "지갑 생성 및 연결하기" },
  { id: 3, imgUrl: onBoardKonkritImage, title: "KONKRIT 이용방법" },
  { id: 4, imgUrl: onBoardFaqImage, title: "자주 묻는 질문" },
];

export default function OnBoarding() {
  return (
    <SectionLayout>
      <SectionTop
        title="KONKRIT, 이렇게 사용하세요!"
        showAll="가이드 전체보기"
      />
      <OnBoardList>
        {onBoardData.map((data) => (
          <li key={data.id}>
            <OnBoardImage src={data.imgUrl} />
            <OnBoardText>{data.title}</OnBoardText>
          </li>
        ))}
      </OnBoardList>
    </SectionLayout>
  );
}

