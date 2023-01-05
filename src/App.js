import GlobalStyle from "./GlobalStyle";
import Header from "@components/templates/Header";
import TopBanner from "@components/templates/TopBanner";
import Events from "@components/templates/Events";
import ItemsOnSale from "@components/templates/ItemsOnSale";
import OpenseaTopCollections from "@components/templates/OpenseaTopCollections";
import OnBoarding from "@components/templates/OnBoarding";
import Footer from "@components/templates/Footer";
import { useEffect } from "react";

import useAuth from "@hooks/useAuth";
import { toast } from "react-toastify";

const { klaytn, ethereum } = window;

function App() {
  const { user, setUser } = useAuth();

  useEffect(() => {
    //kaikas 지갑 없을시 이 effect무효!
    if (!klaytn) {
      return;
    }

    const account = localStorage.getItem("_user");
    const wallet = localStorage.getItem("_wallet");
    const imageUrl = localStorage.getItem("_imageUrl");

    let currentAccount = "";

    if (wallet === "kaikas") {
      currentAccount = klaytn?.selectedAddress;
    } else if (wallet === "metamask") {
      currentAccount = ethereum?.selectedAddress;
    }

    if (!account || !currentAccount) {
      setUser("");
      localStorage.removeItem("_user");
      localStorage.removeItem("_wallet");
      localStorage.removeItem("_imageUrl");
      return;
    }

    if (account === currentAccount) {
      setUser({ account: account, wallet: wallet, imageUrl: imageUrl });
      localStorage.setItem("_user", account);
      localStorage.setItem("_wallet", wallet);
      localStorage.setItem("_imageUrl", imageUrl);
    }
  }, [setUser]);

  useEffect(() => {
    const handleChangeAccounts = () => {
      if (!user) {
        return;
      }

      let changedAccount = "";

      if (user.wallet === "kaikas") {
        if (!klaytn) {
          return;
        }
        changedAccount = klaytn?.selectedAddress;
      } else if (user.wallet === "metamask") {
        if (!ethereum) {
          return;
        }
        changedAccount = ethereum?.selectedAddress;
      }

      if (user.account !== changedAccount) {
        toast.success(
          `${changedAccount.slice(0, 5)} 계정정보가 변경되어 로그아웃 합니다.`
        );

        // Sign, NFT 로그인의 경우 계정이 바뀌면 정보를 초기화한다.
        setUser("");
        localStorage.removeItem("_user");
        localStorage.removeItem("_wallet");
        localStorage.removeItem("_imageUrl");
      }
    };

    if (user.wallet === "kaikas") {
      klaytn?.on("accountsChanged", handleChangeAccounts);
      return () => {
        klaytn.removeListener("accountsChanged", handleChangeAccounts);
      };
    } else if (user.wallet === "metamask") {
      ethereum?.on("accountsChanged", handleChangeAccounts);
      return () => {
        ethereum.removeListener("accountsChanged", handleChangeAccounts);
      };
    }
  }, [user, setUser]);

  useEffect(() => {
    // const networkObj = {
    //   1: "이더리움 메인넷",
    //   5: "Goerli 테스트넷",
    //   1001: "바오밥 테스트넷",
    //   8217: "메인넷",
    // };

    const handleNetworkChanged = () => {
      let network;
      if (user.wallet === "kaikas") {
        network = klaytn.networkVersion;
      } else if (user.wallet === "metamask") {
        network = ethereum.networkVersion;
      }
      if (network !== 8217) {
        toast.warn(
          `네트워크를 클레이튼 메인넷 (8217) 으로 변경해주세요. ( 현재 네트워크 : ${network} )`
        );
      }
    };

    if (user.wallet === "kaikas") {
      klaytn?.on("networkChanged", handleNetworkChanged);
      return () => {
        klaytn?.removeListener("networkChanged", handleNetworkChanged);
      };
    } else if (user.wallet === "metamask") {
      ethereum?.on("networkChanged", handleNetworkChanged);
      return () => {
        ethereum?.removeListener("networkChanged", handleNetworkChanged);
      };
    }
  }, [user, setUser]);

  return (
    <>
      <GlobalStyle />
      <Header>헤더부분</Header>
      <TopBanner>탑 배너</TopBanner>
      <Events />
      <ItemsOnSale>판매중인 아이템</ItemsOnSale>
      <OpenseaTopCollections>많이 거래된 컬렉션</OpenseaTopCollections>
      <OnBoarding>온보딩</OnBoarding>
      <Footer>푸터</Footer>
    </>
  );
}

export default App;
