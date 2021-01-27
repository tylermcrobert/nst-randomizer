import { useState } from "react";
import Rider from "./Rider";
import RiderList from "./RiderList";
import s from "./App.module.scss";
import { shuffle } from "../util/shuffle";
import { RIDERS } from "../constants";
import gsap from "gsap";

export type Rider = {
  name: string;
  fileName: string;
};

export type RiderAndPos = Rider & { rotation: number };

var getRandumNum = (cap: number = 15) =>
  Math.ceil(Math.random() * cap) * (Math.round(Math.random()) ? 1 : -1);

const ridersAndPositions: RiderAndPos[] = RIDERS.map((item, i) => ({
  ...item,
  rotation: getRandumNum(),
}));

const Home = () => {
  const [state, setState] = useState<{
    selectedRiders: RiderAndPos[];
    unselectedRiders: RiderAndPos[];
  }>({
    selectedRiders: [],
    unselectedRiders: [...ridersAndPositions],
  });

  const shuffleCards = () => {
    const tl = gsap.timeline();

    tl.set([".js-rider", ".js-title"], { opacity: 0 });
    tl.set(".js-rider", {
      opacity: 1,
      delay: 0.5,
      stagger: {
        each: 0.1,
        ease: "power1.out",
      },
    });

    // const remainingDur = 5 - tl.duration();

    tl.fromTo(
      [".js-title"],
      {
        opacity: 0,
        y: 24,
      },
      {
        opacity: 1,
        delay: 0.5,
        y: 0,
      }
    );
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

  let length = state.unselectedRiders.length;
  const selectedRider = state.unselectedRiders[length - 1];
  return (
    <div>
      <button onClick={randomlySelectRider}>Randomize! {length}</button>
      <div className={`${s.title} js-title`}>{selectedRider.name}</div>
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
