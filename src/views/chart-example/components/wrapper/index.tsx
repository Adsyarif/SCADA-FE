import { Title } from "@/components";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartExampleWrapper = () => {
  const data = [
    {
      month: "January",
      value: 15,
    },
    {
      month: "February",
      value: 5,
    },
    {
      month: "March",
      value: 10,
    },
    {
      month: "April",
      value: 20,
    },
    {
      month: "May",
      value: 14,
    },
  ]

  const lineChartRef = useRef<HTMLCanvasElement | null>(null);
  const barChartRef = useRef<HTMLCanvasElement | null>(null);
  const doughnutChartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let lineChart: Chart | null = null;
    if (lineChartRef.current) {
      const ctx = lineChartRef.current.getContext("2d");
      if (ctx) {
        lineChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: data.map(row => row.month),
            datasets: [
              {
                label: "Attendance Count",
                data: data.map(row => row.value),
                fill: false,
                borderColor: "oklch(45.7% 0.24 277.023)",
                tension: 0.1
              },
            ],
          },
          options: {
            layout: {
              padding: 20
            },
            plugins: {
            title: {
                display: true,
                text: 'Line Chart'
            }
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      };
    }

    let barChart: Chart | null = null;
    if (barChartRef.current) {
      const ctx = barChartRef.current.getContext("2d");
      if (ctx) {
        barChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: data.map(row => row.month),
            datasets: [
              {
                label: "Attendance Count",
                data: data.map(row => row.value),
                backgroundColor: "oklch(45.7% 0.24 277.023)",
                borderColor: "oklch(45.7% 0.24 277.023)",
                borderWidth: 1, 
              },
            ],
          },
          options: {
            layout: {
              padding: 20
            },
            plugins: {
            title: {
                display: true,
                text: 'Bar Chart'
            }
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      };
    }

    let doughnutChart: Chart | null = null;
    if (doughnutChartRef.current) {
      const ctx = doughnutChartRef.current.getContext("2d");
      if (ctx) {
        doughnutChart = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: data.map(row => row.month),
            datasets: [
              {
                label: "Attendance Count",
                data: data.map(row => row.value),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverOffset: 8,
              },
            ],
          },
          options:{
              layout: {
              padding: 20
            },
            plugins: {
            title: {
                display: true,
                text: 'Doughnut Chart'
            },
            colors:{
              forceOverride: true
            },
            },
          },
        });
      };
    }

    // const myLineChart = new Chart(ctx, {
    //   type: "line",
    //   data: {
    //     labels: data.map(row => row.month),
    //     datasets: [
    //       {
    //         label: "Attendance Count",
    //         data: data.map(row => row.value),
    //         backgroundColor: "oklch(45.7% 0.24 277.023)",
    //         borderColor: "oklch(45.7% 0.24 277.023)",
    //         borderWidth: 1, 
    //       },
    //     ],
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //       },
    //     },
    //   },
    // });

    return () => {
      lineChart?.destroy();
      barChart?.destroy();
      doughnutChart?.destroy();
    };
  }, []);



  return (
    <div className="flex grow">
      <div className="grow w-full">
        <Title isButton={true} text="Chart Example" />
        <div className="p-6 space-y-6">
          {/* line chart */}
          <div className="rounded-lg bg-gray-200 shadow-md shadow-gray-500/50 max-w-md mx-auto">
            <h2 className="text-center text-lg font-semibold"></h2>
          <canvas ref={lineChartRef} />
          </div>

          {/* bar chart */}
          <div className="rounded-lg bg-gray-200 shadow-md shadow-gray-500/50 max-w-md mx-auto">
            <h2 className="text-center text-lg font-semibold"></h2>
          <canvas ref={barChartRef} />
          </div>

          {/* doughnut chart */}
          <div className="rounded-lg bg-gray-200 shadow-md shadow-gray-500/50 max-w-md mx-auto">
            <h2 className="text-center text-lg font-semibold"></h2>
          <canvas ref={doughnutChartRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartExampleWrapper;