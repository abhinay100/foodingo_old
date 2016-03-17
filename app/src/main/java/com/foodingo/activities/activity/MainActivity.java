package com.foodingo.activities.activity;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.os.Handler;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.Spannable;
import android.text.SpannableString;
import android.view.Gravity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Toast;

import com.afollestad.materialdialogs.MaterialDialog;
//import com.facebook.login.LoginManager;
import com.foodingo.activities.R;
import com.foodingo.activities.fragment.ExploreMeals;
import com.foodingo.activities.fragment.Feedback;
import com.foodingo.activities.fragment.FoodCart;
import com.foodingo.activities.fragment.FoodPicks;
import com.foodingo.activities.fragment.GroupFragment;
import com.foodingo.activities.fragment.MealHistory;
import com.foodingo.activities.fragment.UserProfile;
import com.foodingo.activities.helpers.TypefaceSpan;
import com.foodingo.activities.helpers.UIHelper;
import com.foodingo.activities.model.InvitationCode;
import com.mikepenz.materialdrawer.Drawer;
import com.mikepenz.materialdrawer.DrawerBuilder;
import com.mikepenz.materialdrawer.accountswitcher.AccountHeader;
import com.mikepenz.materialdrawer.accountswitcher.AccountHeaderBuilder;
import com.mikepenz.materialdrawer.model.PrimaryDrawerItem;
import com.mikepenz.materialdrawer.model.ProfileDrawerItem;
import com.mikepenz.materialdrawer.model.interfaces.IDrawerItem;
import com.mikepenz.materialdrawer.model.interfaces.IProfile;
import com.parse.ParseException;
import com.parse.ParseFacebookUtils;
import com.parse.ParseFile;
import com.parse.ParsePush;
import com.parse.ParseUser;


/**
 * Created by Shaik on 3/8/15.
 */

public class MainActivity extends AppCompatActivity implements FoodPicks.Listener {

    private Toolbar mToolbar;
    private AccountHeader headerResult = null;
    Context mContext;
    UIHelper font;
    Boolean doubleBackToExitPressedOnce = false;
    Drawer drawer;
    ParseUser user;



    @Override
    public void exploreMeals(int i) {
        // here you have the data passed from the fragment.
        displayView(i);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mContext = MainActivity.this;
        font = new UIHelper(mContext);
        user = ParseUser.getCurrentUser();
        //setup toolbar
        mToolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(mToolbar);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        setupDrawer();
        // display the first navigation drawer view on app launch
        if (savedInstanceState == null) {
        // on first time display view for first nav item
            displayView(0);
        }
    }

    //setup the navigation drawer
    private void setupDrawer()
    {
        final IProfile profile;
        String name = user.getString("alias");
        String email = user.getEmail();
        String gender = user.getString("gender");

        ParseFile image = user.getParseFile("profilPic");
        if(image == null){
            profile = new ProfileDrawerItem().withName(name).withEmail(email).withIcon(getResources().getDrawable(R.drawable.profile_pic));
        }else {
            byte[] bitmapdata = new byte[0];
            try {
                bitmapdata = image.getData();
            } catch (ParseException e) {
                e.printStackTrace();
            }
            Bitmap bitmap = BitmapFactory.decodeByteArray(bitmapdata, 0, bitmapdata.length);
            profile = new ProfileDrawerItem().withName(name).withEmail(email).withIcon(bitmap);
        }

        headerResult = new AccountHeaderBuilder()
                .withActivity(this)
                .withHeaderBackground(R.drawable.ic_drawer_header)
                .addProfiles(
                        profile
                )
                .withOnAccountHeaderListener(new AccountHeader.OnAccountHeaderListener() {
                    @Override
                    public boolean onProfileChanged(View view, IProfile profile, boolean currentProfile) {
                        displayView(3);
                        return false;
                    }
                })
                .withSelectionListEnabledForSingleProfile(false)
                .build();

        PrimaryDrawerItem userProfile = new PrimaryDrawerItem().withName("My preferences").withTypeface(font.boldFont);

        if(gender.equals("male")){
            userProfile.withIcon(R.drawable.ic_profile_male);
        }else if(gender.equals("female")){
            userProfile.withIcon(R.drawable.ic_profile_female);
        }

        drawer = new DrawerBuilder()
                .withActivity(this)
                .withToolbar(mToolbar)
                .withAccountHeader(headerResult)
                .addDrawerItems(
                        new PrimaryDrawerItem().withName("Food Picks").withIcon(R.drawable.ic_food_picks).withTypeface(font.boldFont),
                        new PrimaryDrawerItem().withName("Explore meals").withIcon(R.drawable.ic_food_explore).withTypeface(font.boldFont),
                        new PrimaryDrawerItem().withName("Food cart").withIcon(R.drawable.ic_food_cart).withTypeface(font.boldFont),
                        userProfile,
                        new PrimaryDrawerItem().withName("Calstory").withIcon(R.drawable.ic_calstory).withTypeface(font.boldFont),
                        new PrimaryDrawerItem().withName("Groups").withIcon(R.drawable.ic_groups).withTypeface(font.boldFont),
                        new PrimaryDrawerItem().withName("Feedback").withIcon(R.drawable.ic_feedback).withTypeface(font.boldFont),
                        new PrimaryDrawerItem().withName(R.string.title_logout).withIcon(R.drawable.ic_exit_to_app_black_24dp).withTypeface(font.boldFont)
                )
                .withOnDrawerItemClickListener(new Drawer.OnDrawerItemClickListener() {
                    @Override
                    public boolean onItemClick(AdapterView<?> parent, View view, int position, long id, IDrawerItem drawerItem) {
                        // do something with the clicked item :D
                        displayView(position);
                        return false;
                    }
                })
                .withOnDrawerListener(new Drawer.OnDrawerListener() {
                    @Override
                    public void onDrawerOpened(View view) {
                        //changeSelectedDrawer();
                    }
                    @Override
                    public void onDrawerClosed(View view) {
                    }
                    @Override
                    public void onDrawerSlide(View view, float v) {
                        changeSelectedDrawer();
                    }
                })
                .build();

    }

