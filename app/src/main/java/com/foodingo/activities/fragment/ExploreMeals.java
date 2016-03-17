package com.foodingo.activities.fragment;

import android.support.v4.app.Fragment;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import io.doorbell.android.DoorbellApi;
import io.doorbell.android.manavo.rest.RestCallback;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.json.JSONException;
import org.json.JSONObject;

import android.app.AlertDialog;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.util.Log;
import android.view.inputmethod.InputMethodManager;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.Toast;
import android.widget.AdapterView.OnItemClickListener;

import com.foodingo.activities.R;
import com.foodingo.activities.R.layout;
import com.foodingo.activities.activity.Login;
import com.foodingo.activities.adapters.SearchDishAdapter;
import com.foodingo.activities.model.Dish;
import com.foodingo.activities.model.GlobalVar;
import com.foodingo.activities.model.MealStored;
import com.foodingo.activities.model.User;
import com.mixpanel.android.mpmetrics.MixpanelAPI;
import com.parse.FindCallback;
import com.parse.ParseException;
import com.parse.ParseObject;
import com.parse.ParseQuery;
import com.parse.ParseUser;
import com.parse.SaveCallback;


/**
 * Created by Shaik on 14/8/15.
 */
public class ExploreMeals extends Fragment {
    Context context;

    // LatLong
    protected String mLatitude;
    protected String mLongitude;

    private AutoCompleteTextView dishsearchText;
    private AutoCompleteTextView restsearchText;
    private CheckBox checkBox_search_pref;
    private Button moreInfoSmartSearch;
    private ListView listView;
    private Dialog progressDialog;
    private static User foouser = GlobalVar.foouser;
    private SearchDishAdapter mealAdapter;
    // feedback to send email on outdated meals
    private Button searchButton;

    // variables
    private ParseUser user;
    private Double cal;
    private int noOfMeal;
    private Double snack_cal_balance;
    private int noOfSnack;
    private double budget;
    ArrayList<String> dishes_arr;
    ArrayList<String> resturant_arr;
    ArrayAdapter<String> adapter;
    ArrayAdapter<String> adapter2;
    String[] meals_arr;
    String[] rest_arr;
    ImageView exploremeals;
    ImageView noresult;

    //Mixpanel step 23-a
    MixpanelAPI mixpanel ;
    long start;
    long end;


    // feedback to send email on outdated meals
    DoorbellApi doorbellAPI;
    /**
     * The fragment argument representing the section number for this fragment.
     */


    private static final String ARG_SECTION_NUMBER = "section_number";

    public ExploreMeals() {
    }

