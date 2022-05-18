import {
  TooltipComponentOption,
  PieSeriesOption,
  ComposeOption,
} from "echarts";
import { CSSProperties, FC, useEffect, useRef } from "react";
import { percentage } from "../utils/format";

type PieChartOption = ComposeOption<TooltipComponentOption | PieSeriesOption>;

type PieChartProps = {
  data: Array<{ name: string; value: number }>;
  className?: string;
  style?: CSSProperties;
};

const PercentageChart: FC<PieChartProps> = ({ data, className, style }) => {
  const container = useRef<HTMLDivElement>(null);

  const render = async () => {
    if (!container.current) return;

    const [
      echarts,
      { CanvasRenderer },
      { PieChart },
      { TooltipComponent, TitleComponent },
    ] = await Promise.all([
      import("echarts/core"),
      import("echarts/renderers"),
      import("echarts/charts"),
      import("echarts/components"),
    ]);

    echarts.use([CanvasRenderer, PieChart, TooltipComponent, TitleComponent]);

    const chart = echarts.init(container.current);

    const option: PieChartOption = {
      tooltip: {
        trigger: "item",
        valueFormatter: (val) => percentage(Number(val)),
      },
      series: [
        {
          type: "pie",
          radius: "50%",
          // TODO light color
          label: { color: "#fff" },
          data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          color: ["#2b7fd5", "#91cc75", "#fac858", "#dc3545"],
        },
      ],
    };

    chart.setOption(option);
  };

  useEffect(() => {
    if (data.length) {
      render();
    }
  }, [data]);

  return <div ref={container} className={className} style={style}></div>;
};

export default PercentageChart;