    //to display the fragments and change title of actionbar
    private void displayView(int position) {
        Fragment fragment = null;
        String title = getString(R.string.app_name);
        switch (position) {
            case 0:
                fragment = new FoodPicks();
                title = "Food Picks";
                break;
            case 1:
                fragment = new ExploreMeals();
                title = "Explore meals";
                break;
            case 2:
                fragment = new FoodCart();
                title = "Food cart";
                break;
            case 3:
                fragment = new UserProfile();
                title = "My Preferences";
                break;
            case 4:
                fragment = new MealHistory();
                title = "Calstory";
                break;
            case 5:
                fragment = new GroupFragment();
                title = "Groups";
                break;
            case 6:
                fragment = new Feedback();
                title = "Feedback";
                break;
            case 7:
                showLogoutDialog(mContext);
                break;
            default:
                break;
        }


        if (fragment != null) {

            FragmentManager fragmentManager = getSupportFragmentManager();
            fragmentManager.beginTransaction().replace(R.id.container_body, fragment).addToBackStack(null).commit();

            // set the toolbar title
            SpannableString s = new SpannableString(title);
            s.setSpan(new TypefaceSpan(this, "SmartPesa-Bold.ttf"), 0, s.length(),
                    Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

            // Update the action bar title with the TypefaceSpan instance
            android.support.v7.app.ActionBar actionBar = getSupportActionBar();
            actionBar.setTitle(s);

        }
    }

    //show logout dialog
    private void showLogoutDialog(Context context){
        UIHelper.showMessageDialogWithCallback(context, "Do you want to logout?", "YES", "NO", new MaterialDialog.ButtonCallback() {

            @Override
            public void onPositive(MaterialDialog dialog) {
                super.onPositive(dialog);
                ParseUser user = ParseUser.getCurrentUser();
//

                if(ParseFacebookUtils.getSession()!=null)
                    ParseFacebookUtils.getSession().closeAndClearTokenInformation();
                ParseUser.logOut();
//                if(user.has("invitationCode")) {
//                    ParsePush.unsubscribeInBackground(user.getString("invitationCode"));
//
//
//                } else {
//                    ParsePush.unsubscribeInBackground("foodingo");
//                }

                if(user.has("invitationCode")) {
                    try {
                        InvitationCode invc = (InvitationCode) user.fetchIfNeeded().get("invitationCode");
        //                ParsePush.unsubscribeInBackground(invc.getInvitationCode());
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }


                } else {
                    ParsePush.unsubscribeInBackground("foodingo");
                }

//                if(user.has("invitationCode")) {
//                    try {
//                        ParsePush.unsubscribeInBackground(user.fetchIfNeeded().getString("invitationCode"));
//                    } catch (ParseException e) {
//                        e.printStackTrace();
//                    }
//
//
//                } else {
//                    ParsePush.unsubscribeInBackground("foodingo");
//                }


               // ParseUser.logOut();
                //LoginManager.getInstance().logOut();
                startActivity(new Intent(mContext,Login.class));
                finish();
            }

            @Override
            public void onNegative(MaterialDialog dialog) {
                super.onNegative(dialog);
                //changeSelectedDrawer();
            }
        });
    }

    private void changeSelectedDrawer(){
        Fragment fragment = getSupportFragmentManager().findFragmentById(R.id.container_body);
        if (fragment instanceof FoodPicks) {
            drawer.setSelection(0,false);
        }else if (fragment instanceof ExploreMeals) {
            drawer.setSelection(1,false);
        }else if (fragment instanceof FoodCart) {
            drawer.setSelection(2,false);
        }
    }

    //double press back to exit
    @Override
    public void onBackPressed()
    {
            if (doubleBackToExitPressedOnce) {
                finish();
                return;
            }
            this.doubleBackToExitPressedOnce = true;

        Toast.makeText(this, "Please click BACK again to exit", Toast.LENGTH_SHORT).show();

            new Handler().postDelayed(new Runnable() {

                @Override
                public void run() {
                    doubleBackToExitPressedOnce = false;
                }
            }, 2000);
    }
}
