package com.foodingo.activities.activity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;

// fc import com.facebook.login.LoginManager;
import com.foodingo.activities.R;
import com.foodingo.activities.helpers.UIHelper;
import com.foodingo.activities.model.OnBoardUser;
import com.mixpanel.android.mpmetrics.MixpanelAPI;
import com.parse.ParseFacebookUtils;
import com.parse.ParseUser;
import com.weiwangcn.betterspinner.library.material.MaterialBetterSpinner;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Calendar;

public class WorkoutDetails extends AppCompatActivity {

    MaterialBetterSpinner exSpinner,mealSpinner,snackSpinner;
    Button nextBTN,skipBtnTwo;
    Context mContext;
    int finalExercise ,finalMeal,finalSnack;
    double finalCalFactor;
    public static OnBoardUser onBoardUser;
    //Mixpanel step 18-a
    MixpanelAPI mixpanel ;
    long start;
    long end;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_final_details);
        initializeComponenets();
        mContext = WorkoutDetails.this;
        onBoardUser = HeightWeightDetails.onBoardUser;
        //mixpanel step 18-b
        mixpanel = MixpanelAPI.getInstance(getApplicationContext(), getString(R.string.mixpanel_projectToken));
        start = Calendar.getInstance().getTimeInMillis();


        nextBTN.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(validateFields()){
                    saveUserDetails();
                    startActivity(new Intent(WorkoutDetails.this, PreferencesActivity.class));
                }
            }
        });
        skipBtnTwo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBoardUser.setSnack(2);
                onBoardUser.setMeal(2);
                onBoardUser.setCalorieFactor(1.2);
                onBoardUser.setExcercise(0);
                //Mixpanel step 6 -skipped event , Work out details page
                try {
                    JSONObject props = new JSONObject();
                    props.put("Page", "Work out details");
                    props.put("Frequency of Exercise",exSpinner.getText().toString());
                    props.put("No of meals per day",mealSpinner.getText().toString());
                    props.put("No of snanks per day",snackSpinner.getText().toString());
                    mixpanel.track("Skipped", props);
                } catch (JSONException e) {
                    Log.e("mixpanel skipped Work out details", "Unable to add properties to JSONObject", e);
                }
                startActivity(new Intent(WorkoutDetails.this, PreferencesActivity.class));
            }
        });
    }








    private void saveUserDetails(){

        String exerciseRange = exSpinner.getText().toString();
        if(exerciseRange.startsWith("L")){
            finalExercise = 0;
            finalCalFactor = 1.2;
        }else if(exerciseRange.startsWith("1")){
            finalExercise = 1;
            finalCalFactor = 1.375;
        }else if(exerciseRange.startsWith("3")){
            finalExercise = 2;
            finalCalFactor = 1.55;
        }else if(exerciseRange.startsWith("M")){
            finalExercise = 3;
            finalCalFactor = 1.725;
        }else if(exerciseRange.startsWith("I")){
            finalExercise = 4;
            finalCalFactor = 1.9;
        }

        String meal = mealSpinner.getText().toString();
        if(meal.equals("-")){
            finalMeal = 1;
        }else {
            finalMeal = Integer.parseInt(meal);
        }

        String snack = snackSpinner.getText().toString();
        if(snack.equals("-")){
            finalSnack = 0;
        }else {
            finalSnack = Integer.parseInt(snack);
        }

        onBoardUser.setSnack(finalSnack);
        onBoardUser.setMeal(finalMeal);
        onBoardUser.setCalorieFactor(finalCalFactor);
        onBoardUser.setExcercise(finalExercise);

    }

    //check if user has entered all the fields
    private boolean validateFields(){

        if(exSpinner.getText().toString().equals("")){
            UIHelper.showToast(mContext,"Select exercise frequency",3500);
            return false;
        }else if(mealSpinner.getText().toString().equals("")){
            UIHelper.showToast(mContext,"Select no. of meals",3500);
            return false;
        }else if(snackSpinner.getText().toString().equals("")){
            UIHelper.showToast(mContext,"Select no. of snacks",3500);
            return false;
        }else{
            return true;
        }
    }

    //initialize UI components
    private void initializeComponenets(){
        exSpinner = (MaterialBetterSpinner) findViewById(R.id.exSpinner);
        mealSpinner = (MaterialBetterSpinner) findViewById(R.id.mealSpinner);
        snackSpinner = (MaterialBetterSpinner) findViewById(R.id.snackSpinner);
        nextBTN = (Button) findViewById(R.id.nextBTN3);
        skipBtnTwo =(Button)findViewById(R.id.skipBTN2);

        String[] list = getResources().getStringArray(R.array.exArray);
        String[] list2 = getResources().getStringArray(R.array.mealArray);
        String[] list3 = getResources().getStringArray(R.array.snackArray);

        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_dropdown_item_1line, list);
        ArrayAdapter<String> adapter2 = new ArrayAdapter<String>(this,
                android.R.layout.simple_dropdown_item_1line, list2);
        ArrayAdapter<String> adapter3 = new ArrayAdapter<String>(this,
                android.R.layout.simple_dropdown_item_1line, list3);

        exSpinner.setAdapter(adapter);
        mealSpinner.setAdapter(adapter2);
        snackSpinner.setAdapter(adapter3);

    }

    @Override
    public void finish() {
        super.finish();

//        if(Login.fromFB) {
            //ParseFacebookUtils.getSession().closeAndClearTokenInformation();
         //   ParseUser.logOut();
            //  FBSDKLoginManager.getInstance().logOut();
//        }
    }
    @Override
    public void onPause() {
        super.onPause();
        //Mixpanel step 18-c
        end = Calendar.getInstance().getTimeInMillis();
        double total = (end-start)*0.001;
        try {
            JSONObject props = new JSONObject();
            props.put("Workout Details Onboarding", total);
            mixpanel.track("Time Spent", props);
        } catch (JSONException e) {
            Log.e("mixpanel workout details time spent", "Unable to add properties to JSONObject", e);
        }
    }

}
