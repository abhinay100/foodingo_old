package com.foodingo.activities.activity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

import com.codetroopers.betterpickers.numberpicker.NumberPickerBuilder;
import com.codetroopers.betterpickers.numberpicker.NumberPickerDialogFragment;
//fc    import com.facebook.login.LoginManager;
import com.foodingo.activities.R;
import com.foodingo.activities.helpers.UIHelper;
import com.foodingo.activities.model.OnBoardUser;
import com.mixpanel.android.mpmetrics.MixpanelAPI;
import com.parse.ParseFacebookUtils;
import com.parse.ParseUser;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Calendar;


public class HeightWeightDetails extends AppCompatActivity implements NumberPickerDialogFragment.NumberPickerDialogHandler {

    Button heightBTN,weightBTN,nextBTN,weightUnitBTN,skipBtnOne;
    private static final int BUTTON_ONE_REFERENCE = 0;
    private static final int BUTTON_TWO_REFERENCE = 1;
    Context mContext;
    int finalHeight = 9999;  //164
    int finalWeight = 9999;     //60
    public static OnBoardUser onBoardUser;
    int finalWeightUnit;
    ImageView weightIV,heightIV;
    //Mixpanel step 17-a
    MixpanelAPI mixpanel ;
    long start;
    long end;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_number_details);
        mContext = HeightWeightDetails.this;

        initializeComponents();
        //mixpanel step 17-b
        mixpanel = MixpanelAPI.getInstance(getApplicationContext(), getString(R.string.mixpanel_projectToken));
        start = Calendar.getInstance().getTimeInMillis();


        weightIV.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                NumberPickerBuilder npb = new NumberPickerBuilder()
                        .setFragmentManager(getSupportFragmentManager())
                        .setStyleResId(R.style.BetterPickersDialogFragment_Light)
                        .setPlusMinusVisibility(View.INVISIBLE)
                        .setDecimalVisibility(View.INVISIBLE)
                        .setReference(BUTTON_TWO_REFERENCE)
                        .setLabelText(weightUnitBTN.getText().toString());
                npb.show();
            }
        });

        heightIV.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                NumberPickerBuilder npb = new NumberPickerBuilder()
                        .setFragmentManager(getSupportFragmentManager())
                        .setStyleResId(R.style.BetterPickersDialogFragment_Light)
                        .setPlusMinusVisibility(View.INVISIBLE)
                        .setDecimalVisibility(View.INVISIBLE)
                        .setReference(BUTTON_ONE_REFERENCE)
                        .setLabelText("CM");
                npb.show();
            }
        });

        heightBTN.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                NumberPickerBuilder npb = new NumberPickerBuilder()
                        .setFragmentManager(getSupportFragmentManager())
                        .setStyleResId(R.style.BetterPickersDialogFragment_Light)
                        .setPlusMinusVisibility(View.INVISIBLE)
                        .setDecimalVisibility(View.INVISIBLE)
                        .setReference(BUTTON_ONE_REFERENCE)
                        .setLabelText("CM");
                npb.show();
            }
        });

        weightBTN.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                NumberPickerBuilder npb = new NumberPickerBuilder()
                        .setFragmentManager(getSupportFragmentManager())
                        .setStyleResId(R.style.BetterPickersDialogFragment_Light)
                        .setPlusMinusVisibility(View.INVISIBLE)
                        .setDecimalVisibility(View.INVISIBLE)
                        .setReference(BUTTON_TWO_REFERENCE)
                        .setLabelText(weightUnitBTN.getText().toString());
                npb.show();


            }
        });

        nextBTN.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(validateFields()){
                    saveUserDetails();
                    startActivity(new Intent(HeightWeightDetails.this, WorkoutDetails.class));
                }
            }
        });
        skipBtnOne.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBoardUser.setHeight(0);
                onBoardUser.setWeight(0);
                onBoardUser.setWeight_unit(0);
                onBoardUser.setHeight_unit(0);
                //Mixpanel step 5 -skipped event , height and weight page
                try {
                    JSONObject props = new JSONObject();
                    props.put("Page", "Height and Weight");
                    props.put("Height Entered", heightBTN.getText());
                    props.put("Weight Entered", weightBTN.getText());
                    mixpanel.track("Skipped", props);
                } catch (JSONException e) {
                    Log.e("mixpanel skipped height and weight", "Unable to add properties to JSONObject", e);
                }
                   // saveUserDetails();
                    startActivity(new Intent(HeightWeightDetails.this, WorkoutDetails.class));

            }
        });

        weightUnitBTN.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(weightUnitBTN.getText().toString().equals("KG")){
                    weightUnitBTN.setText("LBS");
                }else{
                    weightUnitBTN.setText("KG");
                }
            }
        });
    }







    private void initializeComponents(){
        heightBTN = (Button) findViewById(R.id.heightBTN);
        weightBTN = (Button) findViewById(R.id.weightBTN);
        nextBTN = (Button) findViewById(R.id.nextBTN2);

        weightUnitBTN  =(Button) findViewById(R.id.weightUnit_BTN);

        weightIV = (ImageView) findViewById(R.id.weight_DETAILS_IV);
        heightIV = (ImageView) findViewById(R.id.height_DETAILS_IV);
        skipBtnOne = (Button) findViewById(R.id.skipBTN1);

        onBoardUser = PersonalDetails.onBoardUser;
    }

    //update user details in parse
    private void saveUserDetails(){
        onBoardUser.setHeight(finalHeight);
        onBoardUser.setWeight(finalWeight);
        onBoardUser.setWeight_unit(finalWeightUnit);
        onBoardUser.setHeight_unit(0);
    }

    //check if user filled details
    private boolean validateFields(){
        if(finalHeight == 9999){
            UIHelper.showToast(mContext,"Please enter your height",3500);
            return false;
        }else if(finalWeight == 9999){
            UIHelper.showToast(mContext,"Please enter your weight",3500);
            return false;
        }else{
            return true;
        }
    }

    //handle the height/weight entered
    @Override
    public void onDialogNumberSet(int reference, int number, double decimal, boolean isNegative, double fullNumber) {
        switch (reference) {
            case BUTTON_ONE_REFERENCE:
                if(UIHelper.validateHeight(mContext,number)){
                    heightBTN.setText(number+" CM");
                    finalHeight = number;
                }
                break;
            case BUTTON_TWO_REFERENCE:

                if(weightUnitBTN.getText().equals("LBS")){
                   double weight = UIHelper.convertLBSToKG(number);
                    if(UIHelper.validateWeight(mContext,weight)) {
                        weightBTN.setText(String.valueOf(number));
                        finalWeight = number;
                        finalWeightUnit = 1;

                    }
                }else if (UIHelper.validateWeight(mContext, number)) {
                        weightBTN.setText(String.valueOf(number));
                        finalWeight = number;
                        finalWeightUnit = 0;


                    }

                break;
            default:
                break;
        }
    }

    @Override
    public void finish() {
        super.finish();

        /* fc
        if(Login.fromFB) {
            LoginManager.getInstance().logOut();
        }
        */
//        ParseUser user = ParseUser.getCurrentUser();
//
//        if(user != null)
//            user.deleteInBackground();
        if(ParseFacebookUtils.getSession()!=null)
            ParseFacebookUtils.getSession().closeAndClearTokenInformation();

     //   ParseUser.logOut();
    }
    @Override
    public void onPause() {
        super.onPause();
        //Mixpanel step 17-c
        end = Calendar.getInstance().getTimeInMillis();
        double total = (end-start)*0.001;
        try {
            JSONObject props = new JSONObject();
            props.put("Height and Weight Onboarding", total);
            mixpanel.track("Time Spent", props);
        } catch (JSONException e) {
            Log.e("mixpanel Height and Weight Onboarding time spent", "Unable to add properties to JSONObject", e);
        }
    }

}
