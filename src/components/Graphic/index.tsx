import React, { FC, useEffect, useState } from "react";
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
import { Container, Wrapper } from "./style";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectWeather } from "../../store/weather";
import { weather } from "../../store/weather/thunks";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const Graphic: FC<any> = ({ index, city, activeTemp }) => {
  const dispatch = useAppDispatch();
  const allWeather = useAppSelector(selectWeather);
  const [currentGraphic, setCurrentGraphic] = useState<string[]>([]);

  useEffect(() => {
    dispatch(weather(city.name));
  }, [city]);

  useEffect(() => {
    if (allWeather) {
      const temperatures: string[] = [];
      allWeather.forEach((item: any) => {
        if (item.city.id === city.id) {
          item.list.slice(0, 7).forEach((weatherItem: any) => {
            const temperature = activeTemp
              ? (weatherItem.main.temp - 273.15).toFixed(0)
              : (((weatherItem.main.temp - 273.15) * 9) / 5 + 32).toFixed(0);
            temperatures.push(temperature);
          });
        }
      });
      setCurrentGraphic(temperatures);
    }
  }, [allWeather, city, activeTemp]);

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

  const data = {
    labels: dates,
    datasets: [
      {
        fill: true,
        label: "",
        data: currentGraphic,
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

  const options: any = {
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
        font: {
          size: 10,
        },
        color: "#8e8e8e",
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

  return (
    <Container>
      <Wrapper>
        <Line options={options} data={data} />
      </Wrapper>
    </Container>
  );
};
