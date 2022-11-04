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

const klaytn = window.klaytn;

function App() {
  const { user, setUser } = useAuth();
  useEffect(() => {
    //kaikas 지갑 없을시 이 effect무효!
    if (!klaytn) {
      return;
    }

    const account = localStorage.getItem("_user");
    const currentKaikasAccount = klaytn?.selectedAddress;

    if (!account || !currentKaikasAccount) {
      setUser("");
      localStorage.removeItem("_user");
      return;
    }

    if (account === currentKaikasAccount) {
      setUser(account);
      localStorage.setItem("_user", account);
    }
  }, [setUser]);

  useEffect(() => {
    if (!klaytn) {
      return;
    }

    const handleChangeAccounts = () => {
      if (!user) {
        return;
      }

      const changedAccount = klaytn?.selectedAddress;

      if (user !== changedAccount) {
        toast.success(
          `${changedAccount.slice(0, 5)}..계정이 바뀌셨군요 ㅎㅎ!!`
        );
        setUser(changedAccount);
        localStorage.setItem("_user", changedAccount);
      }
    };

    klaytn?.on("accountsChanged", handleChangeAccounts);
    return () => {
      klaytn.off("accountsChanged", handleChangeAccounts);
    };
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
