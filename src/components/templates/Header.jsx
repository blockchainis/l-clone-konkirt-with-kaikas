import styled from "styled-components";
import SearchIcon from "@components/atoms/SearchIcon";
import Logo from "@components/atoms/Logo";
import HamburgerIcon from "@components/atoms/HamburgerIcon";
import * as colors from "@styles/colors";
import Wallet from "@components/atoms/Wallet";
import KaiKas_image from "@assets/image/kaikas.png";

const Container = styled.header`
  width: 100%;
  height: 64px;
  background-color: ${colors.bgBlack};
  position: fixed;
  top: 0px;
  display: flex;
  padding: 0px 16px;
  align-items: center;
  z-index: 999;
`;

const LogoWrapper = styled.div`
  margin-right: 16px;
  display: flex;
  align-items: center;
`;

const SearchBarWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  align-items: center;
  border-left-width: 1px;
  border-color: hsla(0, 0%, 100%, 0.12);
  border-style: solid;
`;

const GrayRoundBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${colors.bgSecondary};
`;

const WalletBox = styled(GrayRoundBox)`
  background-color: ${colors.textYellow};
  margin-right: 8px;
`;

const SearchIconWrapper = styled.div`
  margin-left: 16px;
`;

function Header() {
  return (
    <Container>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <SearchBarWrapper>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
      </SearchBarWrapper>
      <WalletBox>
        <Wallet />
      </WalletBox>
      <GrayRoundBox>
        <HamburgerIcon />
      </GrayRoundBox>
    </Container>
  );
}

export default Header;
