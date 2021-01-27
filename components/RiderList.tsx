import React from "react";
import s from "./RiderList.module.scss";
import { Rider } from "./App";

const RiderList: React.FC<{ riders: Rider[]; title: string }> = ({
  riders,
  title,
}) => {
  return (
    <div>
      <h2>{title}</h2>
      <ul className={s.list}>
        {riders.length
          ? riders.map(({ name, fileName }) => (
              <li key={fileName}>
                <img src={`/riders/${fileName}`} alt={name} />
                <p>{name}</p>
              </li>
            ))
          : "none"}
      </ul>
    </div>
  );
};

export default RiderList;
