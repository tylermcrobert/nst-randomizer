import React from "react";
import s from "./RiderList.module.scss";
import { Rider } from "../pages/index";

const RiderList: React.FC<{ riders: Rider[] }> = ({ riders }) => {
  return (
    <ul className={s.list}>
      {riders.map(({ name, fileName }) => (
        <li key={fileName}>
          <img src={`/riders/${fileName}`} alt={name} />
          <p>{name}</p>
        </li>
      ))}
    </ul>
  );
};

export default RiderList;
