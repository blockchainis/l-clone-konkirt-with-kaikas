// material-ui core
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core/styles";
// material-ui dialog
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
// atoms
import CloseButton from "@components/atoms/CloseButton";
import LoadingSpinner from "@components/atoms/LoadingSpinner";
// styled components
import styled from "styled-components";
// modalStyle
import modalStyles from "@styles/modalStyle.js";

const useStyles = makeStyles(modalStyles);

const WalletButton = styled.button`
  width: 100%;
  height: 50px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: rgb(222 227 235) 0px 1px 1px 0px;
  margin-top: 7px;
  cursor: pointer;
  &:hover {
    background-color: #a7a7a7;
    opacity: 1;
  }
`;

export default function WalletModal({
  title,
  isLoading,
  isOpenModal,
  setIsOpenModal,
  walletButtons,
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
          <h4 className={classes.modalTitle}>{title}</h4>
        </DialogTitle>
        <DialogContent
          id="small-modal-slide-description"
          className={classes.modalBody}
        >
          {isLoading ? <LoadingSpinner /> : ""}

          {walletButtons
            ? walletButtons.map((event) => (
                <WalletButton
                  key={event.id}
                  target="_blank"
                  onClick={event.func}
                >
                  <img
                    style={{ marginRight: "10px" }}
                    height={event.imgHeight}
                    src={event.img}
                    alt={event.alt}
                  />
                  {event.name}
                </WalletButton>
              ))
            : ""}
          <div style={{ marginTop: "5px" }}></div>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
