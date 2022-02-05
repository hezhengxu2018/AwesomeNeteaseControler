import React, {useEffect, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import {Store} from '../store';
// import ProgressiveImage from './ProgressiveImage';
interface IMusicInfoModel {
  ARTIST: string;
  ALBUMURL: string;
  TITLE: string;
}

const MusicInfo = () => {
  const {state, dispatch} = React.useContext(Store);
  const setMusicInfo = (musicInfo: IMusicInfoModel) => {
    if (state.musicInfo.songTitle !== musicInfo.TITLE) {
      dispatch({
        type: 'SET_MUSIC_INFO',
        payload: {
          songTitle: musicInfo.TITLE,
          artist: musicInfo.ARTIST,
          albumUrl: musicInfo.ALBUMURL,
        },
      });
    }
  };

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.AndroidSender);
    const musicInfoListener = eventEmitter.addListener(
      'EVENT_UPDATE_SONG',
      (event: IMusicInfoModel) => {
        setMusicInfo(event);
      },
    );
    return () => {
      musicInfoListener.remove();
    };
  });
  const albumUrl = useMemo(() => {
    if (state.musicInfo.albumUrl) {
      return state.musicInfo.albumUrl;
    }
    return 'http://p2.music.126.net/FGYCo9ZtZd-vcOBZXeu-Cg==/109951165868160762.jpg';
  }, [state]);
  return (
    <>
      <View style={styles.titleContainer}>
        <Text
          style={styles.titleWrapper}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {state.musicInfo.songTitle}
        </Text>
        <Text style={styles.subtitleWrapper}>{state.musicInfo.artist}</Text>
      </View>
      <View style={styles.albumContainer}>
        <Image
          style={styles.albumImage}
          source={{
            uri: albumUrl,
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWrapper: {
    fontWeight: '500',
    fontSize: 27,
    color: '#000',
    textShadowColor: 'rgba(200, 200, 200,0.4)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  subtitleWrapper: {
    fontSize: 14,
    fontWeight: '300',
    color: '#333',
    textShadowColor: 'rgba(200, 200, 200,0.6)',
    textShadowOffset: {width: -1, height: -1},
    textShadowRadius: 5,
  },
  albumContainer: {
    position: 'relative',
    width: 250,
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 22,
    zIndex: 199,
    overflow: 'hidden',
  },
  albumImage: {
    position: 'relative',
    zIndex: 1,
    flex: 1,
    resizeMode: 'cover',
  },
});

export default MusicInfo;
