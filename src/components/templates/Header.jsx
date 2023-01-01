import { useState } from "react";
import styled from "styled-components";
import * as colors from "@styles/colors";
import useAuth from "@hooks/useAuth";
import axios from "axios";
// atoms
import Logo from "@components/atoms/Logo";
import SearchIcon from "@components/atoms/SearchIcon";
import HamburgerIcon from "@components/atoms/HamburgerIcon";
// molecules
import WalletModal from "@components/molecules/WalletModal";
import WalletBox from "@components/molecules/WalletBox";
// imageUrls
import metamaskImageUrl from "@assets/image/metamask.png";
import kaikasImageUrl from "@assets/image/kaikas.png";
import klipImageUrl from "@assets/image/klip.png";
// toast
import { toast } from "react-toastify";
// web3
import Caver from "caver-js";
import { v4 } from "uuid";

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
  margin-left: 7px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${colors.bgSecondary};
`;

const SearchIconWrapper = styled.div`
  margin-left: 16px;
`;

function Header() {
  const { user, setUser } = useAuth();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenLoadingModal, setIsOpenLoadingModal] = useState(false);
  const [loadingTitle, setLoadingTitle] = useState("");
  const { klaytn, ethereum } = window;

  /**
   * 0. 카이카스 로그인 버튼
   */
  async function loginWithKaikas() {
    var isConnected = await connectWithKaikas();
    //connect완료 될 경우 sign진행
    if (isConnected) {
      await signWithKaikas();
    }
  }

  /**
   * 1. 카이카스 <-> 웹사이트 connect 확인
   * @returns bool
   */
  async function connectWithKaikas() {
    if (!klaytn) {
      toast.error("kaikas 설치 해주세요!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    setLoadingTitle("연결중...");
    setIsOpenModal(false);
    setIsOpenLoadingModal(true);

    try {
      const accounts = await toast.promise(
        klaytn.enable(),
        {
          pending: "Kaikas 지갑 연동 중",
        },
        { closeButton: true }
      );

      // toast.success(`${accounts[0].slice(0, 13)} -> Connect 완료`);
      setIsOpenLoadingModal(false);
      setIsOpenModal(true);

      return true;
    } catch {
      toast.error("로그인 실패..! 다시 시도해주세요~^^");
      return;
    }
  }

  /**
   * 2. 카이카스 서명
   */
  async function signWithKaikas() {
    setLoadingTitle("NFT 확인중...");
    setIsOpenModal(false);
    setIsOpenLoadingModal(true);

    const caver = new Caver(window.klaytn);
    const contractAddress = "0xd643bb39f81ff9079436f726d2ed27abc547cb38";
    const chainId = "8217"; //klaytn Mainnet
    const message = "contract address : " + contractAddress;

    // 지갑 네트워크와 조회하려는 NFT의 네트워크가 같은지 체크
    if (String(window.klaytn.networkVersion) !== chainId) {
      toast.warn(
        `네트워크를 클레이튼 메인넷 (8217) 으로 변경해주세요. 현재 network : ${window.klaytn.networkVersion}`
      );
      setIsOpenLoadingModal(false);
      return;
    }

    let signObj;

    try {
      signObj = await toast.promise(
        caver.klay.sign(message, window.klaytn.selectedAddress),
        {
          pending: "NFT 확인중...",
        },
        { closeButton: true, position: toast.POSITION.TOP_CENTER }
      );
      // 홀더인증 API (fastdive)
      verifyHolder(
        signObj,
        message,
        window.klaytn.selectedAddress,
        contractAddress,
        window.klaytn.networkVersion,
        "kaikas",
        true
      );
    } catch (e) {
      toast.error("로그인 실패..! 다시 시도해주세요~^^");
      setIsOpenModal(true);
      setIsOpenLoadingModal(false);
      console.log(e);
      return;
    }
  }

  /**
   * 0. 메타마스크 로그인 버튼
   * @returns
   */
  async function loginWithMetamask() {
    var isConnected = await connectWithMetamask();
    //connect완료 될 경우 sign진행
    if (isConnected) {
      await signWithMetamask();
    } else {
      return false;
    }
  }

  /**
   * 1. 메타마스크 <-> 웹사이트 connect 확인
   * @returns bool
   */
  async function connectWithMetamask() {
    if (typeof window.ethereum !== "undefined") {
    } else {
      toast.error("Metamask 설치 해주세요!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }

    setIsOpenModal(false);
    setLoadingTitle("연결중...");
    setIsOpenLoadingModal(true);

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      // toast.success(`${accounts[0].slice(0, 13)} -> Connect 완료`);
      setIsOpenLoadingModal(false);
      setIsOpenModal(true);
      return true;
    } catch (e) {
      // alert("connect failed");
      return false;
    }
  }

  /**
   * 2. 메타마스크 서명
   */
  async function signWithMetamask() {
    setLoadingTitle("NFT 확인중...");
    setIsOpenModal(false);
    setIsOpenLoadingModal(true);

    const contractAddress = "0xd643bb39f81ff9079436f726d2ed27abc547cb38";
    const chainId = "8217"; //klaytn Mainnet
    const message = "contract address : " + contractAddress;

    // 지갑 네트워크와 조회하려는 NFT의 네트워크가 같은지 체크
    if (String(window.ethereum.networkVersion) !== chainId) {
      toast.warn(
        `네트워크를 클레이튼 메인넷 (8217) 으로 변경해주세요. 현재 network : ${window.ethereum.networkVersion}`
      );
      setIsOpenLoadingModal(false);
      return;
    }

    let signObj;

    try {
      signObj = await toast.promise(
        window.ethereum.request({
          method: "personal_sign",
          params: [message, window.ethereum.selectedAddress, v4()],
        }),
        {
          pending: "보유한 NFT 확인중...",
        },
        { closeButton: true }
      );

      // 홀더인증 API (fastdive)
      verifyHolder(
        signObj,
        message,
        window.ethereum.selectedAddress,
        contractAddress,
        window.ethereum.networkVersion,
        "metamask",
        true
      );
    } catch (e) {
      toast.error("로그인 실패..! 다시 시도해주세요~^^");
      setIsOpenModal(true);
      setIsOpenLoadingModal(false);
      console.log(e);
      return;
    }
  }

  /**
   * 로그인 Modal Open
   */
  function handleLogin() {
    setIsOpenModal(true);
  }

  /**
   * 로그인 완료되었을경우 활성화되는 버튼
   * 클릭 시 로그아웃
   * @returns
   */
  async function handleDone() {
    setUser("");
    localStorage.removeItem("_user");
    localStorage.removeItem("_wallet");
    // TODO : 로그아웃 전 confirm 창으로 한번 더 확인
  }

  /**
   * TODO : klip Login
   */
  async function loginWithKlip() {
    toast.warn("Klip로그인 개발중");
  }

  /**
   * fastdive API 호출 - verifyHolder
   *
   * @param {*} _signObj
   * @param {*} _message
   * @param {*} _ownerAddress
   * @param {*} _contractAddress
   * @param {*} _chainId
   * @param {*} _walletType
   * @param {*} _onlyBalance
   */
  async function verifyHolder(
    _signObj,
    _message,
    _ownerAddress,
    _contractAddress,
    _chainId,
    _walletType,
    _onlyBalance
  ) {
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": "12ad0db3-89e7-4589-9c79-3582b3042b88",
    };

    await axios
      .post(
        "https://api.fast-dive.com/v1/nft/verifyHolder",
        {
          sign: _signObj,
          signMessage: _message,
          contractAddress: _contractAddress,
          chainId: _chainId,
          walletType: _walletType,
          onlyBalance: _onlyBalance,
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        const data = response.data.data;
        setIsOpenLoadingModal(false);

        // 조건만족시 로그인 처리
        if (data.balance > 0) {
          toast.success(`로그인 완료 (balance : ${data.balance})`, {
            position: toast.POSITION.TOP_CENTER,
          });
          setUser({ account: _ownerAddress, wallet: _walletType });
          localStorage.setItem("_user", _ownerAddress);
          localStorage.setItem("_wallet", _walletType);
        } else {
          toast.error(
            "해당지갑에 NFT를 보유하고 있지 않습니다. 지갑주소를 확인해주세요.",
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        }
      })
      .catch(function (e) {
        toast.error(`로그인 실패`);
        setIsOpenModal(true);
      });
  }

  /**
   * 지갑로그인 모달창에 들어갈 버튼들
   */
  const walletButtons = [
    {
      id: 1,
      name: "Kaikas",
      func: loginWithKaikas,
      img: kaikasImageUrl,
      imgHeight: 22,
      alt: "kaikas",
    },
    {
      id: 2,
      name: "Metamask",
      func: loginWithMetamask,
      img: metamaskImageUrl,
      imgHeight: 24,
      alt: "metamask",
    },
    {
      id: 3,
      name: "Klip",
      func: loginWithKlip,
      img: klipImageUrl,
      imgHeight: 20,
      alt: "klip",
    },
  ];

  return (
    <Container>
      <WalletModal
        title="NFT 로그인"
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        walletButtons={walletButtons}
      />
      <WalletModal
        title={loadingTitle}
        isLoading={true}
        isOpenModal={isOpenLoadingModal}
        setIsOpenModal={setIsOpenLoadingModal}
      />
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <SearchBarWrapper>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
      </SearchBarWrapper>
      <WalletBox
        user={user}
        handleDone={handleDone}
        handleLogin={handleLogin}
      />
      <GrayRoundBox>
        <HamburgerIcon />
      </GrayRoundBox>
    </Container>
  );
}

export default Header;
