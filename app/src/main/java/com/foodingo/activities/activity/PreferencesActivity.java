package com.foodingo.activities.activity;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

//import com.facebook.login.LoginManager;
import com.foodingo.activities.R;
import com.foodingo.activities.helpers.GenerateUserHealthProfile;
import com.foodingo.activities.helpers.UIHelper;
import com.foodingo.activities.model.GlobalVar;
import com.foodingo.activities.model.OnBoardUser;
import com.foodingo.activities.model.UserHealthProfile;
import com.mixpanel.android.mpmetrics.MixpanelAPI;
import com.parse.ParseException;
import com.parse.ParseFacebookUtils;
import com.parse.ParseObject;
import com.parse.ParseUser;
import com.parse.SaveCallback;
import com.parse.SignUpCallback;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

public class PreferencesActivity extends AppCompatActivity {

    RadioButton halalRB1,halalRB2,halalRB3,vegRB1,vegRB2,vegRB3,seaRB1,seaRB2,seaRB3;
    List<RadioButton> halalRadioButtons,vegRadioButtons,seaRadioButtons;
    OnBoardUser onBoardUser;
    EditText budgetET;
    Button finishBtn;
    double finalBudget;
    int finalHalal,finalVeg,finalSeaFood;
    ParseUser user;
    private double bmi;
    private int bmiState;
    private double bodyfat;
    private com.foodingo.activities.helpers.UserHealthProfile ushp;
    GenerateUserHealthProfile guhp;
    private double bmr;
    private double bmirange1 = 18.5;// targeted low healhty range
    private double bmirange2 = 22.9; // targeted high healhty range
    protected int input = 0;
    Context mContext;
    ProgressDialog progress;
    //Mixpanel step 19-a
    MixpanelAPI mixpanel ;
    long start;
    long end;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_preferences);
        onBoardUser = WorkoutDetails.onBoardUser;
        guhp = new GenerateUserHealthProfile();
        initializeComponents();
        mContext = PreferencesActivity.this;

        finishBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                progress = ProgressDialog.show(PreferencesActivity.this, "Loading...",
                        "Creating your profile...", true);
                saveUserPref();
            }
        });
        //mixpanel step 19-b
        mixpanel = MixpanelAPI.getInstance(getApplicationContext(), getString(R.string.mixpanel_projectToken));
        start = Calendar.getInstance().getTimeInMillis();

        finishBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                progress = ProgressDialog.show(PreferencesActivity.this, "Loading...",
                        "Creating your profile...", true);
                saveUserPref();
            }
        });
    }






    //save the user pref to parse
    private void saveUserPref(){

        String budget = budgetET.getText().toString();
        if(budget.matches("")){
            budget = "10";
        }else{
            budget = budgetET.getText().toString();
        }

        finalBudget = Double.parseDouble(budget);

        if(halalRB1.isChecked()){
            finalHalal = 1;
        }else if(halalRB2.isChecked()){
            finalHalal = 0;
        }else if(halalRB3.isChecked()){
            finalHalal = 2;
        }

        if(vegRB1.isChecked()){
            finalVeg = 1;
        }else if(vegRB2.isChecked()){
            finalVeg = 0;
        }else if(vegRB3.isChecked()){
            finalVeg = 2;
        }

        if(seaRB1.isChecked()){
            finalSeaFood = 1;
        }else if(seaRB2.isChecked()){
            finalSeaFood = 0;
        }else if(seaRB3.isChecked()){
            finalSeaFood = 2;
        }

        onBoardUser.setHalal(finalHalal);
        onBoardUser.setVeg(finalVeg);
        onBoardUser.setSeaFood(finalSeaFood);
        onBoardUser.setBudget(finalBudget);
        if(ParseUser.getCurrentUser() == null) {
            user = new ParseUser();
            user.setUsername(onBoardUser.getEmail());
            user.setPassword(onBoardUser.getPassword());
            user.setEmail(onBoardUser.getEmail());
            user.put("alias", onBoardUser.getAlias());
            user.put("date_of_birth", onBoardUser.getDob());
            user.put("gender", onBoardUser.getGender());
            if (onBoardUser.getProfilePic() != null) {
                user.put("profilPic", onBoardUser.getProfilePic());
            }

            user.put("Budget", finalBudget);
            user.put("No_of_meals", onBoardUser.getMeal());
            user.put("No_of_snack", onBoardUser.getSnack());
            //     user.put("alias", onBoardUser.getAlias());
            //     user.put("date_of_birth", onBoardUser.getDob());
            user.put("freq_of_exercise", onBoardUser.getExcercise());
            //     user.put("gender", onBoardUser.getGender());
            user.put("halal_state", onBoardUser.getHalal());
            user.put("height", onBoardUser.getHeight());
            user.put("height_unit", onBoardUser.getHeight_unit());
            user.put("snackNo_balance", onBoardUser.getSnack());
            user.put("mealNo_balance", onBoardUser.getMeal());
//            if (onBoardUser.getProfilePic() != null) {
//                user.put("profilPic", onBoardUser.getProfilePic());
//            }
            user.put("seafood_state", onBoardUser.getSeaFood());
            user.put("veg_state", onBoardUser.getVeg());
            user.put("weight", onBoardUser.getWeight());
            user.put("weight_unit", onBoardUser.getWeight_unit());
            user.signUpInBackground(new SignUpCallback() {
                public void done(ParseException e) {
                    if (e == null) {
                        // Hooray! Let them use the app now.
                        generateUserHealthProfile();
                    } else {
                        // Sign up didn't succeed. Look at the ParseException
                        // to figure out what went wrong
                        Log.e("Signup error", "" + e.toString());
                    }
                }
            });
        }else{
            user = ParseUser.getCurrentUser();
        }
            user.put("Budget", finalBudget);
            user.put("No_of_meals", onBoardUser.getMeal());
            user.put("No_of_snack", onBoardUser.getSnack());
     //     user.put("alias", onBoardUser.getAlias());
        //     user.put("date_of_birth", onBoardUser.getDob());
            user.put("freq_of_exercise", onBoardUser.getExcercise());
     //     user.put("gender", onBoardUser.getGender());
            user.put("halal_state", onBoardUser.getHalal());
            user.put("height", onBoardUser.getHeight());
            user.put("height_unit", onBoardUser.getHeight_unit());
            user.put("snackNo_balance", onBoardUser.getSnack());
            user.put("mealNo_balance", onBoardUser.getMeal());
//            if (onBoardUser.getProfilePic() != null) {
//                user.put("profilPic", onBoardUser.getProfilePic());
//            }
            user.put("seafood_state", onBoardUser.getSeaFood());
            user.put("veg_state", onBoardUser.getVeg());
            user.put("weight", onBoardUser.getWeight());
            user.put("weight_unit", onBoardUser.getWeight_unit());

              generateUserHealthProfile();
        }

    public void generateUserHealthProfile() {
        UserHealthProfile ushp = null;
        // LOGIC---------------------

        // Step 1: get BMI
        bmi = Double.parseDouble(guhp.getBMI(onBoardUser.getWeight(), onBoardUser.getHeight()));

        // Step 2: get body fat %
        bodyfat = guhp.getBodyFatPercentage(bmi, onBoardUser.getAge(), onBoardUser.getGender());

        // Step 3: to see how much you need to reduce/add based on your
        // deviation from the 'healthy bmi range'; -1 need to lose weight; 0
        // to maintain; 1 to gain weight
        bmiState = guhp.getBMIState(bmirange1, bmirange2, bmi);

        if (bmiState == 0) {
            AlertDialog.Builder alert = new AlertDialog.Builder(this);

            alert.setTitle("Congratulations!");
            alert.setMessage("Your BMI are already within healthy range, how would you like to manage your weight?");
            alert.setCancelable(true);
            alert.setPositiveButton("Increase",
                    new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog,
                                            int whichButton) {
                            input = 2;
                            dialog.dismiss();
                        }
                    });

            alert.setNegativeButton("Decrease",
                    new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog,
                                            int whichButton) {

                            input = 1;
                            dialog.dismiss();
                        }
                    });

            alert.setNeutralButton("Maintain",
                    new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog,
                                            int whichButton) {

                            input = 3;
                            dialog.dismiss();
                        }
                    });

            alert.setOnDismissListener(new DialogInterface.OnDismissListener() {
                @Override
                public void onDismiss(DialogInterface dialog) {
                    if (input == 0) {
                        //// TODO: 28/8/15  Dont understand for what ?
                    } else {
                        generateUSHP2();
                        restsave();

                    }
                }

            });
            alert.show();
            // get user input and continue from step 4-7
        } else {
            // continue from step 4-7
            generateUSHP2();
            restsave();

				/*
				 * Toast.makeText(ProfileActivity.this, "Input: else",
				 * Toast.LENGTH_LONG).show();
				 */
        }
    }

    public void generateUSHP2() {
        // Step 4: using comprehensive BMR instead of using lean mass
        // bmr = Foodingo.newBMR(bodyfat / 100, foouser.getWeight());
        bmr = guhp.calcBMR(onBoardUser);

        // Step 5: get calories daily needs
        double dailyCalNeed = bmr * onBoardUser.getCalorieFactor();

        // Step 6: get cal to change based on the equation double
        double AssumeCaltoChangePerDay = guhp.getCalorieToChange(bmirange1,
                bmirange2, bmi);// in house equation

        // Step 7: calculate calorie bank of user per day and create health
        // profile
        ushp = guhp.calcUserHealthProfile(dailyCalNeed, AssumeCaltoChangePerDay, bmiState, bmr, bmi, input, onBoardUser);

        saveUSHP(bmr);
    }

    /**
     * saving ushp to database
     */
    public void saveUSHP(Double bmr) {
        ParseObject dataObject = new ParseObject("UserHealthProfile");
        dataObject.put("userId", user);
        dataObject.put("BMI", bmi);
        dataObject.put("BMR", bmr);
        dataObject.put("RDCI", ushp.getRdci());
        dataObject.put("calorieBank", ushp.getCalorieBank());
        // GlobalV.cal = ushp.getCalorieBank();
        // GlobalV.noOfMeal = foouser.getNoOfMeals();
        dataObject.saveInBackground();
    }

    public void restsave() {
        GlobalVar.mealcal = ushp.getCalorieBank() / onBoardUser.getMeal();

        // scenario when cal_bank/ USHP is regenerated, cal_balance change only
        // when mealno = mealno_balance OR mealno_balance == 0, we
        // update the cal_balaance by taking cal_bank == cal_balance
        if (user.getNumber("mealNo_balance") == user.getNumber("No_of_meals")) {
            user.put("calBank", ushp.getCalorieBank());
            // if user has chosen 2 or more no of snacks, we limit their intake
            // of snack to 25% of calorie bank to snack else, for 1 snack we
            // limit to 12.5%
            Log.d("check point 1", "user hasnt eaten anything yet");
            if (Integer.parseInt(user.getNumber("snackNo_balance").toString()) > 1) {
                double cal_bal = ushp.getCalorieBank() * 0.75;
                user.put("meal_cal_balance", cal_bal);
                user.put("meal_cal", cal_bal);
                onBoardUser.setCal_balance(cal_bal);
                user.put("snack_cal_balance", (ushp.getCalorieBank() * 0.25));
                user.put("snack_cal", (ushp.getCalorieBank() * 0.25));
                onBoardUser.setSnack_cal_balance(ushp.getCalorieBank() * 0.25);
            } else if (Integer.parseInt(user.getNumber("snackNo_balance")
                    .toString()) == 1) {
                double cal_bal = ushp.getCalorieBank() * 0.875;
                user.put("meal_cal", cal_bal);
                user.put("meal_cal_balance", cal_bal);
                onBoardUser.setCal_balance(cal_bal);
                user.put("snack_cal", (ushp.getCalorieBank() * 0.125));
                user.put("snack_cal_balance", (ushp.getCalorieBank() * 0.125));
                onBoardUser.setSnack_cal_balance(ushp.getCalorieBank() * 0.125);
            } else {
                // no snack chosen == 0
                user.put("meal_cal", ushp.getCalorieBank());
                user.put("meal_cal_balance", ushp.getCalorieBank());
                onBoardUser.setCal_balance(ushp.getCalorieBank());
                user.put("snack_cal", 0);
                user.put("snack_cal_balance", 0);
                onBoardUser.setSnack_cal_balance(0);
            }
            user.put("invitationCode",onBoardUser.getInvitationCode());
        }

        user.saveInBackground((new SaveCallback() {
            public void done(ParseException e) {
                if (e == null) {
                    progress.dismiss();
                    Intent i = new Intent(PreferencesActivity.this, MainActivity.class);
                    i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                    startActivity(i);
                } else {
             //       UIHelper.showToast(mContext,e.getMessage(),3500);
                    progress.dismiss();
                }
            }
        }));
    }

    //initialise the UI components
    private void initializeComponents(){
        finishBtn = (Button) findViewById(R.id.finish_PREF_BTN);
        halalRB1 = (RadioButton) findViewById(R.id.halalRB1);
        halalRB2 = (RadioButton) findViewById(R.id.halalRB2);
        halalRB3 = (RadioButton) findViewById(R.id.halalRB3);
        vegRB1 = (RadioButton) findViewById(R.id.vegRB1);
        vegRB2 = (RadioButton) findViewById(R.id.vegRB2);
        vegRB3 = (RadioButton) findViewById(R.id.vegRB3);

        seaRB1 = (RadioButton) findViewById(R.id.seaRB1);
        seaRB2 = (RadioButton) findViewById(R.id.seaRB2);
        seaRB3 = (RadioButton) findViewById(R.id.seaRB3);

        halalRadioButtons = new ArrayList<RadioButton>();
        seaRadioButtons = new ArrayList<RadioButton>();
        vegRadioButtons = new ArrayList<RadioButton>();

        halalRadioButtons.add((RadioButton) findViewById(R.id.halalRB1));
        halalRadioButtons.add((RadioButton) findViewById(R.id.halalRB2));
        halalRadioButtons.add((RadioButton) findViewById(R.id.halalRB3));

        vegRadioButtons.add((RadioButton) findViewById(R.id.vegRB1));
        vegRadioButtons.add((RadioButton) findViewById(R.id.vegRB2));
        vegRadioButtons.add((RadioButton) findViewById(R.id.vegRB3));

        seaRadioButtons.add((RadioButton) findViewById(R.id.seaRB1));
        seaRadioButtons.add((RadioButton) findViewById(R.id.seaRB2));
        seaRadioButtons.add((RadioButton) findViewById(R.id.seaRB3));

        budgetET = (EditText) findViewById(R.id.budget_Pref_ET);

        for (RadioButton button : halalRadioButtons){
            button.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener(){
                @Override
                public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                    if (isChecked) processHalalRadioButtonClick(buttonView);
                }
            });
        }

        for (RadioButton button : vegRadioButtons){
            button.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener(){
                @Override
                public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                    if (isChecked) processVegRadioButtonClick(buttonView);
                }
            });
        }

        for (RadioButton button : seaRadioButtons){
            button.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener(){
                @Override
                public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                    if (isChecked) processSeaRadioButtonClick(buttonView);
                }
            });
        }

        halalRB2.setChecked(true);
        vegRB2.setChecked(true);
        seaRB2.setChecked(true);
    }

    //handle radio buttons
    private void processHalalRadioButtonClick(CompoundButton buttonView){

        for (RadioButton button : halalRadioButtons){

            if (button != buttonView ) button.setChecked(false);
        }

    }

    private void processVegRadioButtonClick(CompoundButton buttonView){

        for (RadioButton button : vegRadioButtons){

            if (button != buttonView ) button.setChecked(false);
        }

    }

    private void processSeaRadioButtonClick(CompoundButton buttonView){

        for (RadioButton button : seaRadioButtons){

            if (button != buttonView ) button.setChecked(false);
        }

    }

    @Override
    public void finish() {
        super.finish();
      //  if(Login.fromFB) {
        //    LoginManager.getInstance().logOut();
     //   }
//        ParseUser user = ParseUser.getCurrentUser();
//
//        if(user != null)
//            user.deleteInBackground();
        if(ParseFacebookUtils.getSession()!=null)
            ParseFacebookUtils.getSession().closeAndClearTokenInformation();

      //  ParseUser.logOut();

    }
    @Override
    public void onPause() {
        super.onPause();
        //Mixpanel step 19-c
        end = Calendar.getInstance().getTimeInMillis();
        double total = (end-start)*0.001;
        try {
            JSONObject props = new JSONObject();
            props.put("Preferences Onboarding", total);
            mixpanel.track("Time Spent", props);
        } catch (JSONException e) {
            Log.e("mixpanel Preferences onboarding time spent", "Unable to add properties to JSONObject", e);
        }
    }


}
