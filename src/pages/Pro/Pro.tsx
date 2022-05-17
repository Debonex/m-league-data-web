import clsx from "clsx";
import { FC, ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../api";
import InnerLoading from "../../components/InnerLoading";
import useChoseSeasons from "../../hooks/useChoseSeasons";
import { ossUrl } from "../../utils/constants";
import { useData } from "./Data";
import { useInfo } from "./Info";

const Pro: FC = () => {
  const [params] = useSearchParams();
  const id = params.get("id");
  const [statistics, setStatistics] = useState<Statistics>();
  const [statisticsLoading, setStatisticsLoading] = useState(false);
  const [info, setInfo] = useState<ProInfo>();
  const [infoLoading, setInfoLoading] = useState(true);
  const {
    chosenSeasons,
    loading: seasonsLoading,
    CheckButtons,
    Checkboxes,
  } = useChoseSeasons();

  const Info = useInfo(info);
  const Data = useData(statistics);

  useEffect(() => {
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

  const fetchStatistics = async () => {
    setStatisticsLoading(true);
    const res = await api.post<Statistics>("/pro/statistic", {
      id: Number(id),
      ...(seasonsLoading ? {} : { seasons: chosenSeasons }),
    });
    setStatisticsLoading(false);
    if (res.status === 200) {
      setStatistics(res.data);
    }
  };

  useEffect(() => {
    if (!seasonsLoading) {
      fetchStatistics();
    }
  }, [chosenSeasons]);

  return (
    <div className="mx-auto max-w-1280 p-2 md:p-4">
      <Card title="个人信息" className="mt-8" loading={infoLoading}>
        {info && (
          <img
            src={`${ossUrl}/teams/${info.team_id}.${
              [8, 1].includes(info.team_id) ? "png" : "svg"
            }`}
            className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 opacity-10 md:w-1/2"
          />
        )}
        {Info}
      </Card>
      <Card title="赛季过滤" className="mt-8" loading={seasonsLoading}>
        {Checkboxes}
        {CheckButtons}
      </Card>
      <Card title="统计信息" className="my-8" loading={statisticsLoading}>
        {Data}
      </Card>
    </div>
  );
};

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
      className={clsx(
        "relative overflow-hidden rounded-b-lg p-4",
        "dark:bg-dark-secondary"
      )}
    >
      {children}
      {loading && <InnerLoading />}
    </div>
  </div>
);

export default Pro;
