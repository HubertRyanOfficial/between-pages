import { useContext } from "react";

import BetweenContext from "../utils/globalContext";

import { HookProps, TransitionProps } from "../@types";
import { animationTypes as BetweenTypes } from "../utils/animationTypes";

interface Types {
  options: TransitionProps;
  callback?: () => void;
}

function useBetweenPages(component: any): HookProps {
  const { changeAnimationOptions } = useContext(BetweenContext);

  const startTransition = (
    {
      type = BetweenTypes.SPRING,
      endAnimation = true,
      delay = 0,
      duration = 500,
    }: TransitionProps,
    callback = () => null
  ) => {
    changeAnimationOptions({
      type,
      delay,
      duration,
      componentChildren: component,
      endAnimation,
      callback,
    });
  };

  return {
    startTransition,
  };
}

export { useBetweenPages, BetweenTypes };
