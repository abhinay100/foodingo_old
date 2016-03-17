package com.foodingo.activities.activity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;


import com.foodingo.activities.R;
import com.parse.ParseUser;

/**
 * Created by Shaik on 17/8/15.
 */

public class Splash extends AppCompatActivity {

    ParseUser currentUser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        currentUser = ParseUser.getCurrentUser();

        //check if user is already logged in after 2 sec
        new Handler().postDelayed(new Runnable() {
            public void run() {
                if ((currentUser != null)) {
                    if (currentUser.has("weight") && currentUser.has("height") && currentUser.has("date_of_birth")) {
                        //take inside app
                        Intent intent = new Intent(Splash.this, MainActivity.class);
                        startActivity(intent);
                        finish();
                    } else {
                        //get details from user
                        Intent splashIntent = new Intent(Splash.this, PersonalDetails.class);
                        startActivity(splashIntent);
                        finish();
                    }
                }else{
                    //take to login screen
                    Intent loginIntent = new Intent(Splash.this, Login.class);
                    startActivity(loginIntent);
                    finish();
                }
            }
        }, 2000);
    }
}
