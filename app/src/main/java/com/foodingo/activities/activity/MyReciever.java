package com.foodingo.activities.activity;


import android.content.Context;
import android.content.Intent;
import com.parse.ParsePushBroadcastReceiver;



public class MyReciever extends ParsePushBroadcastReceiver {

    @Override
    public void onPushOpen(Context context, Intent intent) {
        Intent newIntent = context.getPackageManager().getLaunchIntentForPackage(context.getPackageName());
        newIntent.putExtras(intent.getExtras());
        context.startActivity(newIntent);
    }

}