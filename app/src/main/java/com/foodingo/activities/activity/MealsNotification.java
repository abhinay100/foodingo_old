package com.foodingo.activities.activity;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.NotificationCompat;
import android.widget.Toast;
import com.foodingo.activities.R;


/**
 * Created by admin on 16-11-2015.
 */
public class MealsNotification extends BroadcastReceiver  {

    private NotificationManager mNotificationManager;
    private int SIMPLE_NOTFICATION_ID;

    @Override
    public void onReceive(Context context, Intent arg1) {
        // TODO Auto-generated method stub
        NotificationManager mNotificationManager;
        NotificationCompat.Builder builder;
        mNotificationManager = (NotificationManager)
                context.getSystemService(Context.NOTIFICATION_SERVICE);

        Intent intent = new Intent(context, MainActivity.class);


        PendingIntent alarmIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);

        NotificationCompat.Builder mBuilder =
                (NotificationCompat.Builder) new NotificationCompat.Builder(context)
                        .setSmallIcon(R.drawable.app_icon)
                        .setContentTitle("Foodingo")
                        .setStyle(new NotificationCompat.BigTextStyle()
                                .bigText("bigtext"))
                        .setAutoCancel(true)
                        .setContentText("Its time to check your nutritionist's picks for your next meal");

        mBuilder.setContentIntent(alarmIntent);
        mNotificationManager.notify(0, mBuilder.build());

        // Show the toast  like in above screen shot
        //    Toast.makeText(context, "Alarm Triggered for Notification", Toast.LENGTH_LONG).show();

    }



}
