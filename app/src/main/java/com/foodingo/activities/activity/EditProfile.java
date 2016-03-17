package com.foodingo.activities.activity;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.codetroopers.betterpickers.datepicker.DatePickerBuilder;
import com.codetroopers.betterpickers.datepicker.DatePickerDialogFragment;
import com.codetroopers.betterpickers.numberpicker.NumberPickerBuilder;
import com.codetroopers.betterpickers.numberpicker.NumberPickerDialogFragment;
import com.foodingo.activities.BuildConfig;
import com.foodingo.activities.R;
import com.foodingo.activities.fragment.UserProfile;
import com.foodingo.activities.helpers.GenerateUserHealthProfile;
import com.foodingo.activities.helpers.UIHelper;
import com.foodingo.activities.model.OnBoardUser;
import com.makeramen.roundedimageview.RoundedImageView;
import com.mixpanel.android.mpmetrics.MixpanelAPI;
import com.parse.ParseFile;
import com.parse.ParseObject;
import com.parse.ParseUser;
import com.soundcloud.android.crop.Crop;
import com.squareup.picasso.Picasso;
import com.weiwangcn.betterspinner.library.material.MaterialBetterSpinner;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

import java.util.Calendar;
import java.util.GregorianCalendar;
import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.net.Uri;

import org.json.JSONException;
import org.json.JSONObject;


public class EditProfile extends AppCompatActivity implements View.OnClickListener,DatePickerDialogFragment.DatePickerDialogHandler,NumberPickerDialogFragment.NumberPickerDialogHandler {

    private NotificationManager mNotificationManager;
    private int SIMPLE_NOTFICATION_ID;


    EditText aliasET;
    RoundedImageView profilePicIV;
    MaterialBetterSpinner genderSpin;
    ParseUser user;
    Context mContext;
    MaterialBetterSpinner exerciseSpinner,mealSpinner,snackSpinner;
    TextView changeProfilePic;
    int cropCount = 0;
    Bitmap bm = null;
    ParseFile userProfilePicFile = null;
    Button dobBTN,heightBTN,weightBTN,saveBTN,weightUnitBTN;
    int finalDate,finalMonth,finalYear;
    double finalAge = 9999;
    GenerateUserHealthProfile guhp;
    private static final int BUTTON_ONE_REFERENCE = 0;
    private static final int BUTTON_TWO_REFERENCE = 1;
    int finalHeight = 9999;
    int finalWeight = 9999;
    int finalWeightUnit = 9999;
    int finalExercise,finalMeal,finalSnack;
    double finalCalFactor;
    //Mixpanel step 21-a
    MixpanelAPI mixpanel ;
    long start;
    long end;
    OnBoardUser onBoardUser;
    int Height;
    double Weight;
    String Gender;
    double Age;
    private com.foodingo.activities.helpers.UserHealthProfile ushp;
    private double bmr;
    private double bmi;
    private double bodyfat;
    private int bmiState;
    private double bmirange1 = 18.5;// targeted low healhty range
    private double bmirange2 = 22.9; // targeted high healhty range
    protected int input = 0;
    double CalorieFactor;
    double calfac;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_profile);
        user = ParseUser.getCurrentUser();
        //mixpanel step 21-b
        mixpanel = MixpanelAPI.getInstance(getApplicationContext(), getString(R.string.mixpanel_projectToken));
        start = Calendar.getInstance().getTimeInMillis();
        onBoardUser = new OnBoardUser();
        guhp = new GenerateUserHealthProfile();
        initializeComponents();
        setUpProfilePic();
        setUpUserDetails();
    }

    private void initializeComponents(){

        aliasET = (EditText) findViewById(R.id.alias_ET);

        profilePicIV = (RoundedImageView) findViewById(R.id.profilePic_EDIT_IV);

        genderSpin = (MaterialBetterSpinner) findViewById(R.id.genderSpinner);
        exerciseSpinner = (MaterialBetterSpinner) findViewById(R.id.exercise_EDIT_SPIN);
        mealSpinner = (MaterialBetterSpinner) findViewById(R.id.meal_EDIT_SPIN);
        snackSpinner = (MaterialBetterSpinner) findViewById(R.id.snack_EDIT_SPIN);
        changeProfilePic = (TextView) findViewById(R.id.changeProfilePicTV);

        dobBTN = (Button) findViewById(R.id.date_EDIT_BTN);
        heightBTN = (Button) findViewById(R.id.height_EDIT_BTN);
        weightBTN = (Button) findViewById(R.id.weight_EDIT_BTN);
        saveBTN = (Button) findViewById(R.id.save_EDIT_BTN);
        weightUnitBTN = (Button) findViewById(R.id.weightUnit_EDIT_BTN);

        dobBTN.setOnClickListener(this);
        heightBTN.setOnClickListener(this);
        weightBTN.setOnClickListener(this);
        saveBTN.setOnClickListener(this);
        weightUnitBTN.setOnClickListener(this);
        mContext = EditProfile.this;

    }

    @Override
    public void onPause()
    {
        super.onPause();
        mNotificationManager =
                (NotificationManager)getSystemService(NOTIFICATION_SERVICE);
        final Notification notifyDetails =
                new Notification(R.drawable.app_icon,
                        "You've got a new notification!",System.currentTimeMillis());
//Mixpanel step 21-c
        end = Calendar.getInstance().getTimeInMillis();
        double total = (end-start)*0.001;
        try {
            JSONObject props = new JSONObject();
            props.put("Edit Profile", total);
            mixpanel.track("Time Spent", props);
        } catch (JSONException e) {
            Log.e("mixpanel edit profile time spent", "Unable to add properties to JSONObject", e);
        }


    }

