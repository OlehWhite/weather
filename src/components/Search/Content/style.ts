import { styled } from "@mui/material";

export const Container = styled("div")({});

export const WCity = styled("div")({
  marginRight: 44,
});

export const WWeather = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const Card = styled("div")({
  display: "flex",
  width: 350,
  height: 254,
  backgroundColor: "#FFFAF1",
  border: 5,
  boxShadow: "0px 3px 6px #00000029",
});

export const WrapperCard = styled("div")({
  padding: "10px 0 15px 10px",
});

export const Block = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: 320,
});

export const City = styled("div")({
  fontSize: 16,
  fontWeight: "bold",
});

export const Day = styled("div")({
  fontSize: 18,
  marginTop: 4,
});

export const Weather = styled("div")({
  display: "inline",
  color: "#C5C5C5",
  marginLeft: 10,
});

export const Close = styled("div")({
  paddingLeft: 6,
  cursor: "pointer",
  color: "#C5C5C5",
  transition: ".3s",

  "&:hover": {
    color: "#000",
  },
});

export const Temp = styled("div")({
  width: 95,
  fontSize: 44,
  paddingTop: 36,
});

export const CelsiusAndFahrenheit = styled("span")({
  cursor: "pointer",
  fontSize: 22,
  padding: "0 10px",
});

export const WTemp = styled("span")({
  display: "flex",
  alignItems: "center",
});

export const Line = styled("span")({
  fontSize: 20,
});

export const Feels = styled("div")({
  fontSize: 13,
  color: "#C5C5C5",
});

export const TempFeelLike = styled("span")({
  color: "#C5C5C5",
  fontWeight: "bold",
});

export const Text = styled("div")({
  fontSize: 12,
});

export const WWind = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "end",
  alignItems: "end",
});

export const Yellow = styled("span")({
  fontWeight: 600,
  color: "#FFA25B",
});
