package com.foodingo.activities.fragment;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;


import android.app.AlertDialog;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;


import com.foodingo.activities.R;
import com.foodingo.activities.activity.EditProfile;
import com.foodingo.activities.activity.Login;
import com.foodingo.activities.activity.MainActivity;
import com.foodingo.activities.activity.WorkoutDetails;
import com.foodingo.activities.helpers.GenerateHealth;
import com.foodingo.activities.helpers.GenerateUserHealthProfile;
import com.foodingo.activities.model.Dish;
import com.foodingo.activities.model.GlobalVar;
import com.foodingo.activities.model.OnBoardUser;
import com.foodingo.activities.model.User;
import com.foodingo.activities.model.UserHealthProfile;
import com.makeramen.roundedimageview.RoundedImageView;
import com.mixpanel.android.mpmetrics.MixpanelAPI;
import com.parse.FindCallback;
import com.parse.ParseException;
import com.parse.ParseFile;
import com.parse.ParseObject;
import com.parse.ParseQuery;
import com.parse.ParseUser;
import com.parse.SignUpCallback;
import com.squareup.picasso.Picasso;

import org.json.JSONException;
import org.json.JSONObject;


public class UserProfile extends Fragment {


    private TextView usernameEmailText;
    private TextView aliasText;
    private TextView calorieText;
    private TextView bmiText;// textViewBMI
    private Dialog progressDialog;
    private Button editprofilebutton;
    protected int input;
    private static User foouser = GlobalVar.foouser;
    private static ParseUser user;
    private GenerateUserHealthProfile guhp;
    private GenerateHealth gup;
    private double bmirange1 = 18.5;// targeted low healhty range
    private double bmirange2 = 22.9; // targeted high healhty range
    public double bmi;
    private int bmiState;
    private double bodyfat;
    private com.foodingo.activities.helpers.UserHealthProfile ushp;
   // private UserHealthProfile ushp;
    private double bmr;
    private int _day;
    private int _month;
    private int _birthYear;
    private EditText aliasEditText;
    private RadioButton female;
    private RadioButton male;
   // private GridLayout gridlayout;
  //  private EditText budgetText;
    private CheckBox checkBox_search_pref;
    private String budgetregex = "^\\d+(\\.\\d{1,2})?$";

    private String WeightHeightregex = "^\\d+(\\.\\d{1,2})?$";
    //Mixpanel step 16-a
    MixpanelAPI mixpanel ;
    long start;
    long end;

    // "\\d{2,3}$";

    int halal;
    int veg;
    int sea;
    EditText budgetET;
    double finalBudget;
    Button saveBTN;
    int finalHalal,finalVeg,finalSeaFood;
    OnBoardUser onBoardUser;
    User userr;
    double AssumeCaltoChangePerDay;



    RoundedImageView profilePicIV;
    RadioButton halalRB1,halalRB2,halalRB3,vegRB1,vegRB2,vegRB3,seaRB1,seaRB2,seaRB3;
    List<RadioButton> halalRadioButtons,vegRadioButtons,seaRadioButtons;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setHasOptionsMenu(true);
        //Mixpanel Step 16-b
        mixpanel = MixpanelAPI.getInstance(getContext(), getString(R.string.mixpanel_projectToken));
        start = Calendar.getInstance().getTimeInMillis();
    }

    @Override
    public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
        super.onCreateOptionsMenu(menu, inflater);
        inflater.inflate(R.menu.menu_user_profile, menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        switch (item.getItemId()) {
            case R.id.edit_profile:
                startActivity(new Intent(getActivity(), EditProfile.class));
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_user_profile, container,
                false);
        user = ParseUser.getCurrentUser();

        halalRB1 = (RadioButton) rootView.findViewById(R.id.halalRB1);
        halalRB2 = (RadioButton) rootView.findViewById(R.id.halalRB2);
        halalRB3 = (RadioButton) rootView.findViewById(R.id.halalRB3);

        vegRB1 = (RadioButton) rootView.findViewById(R.id.vegRB1);
        vegRB2 = (RadioButton) rootView.findViewById(R.id.vegRB2);
        vegRB3 = (RadioButton) rootView.findViewById(R.id.vegRB3);

        seaRB1 = (RadioButton) rootView.findViewById(R.id.seaRB1);
        seaRB2 = (RadioButton) rootView.findViewById(R.id.seaRB2);
        seaRB3 = (RadioButton) rootView.findViewById(R.id.seaRB3);

        budgetET = (EditText) rootView.findViewById(R.id.budget_USER_ET);



        halalRadioButtons = new ArrayList<RadioButton>();
        seaRadioButtons = new ArrayList<RadioButton>();
        vegRadioButtons = new ArrayList<RadioButton>();

        halalRadioButtons.add((RadioButton) rootView.findViewById(R.id.halalRB1));
        halalRadioButtons.add((RadioButton) rootView.findViewById(R.id.halalRB2));
        halalRadioButtons.add((RadioButton) rootView.findViewById(R.id.halalRB3));

        vegRadioButtons.add((RadioButton) rootView.findViewById(R.id.vegRB1));
        vegRadioButtons.add((RadioButton) rootView.findViewById(R.id.vegRB2));
        vegRadioButtons.add((RadioButton) rootView.findViewById(R.id.vegRB3));

        seaRadioButtons.add((RadioButton) rootView.findViewById(R.id.seaRB1));
        seaRadioButtons.add((RadioButton) rootView.findViewById(R.id.seaRB2));
        seaRadioButtons.add((RadioButton) rootView.findViewById(R.id.seaRB3));

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

        profilePicIV = (RoundedImageView) rootView.findViewById(R.id.profilePic_PROFILE_IV);
        ParseFile image = user.getParseFile("profilPic");

        saveBTN = (Button) rootView.findViewById(R.id.save_EDIT_BTN);
        saveBTN.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                savePref();
                Intent intent = new Intent(getActivity(),MainActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                startActivity(intent);
            }
        });



        if(image == null){
            Picasso.with(getActivity()).load(R.drawable.profile_pic).into(profilePicIV);
        } else {
            Picasso.with(getActivity()).load(image.getUrl()).placeholder(R.drawable.profile_pic).into(profilePicIV);
        }

      //  guhp = new GenerateUserHealthProfile();

        guhp = new GenerateUserHealthProfile();
        gup = new GenerateHealth();
        onBoardUser = WorkoutDetails.onBoardUser;

        input = 0;
