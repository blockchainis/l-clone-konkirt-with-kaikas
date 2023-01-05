// material-ui core
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core/styles";
import * as colors from "@styles/colors";
// material-ui dialog
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
// atoms
import CloseButton from "@components/atoms/CloseButton";
import CopyButton from "@components/atoms/CopyButton";
// styled components
import styled from "styled-components";
// modalStyle
import modalStyles from "@styles/profileModalStyle.js";
import { toast } from "react-toastify";

//kaikas
import metamaskImageUrl from "@assets/image/metamask.png";
import kaikasImageUrl from "@assets/image/kaikas.png";
import klipImageUrl from "@assets/image/klip.png";

const useStyles = makeStyles(modalStyles);

const WalletDiv = styled.div`
  display: flex;
  width: 85%;
  font-weight: 800;
  color: black;
`;

const WalletImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: ${colors.bgBlack};
  /* margin-right: 10px; */
`;

const WalletImageStyle = styled.img`
  width: 23px;
  height: 23px;
`;

const ButtonProfile = styled.button`
  font-size: 14px;
  width: 100%;
  height: 45px;
  border: none;
  color: white;
  background-color: ${colors.bgSecondary};
  border-radius: 5px;
  cursor: pointer;
`;

const ButtonLogout = styled(ButtonProfile)`
  border: 1px solid ${colors.bgSecondary};
  background-color: transparent;
  color: black;
`;
const AccountCopyButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 105px;
  height: 25px;
  border: none;
  border-radius: 5px;
  color: grey;
  cursor: pointer;
`;

/**
 * 클립보드에 주소복사
 * @param {string} text
 */
const handleCopyClipBoard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("주소 복사 완료", {
      position: toast.POSITION.TOP_CENTER,
    });
  } catch (error) {
    toast.error("주소 복사 실패", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};

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
      return <></>;
  }
};

const AccountSummary = (account) => {
  const accountSummary = account.slice(0, 4) + "..." + account.slice(38, 42);
  return accountSummary;
};

export default function ProfileModal({
  user,
  isOpenModal,
  setIsOpenModal,
  wallet,
  logout,
}) {
  const classes = useStyles();
  const theme = unstable_createMuiStrictModeTheme();
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal + " " + classes.modalSmall,
        }}
        className="mui-fixed"
        sx={{ position: "sticky", right: 0, top: 0, left: 0 }}
        style={{ overflow: "auto" }}
        disableEnforceFocus // focus trap disable
        hideBackdrop={true} //backdrop hide
        open={isOpenModal}
        keepMounted
        onClose={() => setIsOpenModal(false)}
        aria-labelledby="small-modal-slide-title"
        aria-describedby="small-modal-slide-description"
      >
        <DialogTitle
          id="small-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <button
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            onClick={() => setIsOpenModal(false)}
          >
            <CloseButton />
          </button>
          <span className={classes.modalTitle}>
            <WalletDiv>
              <div>
                <WalletImageWrapper>
                  {/* imageUrl(NFT이미지)이 있을경우 아바타, 없을경우 지갑 이미지 표시 */}
                  {user.imageUrl ? (
                    <img
                      style={{ borderRadius: "50%" }}
                      width="100%"
                      src={user.imageUrl}
                      alt="titleImage"
                    ></img>
                  ) : (
                    <>
                      {user.imageUrl}
                      {WalletImage(wallet)}
                    </>
                  )}
                </WalletImageWrapper>
              </div>
              <WalletDiv
                style={{
                  flexDirection: "column",
                  width: "500px",
                  marginLeft: "7px",
                }}
              >
                {user.account ? (
                  <>
                    {AccountSummary(user.account)}
                    <AccountCopyButton
                      onClick={() => {
                        handleCopyClipBoard(user.account);
                      }}
                    >
                      {AccountSummary(user.account)}
                      <CopyButton />
                    </AccountCopyButton>
                  </>
                ) : (
                  ""
                )}
              </WalletDiv>
            </WalletDiv>
          </span>
        </DialogTitle>
        <DialogContent
          id="small-modal-slide-description"
          className={classes.modalBody}
          style={{ color: "black" }}
        >
          <ButtonProfile
            onClick={() => {
              toast.warn("프로필 상세보기");
            }}
          >
            프로필 상세 보기
          </ButtonProfile>
          <div style={{ marginTop: "10px" }}>
            <ButtonLogout onClick={logout}>지갑 연결 해제</ButtonLogout>
          </div>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
