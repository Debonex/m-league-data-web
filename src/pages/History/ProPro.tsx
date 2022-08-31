import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../../api";
import InnerLoading from "../../components/InnerLoading";
import Select, { SelectOption } from "../../components/Select";
import ProInfo from "../Pro/Info";
import { useHistoryTable } from "./HistoryTable";

const ProPro: FC<{
  chosenSeasons: number[];
  proOptions: SelectOption[];
  optionsLoading: boolean;
}> = ({ chosenSeasons, proOptions, optionsLoading }) => {
  const { t } = useTranslation();
  const [leftInfo, setLeftInfo] = useState<ProInfo>();
  const [rightInfo, setRightInfo] = useState<ProInfo>();
  const [infoLoading, setInfoLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [history, setHistory] = useState<GameHistory>();

  // when both right pro and left pro are chosen, fetch history
  useEffect(() => {
    if (!leftInfo || !rightInfo) {
      return;
    }
    setHistoryLoading(true);
    api
      .post<GameHistory>("/game/history/pro_pro", {
        pro_id: leftInfo.id,
        pro_id2: rightInfo.id,
        seasons: chosenSeasons,
      })
      .then((res) => {
        setHistoryLoading(false);
        if (res.status === 200) {
          setHistory(res.data);
        }
      })
      .catch(() => {
        setHistoryLoading(false);
      });
  }, [leftInfo, rightInfo, chosenSeasons]);

  const handleProChange = (proId: number, isLeft: boolean) => {
    if (
      (isLeft && leftInfo?.id === proId) ||
      (!isLeft && rightInfo?.id === proId)
    ) {
      return;
    }
    setInfoLoading(true);
    api
      .get<ProInfo>(`/pro/info/${proId}`)
      .then((res) => {
        setInfoLoading(false);
        if (res.status === 200) {
          if (isLeft) {
            setLeftInfo(res.data);
          } else {
            setRightInfo(res.data);
          }
        }
      })
      .catch(() => {
        setInfoLoading(false);
      });
  };

  return (
    <div>
      <div className="relative z-10 flex items-center">
        <Select
          options={proOptions}
          className="flex-grow basis-0"
          placeholder={t("请选择选手")}
          onChange={(proId) => handleProChange(proId as number, true)}
        />
        <div className="mx-2 select-none text-xl font-extrabold text-primary-main md:mx-4">
          VS
        </div>
        <Select
          options={proOptions}
          className="flex-grow basis-0"
          placeholder={t("请选择选手")}
          onChange={(proId) => handleProChange(proId as number, false)}
        />
        {optionsLoading && <InnerLoading />}
      </div>

      <div className="relative mt-3 flex flex-wrap">
        <div className="w-full flex-grow-0 basis-auto md:w-1/2">
          <ProInfo info={leftInfo} />
        </div>
        <div className="w-full flex-grow-0 basis-auto md:w-1/2">
          <ProInfo info={rightInfo} reverse={true} />
        </div>
        {infoLoading && <InnerLoading />}
      </div>

      <div className="relative mt-3">
        {useHistoryTable(history, leftInfo, rightInfo)}
        {historyLoading && <InnerLoading />}
      </div>
    </div>
  );
};

export default ProPro;
