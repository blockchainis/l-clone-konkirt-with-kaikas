const modalStyle = () => ({
  modalRoot: {
    overflow: "auto",
    display: "block",
  },
  modal: {
    maxWidth: "500px",
    margin: "auto",
    borderRadius: "6px",
    overflow: "visible",
    maxHeight: "unset",
    width: "100%",
    marginTop: "130px !important",
  },
  modalHeader: {
    borderBottom: "none",
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "0",
    paddingLeft: "24px",
    minHeight: "16.43px",
  },
  modalTitle: {
    fontWeight: "500",
    fontSize: "18px",
    color: "black",
    margin: "0",
    lineHeight: "1.5",
  },
  modalCloseButton: {
    "&, &:hover": {
      color: "#999",
    },
    "&:hover": {
      opacity: "1",
    },
    cursor: "pointer",
    padding: "1rem",
    margin: "-1rem -1rem -1rem auto",
    backgroundColor: "transparent",
    border: "0",
    WebkitAppearance: "none",
    float: "right",
    fontSize: "1.5rem",
    fontWeight: "500",
    lineHeight: "1",
    textShadow: "0 1px 0 #ffffff",
    opacity: ".5",
  },
  modalBody: {
    paddingTop: "15px",
    paddingBottom: "16px",
    paddingRight: "15px",
    paddingLeft: "15px",
    position: "relative",
    overflow: "visible",
  },
  modalLarge: {
    maxWidth: "800px",
  },
  modalSmall: {
    position: "fixed",
    top: "-60px",
    left: "calc(100% - 315px)",
    width: "300px",
    margin: "auto",
  },
});

export default modalStyle;
