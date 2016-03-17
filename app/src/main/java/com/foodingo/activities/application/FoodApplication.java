package com.foodingo.activities.application;

import android.app.Application;

//fc  import com.facebook.FacebookSdk;
import com.foodingo.activities.R;
import com.foodingo.activities.R.string;
import com.foodingo.activities.helpers.GenerateUserHealthProfile;
import com.foodingo.activities.model.Dish;
import com.foodingo.activities.model.Estimate;
import com.foodingo.activities.model.InvitationCode;
import com.foodingo.activities.model.MealHistorys;
import com.foodingo.activities.model.MealStored;
import com.foodingo.activities.model.User;
import com.foodingo.activities.model.emailForInvitationCode;
import com.parse.Parse;
import com.parse.ParseFacebookUtils;
import com.parse.ParseInstallation;
import com.parse.ParseObject;

public class FoodApplication extends Application {

  @Override
  public void onCreate() {
    super.onCreate();
    //enable parse local storage
    Parse.enableLocalDatastore(this);
    ParseObject.registerSubclass(MealStored.class);
    ParseObject.registerSubclass(Dish.class);
    ParseObject.registerSubclass(MealHistorys.class);
    ParseObject.registerSubclass(Estimate.class);
    ParseObject.registerSubclass(InvitationCode.class);
    ParseObject.registerSubclass(emailForInvitationCode.class);
    Parse.initialize(this, getString(string.parse_app_id), getString(string.parse_client_key));
    //my code
    ParseInstallation.getCurrentInstallation().saveInBackground();
    //my code

    ParseFacebookUtils.initialize(getString(string.facebook_app_id));
  }
}
