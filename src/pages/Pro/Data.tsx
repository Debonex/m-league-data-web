import clsx from "clsx";
import { FC, ReactNode, useMemo } from "react";
import PercentageChart from "../../components/PercentageChart";
import { yakuList } from "../../utils/constants";
import { fixed, percentage } from "../../utils/format";

export const useData = (statistics: Statistics | undefined) => {
  const Data = useMemo(
    () =>
      statistics && (
        <div>
          <div className="flex flex-wrap">
            <Chart
              title="顺位分布"
              data={[
                { value: statistics.first_rate, name: "一位率" },
                { value: statistics.second_rate, name: "二位率" },
                { value: statistics.third_rate, name: "三位率" },
                { value: statistics.fourth_rate, name: "四位率" },
              ]}
            />

            <Chart
              title="和牌时"
              data={[
                { value: statistics.agari_richi_rate, name: "立直" },
                { value: statistics.agari_dama_rate, name: "默听" },
                { value: statistics.agari_furo_rate, name: "副露" },
              ]}
            />

            <Chart
              title="放铳时"
              data={[
                { value: statistics.houjuu_richi_rate, name: "立直" },
                { value: statistics.houjuu_menzen_rate, name: "门清" },
                { value: statistics.houjuu_furo_rate, name: "副露" },
              ]}
            />

            <Chart
              title="放铳至"
              data={[
                { value: statistics.houjuu_to_richi_rate, name: "立直" },
                { value: statistics.houjuu_to_dama_rate, name: "默听" },
                { value: statistics.houjuu_to_furo_rate, name: "副露" },
              ]}
            />
          </div>

          <DataTitle className="mb-2">基本信息</DataTitle>
          <div className="flex flex-wrap">
            <DataLine title="半庄数" value={statistics.game_num} />
            <DataLine title="对局数" value={statistics.kyoku_num} />
            <DataLine title="Point" value={fixed(2)(statistics.point)} />
            <DataLine
              title="和牌率"
              value={percentage(statistics.agari_rate)}
            />
            <DataLine
              title="放铳率"
              value={percentage(statistics.houjuu_rate)}
            />
            <DataLine title="副露率" value={percentage(statistics.furo_rate)} />
            <DataLine
              title="立直率"
              value={percentage(statistics.richi_rate)}
            />
            <DataLine
              title="流局率"
              value={percentage(statistics.ryukyoku_rate)}
            />
            <DataLine
              title="流听率"
              value={percentage(statistics.ryukyoku_tenpai_rate)}
            />
            <DataLine
              title="和了巡数"
              value={fixed(3)(statistics.avg_agari_turn)}
            />
            <DataLine
              title="平均打点"
              value={fixed(2)(statistics.avg_agari_score)}
            />
            <DataLine
              title="平均铳点"
              value={fixed(2)(statistics.avg_houjuu_score)}
            />
            <DataLine title="平均顺位" value={fixed(3)(statistics.avg_rank)} />
          </div>

          <DataTitle className="mt-4 mb-2">立直</DataTitle>
          <div className="flex flex-wrap">
            <DataLine
              title="立直率"
              value={percentage(statistics.richi_rate)}
            />
            <DataLine
              title="立直和率"
              value={percentage(statistics.richi_agari_rate)}
            />
            <DataLine
              title="立直铳率"
              value={percentage(statistics.richi_houjuu_rate)}
            />
            <DataLine
              title="立直打点"
              value={fixed(2)(statistics.avg_richi_agari_score)}
            />
            <DataLine
              title="立直巡目"
              value={fixed(3)(statistics.avg_richi_turn)}
            />
            <DataLine
              title="里宝率"
              value={percentage(statistics.uradora_rate)}
            />
            <DataLine
              title="一发率"
              value={percentage(statistics.ippatsu_rate)}
            />
            <DataLine
              title="先制率"
              value={percentage(statistics.richi_first_rate)}
            />
            <DataLine
              title="追立率"
              value={percentage(statistics.richi_chase_rate)}
            />
            <DataLine
              title="被追率"
              value={percentage(statistics.richi_chased_rate)}
            />
            <DataLine
              title="立直时宝牌"
              value={fixed(3)(statistics.avg_richi_dora)}
            />
          </div>

          <DataTitle className="mt-4 mb-2">副露</DataTitle>
          <div className="flex flex-wrap">
            <DataLine title="副露率" value={percentage(statistics.furo_rate)} />
            <DataLine
              title="副露和率"
              value={percentage(statistics.furo_agari_rate)}
            />
            <DataLine
              title="副露铳率"
              value={percentage(statistics.furo_houjuu_rate)}
            />
            <DataLine
              title="副露流局"
              value={percentage(statistics.furo_ryukyoku_rate)}
            />
            <DataLine
              title="副露打点"
              value={fixed(2)(statistics.avg_furo_agari_score)}
            />
          </div>

          <DataTitle className="mt-4 mb-2">其它</DataTitle>
          <div className="flex flex-wrap">
            <DataLine title="最大连庄" value={statistics.renchan_max_num} />
            <DataLine title="最高得分" value={statistics.highest_score} />
            <DataLine title="最低得分" value={statistics.lowest_score} />
            <DataLine
              title="被炸率"
              value={percentage(statistics.blown_rate)}
            />
            <DataLine
              title="平均被炸点数"
              value={fixed(1)(statistics.avg_blown_score)}
            />
            <DataLine
              title="一位平均得点"
              value={fixed(1)(statistics.avg_first_score)}
            />
            <DataLine
              title="二位平均得点"
              value={fixed(1)(statistics.avg_second_score)}
            />
            <DataLine
              title="三位平均得点"
              value={fixed(1)(statistics.avg_third_score)}
            />
            <DataLine
              title="四位平均得点"
              value={fixed(1)(statistics.avg_fourth_score)}
            />
          </div>

          <DataTitle className="mt-4 mb-2">和了役种</DataTitle>
          <div className="flex flex-wrap">
            {yakuList.map((yaku, index) => {
              return (
                <DataLine
                  key={index}
                  title={yaku}
                  value={statistics.yaku[yaku] ?? 0}
                />
              );
            })}
          </div>
        </div>
      ),
    [statistics]
  );
  return Data;
};

const DataTitle: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={clsx(
        "border-b pb-1 text-lg font-semibold",
        className,
        "dark:border-dark-outstand"
      )}
    >
      {children}
    </div>
  );
};

const DataLine: FC<{ title: string; value: string | number }> = ({
  title,
  value,
}) => (
  <div className="flex w-1/2 flex-grow-0 p-1 md:w-1/3 lg:w-1/4">
    <div className="min-w-20 text-white/70">{title}</div>
    <div className="flex-grow pl-2">{value}</div>
  </div>
);

const Chart: FC<{
  title: string;
  data: Array<{ value: number; name: string }>;
}> = ({ title, data }) => (
  <div className="w-full flex-grow-0 md:w-1/2 lg:w-1/4">
    <div className="translate-y-full text-center text-lg font-semibold">
      {title}
    </div>
    <PercentageChart className="h-80 w-full" data={data} />
  </div>
);
