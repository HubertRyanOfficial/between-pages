import React, { useRef } from "react";
import { View, Animated, TouchableWithoutFeedback } from "react-native";

import {
  animationTypes,
  animationTypesSupportedByWrapper,
} from "../utils/animationTypes";

interface Props {
  children: any;
  onPress?: () => void;
  type?: string;
  delay?: number;
}

function getStyleStructureByType(animation, type) {
  if (type == animationTypes.FADE) {
    return {
      opacity: animation,
    };
  }
  return {
    transform: [{ scale: animation }],
  };
}

const Wrapper = ({
  children,
  onPress,
  type = animationTypes.SPRING,
  delay = 100,
}: Props) => {
  if (!children) {
    throw "Wrapper needs a component to work!";
  }

  if (!animationTypesSupportedByWrapper[type]) {
    throw "This kind of animation type is not supported by Between Wrapper.";
  }

  const animation = useRef(new Animated.Value(1)).current;

  function handleOriginalOnPress() {
    if (type == animationTypes.SPRING) {
      Animated.spring(animation, {
        toValue: 0.9,
        friction: 3,
        isInteraction: true,
        useNativeDriver: false,
      }).start();

      setTimeout(() => {
        Animated.spring(animation, {
          toValue: 1,
          friction: 3,
          isInteraction: true,
          useNativeDriver: false,
        }).start();
      }, delay);
    } else if (type == animationTypes.FADE) {
      Animated.timing(animation, {
        toValue: 0.5,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.spring(animation, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      }, delay);
    }

    !!onPress && onPress();
  }

  return (
    <TouchableWithoutFeedback onPress={() => handleOriginalOnPress()}>
      <Animated.View style={getStyleStructureByType(animation, type)}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export { Wrapper };
