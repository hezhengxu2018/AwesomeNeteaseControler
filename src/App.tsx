import React from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Status from './components/Status';
import Progress from './components/Progress';
import MusicControler from './components/MusicControler';
import MusicInfo from './components/MusicInfo';
import ImageBackground from './components/BackgroundImage';
import {Provider} from './store';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  console.log(isDarkMode);
  return (
    <SafeAreaView>
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(0,0,0,0)"
        translucent={true}
      />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Provider>
        <ImageBackground>
          <View style={styles.contentContainer}>
            <MusicInfo />
            <Status />
            <Progress />
            <MusicControler />
          </View>
        </ImageBackground>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    height: '90%',
    display: 'flex',
    marginVertical: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default App;
