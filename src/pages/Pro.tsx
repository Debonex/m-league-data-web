import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api";

const Pro: FC = () => {
  const [params] = useSearchParams();
  const id = params.get("id");
  const [statistics, setStatistics] = useState<Statistics>();

  useEffect(() => {
    api.post<Statistics>("/pro/statistic", { id: Number(id) }).then((res) => {
      if (res.status === 200) {
        setStatistics(res.data);
      }
    });
  }, []);

  return <div>{id}</div>;
};

export default Pro;
