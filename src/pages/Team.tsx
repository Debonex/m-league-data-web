import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api";
import InnerLoading from "../components/InnerLoading";
import { dateStrToAge, proAvatarUrl } from "../utils/format";

const Team: FC = () => {
  const [params] = useSearchParams();
  const id = params.get("id");
  const [list, setList] = useState<ProInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<ProInfo[]>(`/pro/list_by_team_id/${id}`)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setList(res.data);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div
      className={clsx(
        "relative m-2 flex flex-wrap rounded-lg border-2 p-2 md:m-4 md:p-4",
        "dark:border-dark-outstand dark:bg-dark-secondary"
      )}
    >
      {list.map((pro) => (
        <Link
          to={`/pro?id=${pro.id}`}
          key={pro.id}
          className="mx-auto mt-12 flex w-full flex-grow-0 p-2 md:w-1/2"
        >
          <img src={proAvatarUrl(pro.id)} className="rounded-full" />
          <div className="ml-4 flex flex-col justify-center">
            <div className="text-xl font-semibold">{pro.pro_name}</div>
            <div className="mt-4 md:flex">
              <InfoItem
                title="年龄"
                value={dateStrToAge(pro.birth)}
                className="md:pr-4"
              />
              <InfoItem
                title="出身地"
                value={pro.birth_place}
                className={clsx(
                  "md:border-l-2 md:border-r-2 md:px-4",
                  "dark:border-white/40"
                )}
              />
              <InfoItem
                title="Pro历"
                value={`${new Date().getFullYear() - pro.pro_year} 年`}
                className="md:pl-4"
              />
            </div>
          </div>
        </Link>
      ))}
      {loading && <InnerLoading />}
    </div>
  );
};

const InfoItem: FC<{
  title: string;
  value: string | number;
  className?: string;
}> = ({ title, value, className }) => (
  <div className={clsx("flex whitespace-nowrap", className)}>
    <div className="w-12 md:w-auto">{title}</div>
    <div className="ml-2">{value}</div>
  </div>
);

export default Team;
