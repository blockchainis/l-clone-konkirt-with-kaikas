import styled from "styled-components";
import * as colors from "@styles/colors";
import WalletSmall from "@components/atoms/WalletSmall";
// imageUrls
import metamaskImageUrl from "@assets/image/metamask.png";
import kaikasImageUrl from "@assets/image/kaikas.png";
import klipImageUrl from "@assets/image/klip.png";

const WalletDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 40px;
  border-radius: 20px;
  font-weight: 700;
  background-color: ${colors.bgSecondary};
  cursor: pointer;
`;

const WalletDivSmall = styled(WalletDiv)`
  width: 110px;
`;

const WalletImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${colors.bgBlack};
  margin-right: 0px;
  cursor: pointer;
`;
const WalletImageWrapperYellow = styled(WalletImageWrapper)`
  background-color: ${colors.textYellow};
`;
const WalletButtonSpan = styled.span`
  margin-left: 6px;
  font-weight: 700;
  font-size: 14px;
`;

const WalletImageStyle = styled.img`
  width: 14px;
  height: 14px;
`;

/**
 * 로그인 후 버튼에 표시할 지갑 이미지
 */
const WalletImage = (wallet) => {
  switch (wallet) {
    case "kaikas":
      return <WalletImageStyle src={kaikasImageUrl} />;
    case "metamask":
      return <WalletImageStyle src={metamaskImageUrl} />;
    case "Klip":
      return <WalletImageStyle src={klipImageUrl} />;
    default:
      return;
  }
};

export default function WalletBox({ user, handleDone, handleLogin } = {}) {
  return (
    <div>
      {user.account ? (
        <WalletDiv onClick={handleDone}>
          <WalletImageWrapper>{WalletImage(user.wallet)}</WalletImageWrapper>
          <WalletButtonSpan>
            {user.account.slice(0, 4) + "..." + user.account.slice(38, 42)}
            &nbsp;&nbsp;
          </WalletButtonSpan>
        </WalletDiv>
      ) : (
        <WalletDivSmall onClick={handleLogin}>
          <WalletImageWrapperYellow>
            <WalletSmall />
          </WalletImageWrapperYellow>
          <WalletButtonSpan>Connect&nbsp;&nbsp;</WalletButtonSpan>
        </WalletDivSmall>
      )}
    </div>
  );
}
