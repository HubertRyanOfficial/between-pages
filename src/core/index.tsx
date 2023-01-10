import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions } from "react-native";
import { OptionsProps } from "../@types";

import BetweenContext from "../utils/globalContext";
import { animationTypes } from "../utils/animationTypes";

const { width, height } = Dimensions.get("window");

function getStyleStructureByType(animation, type) {
  if (type == animationTypes.TOLEFT || type == animationTypes.TORIGHT) {
    return {
      transform: [
        {
          translateX: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [
              type == animationTypes.TORIGHT
                ? -Math.abs(width * 2 + 100)
                : width * 2 + 100,
              0,
            ],
          }),
        },
      ],
    };
  }

  if (type == animationTypes.TOUP || type == animationTypes.TOBOTTOM) {
    return {
      transform: [
        {
          translateY: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [
              type == animationTypes.TOBOTTOM
                ? -Math.abs(height * 2)
                : height * 2,
              0,
            ],
          }),
        },
      ],
    };
  }
  return {
    transform: [{ scale: animation }],
  };
}

function BetweenPagesProvider({ children }) {
  const animation = useRef(new Animated.Value(0)).current;
  const [options, setOptions] = useState<OptionsProps | null>();

  useEffect(() => {
    if (options) {
      animation.setValue(0);
      animation.setOffset(0);
      if (
        options?.type == animationTypes.FADE ||
        options?.type == animationTypes.TOUP ||
        options?.type == animationTypes.TOLEFT ||
        options?.type == animationTypes.TORIGHT ||
        options?.type == animationTypes.TOBOTTOM
      ) {
        Animated.timing(animation, {
          toValue: 1,
          delay: options?.delay,
          duration: options?.duration,
          useNativeDriver: true,
        }).start(() => {
          if (options.endAnimation) {
            finishAnimation();
          }
          options?.callback && options?.callback();
        });
      } else if (options?.type == animationTypes.SPRING) {
        animation.setValue(0.1);
        animation.setOffset(0.1);
        Animated.spring(animation, {
          toValue: 1,
          friction: 3,
          delay: options?.delay,
          useNativeDriver: false,
        }).start(() => {
          if (options.endAnimation) {
            finishAnimation(true);
          }
          options?.callback && options?.callback();
        });
      }
    }
  }, [options, setOptions, animation]);

  const finishAnimation = (isSpring?: boolean) => {
    if (isSpring) {
      setOptions(null);
      return;
    }

    setTimeout(() => {
      setOptions(null);
    }, 250);
  };

  const changeAnimationOptions = (newOptions: OptionsProps) => {
    setOptions(newOptions);
  };

  return (
    <BetweenContext.Provider value={{ changeAnimationOptions }}>
      {children}
      {!!options && (
        <Animated.View
          style={getStyleStructureByType(animation, options?.type)}
        >
          {options?.componentChildren}
        </Animated.View>
      )}
    </BetweenContext.Provider>
  );
}

export { BetweenPagesProvider };
