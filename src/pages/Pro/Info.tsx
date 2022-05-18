import { FC, useMemo } from "react";
import { ossUrl } from "../../utils/constants";
import { dateStrToAge } from "../../utils/format";

const useInfo = (info: ProInfo | undefined) => {
  const Info = useMemo(
    () =>
      info && (
        <div className="relative flex flex-col-reverse md:flex-row">
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
          <div className="mb-4 flex flex-grow items-center justify-center overflow-hidden md:mb-0 md:justify-start">
            <img
              src={`${ossUrl}/avatars/${info.id}.png`}
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
