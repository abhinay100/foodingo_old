package com.foodingo.activities.activity;

import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;

import com.foodingo.activities.R;
import com.foodingo.activities.helpers.UIHelper;
import com.mixpanel.android.mpmetrics.MixpanelAPI;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Calendar;

public class AboutUs extends AppCompatActivity implements View.OnClickListener {

    Context mContext;
    UIHelper font;
    TextView actionbarTitleTV;
    ImageButton actionBarBTN1,actionBarBTN2;
    //Mixpanel step 20-a
    MixpanelAPI mixpanel ;
    long start;
    long end;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_about_us);
        initializeComponents();
        //mixpanel step 20-b
        mixpanel = MixpanelAPI.getInstance(getApplicationContext(), getString(R.string.mixpanel_projectToken));
        start = Calendar.getInstance().getTimeInMillis();

        actionbarTitleTV.setText(R.string.title_activity_about_us);
        actionBarBTN2.setVisibility(View.INVISIBLE);
    }

    public void initializeComponents(){

        actionbarTitleTV = (TextView) findViewById(R.id.title_ACTIONBAR_TV);

        actionBarBTN1 = (ImageButton) findViewById(R.id.imageButton_ACTIONBAR_BTN1);
        actionBarBTN2 = (ImageButton) findViewById(R.id.imageButton_ACTIONBAR_BTN2);

        actionBarBTN1.setOnClickListener(this);

        mContext = AboutUs.this;

        font = new UIHelper(mContext);

    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.imageButton_ACTIONBAR_BTN1:
                finish();
                break;
            default:
                break;
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        //getMenuInflater().inflate(R.menu.menu_about_us, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
//        if (id == R.id.action_settings) {
//            return true;
//        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onPause() {
        super.onPause();
        //Mixpanel  step 20-c
        end = Calendar.getInstance().getTimeInMillis();
        double total = (end-start)*0.001;
        try {
            JSONObject props = new JSONObject();
            props.put("About Us", total);
            mixpanel.track("Time Spent", props);
        } catch (JSONException e) {
            Log.e("mixpanel about us onboarding time spent", "Unable to add properties to JSONObject", e);
        }
    }
}
