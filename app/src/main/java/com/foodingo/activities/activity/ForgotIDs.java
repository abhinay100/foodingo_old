package com.foodingo.activities.activity;

import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ImageButton;
import android.widget.TextView;

import com.foodingo.activities.R;
import com.foodingo.activities.helpers.UIHelper;


/**
 * Created by Shaik on 3/8/15.
 */

public class ForgotIDs extends AppCompatActivity implements OnClickListener {

    Context mContext;
    UIHelper font;
    TextView actionbarTitleTV;
    ImageButton actionBarBTN1,actionBarBTN2;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_forgot_id);
        initializeComponents();

        actionbarTitleTV.setText(R.string.title_activity_forgot);
        actionBarBTN2.setVisibility(View.INVISIBLE);
    }

    private void initializeComponents() {

        actionbarTitleTV = (TextView) findViewById(R.id.title_ACTIONBAR_TV);

        actionBarBTN1 = (ImageButton) findViewById(R.id.imageButton_ACTIONBAR_BTN1);
        actionBarBTN2 = (ImageButton) findViewById(R.id.imageButton_ACTIONBAR_BTN2);

        actionBarBTN1.setOnClickListener(this);
        mContext = ForgotIDs.this;

        //assign fonts
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
}

