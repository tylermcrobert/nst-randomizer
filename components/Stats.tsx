import React from "react";
import { AppState } from "./App";
import { RIDERS } from "../constants";
//import s from './Stats.module.scss'

const Stats: React.FC<{ state: AppState }> = ({ state }) => {
  return (
    <>
      <div>
        <Stat
          title="Percent Complete"
          val={`${Math.floor(
            (state.ridersRemainingCount / RIDERS.length) * 100
          )}%`}
        />
        <Stat
          title="Current Rider"
          val={state.currentSelectedRider?.name || "None"}
        />
        <Stat title="Selected" val={state.ridersSelectedCount} />
        <Stat title="Total" val={RIDERS.length} />
      </div>
      <style jsx>{`
        div {
          display: flex;
          font-family: monospace;
          font-size: 80%;
        }
      `}</style>
    </>
  );
};

const Stat: React.FC<{ title: string; val: string | number }> = ({
  title,
  val,
}) => {
  return (
    <>
      <div>
        {title}: {val}
      </div>
      <style jsx>{`
        div {
          flex: 1;
          padding: 8px;
        }
      `}</style>
    </>
  );
};

export default Stats;
