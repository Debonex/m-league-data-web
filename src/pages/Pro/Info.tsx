import clsx from "clsx";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { dateStrToAge, proAvatarUrl, teamAvatarUrl } from "../../utils/format";

const ProInfo: FC<{ info?: ProInfo; reverse?: boolean }> = ({
  info,
  reverse = false,
}) => {
  const { t } = useTranslation();
  if (!info) {
    return <div></div>;
  }
  return (
    <div className="relative overflow-hidden p-4">
      <img
        src={teamAvatarUrl(info.team_id)}
        className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 opacity-10 md:w-1/2"
      />
      <div
        className={clsx("relative flex flex-col-reverse", {
          "md:flex-row-reverse": reverse,
          "md:flex-row": !reverse,
        })}
      >
        <div
          className={clsx("mx-auto flex-grow md:mx-0", {
            "items-end md:flex md:flex-col": reverse,
          })}
        >
          <div className="mb-4 text-3xl font-bold md:text-5xl">
            {info.pro_name}
          </div>
          <InfoLine
            title={t("年龄")}
            value={dateStrToAge(info.birth).toString()}
          />
          <InfoLine title={t("出身地")} value={info.birth_place} />
          <InfoLine
            title={t("Pro历")}
            value={`${new Date().getFullYear() - info.pro_year} 年`}
          />
        </div>
        <div
          className={clsx(
            "mb-4 flex flex-grow select-none items-center justify-center overflow-hidden md:mb-0",
            { "md:justify-start": !reverse, "md:justify-end": reverse }
          )}
        >
          <img src={proAvatarUrl(info.id)} className="rounded-full" />
        </div>
      </div>
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

export default ProInfo;
