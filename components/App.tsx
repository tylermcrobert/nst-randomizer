import { useState } from "react";
import Rider from "./Rider";
import RiderList from "./RiderList";
import s from "./App.module.scss";
import { shuffle } from "../util/shuffle";
import { RIDERS } from "../constants";

export type Rider = {
  name: string;
  fileName: string;
};

export type RiderAndPos = Rider & { rotation: number };

const ridersAndPositions: RiderAndPos[] = RIDERS.map((item, i) => ({
  ...item,
  rotation: i,
}));

const Home = () => {
  const [state, setState] = useState<{
    selectedRiders: RiderAndPos[];
    unselectedRiders: RiderAndPos[];
  }>({
    selectedRiders: [],
    unselectedRiders: [...ridersAndPositions],
  });

  // TODO: but where it selects two!

  const shuffleCards = () => {
    console.log("asdf;lkajsdf;laksdjfa;slkfdjasd;flkajsdfa");
  };

  const randomlySelectRider = () => {
    shuffleCards();

    // get rider
    const randomnIndex = Math.floor(
      Math.random() * state.unselectedRiders.length
    );
    const randomRider = state.unselectedRiders[randomnIndex];

    setState((state) => ({
      ...state,
      unselectedRiders: shuffle([
        ...state.unselectedRiders.filter((r) => r !== randomRider),
      ]),
      selectedRiders: [randomRider, ...state.selectedRiders].filter((r) => r),
    }));
  };

  return (
    <div>
      <button onClick={randomlySelectRider}>Randomize!</button>
      <div>
        <ul className={s.riderContainer}>
          {state.unselectedRiders.map((rider) => (
            <Rider data={rider} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
