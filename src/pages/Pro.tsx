import clsx from "clsx";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api";
import InnerLoading from "../components/InnerLoading";
import { fixed, percentage } from "../utils/format";

const dateStrToAge = (dateStr: string) => {
  if (!dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return "未公开";
  }
  const date = new Date(dateStr);
  const now = new Date();
  const age = now.getFullYear() - date.getFullYear();
  return age;
};

const Pro: FC = () => {
  const [params] = useSearchParams();
  const id = params.get("id");
  const [statistics, setStatistics] = useState<Statistics>();
  const [statisticsLoading, setStatisticsLoading] = useState(true);
  const [info, setInfo] = useState<ProInfo>();
  const [infoLoading, setInfoLoading] = useState(true);

  useEffect(() => {
    api
      .post<Statistics>("/pro/statistic", { id: Number(id) })
      .then((res) => {
        setStatisticsLoading(false);
        if (res.status === 200) {
          setStatistics(res.data);
        }
      })
      .catch(() => {
        setStatisticsLoading(false);
      });

    api
      .get<ProInfo>(`/pro/info/${id}`)
      .then((res) => {
        setInfoLoading(false);
        if (res.status === 200) {
          setInfo(res.data);
        }
      })
      .catch(() => {
        setInfoLoading(false);
      });
  }, []);

  const Info = useMemo(
    () =>
      info && (
        <div className="mx-auto flex-grow md:mx-0">
          <div className="mb-4 text-3xl font-bold md:text-5xl">
            {info.pro_name}
          </div>
          <InfoLine title="年龄" value={dateStrToAge(info.birth).toString()} />
          <InfoLine title="出身地" value={info.birth_place} />
          <InfoLine
            title="Pro历"
            value={`${new Date().getFullYear() - info.pro_year} 年`}
          />
        </div>
      ),

    [info]
  );

  const Data = useMemo(
    () =>
      statistics && (
        <div className="flex flex-wrap">
          <DataLine title="半庄数" value={statistics.game_num} />
          <DataLine title="对局数" value={statistics.kyoku_num} />
          <DataLine title="Point" value={fixed(2)(statistics.point)} />
          <DataLine title="和牌率" value={percentage(statistics.agari_rate)} />
          <DataLine title="放铳率" value={percentage(statistics.houjuu_rate)} />
          <DataLine title="副露率" value={percentage(statistics.furo_rate)} />
          <DataLine title="立直率" value={percentage(statistics.richi_rate)} />
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
      ),
    [statistics]
  );

  return (
    <div className="mx-auto max-w-1280">
      <Card title="基本信息" className="mt-8" loading={infoLoading}>
        <div className="flex flex-col-reverse md:flex-row">
          {Info}
          <div className="mb-4 flex flex-grow items-center justify-center md:mb-0 md:justify-start">
            <img
              src={`https://m-league-data.oss-cn-hangzhou.aliyuncs.com/avatars/${id}.png`}
              className="rounded-full"
            />
          </div>
        </div>
      </Card>

      <Card title="统计信息" className="mt-8" loading={statisticsLoading}>
        {Data}
      </Card>
    </div>
  );
};

const InfoLine: FC<{ title: string; value: string | number }> = ({
  title,
  value,
}) => (
  <div className="flex py-1">
    <div className="w-20 text-white/70">{title}</div>
    <div className="flex-grow">{value}</div>
  </div>
);

const DataLine: FC<{ title: string; value: string | number }> = ({
  title,
  value,
}) => (
  <div className="flex w-1/2 flex-grow-0 p-1 md:w-1/3 lg:w-1/4">
    <div className="w-20 text-white/70">{title}</div>
    <div>{value}</div>
  </div>
);

const Card: FC<{
  title: string;
  children: ReactNode;
  className?: string;
  loading: boolean;
}> = ({ title, children, className, loading }) => (
  <div
    className={clsx(
      "rounded-lg border-2",
      "dark:border-dark-outstand",
      className
    )}
  >
    <div
      className={clsx(
        "rounded-t-lg border-b-2 p-2 pl-4 text-2xl font-bold",
        "dark:border-dark-outstand dark:bg-dark-deep"
      )}
    >
      {title}
    </div>
    <div
      className={clsx("relative rounded-b-lg p-4", "dark:bg-dark-secondary")}
    >
      {children}
      {loading && <InnerLoading />}
    </div>
  </div>
);

export default Pro;
