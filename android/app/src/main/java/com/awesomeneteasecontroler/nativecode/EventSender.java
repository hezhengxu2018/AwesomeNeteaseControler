package com.awesomeneteasecontroler.nativecode;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class EventSender extends ReactContextBaseJavaModule {
    public EventSender(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
        singleton=this;

        init(reactContext);
    }

    private static EventSender singleton=null;
    private ReactContext reactContext;
    public  static void send(
                             String eventName,
                              WritableMap params){
        if (singleton.reactContext==null)
            return;
        singleton.reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
    public EventSender getContext(){
        return singleton;
    }
    public static void init(ReactContext reactContext){

        singleton.reactContext=reactContext;

    }

    public static void setSong(String artist,String title,String album){

        WritableMap params = Arguments.createMap();
        params.putString("TITLE",title);
        params.putString("ALBUMURL",album);
        params.putString("ARTIST",artist);
        send("EVENT_UPDATE_SONG",params);

    }

    public static void setProgress(double progress,double len){

        WritableMap params = Arguments.createMap();
        params.putString("PROGRESS",progress+"");
        params.putString("LENGTH",len+"");
        send("EVENT_UPDATE_PROGRESS",params);

    }

    public static void setPCState(String param){

        WritableMap params = Arguments.createMap();
        params.putString("set",param);
        send("EVENT_SET_PC_STATE",params);

    }
    public static void setRunningState(boolean var){

        WritableMap params = Arguments.createMap();
        params.putString("set",var+"");
        send("EVENT_SET_NETEASE_RUNNING_STATE",params);
    }

    public static void setPlayingState(boolean var){

        WritableMap params = Arguments.createMap();
        params.putString("set",var+"");
        send("EVENT_SET_PLAYING_STATE",params);
    }

    @NonNull
    @Override
    public String getName() {
        return "AndroidSender";
    }
}
