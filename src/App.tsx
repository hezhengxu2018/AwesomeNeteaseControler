/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  Alert,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableHighlight,
  Image
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Bar from 'react-native-progress/Bar';
setInterval(() => {




}, 1000);
const Section: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    
    <SafeAreaView>
      <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent={true}></StatusBar>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ImageBackground source={require('./assets/background.png')} style={styles.appContainer}>
        <Text style={styles.titleWrapper}>運命 ～GRAND BATTLE～ (orchestra ver.)</Text>
        <Text style={styles.subtitleWrapper}>深澤秀行 / 三宅一徳 / 東京都交響楽団</Text>
        <View style={styles.albumContainer} >
         <Image   style={styles.albumImage}   source={{uri: 'http://p2.music.126.net/FGYCo9ZtZd-vcOBZXeu-Cg==/109951165868160762.jpg'}}>
          </Image> 
        </View>
        <View style={styles.statusIndicatorWrapper}>
          <View style={styles.statusIndicator}>
            <MaterialIcons name={'done'} size={30} color="#7fa37b" />
            <Text style={styles.statusIndicatorText}>已连接PC</Text>
          </View>
          <View style={styles.statusIndicator}>
            <MaterialIcons name={'close'} size={30} color="#8c0000" />
            <Text style={styles.statusIndicatorText}>网易云未运行</Text>
          </View>
        </View>
        <View style={styles.progressBarWrapper}>
          <Bar progress={0.15} width={300} color="#a8a8a8" height={8}  unfilledColor="rgba(255,255,255,0.2)" borderWidth={0} />
        </View>
        <View style={styles.controlerWrapper}>
          <MaterialIcons 
          onPress={() => {
            fetch(
              'http://192.168.2.146:9283/media/prev'
            );
            
          }}
          name={'skip-previous'} size={40} color="#000" />
          <TouchableHighlight style={styles.palyControler}
          onPress={() => {
            fetch(
              'http://192.168.2.146:9283/media/play'
            );
            
          }}
          >
            <MaterialIcons name={'play-arrow'} size={50} color="#000" />
          </TouchableHighlight>
          <MaterialIcons 
          onPress={() => {
            fetch(
              'http://192.168.2.146:9283/media/next'
            );
            
          }}
          
          name={'skip-next'} size={40} color="#000" />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    height: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center'
  },
  titleWrapper: {
    fontWeight:'500',
    fontSize: 27,
    color: '#000',
    marginTop: 80,
    textShadowColor: 'rgba(11, 11, 11,0.3)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 9
  },
  subtitleWrapper: {
    fontSize: 14,
    fontWeight: '100',
    color: '#555',
    marginTop: 1,
    textShadowColor: 'rgba(3, 3, 3,0.19)',
    textShadowOffset: {width: -1, height: -1},
    textShadowRadius: 5
  },
  albumContainer: {
    position:'relative',
    width: 250,
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 40,
    elevation: 22,
    zIndex:199,
    overflow:'hidden'
    
  },
  albumImage: {
    position:'relative',
    
    zIndex:1,
    transform: [{ scale: 1.09 }],
    flex:1,
    
    resizeMode: 'cover'
    

  },
  statusIndicatorWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 50
  },
  statusIndicator: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  statusIndicatorText: {
    fontSize: 20,
    color: '#000',
    fontWeight: '500'
  },
  progressBarWrapper: {
    marginTop: 30
  },
  controlerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    bottom:-150,
    // marginTop: -500,
    width: 250
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
    elevation: 20
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

const titleStyle = StyleSheet.create({

})

export default App;
