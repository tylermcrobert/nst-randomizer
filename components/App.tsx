import { useEffect, useRef, useState } from "react";
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
  const itemRefs = useRef<any[]>([]);

  const [state, setState] = useState<{
    selectedRiders: RiderAndPos[];
    unselectedRiders: RiderAndPos[];
    currentSelectedRider: RiderAndPos | null;
    ridersSelected: number;
    ridersRemaining: number;
    animating: boolean;
  }>({
    selectedRiders: [],
    unselectedRiders: [...ridersAndPositions],
    currentSelectedRider: null,
    ridersSelected: 0,
    ridersRemaining: ridersAndPositions.length,
    animating: false,
  });

  const tl = gsap.timeline();

  const hideEverything = () =>
    gsap.set([itemRefs.current, ".js-title"], { opacity: 0 });

  useEffect(() => {
    if (!state.currentSelectedRider || state.animating) return;

    setState((state) => ({ ...state, animating: true }));

    hideEverything();
    tl.set(itemRefs.current, {
      opacity: 1,
      delay: 0.2,
      stagger: {
        each: 0.1,
        ease: "power3.in",
      },
    });

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
    ).then(() => {
      setState((state) => ({ ...state, animating: false }));
    });
  }, [itemRefs.current, state.currentSelectedRider]);

  useEffect(() => {
    hideEverything();
  }, [itemRefs.current]);

  const randomlySelectRider = () => {
    if (state.animating) return;
    // get rider
    const randomnIndex = Math.floor(
      Math.random() * state.unselectedRiders.length
    );
    const randomlySelectedRider = state.unselectedRiders[randomnIndex];

    const selectedRiders = [
      randomlySelectedRider,
      ...state.selectedRiders,
    ].filter((r) => r);

    const shuffledRiders = shuffle([
      ...state.unselectedRiders.filter((r) => r !== randomlySelectedRider),
    ]);

    // todo: fix this
    const unselectedRiders = Array.from({ length: 50 })
      .map(() => shuffledRiders)
      .reduce((acc, cur) => [...cur, ...acc], [])
      .slice(0, 40);

    const ridersSelected = selectedRiders.length;
    const ridersRemaining = unselectedRiders.length;

    setState((state) => ({
      ...state,
      unselectedRiders,
      selectedRiders,
      currentSelectedRider: randomlySelectedRider,
      ridersSelected,
      ridersRemaining,
    }));
  };

  const ridersToShow = state.currentSelectedRider
    ? [...state.unselectedRiders, state.currentSelectedRider]
    : state.unselectedRiders;

  return (
    <div>
      <button onClick={randomlySelectRider}>
        Randomize! ({state.ridersSelected} of {state.ridersRemaining})
      </button>
      <div className={`${s.title}`}>
        <div className="js-title">{state.currentSelectedRider?.name}</div>
      </div>
      <div>
        <ul className={s.riderContainer}>
          {ridersToShow.map((rider, i) => (
            <Rider
              data={rider}
              key={`${rider.name}${i}`}
              index={i}
              ref={(el) => (itemRefs.current[i] = el)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
