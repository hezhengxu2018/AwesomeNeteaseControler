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
    private Context context;

    public NetThread(Context context, String ip) {
        this.context=context;
        this.ip = ip;
    }

    @Override
    public void run() {


        try {
            Response res=HttpTool.sendWithResponse("http://" + ip + ":9283/net/exist");
            if (res.body().string().equals("yes")){
                SharedPreferences sharedPreferences=context.getSharedPreferences("config",Context.MODE_PRIVATE);
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
