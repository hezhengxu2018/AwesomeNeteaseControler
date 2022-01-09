import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, DeviceEventEmitter} from 'react-native';
interface IMusicInfoModel {
  ARTIST: string;
  ALBUMURL: string;
  TITLE: string;
}
const MusicInfo = () => {
  const [musicInfo, setMusicInfo] = useState({
    ARTIST: '',
    ALBUMURL: '',
    TITLE: '',
  });
  useEffect(() => {
    const musicInfoListener = DeviceEventEmitter.addListener(
      'EVENT_UPDATE_SONG',
      (event: IMusicInfoModel) => {
        setMusicInfo(event);
      },
    );
    return () => {
      musicInfoListener.remove();
    };
  }, []);
  return (
    <>
      <Text style={styles.titleWrapper}>{musicInfo.TITLE}</Text>
      <Text style={styles.subtitleWrapper}>{musicInfo.ARTIST}</Text>
      <View style={styles.albumContainer}>
        <Image
          style={styles.albumImage}
          source={{
            uri: 'http://p2.music.126.net/FGYCo9ZtZd-vcOBZXeu-Cg==/109951165868160762.jpg',
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    fontWeight: '500',
    fontSize: 27,
    color: '#000',
    marginTop: 80,
    textShadowColor: 'rgba(11, 11, 11,0.3)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 9,
  },
  subtitleWrapper: {
    fontSize: 14,
    fontWeight: '100',
    color: '#555',
    marginTop: 1,
    textShadowColor: 'rgba(3, 3, 3,0.19)',
    textShadowOffset: {width: -1, height: -1},
    textShadowRadius: 5,
  },
  albumContainer: {
    position: 'relative',
    width: 250,
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 40,
    elevation: 22,
    zIndex: 199,
    overflow: 'hidden',
  },
  albumImage: {
    position: 'relative',
    zIndex: 1,
    transform: [{scale: 1.09}],
    flex: 1,
    resizeMode: 'cover',
  },
});

export default MusicInfo;
