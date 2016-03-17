package com.foodingo.activities.activity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.TextInputLayout;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.Request;
import com.facebook.Response;
import com.facebook.model.GraphUser;
/*
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
import com.facebook.GraphRequest;
import com.facebook.GraphResponse;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;

*/
import com.foodingo.activities.R;
//import com.foodingo.activities.fragment.InvitationCode_Fragment;
import com.foodingo.activities.helpers.UIHelper;
import com.foodingo.activities.model.GlobalVar;
import com.foodingo.activities.model.InvitationCode;
import com.foodingo.activities.model.OnBoardUser;
import com.mixpanel.android.mpmetrics.MixpanelAPI;
import com.parse.FindCallback;
import com.parse.LogInCallback;
import com.parse.Parse;
import com.parse.ParseException;
import com.parse.ParseFacebookUtils;
import com.parse.ParsePush;
import com.parse.ParseQuery;
import com.parse.ParseUser;
import com.parse.RequestPasswordResetCallback;

import java.util.Calendar;
import java.util.GregorianCalendar;
import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;


import org.json.JSONException;
import org.json.JSONObject;

import java.util.Arrays;
import java.util.List;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.view.LayoutInflater;

/**
 * Created by Shaik on 3/8/15.
 */

public class Login extends android.support.v4.app.FragmentActivity implements OnClickListener {

    private NotificationManager mNotificationManager;
    private int SIMPLE_NOTFICATION_ID;


    private Button loginBTN,fbLoginBTN,signUpBTN,aboutUsBTN , fb_Login;
    Toolbar mToolbar;
    Context mContext;
    TextInputLayout merchantTIL,operatorTIL,pinTIL;
    UIHelper font;
    EditText emailET,passwordET;
    String finalEmail,finalPassword;
    ProgressBar loginProgress;
    String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
            + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
    public static boolean fromFB = false;

