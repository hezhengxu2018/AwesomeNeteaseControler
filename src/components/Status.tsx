import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, DeviceEventEmitter} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Status = () => {
  const [isNeteaseRuning, setIsNeteaseRuning] = useState(false);
  const [isConnectToPC, setIsConnectToPC] = useState(false);
  useEffect(() => {
    const neteaseRuningListener = DeviceEventEmitter.addListener(
      'EVENT_SET_NETEASE_RUNNING_STATE',
      event => {
        if (event.set === 'true') {
          setIsNeteaseRuning(true);
        } else {
          setIsNeteaseRuning(false);
        }
      },
    );
    const connectToPCListener = DeviceEventEmitter.addListener(
      'EVENT_SET_PC_STATE',
      event => {
        if (event.set !== '0') {
          setIsConnectToPC(true);
        } else {
          setIsConnectToPC(false);
        }
      },
    );
    return () => {
      neteaseRuningListener.remove();
      connectToPCListener.remove();
    };
  }, []);
  return (
    <View style={styles.statusIndicatorWrapper}>
      <View style={styles.statusIndicator}>
        <MaterialIcons
          name={isConnectToPC ? 'done' : 'close'}
          size={30}
          color={isConnectToPC ? '#7fa37b' : '#8c0000'}
        />
        <Text style={styles.statusIndicatorText}>已连接PC</Text>
      </View>
      <View style={styles.statusIndicator}>
        <MaterialIcons
          name={isNeteaseRuning ? 'done' : 'close'}
          size={30}
          color={isNeteaseRuning ? '#7fa37b' : '#8c0000'}
        />
        <Text style={styles.statusIndicatorText}>
          {isNeteaseRuning ? '网易云已运行' : '网易云未运行'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusIndicatorWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 50,
  },
  statusIndicator: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicatorText: {
    fontSize: 20,
    color: '#000',
    fontWeight: '500',
  },
});

export default Status;
