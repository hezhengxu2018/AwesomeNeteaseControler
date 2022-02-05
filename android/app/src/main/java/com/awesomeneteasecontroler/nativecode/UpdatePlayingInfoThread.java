package com.awesomeneteasecontroler.nativecode;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import java.io.IOException;

public class UpdatePlayingInfoThread implements Runnable{
    private static final String TAG="PLAYING INFO";
    private SharedPreferences sharedPreferences;
    private Context context;

    public UpdatePlayingInfoThread( Context context) {
        this.context=context;
        sharedPreferences=context.getSharedPreferences("config",Context.MODE_PRIVATE);
    }

    @Override
    public void run() {
        while (true){
            try {
                Thread.sleep(800);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            if (State.PCCLIENTRUNNING){
                String info= null;
                try {
                    info = HttpTool.sendWithResponse("http://" + InfoAll.ip + ":9283/media/allInfo").body().string();
                } catch (IOException e) {

                }
                if (info!=null){
                InfoAll.setByJson(info);
//                InfoAll.logInfo();
                InfoAll.sendAllInfoEvent();}






            }
        }

    }
}