    /**
     * Returns a new instance of this fragment for the given section number.
     */
    public static ExploreMeals newInstance(int sectionNumber) {
        ExploreMeals fragment = new ExploreMeals();
        Bundle args = new Bundle();
        args.putInt(ARG_SECTION_NUMBER, sectionNumber);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(layout.fragment_explore_meals,
                container, false);
        setHasOptionsMenu(true);

        checkBox_search_pref = (CheckBox) rootView.findViewById(R.id.checkBox_search_pref);
        moreInfoSmartSearch = (Button) rootView.findViewById(R.id.moreInfoSmartSearch);
        exploremeals = (ImageView) rootView.findViewById(R.id.exploremeals);
        noresult = (ImageView) rootView.findViewById(R.id.noresult);
            //my code
            dishes_arr = new ArrayList<String>();
            resturant_arr = new ArrayList<String>();
            collectAutoFillDataFromParse();
        //mixpanel step 23-b
        mixpanel = MixpanelAPI.getInstance(getContext(), getString(R.string.mixpanel_projectToken));
        start = Calendar.getInstance().getTimeInMillis();

        //Mixpanel step 13
        try {
            // start the timer for the event "Explore Meals"
            mixpanel.timeEvent("Explore Meals");
        } catch (Exception e) {
            Log.e("mixpanel Explore Meals timeevent","Error mixpanel", e);
        }

        // views
        dishsearchText = (AutoCompleteTextView) rootView.findViewById(R.id.editTextSearch_dishname);
        restsearchText = (AutoCompleteTextView) rootView.findViewById(R.id.editTextSearch_rest);
        moreInfoSmartSearch.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Toast.makeText(getActivity(), R.string.moreinfo_smartsearch,
                        Toast.LENGTH_LONG).show();
            }
        });

        checkBox_search_pref.setChecked(true);
        listView = (ListView) rootView.findViewById(R.id.list);
        searchButton = (Button) rootView.findViewById(R.id.button1);
        user = ParseUser.getCurrentUser();





        // Fetch Facebook user info if the session is active
        if (user != null) {
            updateView();

            searchButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    progressDialog = ProgressDialog.show(getActivity(), "",
                            "Searching...", true);

                    performSearch();
                }
            });

                 listView.setOnItemClickListener(new OnItemClickListener() {

                public void onItemClick(AdapterView<?> parent, View view,
                                        int position, long id) {

                    // When clicked, save the dish item to the DB
                    final Dish d = mealAdapter.getItem(position);
                    AlertDialog.Builder alert = new AlertDialog.Builder(
                            getActivity());

                    alert.setTitle("You are about to consume:");
                    String diff = null;
                    cal = Double.parseDouble(user.getNumber("meal_cal_balance")
                            .toString());
                    noOfMeal = Integer.parseInt(user
                            .getNumber("mealNo_balance").toString());
                    double difNo = (cal.doubleValue() / noOfMeal)
                            - d.getCalNo();
                    if (difNo > 0) {
                        diff = String.format("%.2f", difNo) + " kCal. below";
                    } else if (difNo < 0) {
                        diff = String.format("%.2f", (difNo * -1))
                                + " kCal. ABOVE";
                    } else {
                        diff = "satisfies";
                    }

                    alert.setMessage(d.getDish());
                    alert.setCancelable(true);
                    alert.setNeutralButton("Having it",
                            new DialogInterface.OnClickListener() {
                                public void onClick(DialogInterface dialog,
                                                    int whichButton) {
                                    cal = cal - d.getCalNo();
                                    noOfMeal = noOfMeal - 1;
                                    Toast.makeText(
                                            getActivity(),
                                            "Enjoy your " + d.getDish()
                                                    + " :)",
                                            Toast.LENGTH_SHORT).show();

                                    //1) save consumption date, type,dish_id, price
                                   // ParseObject meallog = new ParseObject("mealhistory");
                                    ParseObject meallog = new MealStored();
                                    try {
                                        meallog.put("price", d.getDouble("price"));
                                        meallog.put("type", "meal");
                                        meallog.put("dish_id", d);
                                        meallog.put("user_id", user);
                                    }catch (IllegalArgumentException e3){
                                        e3.printStackTrace();
                                    }
                                    DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
                                    Calendar cald = Calendar.getInstance();
                                    String date = dateFormat.format(cald.getTime()).toString();
                                    meallog.put("consumption_date", date);


                                    user.put("mealNo_balance", noOfMeal);
                                    user.put("meal_cal_balance", cal);
                                    // saving all objects all at once using saveallinbackground.
                                    List<ParseObject> parseobjlist = new ArrayList<ParseObject>();
                                    parseobjlist.addAll(Arrays.asList(meallog,user));
                                    ParseObject.saveAllInBackground(parseobjlist,
                                            new SaveCallback() {
                                                @Override
                                                public void done(ParseException e) {
                                                    if (e == null) {

                                                        // get newest updated
                                                        // data...
                                                        Log.d("Left with ",
                                                                noOfMeal
                                                                        + " no of meal. Calories balance: "
                                                                        + cal);
                                                        Toast.makeText(getActivity(),
                                                                "Food logged in Calstory!",
                                                                Toast.LENGTH_SHORT).show();

                                                    } else {
                                                        Log.d("Error in saving meal&cal balances",
                                                                e.getMessage());
                                                    }
                                                }
                                            });


                                    noOfMeal = Integer
                                            .parseInt(user.getNumber(
                                                    "mealNo_balance")
                                                    .toString());
                                    cal = Double.parseDouble(user
                                            .getNumber(
                                                    "meal_cal_balance")
                                            .toString());
                                    dialog.dismiss();
                                    //Mixpanel step 11 - Explore Meals Action
                                    MixpanelAPI mixpanel = MixpanelAPI.getInstance(getContext(), getString(R.string.mixpanel_projectToken));
                                    try {
                                        JSONObject props = new JSONObject();
                                        props.put("Action", "Having It");
                                        mixpanel.track("Explore Meals", props);
                                    } catch (JSONException e) {
                                        Log.e("mixpanel Explore Meals Action Having It", "Unable to add properties to JSONObject", e);
                                    }
                                }
                            });

                    alert.setNegativeButton("Cancel",
                            new DialogInterface.OnClickListener() {
                                public void onClick(DialogInterface dialog,
                                                    int whichButton) {
                                    dialog.dismiss();
                                    //Mixpanel step 12 - Explore Meals Action
                                    MixpanelAPI mixpanel = MixpanelAPI.getInstance(getContext(), getString(R.string.mixpanel_projectToken));
                                    try {
                                        JSONObject props = new JSONObject();
                                        props.put("Action", "Cancelled Food Selection");
                                        mixpanel.track("Explore Meals", props);
                                    } catch (JSONException e) {
                                        Log.e("mixpanel Explore Meals Action Cancellation", "Unable to add properties to JSONObject", e);
                                    }
                                }
                            });

                    alert.setPositiveButton("Outdated Info",
                            new DialogInterface.OnClickListener() {
                                public void onClick(DialogInterface dialog,
                                                    int whichButton) {
                                    // outdated meal = send email to
                                    // foodingo
                                    // with user info and update
                                    // database dish counter
                                    // email
                                    doorbellAPI = new DoorbellApi(getActivity());
                                    doorbellAPI.setAppId(1681);
                                    doorbellAPI
                                            .setApiKey("JI9oZF0g2hRN8Z9wyqI3spUX8UlqadstBD7YJtWhYlOr4KbRSBxIJqqVJFgLVxwH");
                                    JSONObject mProperties = new JSONObject();
                                    try {
                                        mProperties.put("User",
                                                user.getUsername());
                                    } catch (JSONException ex) {
                                        Log.d("JSON Error", ex.getMessage());
                                    }
                                    doorbellAPI.setCallback(new RestCallback() {
                                        @Override
                                        public void success(Object obj) {
                                            Toast.makeText(getActivity(),
                                                    obj.toString(),
                                                    Toast.LENGTH_LONG).show();
                                        }
                                    });
                                    try {
                                        String info = "Reported outdated dish by :"
                                                + user.getUsername();
                                        info += "\nUser ID: "
                                                + user.getObjectId();
                                        info += "\nDish " + d.getDish();
                                        info += "\nDish ID: " + d.getObjectId();
                                        info += "\nRestaurant: "
                                                + d.getRestaurant();
                                        doorbellAPI.sendFeedback(info,
                                                user.getEmail(), mProperties,
                                                user.toString());
                                    } catch (Exception exc) {
                                        Log.d("Feedback Doorbell Error",
                                                exc.getMessage());

                                    }
                                    // update Parse
                                    // Increment the current value of
                                    // the quantity key by 1
                                    d.increment("report_counter");

                                    // Save
                                    d.saveInBackground(new SaveCallback() {
                                        public void done(ParseException e) {
                                            if (e == null) {
                                                // Saved successfully.
                                                Log.d("Increment field report_counter success",
                                                        "SUCCESS");
                                            } else {
                                                // The save failed.
                                                Log.d("Increment field report_counter error",
                                                        e.getMessage());
                                            }
                                        }
                                    });
                                    dialog.dismiss();
                                }
                            });
                    alert.show();

                }
            });
        }
        return rootView;
    }

    private void collectAutoFillDataFromParse() {
        user = ParseUser.getCurrentUser();
        boolean userPref = (checkBox_search_pref.isChecked())?true:false;
            ParseQuery<Dish> query = ParseQuery.getQuery(Dish.class);

            if (userPref) {
                // Include user preferences i.e. veg, seafood, budget and
                // halal***
                // preference based recommendation
                if (user.getInt("halal_state") == 1) {
                    query.whereEqualTo("halal", true);
                } else if (user.getInt("halal_state") == 2) {
                    query.whereEqualTo("halal", false);
                }// else user is indifferent on whether it is halal or not so
                // halal
                // field is not a query constraint

                if (user.getInt("veg_state") == 1) {
                    query.whereEqualTo("vegetarian", true);
                } else if (user.getInt("veg_state") == 2) {
                    query.whereEqualTo("vegetarian", false);
                }// else user is indifferent on whether it is veg or not so
                // vegetarian field is not a query constraint

                if (user.getInt("seafood_state") == 1) {
                    query.whereEqualTo("seafood", true);
                } else if (user.getInt("seafood_state") == 2) {
                    query.whereEqualTo("seafood", false);
                }// else user is indifferent on whether it is seafood or not so
                // seafood field is not a query constraint

                double budget = Double.parseDouble(user.getNumber("Budget").toString());
                query.whereLessThanOrEqualTo("price", budget);

                // limit calorie in search
                cal = Double.parseDouble(user.getNumber("meal_cal_balance")
                        .toString());
                noOfMeal = Integer.parseInt(user.getNumber("mealNo_balance")
                        .toString());
                snack_cal_balance = Double.parseDouble(user.getNumber(
                        "snack_cal_balance").toString());
                noOfSnack = Integer.parseInt(user.getNumber("snackNo_balance")
                        .toString());
                double calpoint;
                if (noOfSnack < 1 || snack_cal_balance < 0) {
                    calpoint = (cal + snack_cal_balance) / noOfMeal;
                } else {
                    calpoint = cal / noOfMeal;
                }


                query.whereLessThanOrEqualTo("energyKcal", calpoint);
                query.orderByDescending("energyKcal");


            }

            query.findInBackground(new FindCallback<Dish>() {

                @Override
                public void done(List<Dish> dishes, ParseException error) {

                    if (dishes != null && dishes.size() >= 1) {

                        dishes_arr.clear();
                        resturant_arr.clear();
                        for (int i = 0; i < dishes.size(); i++) {

                            dishes_arr.add(dishes.get(i).getDish().toString());
                            resturant_arr.add(dishes.get(i).getRestaurant().toString());
                        }

                        meals_arr = dishes_arr.toArray(new String[dishes_arr.size()]);

                        adapter = new ArrayAdapter<String>(getActivity(), android.R.layout.simple_list_item_1, meals_arr);
                        dishsearchText.setAdapter(adapter);
                        rest_arr=resturant_arr.toArray(new String[dishes_arr.size()]);;
                        adapter2 = new ArrayAdapter<String>(getActivity() , android.R.layout.simple_list_item_1 , rest_arr);
                        restsearchText.setAdapter(adapter2);

                    }


                }
            });

    }

    public void performSearch() {


        boolean userPref = checkBox_search_pref.isChecked();
        savePref();

        // either dish and rest search
        if (!dishsearchText.getText().toString().equals("")
                || !restsearchText.getText().toString().equals("")) {
            //Mixpanel step 14
            MixpanelAPI mixpanel = MixpanelAPI.getInstance(getContext(), getString(R.string.mixpanel_projectToken));

            try {
                JSONObject props = new JSONObject();
                props.put("Dish Keyword", dishsearchText.getText());
                props.put("Restaurant Keyword",restsearchText.getText());
                props.put("Enabled Preferences",userPref?"Enabled":"Disabled");
                mixpanel.track("Explore Meals", props);
            } catch (JSONException e) {
                Log.e("mixpanel Explore Meals Action search keyword", "Unable to add properties to JSONObject", e);
            }
            ParseQuery<Dish> query = ParseQuery.getQuery(Dish.class);
            query.whereDoesNotExist("user_created_meal");
            if (!dishsearchText.getText().toString().equals("")) {
                query.whereContains("dish", dishsearchText.getText().toString());
            }
            if (!restsearchText.getText().toString().equals("")) {
                //query.whereDoesNotExist("user_created_meal");
                query.whereContains("restaurant", restsearchText.getText()
                        .toString());
            }


            Log.d("search", "OFF?");
            if (userPref) {
                Log.d("smart search", "ON");
                // Include user preferences i.e. veg, seafood, budget and
                // halal***
                // preference based recommendation
                if (user.getInt("halal_state") == 1) {
                    query.whereEqualTo("halal", true);
                } else if (user.getInt("halal_state") == 2) {
                    query.whereEqualTo("halal", false);
                }// else user is indifferent on whether it is halal or not so
                // halal
                // field is not a query constraint

                if (user.getInt("veg_state") == 1) {
                    query.whereEqualTo("vegetarian", true);
                } else if (user.getInt("veg_state") == 2) {
                    query.whereEqualTo("vegetarian", false);
                }// else user is indifferent on whether it is veg or not so
                // vegetarian field is not a query constraint

                if (user.getInt("seafood_state") == 1) {
                    query.whereEqualTo("seafood", true);
                } else if (user.getInt("seafood_state") == 2) {
                    query.whereEqualTo("seafood", false);
                }// else user is indifferent on whether it is seafood or not so
                // seafood field is not a query constraint

                double budget = Double.parseDouble(user.getNumber("Budget").toString());
                query.whereLessThanOrEqualTo("price", budget);

                // limit calorie in search
                cal = Double.parseDouble(user.getNumber("meal_cal_balance")
                        .toString());
                noOfMeal = Integer.parseInt(user.getNumber("mealNo_balance")
                        .toString());
                snack_cal_balance = Double.parseDouble(user.getNumber(
                        "snack_cal_balance").toString());
                noOfSnack = Integer.parseInt(user.getNumber("snackNo_balance")
                        .toString());
                double calpoint;
                if (noOfSnack < 1 || snack_cal_balance < 0) {
                    calpoint = (cal + snack_cal_balance) / noOfMeal;
                } else {
                    calpoint = cal / noOfMeal;
                }

                query.whereLessThanOrEqualTo("energyKcal", calpoint);
                query.orderByDescending("energyKcal");

            }

            query.whereDoesNotExist("user_created_meal");
            query.findInBackground(new FindCallback<Dish>() {

                @Override
                public void done(List<Dish> dishes, ParseException error) {
                    if (dishes != null && dishes.size() >= 1) {
                        mealAdapter.clear();
                        exploremeals.setVisibility(View.INVISIBLE);
                        noresult.setVisibility(View.INVISIBLE);
                        for (int i = 0; i < dishes.size(); i++) {
                            mealAdapter.add(dishes.get(i));
                                              //  dishes_arr = dishes.get(i).getDish().toString();

                        }
                        //dishsearchText.setAdapter(mealAdapter);
                        Log.d("dishes result", dishes.size() + "");
                        Log.d("dishes result in adapter", mealAdapter
                                .getDishesList().size() + "");
                    } else {
                        mealAdapter.clear();
                        exploremeals.setVisibility(View.INVISIBLE);
                        noresult.setVisibility(View.VISIBLE);
                        Toast.makeText(getActivity(), "No result found",
                                Toast.LENGTH_LONG).show();
                    }
                    progressDialog.dismiss();
                }
            });
        } else {

            progressDialog.dismiss();
        }
        mealAdapter = new SearchDishAdapter(getActivity(), new ArrayList<Dish>());
        // getting location!
        mLatitude = GlobalVar.mLatitude;
        mLongitude = GlobalVar.mLongitude;
        if (mLatitude != null && mLongitude != null) {
            mealAdapter.setLocation(Double.parseDouble(mLatitude),
                    Double.parseDouble(mLongitude));
        }

        listView.setAdapter(mealAdapter);


        // hiding keyboard after showing search result
        InputMethodManager inputManager = (InputMethodManager) getActivity()
                .getSystemService(Context.INPUT_METHOD_SERVICE);
        inputManager.hideSoftInputFromWindow(getActivity().getCurrentFocus()
                .getWindowToken(), InputMethodManager.HIDE_NOT_ALWAYS);
    }

    public void saveToMealHist(Dish d) {
        try {
            Log.d("trying to save dish " + d.toString(), "user " + user);
            // saving a meal history object to meal history table
            ParseObject meallog = new ParseObject("mealhistory");
            meallog.put("dish", d.getDish());
            meallog.put("user_id", user);
            meallog.put("restaurant", d.getRestaurant());
            meallog.put("price", d.getPriceNo());
            meallog.put("calories", d.getCal());
            meallog.put("energyKcal", d.getCalNo());
            meallog.put("type", "meal");
            DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            Calendar cald = Calendar.getInstance();
            String date = dateFormat.format(cald.getTime()).toString();
            meallog.put("consumption_date", date);
            if (d.getImageUrl() != null) {
                meallog.put("imgurl", d.getImageUrl());
            }
            meallog.saveInBackground(new SaveCallback() {
                public void done(ParseException e) {
                    if (e == null) {
                        Log.d("saved", "here");
                    } else {
                        Log.d("error fr save history", e.toString());
                    }
                }
            });

        } catch (Exception e) {
            Log.d("Error in saving cal history", e.getMessage());
        }
    }

    private void savePref() { // Save name in response to button click
        if (user != null) {
            if (checkBox_search_pref.isChecked()) {
                user.put("CheckBox_search_pref", true);
            } else {
                user.put("CheckBox_search_pref", false);
            }

            user.saveEventually();
        } else {
            Toast.makeText(getActivity(), "Fail to save! Please try again.",
                    Toast.LENGTH_LONG).show();
        }

    }

    private void updateView() {
        if (user != null) {
            try {
                // update button statebased on database preferences
                // from previous login
                if (user.has("CheckBox_search_pref")) {
                    if (!user.getBoolean("CheckBox_search_pref")) {
                        checkBox_search_pref.setChecked(false);
                    } else {
                        checkBox_search_pref.setChecked(true);
                    }
                } else {
                    checkBox_search_pref.setChecked(true);
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

    public boolean isOnline() {
        ConnectivityManager cm = (ConnectivityManager) getActivity()
                .getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo netInfo = cm.getActiveNetworkInfo();
        return netInfo != null && netInfo.isConnectedOrConnecting();
    }

    @Override
    public void onResume() {
        super.onResume();
        if (isOnline()) {
            ParseUser currentUser = ParseUser.getCurrentUser();
            if (currentUser != null) {
                // Check if the user is currently logged
                // and show any cached content
                updateView();

            }
        } else {
            AlertDialog.Builder alert = new AlertDialog.Builder(getActivity());
            alert.setTitle("Error");
            alert.setMessage("No network connection! Please try to login when there is internet connection.");
            alert.show();
            ParseUser.logOut();
            // Go to the login view
            Intent intent = new Intent(getActivity(), Login.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(intent);
        }
    }
    @Override
    public void onPause() {
        super.onPause();
        //Mixpanel step 23-c
        end = Calendar.getInstance().getTimeInMillis();
        double total = (end-start)*0.001;
        try {
            JSONObject props = new JSONObject();
            props.put("Explore Meals", total);
            mixpanel.track("Time Spent", props);
        } catch (JSONException e) {
            Log.e("mixpanel explore meals time spent", "Unable to add properties to JSONObject", e);
        }
    }

}