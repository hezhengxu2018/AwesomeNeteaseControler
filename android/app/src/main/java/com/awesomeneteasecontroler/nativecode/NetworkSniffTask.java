package com.awesomeneteasecontroler.nativecode;

import android.content.Context;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.AsyncTask;
import android.text.format.Formatter;
import android.util.Log;
import android.widget.Toast;

import java.lang.ref.WeakReference;
import java.util.concurrent.atomic.AtomicReference;

import okhttp3.ResponseBody;

public class NetworkSniffTask extends AsyncTask<Void, Void, Void> {

    private static final String TAG = "NETWORK_LOG";

    private WifiManager wifiManager;
    private SharedPreferences sharedPreferences;
    private WifiInfo connectionInfo;
    public NetworkSniffTask(SharedPreferences sharedPreferences,WifiManager wifiManager,WifiInfo wifiInfo) {
        this.sharedPreferences=sharedPreferences;
        this.wifiManager=wifiManager;
        connectionInfo=wifiInfo;
    }

    @Override
    public Void doInBackground(Void... voids) {

        try {




                int ipAddress = connectionInfo.getIpAddress();
                String ipString = Formatter.formatIpAddress(ipAddress);
                String prefix = ipString.substring(0, ipString.lastIndexOf(".") + 1);

                for (int i = 0; i < 255; i++) {
                    String testIp = prefix + String.valueOf(i);
                        access(testIp);
                }




        } catch (Throwable t) {

        }

        return null;
    }

    private boolean access(String ip) {

        new Thread(new NetThread( ip,sharedPreferences)).start();


        return false;
    }

}