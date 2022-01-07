package com.awesomeneteasecontroler.nativecode;

import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

public class InfoAll {
    static  String ip;
    static  String songId;
    static  String songTitle;
    static  boolean isPlaying;
    static  boolean isOpenNeteaseMusic;
    static  double currentPlayingLength;
    static  double songLength;
    static  String AlbumUrl;

    static void setByJson(String object){
        try {
//            Log.i("jsonget", "setByJson: "+object);
            JSONObject jsonObject=new JSONObject(object);
            songId=jsonObject.getString("songId");
            songTitle=jsonObject.getString("songTitle");
            isPlaying=jsonObject.getBoolean("playing");
            isOpenNeteaseMusic=jsonObject.getBoolean("openNeteaseMusic");
            currentPlayingLength=Double.valueOf(jsonObject.getString("currentPlayingLength"));
            songLength=Double.valueOf(jsonObject.getString("songLength"));
            AlbumUrl=jsonObject.getString("albumUrl");

        } catch (JSONException e) {
            Log.i("json","json转换错误");
        }

    }
    static void logInfo(){
        Log.i("All_Info"," "+songId+" "+songTitle+" "+isPlaying+" "+isOpenNeteaseMusic+" "+currentPlayingLength+" "+songLength+" "+AlbumUrl);

    }

    static void sendAllInfoEvent(){

        EventSender.setPlayingState(isPlaying);
        EventSender.setRunningState(isOpenNeteaseMusic);
        EventSender.setProgress(currentPlayingLength,songLength);
        EventSender.setSong(songTitle,AlbumUrl);

    }

}
