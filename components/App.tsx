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
  }>({
    selectedRiders: [],
    unselectedRiders: [...ridersAndPositions],
    currentSelectedRider: null,
    ridersSelected: 0,
    ridersRemaining: ridersAndPositions.length,
  });

  const tl = gsap.timeline();

  useEffect(() => {
    console.log(itemRefs, "asdf;alskdf", state);

    tl.set([".js-rider", ".js-title"], { opacity: 0 });
    tl.set(itemRefs.current, {
      opacity: 1,
      delay: 0.5,
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
    );
  }, [itemRefs.current, state]);

  useEffect(() => {
    gsap.set([".js-rider", ".js-title"], { opacity: 0 });
  }, []);

  const randomlySelectRider = () => {
    // get rider
    const randomnIndex = Math.floor(
      Math.random() * state.unselectedRiders.length
    );
    const randomRider = state.unselectedRiders[randomnIndex];

    const selectedRiders = [randomRider, ...state.selectedRiders].filter(
      (r) => r
    );

    const unselectedRiders = shuffle([
      ...state.unselectedRiders.filter((r) => r !== randomRider),
    ]);

    const ridersSelected = selectedRiders.length;
    const ridersRemaining = unselectedRiders.length;

    setState((state) => ({
      ...state,
      unselectedRiders,
      selectedRiders,
      currentSelectedRider: randomRider,
      ridersSelected,
      ridersRemaining,
    }));
  };

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
          {state.unselectedRiders.map((rider, i) => (
            <Rider
              data={rider}
              key={rider.name}
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
