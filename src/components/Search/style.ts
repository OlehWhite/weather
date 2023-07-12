import { styled } from "@mui/material";

export const Container = styled("div")({
  margin: "72px 122px",
});

export const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
});

export const Form = styled("form")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "@media (max-width: 575px)": {
    flexDirection: "column",
  },
});

export const Input = styled("input")({
  maxWidth: 600,
  width: "100%",
  height: 34,
  borderRadius: "5px",
  border: "none",
  boxShadow: "0px 0px 3px 0px #00000069",

  "@media (max-width: 575px)": {
    width: 200,
  },
});

export const WrapperInput = styled("div")({
  display: "flex",
  justifyContent: "center",
  maxWidth: 580,
  width: "100%",
  marginRight: 10,
});

export const Button = styled("button")({
  width: 120,
  height: 40,
  backgroundColor: "#459DE9",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: ".3s",

  "&:hover": {
    background: "#3262c7",
  },
});

export const List = styled("div")({
  position: "absolute",
  maxWidth: 585,
  width: "100%",
  borderRadius: "5px",
  marginTop: 42,
  boxShadow: "0px 0px 3px 0px #00000069",
});

export const Item = styled("div")({
  background: "#fff",
  display: "flex",
  justifyContent: "space-between",
  cursor: "pointer",
  borderRadius: "5px",
  padding: "5px 10px 5px 5px",
  maxWidth: 570,
  width: "100%",

  "&:hover": {
    background: "rgb(223,223,223)",
  },
});

export const Text = styled("div")({});

export const Close = styled("div")({
  "&:hover": {
    color: "#949494",
  },
});
