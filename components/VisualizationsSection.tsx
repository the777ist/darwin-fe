"use client";

import { useWebSocket } from "@/hooks/useWebSocket";
import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { Card, CardContent } from "@/components/ui/Card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function VisualizationsSection() {
  const { data } = useWebSocket();
  const barChartRef = useRef<ChartJS<"bar">>(null);
  const lineChartRef = useRef<ChartJS<"line">>(null);

  useEffect(() => {
    const handleResize = () => {
      barChartRef.current?.resize();
      lineChartRef.current?.resize();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!data) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent>
            <div className="skeleton h-[300px] flex items-center justify-center">
              <div className="skeleton-circle w-12 h-12" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="skeleton h-[300px] flex items-center justify-center">
              <div className="skeleton-circle w-12 h-12" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const barChartData: ChartData<"bar"> = {
    labels: data.variants.map((v) => v.name),
    datasets: [
      {
        label: "Conversions",
        data: data.variants.map((v) => v.conversions),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Revenue ($)",
        data: data.variants.map((v) => v.revenue),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const barChartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Variant Performance Comparison",
      },
    },
  };

  const timeSeriesData: ChartData<"line"> = {
    labels: data.liveUpdates.map((update) =>
      new Date(update.timestamp).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "Variant A Visitors",
        data: data.liveUpdates.map((update) => update.control.visitors),
        borderColor: "rgb(53, 162, 235)",
        tension: 0.1,
      },
      {
        label: "Variant B Visitors",
        data: data.liveUpdates.map((update) => update.variantB.visitors),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const lineChartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Visitor Trends Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="heading text-center">
          Variant Performance Comparison
        </h3>
        <Card>
          <CardContent>
            <Bar
              ref={barChartRef}
              data={barChartData}
              options={barChartOptions}
            />
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="heading text-center">Visitor Trends Over Time</h3>
        <Card>
          <CardContent>
            <Line
              ref={lineChartRef}
              data={timeSeriesData}
              options={lineChartOptions}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
