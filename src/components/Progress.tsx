import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import Bar from 'react-native-progress/Bar';
const Progress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.AndroidSender);
    const progressListener = eventEmitter.addListener(
      'EVENT_UPDATE_PROGRESS',
      event => {
        if (Number(event.LENGTH) !== 0) {
          const percentage = Number(event.PROGRESS) / Number(event.LENGTH);
          setProgress(percentage);
        }
      },
    );
    return () => {
      progressListener.remove();
    };
  }, []);
  return (
    <View style={styles.progressBarWrapper}>
      <Bar
        progress={progress}
        width={300}
        color="#a8a8a8"
        height={8}
        unfilledColor="rgba(255,255,255,0.2)"
        borderWidth={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarWrapper: {},
});

export default Progress;
