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

    private WeakReference<Context> mContextRef;

    public NetworkSniffTask(Context context) {
        mContextRef = new WeakReference<Context>(context);
    }

    @Override
    public Void doInBackground(Void... voids) {

        try {
            Context context = mContextRef.get();

            if (context != null) {
                ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
                NetworkInfo activeNetwork = cm.getActiveNetworkInfo();
                WifiManager wm = (WifiManager) context.getApplicationContext().getSystemService(Context.WIFI_SERVICE);
                WifiInfo connectionInfo = wm.getConnectionInfo();
                int ipAddress = connectionInfo.getIpAddress();
                String ipString = Formatter.formatIpAddress(ipAddress);
                String prefix = ipString.substring(0, ipString.lastIndexOf(".") + 1);

                for (int i = 0; i < 255; i++) {
                    String testIp = prefix + String.valueOf(i);
                        access(testIp,context.getApplicationContext());
                }



            }
        } catch (Throwable t) {

        }

        return null;
    }

    private boolean access(String ip,Context context) {

        new Thread(new NetThread(context, ip)).start();


        return false;
    }

}