//        gridlayout = (GridLayout) rootView.findViewById(R.id.gridlayout);
//        budgetText = (EditText) rootView.findViewById(R.id.budget_editText);
//        budgetText.setOnClickListener(new OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                budgetText.setCursorVisible(true);
//            }
//        });
        
        // view widgets
        aliasText = (TextView) rootView.findViewById(R.id.username_PROFILE_TV);// alias or facebook
        // username
        usernameEmailText = (TextView) rootView.findViewById(R.id.email_PROFILE_TV);// email
        calorieText = (TextView) rootView.findViewById(R.id.calorie_PROFILE_TV);
        bmiText = (TextView) rootView.findViewById(R.id.bmiStandard_PROFILE_TV);

        user = ParseUser.getCurrentUser();
        if (user != null) {
            if (user.has("email")) {
                usernameEmailText.setText(user.getEmail());
            }
            if (user.has("alias")) {
                aliasText.setText(user.getString("alias"));
            }
        }
        updateCalView();
        updateView();
        return rootView;
    }


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




    private void updateView() {
        if (user != null) {
            try {
                halal = (int) user.getNumber("halal_state");
                if(halal != 99 ) {
                    switch (halal) {
                        case 1:
                            halalRB1.setChecked(true);
                            break;
                        case 0:
                            halalRB2.setChecked(true);
                            break;
                        case 2:
                            halalRB3.setChecked(true);
                            break;
                    }
                }

                veg = (int) user.getNumber("veg_state");
                if(veg!=99) {
                    switch (veg) {
                        case 1:
                            vegRB1.setChecked(true);
                            break;
                        case 0:
                            vegRB2.setChecked(true);
                            break;
                        case 2:
                            vegRB3.setChecked(true);
                            break;
                    }
                }

                sea = (int) user.getNumber("seafood_state");
                if(sea!=99) {
                    switch (sea) {
                        case 1:
                            seaRB1.setChecked(true);
                            break;
                        case 0:
                            seaRB2.setChecked(true);
                            break;
                        case 2:
                            seaRB3.setChecked(true);
                            break;
                    }
                }

                if (user.has("Budget")) {
                    String budget = user.getNumber("Budget").toString();
                    budgetET.setText(budget);
                }

                // Show the user info
            } catch (Exception e) {
                Log.d(getResources().getString(R.string.app_name),
                        "Error in updating view. " + e);
            }
        } else {
            Log.d("updateView", "Can't find user");
        }
    }

    @Override
    public void onPause() {
        super.onPause();
     //   savePref();
        //Mixpanel step 16-c
        end = Calendar.getInstance().getTimeInMillis();
        double total = (end-start)*0.001;
        try {
            JSONObject props = new JSONObject();
            props.put("Preferences", total);
            mixpanel.track("Time Spent", props);
        } catch (JSONException e) {
            Log.e("mixpanel Preferences Page time spent", "Unable to add properties to JSONObject", e);
        }
    }


    private void savePref(){
        Toast.makeText(getActivity(),"Your preferences are updated",Toast.LENGTH_SHORT).show();
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

        user.put("Budget", finalBudget);
        user.put("halal_state",finalHalal);
        user.put("seafood_state", finalSeaFood);
        user.put("veg_state", finalVeg);
      //  generateUserHealthProfile();
        user.saveInBackground();
    }

    public void generateUserHealthProfile() {
        user = ParseUser.getCurrentUser();

        bmi = Double.parseDouble(guhp.getBMI(user.getDouble("weight"), user.getDouble("height")));

    }


    public void updateCalView() {
        // check if user has the ushp generated before
        ParseQuery<ParseObject> query = ParseQuery
                .getQuery("UserHealthProfile");
        query.whereEqualTo("userId", user);
        query.orderByDescending("createdAt");
        query.setLimit(1);
        query.findInBackground(new FindCallback<ParseObject>() {
            public void done(List<ParseObject> obj, ParseException e) {
                if (!obj.isEmpty()) {

                    DecimalFormat form = new DecimalFormat("0.00");

                    try {
                        generateUserHealthProfile();
                        // bmiText.setText("Your BMI: " + form.format(obj.get(0).getNumber("BMI")));
                        bmiText.setText("Your BMI: " + (bmi));
                    } catch (NumberFormatException e1) {
                        bmiText.setText("Your BMI: " + (bmi));
                    }


                    calorieText.setText("Daily calorie bank: "
                            + form.format(user.get("calBank")) + " kcal " + "\n"
                            + "Meal calorie balance: " + form.format(user.get("meal_cal_balance")) + " kcal" + "\n"
                            + "Snack calorie balance: " + form.format(user.get("snack_cal_balance")) + " kcal");
                }
                 else {
                    calorieText.setText("");
                    Log.e("Failed in User Profile","Here");
                }
            }
        });

    }

}
