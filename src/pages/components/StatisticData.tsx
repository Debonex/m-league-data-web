import clsx from "clsx";
import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import PercentageChart from "../../components/PercentageChart";
import { yakuList, yakumanList } from "../../utils/constants";
import { fixed, percentage } from "../../utils/format";

const StatisticData: FC<{ statistics?: Statistics }> = ({ statistics }) => {
  const { t } = useTranslation();
  if (!statistics) {
    return <div></div>;
  }
  return (
    <div>
      <div className="flex flex-wrap">
        <Chart
          title={t("顺位分布")}
          data={[
            { value: statistics.first_rate, name: t("一位率") },
            { value: statistics.second_rate, name: t("二位率") },
            { value: statistics.third_rate, name: t("三位率") },
            { value: statistics.fourth_rate, name: t("四位率") },
          ]}
        />

        <Chart
          title={t("和牌时")}
          data={[
            { value: statistics.agari_richi_rate, name: t("立直") },
            { value: statistics.agari_dama_rate, name: t("默听") },
            { value: statistics.agari_furo_rate, name: t("副露") },
          ]}
        />

        <Chart
          title={t("放铳时")}
          data={[
            { value: statistics.houjuu_richi_rate, name: t("立直") },
            { value: statistics.houjuu_menzen_rate, name: t("门清") },
            { value: statistics.houjuu_furo_rate, name: t("副露") },
          ]}
        />

        <Chart
          title={t("放铳至")}
          data={[
            { value: statistics.houjuu_to_richi_rate, name: t("立直") },
            { value: statistics.houjuu_to_dama_rate, name: t("默听") },
            { value: statistics.houjuu_to_furo_rate, name: t("副露") },
          ]}
        />
      </div>

      <DataTitle className="mb-2">{t("基本信息")}</DataTitle>
      <div className="flex flex-wrap">
        <DataLine title={t("半庄数")} value={statistics.game_num} />
        <DataLine title={t("对局数")} value={statistics.kyoku_num} />
        <DataLine title={t("Point")} value={fixed(2)(statistics.point)} />
        <DataLine
          title={t("和牌率")}
          value={percentage(statistics.agari_rate)}
        />
        <DataLine
          title={t("放铳率")}
          value={percentage(statistics.houjuu_rate)}
        />
        <DataLine
          title={t("副露率")}
          value={percentage(statistics.furo_rate)}
        />
        <DataLine
          title={t("立直率")}
          value={percentage(statistics.richi_rate)}
        />
        <DataLine
          title={t("流局率")}
          value={percentage(statistics.ryukyoku_rate)}
        />
        <DataLine
          title={t("流听率")}
          value={percentage(statistics.ryukyoku_tenpai_rate)}
        />
        <DataLine
          title={t("和了巡数")}
          value={fixed(3)(statistics.avg_agari_turn)}
        />
        <DataLine
          title={t("平均打点")}
          value={fixed(2)(statistics.avg_agari_score)}
        />
        <DataLine
          title={t("平均铳点")}
          value={fixed(2)(statistics.avg_houjuu_score)}
        />
        <DataLine title={t("平均顺位")} value={fixed(3)(statistics.avg_rank)} />
      </div>

      <DataTitle className="mt-4 mb-2">{t("立直")}</DataTitle>
      <div className="flex flex-wrap">
        <DataLine
          title={t("立直率")}
          value={percentage(statistics.richi_rate)}
        />
        <DataLine
          title={t("立直和率")}
          value={percentage(statistics.richi_agari_rate)}
        />
        <DataLine
          title={t("立直铳率")}
          value={percentage(statistics.richi_houjuu_rate)}
        />
        <DataLine
          title={t("立直打点")}
          value={fixed(2)(statistics.avg_richi_agari_score)}
        />
        <DataLine
          title={t("立直巡目")}
          value={fixed(3)(statistics.avg_richi_turn)}
        />
        <DataLine
          title={t("里宝率")}
          value={percentage(statistics.uradora_rate)}
        />
        <DataLine
          title={t("一发率")}
          value={percentage(statistics.ippatsu_rate)}
        />
        <DataLine
          title={t("先制率")}
          value={percentage(statistics.richi_first_rate)}
        />
        <DataLine
          title={t("追立率")}
          value={percentage(statistics.richi_chase_rate)}
        />
        <DataLine
          title={t("被追率")}
          value={percentage(statistics.richi_chased_rate)}
        />
        <DataLine
          title={t("立直时宝牌")}
          value={fixed(3)(statistics.avg_richi_dora)}
        />
      </div>

      <DataTitle className="mt-4 mb-2">{t("副露")}</DataTitle>
      <div className="flex flex-wrap">
        <DataLine
          title={t("副露率")}
          value={percentage(statistics.furo_rate)}
        />
        <DataLine
          title={t("副露和率")}
          value={percentage(statistics.furo_agari_rate)}
        />
        <DataLine
          title={t("副露铳率")}
          value={percentage(statistics.furo_houjuu_rate)}
        />
        <DataLine
          title={t("副露流局")}
          value={percentage(statistics.furo_ryukyoku_rate)}
        />
        <DataLine
          title={t("副露打点")}
          value={fixed(2)(statistics.avg_furo_agari_score)}
        />
      </div>

      <DataTitle className="mt-4 mb-2">{t("其它")}</DataTitle>
      <div className="flex flex-wrap">
        <DataLine title={t("最大连庄")} value={statistics.renchan_max_num} />
        <DataLine title={t("最高得分")} value={statistics.highest_score} />
        <DataLine title={t("最低得分")} value={statistics.lowest_score} />
        <DataLine
          title={t("被炸率")}
          value={percentage(statistics.blown_rate)}
        />
        <DataLine
          title={t("平均被炸点数")}
          value={fixed(1)(statistics.avg_blown_score)}
        />
        <DataLine
          title={t("一位平均得点")}
          value={fixed(1)(statistics.avg_first_score)}
        />
        <DataLine
          title={t("二位平均得点")}
          value={fixed(1)(statistics.avg_second_score)}
        />
        <DataLine
          title={t("三位平均得点")}
          value={fixed(1)(statistics.avg_third_score)}
        />
        <DataLine
          title={t("四位平均得点")}
          value={fixed(1)(statistics.avg_fourth_score)}
        />
      </div>

      <DataTitle className="mt-4 mb-2">{t("和了役种")}</DataTitle>
      <div className="flex flex-wrap">
        {yakuList
          .filter((yaku) => statistics.yaku[yaku])
          .map((yaku, index) => {
            return (
              <DataLine
                key={index}
                title={t(yaku)}
                value={statistics.yaku[yaku]}
                outstand={yakumanList.includes(yaku)}
              />
            );
          })}
      </div>
    </div>
  );
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

const DataLine: FC<{
  title: string;
  value: string | number;
  outstand?: boolean;
}> = ({ title, value, outstand = false }) => (
  <div
    className={clsx("flex w-1/2 flex-grow-0 p-1 md:w-1/3 lg:w-1/4", {
      "font-bold text-primary-main": outstand,
    })}
  >
    <div
      className={clsx("min-w-20", {
        "text-white/70": !outstand,
      })}
    >
      {title}
    </div>
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

export default StatisticData;
