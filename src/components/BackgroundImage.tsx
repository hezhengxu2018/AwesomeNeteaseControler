import React, {FC, useMemo} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Store} from '../store';
import {AuxProps} from '../types';

const Background: FC<AuxProps> = ({children}) => {
  const {state} = React.useContext(Store);
  // const {albumUrl} = state.musicInfo;
  // const albumUrl = state.musicInfo.albumUrl
  //   ? state.musicInfo.albumUrl
  //   : 'http://p2.music.126.net/FGYCo9ZtZd-vcOBZXeu-Cg==/109951165868160762.jpg';
  const albumUrl = useMemo(() => {
    if (state.musicInfo.albumUrl) {
      return state.musicInfo.albumUrl;
    }
    return 'http://p2.music.126.net/FGYCo9ZtZd-vcOBZXeu-Cg==/109951165868160762.jpg';
  }, [state]);
  return (
    <ImageBackground
      style={styles.appContainer}
      source={{uri: albumUrl}}
      blurRadius={90}>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    height: '100%',
    justifyContent: 'center',
  },
});

export default Background;
