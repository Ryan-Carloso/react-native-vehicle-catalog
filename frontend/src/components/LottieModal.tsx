import { useEffect } from 'react';
import LottieView, { AnimationObject } from 'lottie-react-native';

import { Modal, StyleSheet, View } from 'react-native';

type TLottieModalProps = {
  visible: boolean;
  lottieSource: string | AnimationObject | { uri: string };
  duration?: number;
  size?: number;
  onClose?: () => void;
};

const DEFAULT_DURATION = 1400;
const DEFAULT_SIZE = 150;

export function LottieModal({
  visible,
  lottieSource,
  duration = DEFAULT_DURATION,
  size = DEFAULT_SIZE,
  onClose,
}: TLottieModalProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!visible) {
    return null;
  }

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.container}>
        <LottieView
          source={lottieSource}
          autoPlay
          loop={false}
          style={{ width: size, height: size }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
