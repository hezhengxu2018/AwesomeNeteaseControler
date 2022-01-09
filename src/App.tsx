import React from 'react';
import {
  SafeAreaView,
  ImageBackground,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Status from './components/Status';
import Progress from './components/Progress';
import MusicControler from './components/MusicControler';
import MusicInfo from './components/MusicInfo';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView>
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(0,0,0,0)"
        translucent={true}
      />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.appContainer}>
        <MusicInfo />
        <Status />
        <Progress />
        <MusicControler />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    height: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
  },
});

export default App;
