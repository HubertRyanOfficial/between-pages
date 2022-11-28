import { useContext } from "react";

import BetweenContext from "../utils/globalContext";

import { HookProps, TransitionProps } from "../types";
import { animationTypes as BetweenTypes } from "../utils/animationTypes";

function useBetweenPages(component: any): HookProps {
  const { changeAnimationOptions } = useContext(BetweenContext);

  const startTransition = (
    { type = BetweenTypes.SPRING, endAnimation = true }: TransitionProps,
    callback = () => null
  ) => {
    changeAnimationOptions({
      type,
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
