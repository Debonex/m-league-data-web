import { FC, useMemo } from "react";

const dateStrToAge = (dateStr: string) => {
  if (!dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return "未公开";
  }
  const date = new Date(dateStr);
  const now = new Date();
  const age = now.getFullYear() - date.getFullYear();
  return age;
};

const useInfo = (info: ProInfo | undefined) => {
  const Info = useMemo(
    () =>
      info && (
        <div className="flex flex-col-reverse md:flex-row">
          <div className="mx-auto flex-grow md:mx-0">
            <div className="mb-4 text-3xl font-bold md:text-5xl">
              {info.pro_name}
            </div>
            <InfoLine
              title="年龄"
              value={dateStrToAge(info.birth).toString()}
            />
            <InfoLine title="出身地" value={info.birth_place} />
            <InfoLine
              title="Pro历"
              value={`${new Date().getFullYear() - info.pro_year} 年`}
            />
          </div>
          <div className="mb-4 flex flex-grow items-center justify-center md:mb-0 md:justify-start">
            <img
              src={`https://m-league-data.oss-cn-hangzhou.aliyuncs.com/avatars/${info.id}.png`}
              className="rounded-full"
            />
          </div>
        </div>
      ),
    [info]
  );
  return Info;
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

export { useInfo };