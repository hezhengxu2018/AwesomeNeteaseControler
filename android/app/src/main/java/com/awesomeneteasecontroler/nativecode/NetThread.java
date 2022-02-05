package com.awesomeneteasecontroler.nativecode;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import java.io.IOException;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class NetThread implements Runnable{
    private String  ip ;

    private SharedPreferences sharedPreferences;
    public NetThread( String ip,SharedPreferences sharedPreferences) {
        this.sharedPreferences=sharedPreferences;
        this.ip = ip;
    }

    @Override
    public void run() {


        try {
            Log.i("find_ip",ip);
            Response res=HttpTool.sendWithResponse("http://" + ip + ":9283/net/exist");
            if (res.body().string().equals("yes")){

                SharedPreferences.Editor editor=sharedPreferences.edit();
                editor.putString("ip",ip);
                editor.commit();
                Log.i("exist_net","success_set_ip");
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
