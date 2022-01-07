package com.awesomeneteasecontroler.nativecode;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import java.io.IOException;

import okhttp3.Response;

public class UpdatePCStateThread implements Runnable {
    private SharedPreferences sharedPreferences;
    private Context context;
    public UpdatePCStateThread(Context context) {
        this.context=context;
        sharedPreferences=context.getSharedPreferences("config",Context.MODE_PRIVATE);
    }

    @Override
    public void run() {
        while (true){
            String ip=sharedPreferences.getString("ip","null");
            if ("null".equals(ip))
            {   Log.i("exist_net","第一次开启软件开始找ip");
                new NetworkSniffTask(context).execute();
                try {
                    Thread.sleep(5000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }

            try {
                ip=sharedPreferences.getString("ip","null");
                HttpTool.sendWithoutResult("http://" + ip + ":9283/net/exist");
                State.PCCLIENTRUNNING=true;
                InfoAll.ip=ip;
                Log.i("exist_net","success_set_ip");
                EventSender.setPCState(ip);
                try {
                    Thread.sleep(60000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

            } catch (IOException e) {
                State.PCCLIENTRUNNING=false;
                Log.i("exist_net","failure_set_ip");
                EventSender.setPCState("0");
                new NetworkSniffTask(context).execute();
            }


            try {
                Thread.sleep(10000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }


        }
    }
}
