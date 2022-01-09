import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  DeviceEventEmitter,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MusicControler = () => {
  const [musicStatus, setMusicStatus] = useState(false);
  const [currentIP, setCurrentIP] = useState('0');
  useEffect(() => {
    const musicStatusListener = DeviceEventEmitter.addListener(
      'EVENT_SET_PLAYING_STATE',
      event => {
        if (event.set === 'true') {
          setMusicStatus(true);
        } else {
          setMusicStatus(false);
        }
      },
    );
    const currentIPListener = DeviceEventEmitter.addListener(
      'EVENT_SET_PC_STATE',
      event => {
        setCurrentIP(event.set);
      },
    );
    return () => {
      musicStatusListener.remove();
      currentIPListener.remove();
    };
  }, []);
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
        onPress={() => {
          fetch(`http://${currentIP}:9283/media/play`);
        }}>
        <MaterialIcons
          name={musicStatus ? 'pause' : 'play-arrow'}
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
