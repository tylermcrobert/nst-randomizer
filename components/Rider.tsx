import React from "react";
import { RiderAndPos } from "./App";
import s from "./Rider.module.scss";

const Rider: React.FC<{ data: RiderAndPos }> = ({ data }) => {
  return (
    <li className={s.riderOuter}>
      <img
        src={`/riders/${data.fileName}`}
        alt={data.name}
        style={{ transform: `rotate(${data.rotation}deg)` }}
      />
    </li>
  );
};

export default Rider;
