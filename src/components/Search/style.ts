import { styled } from "@mui/material";

export const Container = styled("div")({
  margin: "72px 122px",
});

export const Form = styled("form")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Input = styled("input")({
  maxWidth: 570,
  width: "100%",
  height: 34,
  borderRadius: "5px",
  border: "none",
  boxShadow: "0px 0px 3px 0px #00000069",
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
