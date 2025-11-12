import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export const useInputAnimation = () => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onFocus = () => {
    scale.value = withSpring(1.02);
  };

  const onBlur = () => {
    scale.value = withSpring(1);
  };

  return { animatedStyle, onFocus, onBlur };
};

export const useButtonAnimation = () => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPress = (callback: () => void) => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    callback();
  };

  return { animatedStyle, onPress };
};
