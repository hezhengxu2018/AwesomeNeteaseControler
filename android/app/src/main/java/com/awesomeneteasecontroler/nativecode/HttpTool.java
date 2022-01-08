package com.awesomeneteasecontroler.nativecode;

import java.io.IOException;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class HttpTool {

    private static final OkHttpClient client = new OkHttpClient();

    public static void sendWithoutResult(String url) throws IOException {
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(url)
                .build();
            client.newCall(request).execute();



    }

    public static Response sendWithResponse(String url) throws IOException{

        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(url)
                .build();
        return client.newCall(request).execute();

    }
}