    public static OnBoardUser onBoardUser;
  //fc   private CallbackManager callbackManager;
  //  private LoginButton loginButton;
  //fc  public static LoginResult fbLoginResult;
    boolean signupPressed = false;
    TextView forgotpassword;
    final Context context = this;
    private EditText result;
    //Mixpanel step 15-a
    MixpanelAPI mixpanel ;
    long start;
    long end;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_login);

    //fc    callbackManager = CallbackManager.Factory.create();
        forgotpassword = (TextView)findViewById(R.id.forgotpassword);
        forgotpassword.setOnClickListener(this);

        initializeComponents();

     //   never know for what ?
        if (GlobalVar.email != null) {
            if (!GlobalVar.email.isEmpty()) {
                emailET.setText(GlobalVar.email);
            }
        }

        // Check if there is a currently logged in user
        // and it's linked to a Facebook account.
        ParseUser currentUser = ParseUser.getCurrentUser();
        if ((currentUser != null) && ParseFacebookUtils.isLinked(currentUser)) {
            if (currentUser.has("weight") && currentUser.has("height")
                    && currentUser.has("date_of_birth")) {

                showRecommendationActivity();
            } else {
                showInvitationActivity();
            }
        }
        this.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);
        //Mixpanel Step 15-b
        mixpanel = MixpanelAPI.getInstance(this, getString(R.string.mixpanel_projectToken));
        start = Calendar.getInstance().getTimeInMillis();
    }



    public void scheduleAlarm() {



        // time at which alarm will be scheduled here alarm is scheduled at 1 day from current time,
        // we fetch  the current time in milliseconds and added 1 day time
        // i.e. 24*60*60*1000= 86,400,000   milliseconds in a day
        Long time = new GregorianCalendar().getTimeInMillis()+10000;

        // create an Intent and set the class which will execute when Alarm triggers, here we have
        // given AlarmReciever in the Intent, the onRecieve() method of this class will execute when
        // alarm triggers and
        //we will write the code to send SMS inside onRecieve() method pf Alarmreciever class
        Intent intentAlarm = new Intent(this, NotificationBroadCastReceiver.class);

        // create the object
        AlarmManager alarmManager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);

        //set the alarm for particular time
        alarmManager.set(AlarmManager.RTC_WAKEUP, time, PendingIntent.getBroadcast(this, 1, intentAlarm, PendingIntent.FLAG_UPDATE_CURRENT));
  //      Toast.makeText(this, "Notification Scheduled for Tommrrow", Toast.LENGTH_LONG).show();


    }




    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
      //fc   callbackManager. (requestCode, resultCode, data);
        ParseFacebookUtils.finishAuthentication(requestCode,resultCode,data);
    }

    public void initializeComponents(){
        //initialize the views
        fb_Login = (Button)findViewById(R.id.fb_Login);

        loginBTN = (Button) findViewById(R.id.login_LOGIN_BTN);
        fbLoginBTN = (Button) findViewById(R.id.fbLogin);
        signUpBTN = (Button) findViewById(R.id.signUpBTN);
        aboutUsBTN = (Button) findViewById(R.id.aboutUs_LOGIN_BTN);
 //       loginButton = (LoginButton)findViewById(R.id.login_button);

        loginProgress = (ProgressBar) findViewById(R.id.loginProgress);

        emailET = (EditText) findViewById(R.id.username_ET);
        passwordET = (EditText) findViewById(R.id.password_ET);

        merchantTIL = (TextInputLayout) findViewById(R.id.merchantId_LOGIN_WRAPPER);
        pinTIL = (TextInputLayout) findViewById(R.id.loginPin_LOGIN_WRAPPER);

        mContext = Login.this;
        fb_Login.setOnClickListener(this);
        loginBTN.setOnClickListener(this);
        fbLoginBTN.setOnClickListener(this);
        signUpBTN.setOnClickListener(this);
        aboutUsBTN.setOnClickListener(this);

        //set fonts
        font = new UIHelper(mContext);
        loginBTN.setTypeface(font.boldFont);
        passwordET.setTypeface(font.regularFont);
        emailET.setTypeface(font.regularFont);
        signUpBTN.setTypeface(font.boldFont);

        onBoardUser = new OnBoardUser();
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.fb_Login:
			loginProgress.setVisibility(View.VISIBLE); 
                //Toast.makeText(this, "hi fb button pressed", Toast.LENGTH_SHORT).show();
                List<String> permissions = Arrays.asList("user_birthday", "email", "public_profile");
                // NOTE: for extended permissions, like "user_about_me", your app must
                // be reviewed by the Facebook team
                // (https://developers.facebook.com/docs/facebook-login/permissions/)

                ParseFacebookUtils.logIn(permissions, this, new LogInCallback() {
                    @Override
                    public void done(ParseUser user, ParseException err) {
                        if (user == null) {
                            Log.d(getResources().getString(R.string.app_name),
                                    "Uh oh. The user cancelled the Facebook login.");
                            loginProgress.setVisibility(View.INVISIBLE);
                        } else if (user.isNew()) {
                            Log.d(getResources().getString(R.string.app_name),
                                    "User signed up and logged in through Facebook!");
                            fetching_fb_details(user);

                        } else {
                            Log.d(getResources().getString(R.string.app_name), "User logged in through Facebook!");

                            showRecommendationActivity();

                        }
                    }
                });

                break;
            case R.id.login_LOGIN_BTN:
                if(validateUser()){
                    loginProgress.setVisibility(View.VISIBLE);
                    loginUser();
                }
                break;
            case R.id.fbLogin:
  /*     //         if(fbLoginBTN.getText().toString().equals("REGISTER") && validateUser()){
                if(validateUser()){
                    loginProgress.setVisibility(View.VISIBLE);
                    signUpUser();
                }  */
                break;
            case R.id.aboutUs_LOGIN_BTN:
                Intent aboutIntent = new Intent(getApplicationContext(), AboutUs.class);
                startActivity(aboutIntent);
                break;
            case R.id.signUpBTN:
                // u want reg button comment below if blcok & uncomment remaining this block & case R.id.fbLogin blcok
                if(validateUser()) {
                    loginProgress.setVisibility(View.VISIBLE);
                    signUpUser();
                }
                /* with reg button
                fb_Login.setVisibility(View.INVISIBLE);
                fbLoginBTN.setVisibility(View.VISIBLE);
                signupPressed = true;
                signUpBTN.setVisibility(View.INVISIBLE);
                loginBTN.setVisibility(View.INVISIBLE);
         */
                break;
            case R.id.forgotpassword:
                //forgotpassword.setText("hi");
               // startActivity(new Intent(Login.this,Pop.class));
                // get prompts.xml view
                LayoutInflater li = LayoutInflater.from(context);
                View promptsView = li.inflate(R.layout.activity_alert, null);
                AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(context);
                // set prompts.xml to alertdialog builder
                alertDialogBuilder.setView(promptsView);
                final EditText userInput = (EditText) promptsView.findViewById(R.id.editTextDialogUserInput);

                // set dialog message
                alertDialogBuilder
                        .setCancelable(false)
                        .setPositiveButton("Reset",
                                new DialogInterface.OnClickListener() {
                                    public void onClick(DialogInterface dialog,int id) {
                                        ParseUser.requestPasswordResetInBackground(userInput.getText().toString(), new RequestPasswordResetCallback() {
                                            public void done(ParseException e) {
                                                if (e == null) {
                                                    // An email was successfully sent with reset instructions.
                                                } else {
                                                    Context context = getApplicationContext();
                                                    CharSequence text = "Please enter valid email";
                                                    int duration = Toast.LENGTH_SHORT;

                                                    Toast toast = Toast.makeText(context, text, duration);
                                                    toast.show();

                                                }
                                            }
                                        });

                                    }
                                })
                        .setNegativeButton("Cancel",
                                new DialogInterface.OnClickListener() {
                                    public void onClick(DialogInterface dialog, int id) {
                                        dialog.cancel();
                                    }
                                });
                // create alert dialog
                AlertDialog alertDialog = alertDialogBuilder.create();
                // show it
                alertDialog.show();
                break;
            default:
                break;
        }
    }
    private void showInvitationActivity() {
        Intent intent = new Intent(this, Invitattion_code_Login.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
		 loginProgress.setVisibility(View.INVISIBLE);
    }




    private void showRecommendationActivity() {
        Intent intent = new Intent(this, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
		 loginProgress.setVisibility(View.INVISIBLE);
    }
    private void fetching_fb_details(final ParseUser currentUser) {
        Request request = Request.newMeRequest(ParseFacebookUtils.getSession(),
                new Request.GraphUserCallback() {
                    @Override
                    public void onCompleted(GraphUser user, Response response) {
                        if (user != null) {
                            try {
                                // Create a JSON object to hold the profile info

                                JSONObject userProfile = new JSONObject();
                                finalEmail = (String) user.getProperty("email");
                                if (finalEmail.contains("@")) {
                                    // if it does, what the user typed in the Username EditText should be an email address
                                    // set up query looking for any user with that email address
                                    ParseQuery<ParseUser> emailLoginQuery = ParseUser.getQuery();
                                    emailLoginQuery.whereEqualTo("email", finalEmail);
                                    emailLoginQuery.findInBackground(new FindCallback<ParseUser>() {
                                        @Override
                                        public void done(List<ParseUser> list, ParseException e) {
                                            if (list.size() == 0) {
												 loginProgress.setVisibility(View.INVISIBLE);
                                                showInvitationActivity();
                                                Toast.makeText(Login.this, " user not exist in parse", Toast.LENGTH_LONG).show();
                                            } else {
                                                AlertDialog.Builder alert = new AlertDialog.Builder(Login.this);
                                                alert.setTitle("Email Warning..! ");
                                                alert.setMessage("Email already exists. Please choose a different email");
                                                alert.setNegativeButton("  OK  ", new DialogInterface.OnClickListener() {
                                                    public void onClick(DialogInterface dialog, int whichButton) {
                                                        currentUser.deleteInBackground();
														 loginProgress.setVisibility(View.INVISIBLE);
                                                        dialog.dismiss();
                                                    }
                                                });
                                                alert.show();
                                            }
                                        }
                                    });
                                }
                            }catch(Exception e){
                                e.printStackTrace();
                            }
                        }  /* else if (response.getError() != null) {
                            if ((response.getError().getCategory() == FacebookRequestError.Category.AUTHENTICATION_RETRY)
                                    || (response.getError().getCategory() == FacebookRequestError.Category.AUTHENTICATION_REOPEN_SESSION)) {
//                                Log.d(getResources().getString R.string.app_name),"The facebook session was invalidated."+ response.getError());
                                //  logout();
                            }
                        }   */
                    }
                });
        request.executeAsync();
    }


       private void signUpUser() {

        if (finalEmail.contains("@")) {
            // if it does, what the user typed in the Username EditText should be an email address
            // set up query looking for any user with that email address
            ParseQuery<ParseUser> emailLoginQuery = ParseUser.getQuery();
            emailLoginQuery.whereEqualTo("email", finalEmail);
            emailLoginQuery.findInBackground(new FindCallback<ParseUser>() {
                @Override
                public void done(List<ParseUser> list, ParseException e) {
                    if (list.size() == 0) {
                        // if the result list size is 0, no user with entered email exists.
                        // Set up an alert dialog or something
                        onBoardUser.setEmail(finalEmail);
                        onBoardUser.setPassword(finalPassword);
//                        startActivity(new Intent(Login.this, PersonalDetails.class));
//                        finish();
                          startActivity(new Intent(Login.this, Invitattion_code_Login.class));
                         finish();
                   //     Toast.makeText(Login.this, " user not exist in parse", Toast.LENGTH_LONG).show();
                    } else {
                        ParseUser usr = list.get(0);
                        if (usr.containsKey("profile")) {
                            Toast.makeText(Login.this, "  facebook user", Toast.LENGTH_LONG).show();
                            AlertDialog.Builder alert = new AlertDialog.Builder(Login.this);
                            alert.setTitle("Facebook Warning..! ");
                            alert.setMessage("already user through Facebook please login from another Facebook account");
                            alert.setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                                public void onClick(DialogInterface dialog,
                                                    int whichButton) {
                                    loginProgress.setVisibility(View.INVISIBLE);
                                    dialog.dismiss();
                                }
                            });
                            alert.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                                public void onClick(DialogInterface dialog, int whichButton) {
                                    loginProgress.setVisibility(View.INVISIBLE);
                                    dialog.dismiss();
                                }
                            });
                            alert.setCancelable(true);
                            alert.show();

                        } else {
                         //   Toast.makeText(Login.this, "  email user", Toast.LENGTH_LONG).show();
                            AlertDialog.Builder alert = new AlertDialog.Builder(Login.this);
                            alert.setTitle("Email Warning..! ");
                            alert.setMessage("Email already exists. Please choose a different email");
                            alert.setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                                public void onClick(DialogInterface dialog,
                                                    int whichButton) {
                                    loginProgress.setVisibility(View.INVISIBLE);
                                    dialog.dismiss();
                                }
                            });
                            alert.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                                public void onClick(DialogInterface dialog, int whichButton) {
                                    dialog.dismiss();
                                    loginProgress.setVisibility(View.INVISIBLE);
                                }
                            });
                            alert.setCancelable(true);
                            alert.show();
                        }
                    }
                }
            });
        }
    }
    private void loginUser(){
        ParseUser.logInInBackground(finalEmail, finalPassword, new LogInCallback() {
            @Override
            public void done(ParseUser user, ParseException e) {
                if (e == null) {

                    GlobalVar.email = finalEmail;

                    if (user.has("gender")) {
                        //subscribe for channel
//                        if(user.has("invitationCode")) {
//                            ParsePush.subscribeInBackground(user.getString("invitationCode"));
//
//                        } else {
//                            ParsePush.subscribeInBackground("foodingo");
//                        }
                        if(user.has("invitationCode")) {

                            try {
                                InvitationCode invc = (InvitationCode) user.fetchIfNeeded().get("invitationCode");
                           //     ParsePush.subscribeInBackground(invc.getInvitationCode());
                            } catch (ParseException e1) {
                                e1.printStackTrace();
                            }



                        } else {
                            try {
                                ParsePush.subscribeInBackground("foodingo");
                            }
                            catch (IllegalArgumentException e4){
                                e4.printStackTrace();
                            }
                        }

//                        if(user.has("invitationCode")) {
//                            try {
//                                ParsePush.subscribeInBackground(user.fetchIfNeeded().getString("invitationCode"));
//                            } catch (ParseException e1) {
//                                e1.printStackTrace();
//                            }
//
//                        } else {
//                            ParsePush.subscribeInBackground("foodingo");
//                        }
                        startActivity(new Intent(Login.this, MainActivity.class));
                        finish();
                    } else {
                        startActivity(new Intent(Login.this, PersonalDetails.class));
                        finish();
                    }
                } else {
                    Toast.makeText(Login.this, "Oops, please check your email and password", Toast.LENGTH_LONG).show();
                    loginProgress.setVisibility(View.GONE);
                }
            }
        });
    }

    public boolean validateUser(){
        String email = emailET.getText().toString().trim();
        email = email.toLowerCase();
        String pwd = passwordET.getText().toString().trim();
        if (!email.isEmpty() && !pwd.isEmpty() && email.matches(EMAIL_PATTERN)) {
            this.finalEmail = email;
            this.finalPassword = pwd;
            return true;
        } else {
            Toast.makeText(this, "Please enter valid email", Toast.LENGTH_LONG).show();
            return false;
        }
    }



    @Override
    public void onBackPressed() {

        if(signupPressed){
            signUpBTN.setVisibility(View.VISIBLE);
            loginBTN.setVisibility(View.VISIBLE);
            fbLoginBTN.setVisibility(View.INVISIBLE);
            //  loginButton.setVisibility(View.VISIBLE);
            signupPressed = false;
        }else{
           super.onBackPressed();
        }


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
        scheduleAlarm();

//Mixpanel step 15-c
        end = Calendar.getInstance().getTimeInMillis();
        double total = (end-start)*0.001;
        try {
            JSONObject props = new JSONObject();
            props.put("Login/Sign Up", total);
            mixpanel.track("Time Spent", props);
        } catch (JSONException e) {
            Log.e("mixpanel Login Page time spent", "Unable to add properties to JSONObject", e);
        }



    }

    @Override
    protected void onResume() {
        super.onResume();
    }
}
