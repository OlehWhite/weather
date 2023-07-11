import React, { FC, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ScriptableContext,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { Container } from "./style";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectWeather } from "../../store/weather";
import { weather } from "../../store/weather/thunks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    datalabels: {
      display: true,
      align: "center" as "center",
      anchor: "center" as "center",
      // formatter: (value: number, context: ScriptableContext<"line">) => {
      //   const index = context.dataIndex;
      //   const peakTemperature = peakTemperatures[index];
      //   return value + "° | " + peakTemperature + "°";
      // },
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
  layout: {
    padding: 0,
  },
};

const numberOfDays = 7;
const currentDate = new Date();

const dates = Array.from({ length: numberOfDays }, (_, i) => {
  const date = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + i
  );
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const formattedDate = `${day}.${month}`;
  return formattedDate;
});

const labels = dates;

export const Graphic: FC<any> = ({ index, city }) => {
  const dispatch = useAppDispatch();
  const allWeather = useAppSelector(selectWeather);

  useEffect(() => {
    dispatch(weather(city.name));
  }, [city]);

  console.log(allWeather);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 180);

          if (index % 2 !== 0) {
            gradient.addColorStop(0, "#FFA25B");
            gradient.addColorStop(1, "#FFF4F4");
          } else {
            gradient.addColorStop(0, "#5B8CFF");
            gradient.addColorStop(1, "#FFF4F4");
          }

          return gradient;
        },
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  return (
    <Container>
      <Line options={options} data={data} />
    </Container>
  );
};
