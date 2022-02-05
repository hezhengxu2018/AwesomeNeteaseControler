import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import {Store} from '../store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MusicControler = () => {
  const {state, dispatch} = useContext(Store);
  const isPlaying = state.playState;
  const [currentIP, setCurrentIP] = useState('0');
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.AndroidSender);
    const currentIPListener = eventEmitter.addListener(
      'EVENT_SET_PC_STATE',
      event => {
        if (event.IP !== currentIP) {
          setCurrentIP(event.set);
        }
      },
    );
    return () => {
      currentIPListener.remove();
    };
  }, [currentIP]);
  return (
    <View style={styles.controlerWrapper}>
      <MaterialIcons
        onPress={() => {
          fetch(`http://${currentIP}:9283/media/prev`).then(
            res => {
              console.log(res);
            },
            err => {
              console.log(err);
            },
          );
        }}
        name={'skip-previous'}
        size={40}
        color="#000"
      />
      <TouchableHighlight
        style={styles.palyControler}
        onPress={async () => {
          try {
            await fetch(`http://${currentIP}:9283/media/play`);
            const res = await (
              await fetch(`http://${currentIP}:9283/media/allInfo`)
            ).json();
            if (res) {
              dispatch({
                type: 'SET_PLAY_STATE',
                payload: !res.playing,
              });
            }
          } catch (error) {}
        }}>
        <MaterialIcons
          name={isPlaying ? 'pause' : 'play-arrow'}
          size={50}
          color="#000"
        />
      </TouchableHighlight>
      <MaterialIcons
        onPress={() => {
          fetch(`http://${currentIP}:9283/media/next`);
        }}
        name={'skip-next'}
        size={40}
        color="#000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  controlerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // bottom: -150,
    marginTop: 10,
    width: 250,
  },
  palyControler: {
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    // borderWidth: 1,
    borderColor: '#999',
    elevation: 20,
  },
});

export default MusicControler;