//    public void scheduleAlarm() {
//
//
//         {
//
//
//            // time at which alarm will be scheduled here alarm is scheduled at 1 day from current time,
//            // we fetch  the current time in milliseconds and added 1 day time
//            // i.e. 24*60*60*1000= 86,400,000   milliseconds in a day
//            Long time = new GregorianCalendar().getTimeInMillis() + 10000;
//
//            // create an Intent and set the class which will execute when Alarm triggers, here we have
//            // given AlarmReciever in the Intent, the onRecieve() method of this class will execute when
//            // alarm triggers and
//            //we will write the code to send SMS inside onRecieve() method pf Alarmreciever class
//            Intent intentAlarm = new Intent(this, NotificationBroadCastReceiver.class);
//
//            // create the object
//            AlarmManager alarmManager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
//
//            //set the alarm for particular time
//            alarmManager.set(AlarmManager.RTC_WAKEUP, time, PendingIntent.getBroadcast(this, 1, intentAlarm, PendingIntent.FLAG_UPDATE_CURRENT));
//            Toast.makeText(this, "Notification Scheduled for Tommrrow", Toast.LENGTH_LONG).show();
//        }
//
//    }


    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.date_EDIT_BTN:
                DatePickerBuilder dpb = new DatePickerBuilder()
                        .setFragmentManager(getSupportFragmentManager())
                        .setStyleResId(R.style.BetterPickersDialogFragment_Light);
                dpb.show();
                break;
            case R.id.height_EDIT_BTN:
                NumberPickerBuilder npb = new NumberPickerBuilder()
                        .setFragmentManager(getSupportFragmentManager())
                        .setStyleResId(R.style.BetterPickersDialogFragment_Light)
                        .setPlusMinusVisibility(View.INVISIBLE)
                        .setDecimalVisibility(View.INVISIBLE)
                        .setReference(BUTTON_ONE_REFERENCE)
                        .setLabelText("CM");
                npb.show();
                break;
            case R.id.weightUnit_EDIT_BTN:
                if(weightUnitBTN.getText().toString().equals("KG")){
                    weightUnitBTN.setText("LBS");
                }else{
                    weightUnitBTN.setText("KG");
                }
                break;
            case R.id.weight_EDIT_BTN:
                NumberPickerBuilder npb2 = new NumberPickerBuilder()
                        .setFragmentManager(getSupportFragmentManager())
                        .setStyleResId(R.style.BetterPickersDialogFragment_Light)
                        .setPlusMinusVisibility(View.INVISIBLE)
                        .setDecimalVisibility(View.INVISIBLE)
                        .setReference(BUTTON_TWO_REFERENCE)
                        .setLabelText(weightUnitBTN.getText().toString());
                npb2.show();
                break;
            case R.id.save_EDIT_BTN:
                saveUserPref();
                Intent intent = new Intent(EditProfile.this,MainActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                startActivity(intent);

                break;

            default:
                break;
        }
    }

    //save the user details
    private void saveUserPref() {

        String exerciseRange = exerciseSpinner.getText().toString();
        if (exerciseRange.startsWith("L")) {
            finalExercise = 0;
            finalCalFactor = 1.2;
            CalorieFactor = finalCalFactor;
        } else if (exerciseRange.startsWith("1")) {
            finalExercise = 1;
            finalCalFactor = 1.375;
            CalorieFactor = finalCalFactor;
        } else if (exerciseRange.startsWith("3")) {
            finalExercise = 2;
            finalCalFactor = 1.55;
            CalorieFactor = finalCalFactor;
        } else if (exerciseRange.startsWith("M")) {
            finalExercise = 3;
            finalCalFactor = 1.725;
            CalorieFactor = finalCalFactor;
        } else if (exerciseRange.startsWith("I")) {
            finalExercise = 4;
            finalCalFactor = 1.9;
            CalorieFactor = finalCalFactor;
        }

        String meal = mealSpinner.getText().toString();
        if (meal.equals("-")) {
            finalMeal = 1;
        } else {
            finalMeal = Integer.parseInt(meal);
        }

        String snack = snackSpinner.getText().toString();
        if (snack.equals("-")) {
            finalSnack = 0;
        } else {
            finalSnack = Integer.parseInt(snack);
        }

        user.put("No_of_meals", finalMeal);
        user.put("No_of_snack", finalSnack);
        user.put("alias", aliasET.getText().toString());
        user.put("date_of_birth", dobBTN.getText().toString());
        user.put("freq_of_exercise", finalExercise);
        user.put("gender", genderSpin.getText().toString());
        if (finalHeight != 9999) {
            user.put("height", finalHeight);
        }

        if (bm != null) {
            ByteArrayOutputStream stream = new ByteArrayOutputStream();
            bm.compress(Bitmap.CompressFormat.PNG, 100, stream);
            byte[] image = stream.toByteArray();
            userProfilePicFile = new ParseFile("profile_pic.png", image);
            user.put("profilPic", userProfilePicFile);
        }

        if (finalWeight != 9999 ) {
            user.put("weight", finalWeight);

        }

        if (finalWeightUnit != 9999) {
            user.put("weight_unit", finalWeightUnit);
            WeightscheduleAlarm();
        }

        if(weightUnitBTN.getText().equals("KG")){
            user.put("weight_unit", 0);
        }else {
            user.put("weight_unit", 1);
        }

//create an onboard user object with setheight, setweight, gender;
 //used the method to calc ushp in generateuserhealthprofile

        // Step 1: get BMI
//        bmi = Double.parseDouble(guhp.getBMI(onBoardUser.getWeight(), onBoardUser.getHeight()));
//        // Step 2: get body fat %
//        bodyfat = guhp.getBodyFatPercentage(bmi, onBoardUser.getAge(), onBoardUser.getGender());

        Double weight = user.getDouble("weight");
        Height =  user.getInt("height");
        String gender = user.getString("gender");
        Double age = user.getDouble("Age");
        calfac = CalorieFactor;
        //onBoardUser.setHeight(Height);
        //onBoardUser.setWeight(Weight);
        //onBoardUser.setGender(Gender);

        onBoardUser.setAge(age);
        onBoardUser.setWeight(weight);
        onBoardUser.setHeight(Height);
        onBoardUser.setGender(gender);
        onBoardUser.setCalorieFactor(calfac);


        generateUserHealthProfile();
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
                        weightBTN.setText(String.valueOf(number) );
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

    //on result from date picker
    @Override
    public void onDialogDateSet(int reference, int year, int monthOfYear, int dayOfMonth) {

        int month = monthOfYear+1;
        finalDate = dayOfMonth;
        finalMonth = month;
        finalYear = year;

        finalAge = UIHelper.calculateAge(finalDate, finalMonth, finalYear);
        dobBTN.setText(dayOfMonth + "/" + month + "/" + year);
    }



    public void generateUserHealthProfile(){





        // Step 1: get BMI
        bmi = Double.parseDouble(guhp.getBMI(onBoardUser.getWeight(), onBoardUser.getHeight()));
        // Step 2: get body fat %
        bodyfat = guhp.getBodyFatPercentage(bmi, onBoardUser.getAge(), onBoardUser.getGender());
        // Step 3: to see how much you need to reduce/add based on your
        // deviation from the 'healthy bmi range'; -1 need to lose weight; 0
        // to maintain; 1 to gain weight
        bmiState = guhp.getBMIState(bmirange1, bmirange2, bmi);
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



    //set up the user profile pic
    private void setUpProfilePic(){
        ParseFile image = user.getParseFile("profilPic");

        if(image == null){
            Picasso.with(mContext).load(R.drawable.profile_pic).into(profilePicIV);
        } else {
            Picasso.with(mContext).load(image.getUrl()).placeholder(R.drawable.profile_pic).into(profilePicIV);
        }

        changeProfilePic.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent pickPhoto = new Intent(Intent.ACTION_PICK, android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                startActivityForResult(pickPhoto, 1);
            }
        });

        profilePicIV.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent pickPhoto = new Intent(Intent.ACTION_PICK, android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                startActivityForResult(pickPhoto, 1);
            }
        });
    }

    //set up the user details
   public void setUpUserDetails(){

        String[] genderList = getResources().getStringArray(R.array.genderArray);
        ArrayAdapter<String> genderAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_dropdown_item_1line, genderList);

        genderSpin.setAdapter(genderAdapter);

        if(user.getString("gender").equals("male")){
            genderSpin.setText("male");
        }else{
            genderSpin.setText("female");
        }

        aliasET.setText(user.getString("alias"));

        String[] list = getResources().getStringArray(R.array.exArray);
        String[] list2 = getResources().getStringArray(R.array.mealArray);
        String[] list3 = getResources().getStringArray(R.array.snackArray);


        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_dropdown_item_1line, list);
        ArrayAdapter<String> adapter2 = new ArrayAdapter<String>(this,
                android.R.layout.simple_dropdown_item_1line, list2);
        ArrayAdapter<String> adapter3 = new ArrayAdapter<String>(this,
               android.R.layout.simple_dropdown_item_1line, list3);


        exerciseSpinner.setAdapter(adapter);
        mealSpinner.setAdapter(adapter2);
        snackSpinner.setAdapter(adapter3);

        Number weight = user.getNumber("weight");
        Number height = user.getNumber("height");

        weightBTN.setText(String.valueOf(weight));
        heightBTN.setText(String.valueOf(height));
        dobBTN.setText(user.getString("date_of_birth"));

        Number weightUnit = user.getNumber("weight_unit");




        if(weightUnit.equals(0)){
            weightUnitBTN.setText("KG");
        }else{
            weightUnitBTN.setText("LBS");
        }

        int exercise = (int) user.getNumber("freq_of_exercise");
        switch (exercise){
            case 0:
                exerciseSpinner.setText("Little or none");
                break;
            case 1:
                exerciseSpinner.setText("1-2 days/week");
                break;
            case 2:
                exerciseSpinner.setText("3-5 days/week");
                break;
            case 3:
                exerciseSpinner.setText("More than 5");
                break;
            case 4:
                exerciseSpinner.setText("Intense exercise/Training");
                break;
            default:
                break;
        }

        int meal = (int) user.getNumber("No_of_meals");
        mealSpinner.setText(String.valueOf(meal));


        int snack = (int) user.getNumber("No_of_snack");
        snackSpinner.setText(String.valueOf(snack));

    }

    public void WeightscheduleAlarm()
    {

        Long time = new GregorianCalendar().getTimeInMillis() + 950400000;
        Intent intentAlarm = new Intent(this, WeightNotification.class);
        AlarmManager alarmManager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        alarmManager.set(AlarmManager.RTC_WAKEUP, time, PendingIntent.getBroadcast(this, 1, intentAlarm, PendingIntent.FLAG_UPDATE_CURRENT));

    }


    //handle the picked image
    protected void onActivityResult(int requestCode, int resultCode, Intent imageReturnedIntent) {
        super.onActivityResult(requestCode, resultCode, imageReturnedIntent);
        switch(requestCode) {
            case 1:
                if(resultCode == RESULT_OK){
                    Uri selectedImage = imageReturnedIntent.getData();
                    beginCrop(selectedImage);
                }
                break;
            case Crop.REQUEST_CROP:
                handleCrop(resultCode, imageReturnedIntent);
                break;
        }
    }

    //start the image crop
    private void beginCrop(Uri source) {
        cropCount++;
        Uri destination = Uri.fromFile(new File(getCacheDir(), "cropped"+cropCount));
        Crop.of(source, destination).asSquare().start(this);
    }

    //handle the cropped image
    private void handleCrop(int resultCode, Intent result) {
        if (resultCode == RESULT_OK) {
            Uri imageUri = Crop.getOutput(result);
            try {
                bm = MediaStore.Images.Media.getBitmap(this.getContentResolver(), imageUri);
                profilePicIV.setImageBitmap(bm);

            } catch (IOException e) {
                e.printStackTrace();
            }

        } else if (resultCode == Crop.RESULT_ERROR) {
            Toast.makeText(this, Crop.getError(result).getMessage(), Toast.LENGTH_SHORT).show();
        }
    }
}
