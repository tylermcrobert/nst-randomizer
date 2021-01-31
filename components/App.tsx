import { useEffect, useRef, useState } from "react";
import Rider from "./Rider";
import Stats from "./Stats";
import s from "./App.module.scss";
import { shuffle } from "../util/shuffle";
import { RIDERS, LENGTH } from "../constants";
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

export type AppState = {
  selectedRiders: RiderAndPos[];
  unselectedRiders: RiderAndPos[];
  currentSelectedRider: RiderAndPos | null;
  ridersRemaining: number;
  animating: boolean;
  ridersToShuffle: RiderAndPos[];
  ridersSelectedCount: number;
  ridersRemainingCount: number;
};

const Home = () => {
  const itemRefs = useRef<any[]>([]);
  const [infoShown, setInfo] = useState(false);

  const [state, setState] = useState<AppState>({
    selectedRiders: [],
    ridersToShuffle: [],
    unselectedRiders: [...ridersAndPositions],
    currentSelectedRider: null,
    ridersRemaining: ridersAndPositions.length,
    animating: false,
    ridersSelectedCount: 0,
    ridersRemainingCount: ridersAndPositions.length,
  });

  const tl = gsap.timeline();

  const hideEverything = () => {
    gsap.set([...itemRefs.current, ".js-title"], { opacity: 0 });
  };

  /**
   * Watch for rider changes and animate
   */
  useEffect(() => {
    if (!state.currentSelectedRider || state.animating) return;

    setState((state) => ({ ...state, animating: true }));

    hideEverything();
    tl.set(itemRefs.current, {
      opacity: 1,
      delay: 0.2,
      stagger: {
        each: 0.1,
        ease: "Power3.easeIn",
      },
    });

    tl.fromTo(
      ".js-title",
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

  const randomlySelectRider = () => {
    if (state.animating) return;

    /**
     * Get a random rider
     */

    //  select random number between 0 and length
    const randomnIndex = Math.floor(
      Math.random() * state.unselectedRiders.length
    );

    // Use it to get a random rider
    const randomlySelectedRider = state.unselectedRiders[randomnIndex];

    /**
     * Riders that have already been chosen
     * In this function it is adding the
     * one that is to be shown.
     */
    const selectedRiders = [
      randomlySelectedRider,
      ...state.selectedRiders,
    ].filter((r) => r);

    /**
     * Riders that have not been chosen.
     *  this function it is removing the
     * one that is to be shown.
     */
    const unselectedRiders = shuffle([
      ...state.unselectedRiders.filter((r) => r !== randomlySelectedRider),
    ]);

    /**
     * Riders to show in the Shuffle sequence
     */
    const ridersToShuffle = Array.from({ length: 50 })
      .map(() => [...unselectedRiders, randomlySelectedRider])
      .reduce((acc, cur) => [...cur, ...acc], [])
      .slice(0, LENGTH)
      .map((r) => ({ ...r, rotation: getRandumNum() }));

    /**
     * Utility counts
     */

    const ridersSelectedCount = selectedRiders.length;
    const ridersRemainingCount = unselectedRiders.length;

    setState((state) => ({
      ...state,
      selectedRiders,
      unselectedRiders,
      ridersToShuffle,
      currentSelectedRider: randomlySelectedRider,
      ridersSelectedCount,
      ridersRemainingCount,
    }));
  };

  const ridersToShow: RiderAndPos[] = (() => {
    return state.currentSelectedRider
      ? [...state.ridersToShuffle, state.currentSelectedRider]
      : state.ridersToShuffle;
  })();

  useEffect(() => {
    // final rider
    if (state.ridersRemainingCount === 0) {
      gsap.set(".js-rider", { opacity: 1 });
    }
  }, [state.ridersRemainingCount]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "i") {
        setInfo(!infoShown);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [infoShown]);
  console.log("remaining", state.ridersRemainingCount);

  return (
    <div onClick={randomlySelectRider} style={{ cursor: "pointer" }}>
      {infoShown && <Stats state={state} />}

      {state.ridersSelectedCount === 0 && (
        <img src="/logo.svg" className={s.logo} />
      )}

      <div className={`${s.title}`}>
        <div className="js-title">{state.currentSelectedRider?.name}</div>
      </div>

      <div>
        <ul className={s.riderContainer}>
          {state.ridersRemainingCount ? (
            ridersToShow.map((rider, i) => (
              <Rider
                data={rider}
                key={`${rider.name}${i}`}
                index={i}
                ref={(el) => el && (itemRefs.current[i] = el)}
              />
            ))
          ) : (
            <Rider data={ridersToShow[0]} index={0} forceShow />
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
