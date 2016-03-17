package com.foodingo.activities.fragment;

import java.io.IOException;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;


import org.apache.http.client.ClientProtocolException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


import android.content.res.Configuration;
import android.support.v4.app.Fragment;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.content.ContextCompat;
import android.text.InputType;
import android.util.Log;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.EditorInfo;
import android.view.inputmethod.InputMethodManager;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TabHost;
import android.widget.TabWidget;
import android.widget.TextView;
import android.widget.Toast;
import com.foodingo.activities.adapters.DishFavAdapter;
import com.foodingo.activities.R;
import com.foodingo.activities.activity.LogFoodActivity;

import com.foodingo.activities.adapters.FavDishHistoryAdapter;
import com.foodingo.activities.helpers.JsonParser;
import com.foodingo.activities.model.*;
import com.mixpanel.android.mpmetrics.MixpanelAPI;
import com.parse.FindCallback;
import com.parse.ParseException;
import com.parse.ParseObject;
import com.parse.ParseQuery;
import com.parse.ParseUser;
import com.parse.SaveCallback;
import android.app.AlertDialog;
import android.content.DialogInterface;
import io.doorbell.android.DoorbellApi;
import io.doorbell.android.manavo.rest.RestCallback;

/**
 * Created by Shaik on 18/8/15.
 */
public class FoodCart extends Fragment  {
    Context context;
    ListView lv;
    ListView lv1;
    ListView lv2;
    ListView lv3;
    Button logdishButton;
    TabHost tabHost;
    TabWidget tb;
    //Mixpanel step 24-a
    MixpanelAPI mixpanel ;
    long start;
    long end;
    // views
    //  private DishAdapter mealAdapter;
    private DishFavAdapter mealAdapter;
    private FavDishHistoryAdapter dishHistAdapter;
    private FavDishHistoryAdapter dishFavAdapter;
   // private EstimateAdapter estimateAdapter;
    private Double cal;
    private int noOfMeal;
    // feedback to send email on outdated meals
    DoorbellApi doorbellAPI;


    ParseUser user;
    JSONArray items;
    JSONObject jsonObject;
    ProgressDialog progressDialog;
    // for loading the data and storing the details
    List<LogFood> dishCollection = new ArrayList<LogFood>();
    List<Estimate> estimates = new ArrayList<Estimate>();
    List<Estimate> estimatechosen = new ArrayList<Estimate>();
    double estimenergrychosen = 0;
    double selectcalorie = 0;
    double selectedFatt=0;
    double selectedCarbb=0;
    double selectedProtienss=0;
    private int est_postion_holder;

    List<LogFood> dishChosen = new ArrayList<LogFood>();
    double fatChosen = 0;
    double protChosen = 0;
    double carbChosen = 0;
    double energyChosen = 0;

    ArrayAdapter<LogFood> adapter;
    ArrayAdapter<Estimate> estimateadapter;
    ArrayAdapter<LogFood> adapter_chosen;
    private android.support.v4.view.PagerAdapter favadapter;
    private EditText searchText;
    private String appId = "3eef3421";
    private String appKey = "f6609984a12e783d2e5832aee9bb74d9";
    private String query = "taco";
    private int cal_min = 0;
    private Button searchbtn,searchHide_btn;
    private int cal_max = 1000;
    private String fields = "item_name%2Cbrand_name%2Cnf_calories%2Cnf_total_fat%2Cnf_protein%2Cnf_total_carbohydrate";
    private String url = "https://api.nutritionix.com/v1_1/search/" + query
            + "?results=0%3A20&cal_min=" + cal_min + "&cal_max=" + cal_max
            + "&fields=" + fields + "&&appId=" + appId + "&appKey=" + appKey
            + "&format=json#";
    private int quantity_foodlogg;
    private int quantity_foodlog;
    private int cal_postion_holder;
    private double add_temp_cal=0;
    double selectedCalories=0;
    double selectedFat=0;
    double selectedCarb=0;
    double selectedProtiens=0;

    /**
     * The fragment argument representing the section number for this fragment.
     */
    private static final String ARG_SECTION_NUMBER = "section_number";

    public FoodCart() {
    }

    /**
     * Returns a new instance of this fragment for the given section number.
     */
    public static FoodCart newInstance(int sectionNumber) {
        FoodCart fragment = new FoodCart();
        Bundle args = new Bundle();
        args.putInt(ARG_SECTION_NUMBER, sectionNumber);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_food_cart, container,
                false);


        //mixpanel step 24-b
        mixpanel = MixpanelAPI.getInstance(getContext(), getString(R.string.mixpanel_projectToken));
        start = Calendar.getInstance().getTimeInMillis();

        lv1 = (ListView) rootView.findViewById(R.id.listView2);
        lv2 = (ListView) rootView.findViewById(R.id.listView3);
        lv3 = (ListView) rootView.findViewById(R.id.listView4);
        tabHost = (TabHost) rootView.findViewById(R.id.tabHost);
        tabHost.setup();

        TabHost.TabSpec tabSpec = tabHost.newTabSpec("Favourite");
        tabSpec.setContent(R.id.tab1);
        //  tabSpec.setIndicator("creator");
        tabSpec.setIndicator("", ContextCompat.getDrawable(getActivity(), R.drawable.icon_foodpick_config));
        tabHost.addTab(tabSpec);



        tabSpec = tabHost.newTabSpec("Recent");
        tabSpec.setContent(R.id.tab2);
        //tabSpec.setIndicator("store");
        tabSpec.setIndicator("", ContextCompat.getDrawable(getActivity(), R.drawable.icon_recent_config));
        tabHost.addTab(tabSpec);

        tabSpec = tabHost.newTabSpec("Estimate");
        tabSpec.setContent(R.id.tab3);
       // tabSpec.setIndicator("items");
        tabSpec.setIndicator("", ContextCompat.getDrawable(getActivity(), R.drawable.icon_estimate_config));
//        tabSpec.setIndicator("Estimate", getResources().getDrawable( R.drawable.icon_estimate_config));
        tabHost.addTab(tabSpec);

        user = ParseUser.getCurrentUser();
        if (user != null) {


            initialiseAdapter();
           // initializeestimate();
           updateFavData();
            updateRecData();
            estimateData();


            // Put a listener to edit text search
            searchText = (EditText) rootView.findViewById(R.id.editTextSearch);
            searchText.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    searchText.setCursorVisible(true);
                }

            });
            searchHide_btn =(Button)rootView.findViewById(R.id.hide_search);
            searchHide_btn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    //    lv.setVisibility(View.INVISIBLE);
                    Fragment f;
                    f = new FoodCart();
                    FragmentTransaction ft =   getFragmentManager().beginTransaction();
                    ft.replace(R.id.container_body, f);
                    ft.setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN);
                    ft.commit();
                }
            });
            searchbtn = (Button) rootView.findViewById(R.id.button_search);
            searchbtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    performSearch();
                    searchHide_btn.setVisibility(View.VISIBLE);
                }

            });



            searchText
                    .setOnEditorActionListener(new TextView.OnEditorActionListener() {
                        @Override
                        public boolean onEditorAction(TextView v, int actionId,
                                                      KeyEvent event) {
                            // TODO Auto-generated method stub
                            if (actionId == EditorInfo.IME_ACTION_SEARCH) {
                                performSearch();
                                return true;
                            }
                            return false;
                        }
                    });
            Log.d("url", url);
            logdishButton = (Button) rootView.findViewById(R.id.button_logdish);

            lv = (ListView) rootView.findViewById(R.id.listView);
            lv.setOnItemClickListener(new OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> arg0, View arg1,
                                        int arg2, long arg3) {
                    //  quantity_foodlog=1;
                    cal_postion_holder = arg2;

                    AlertDialog.Builder inputAlert = new AlertDialog.Builder(getActivity());
                    inputAlert.setTitle("Food Selection");
                    inputAlert.setMessage("Enter the Quantity");
                    final EditText userInput = new EditText(getActivity());//
                    userInput.setInputType(InputType.TYPE_CLASS_NUMBER);
                    userInput.setRawInputType(Configuration.KEYBOARD_12KEY);
                    userInput.setText("1");userInput.setCursorVisible(true);
                    inputAlert.setView(userInput);
                    inputAlert.setPositiveButton(" OK ", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            quantity_foodlog = Integer.parseInt(userInput.getText().toString());

                            try {

                                LogFood lf = (LogFood) dishCollection.get(cal_postion_holder).clone();

                                selectedFat = lf.getFat() * quantity_foodlog;
                                selectedCalories = lf.getCal() * quantity_foodlog;
                                selectedCarb = lf.getCarb() * quantity_foodlog;
                                selectedProtiens = lf.getProtein() * quantity_foodlog;

                                dishChosen.add(lf);
                                energyChosen = energyChosen + selectedCalories;
                                dialog.dismiss();

                               // logdishButton.setText(energyChosen+estimenergrychosen + "kcal (" + dishChosen.size() + ")");
							     onPause();

                                selectedFat = selectedCalories = selectedCarb = selectedProtiens = 0;

                            } catch (Exception e) {
                                Log.d("Error", e.getMessage());
                            }
                        }
                    });
                    inputAlert.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            //  quantity_foodlog = Integer.parseInt(userInput.getText().toString());
                            dialog.dismiss();
                        }
                    });
                    AlertDialog alertDialog = inputAlert.create();
                    alertDialog.show();
                }
            });


            lv3.setOnItemClickListener(new OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> arg0, View arg1,
                                        int arg2, long arg3) {
                    //  quantity_foodlog=1;
                    est_postion_holder = arg2;

                    AlertDialog.Builder inputAlert = new AlertDialog.Builder(getActivity());
                    inputAlert.setTitle("Food Selection");
                    inputAlert.setMessage("Enter the Quantity");
                    final EditText userInput = new EditText(getActivity());
                    userInput.setInputType(InputType.TYPE_CLASS_NUMBER);
                    userInput.setRawInputType(Configuration.KEYBOARD_12KEY);
                    userInput.setText("1");userInput.setCursorVisible(true);
                    inputAlert.setView(userInput);
                    inputAlert.setPositiveButton(" OK ", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            quantity_foodlogg = Integer.parseInt(userInput.getText().toString());

                            try {

                                Estimate ef = (Estimate) estimates.get(est_postion_holder).clone();
                                selectcalorie = ef.getCalories() * quantity_foodlogg;
                                estimatechosen.add(ef);
                                estimenergrychosen = estimenergrychosen + selectcalorie;
                                dialog.dismiss();
                               // logdishButton.setText(energyChosen+estimenergrychosen + "kcal (" + estimatechosen.size() + ")");
							     onPause();

                            } catch (Exception e) {
                                Log.d("Error", e.getMessage());
                            }
                        }
                    });
                    inputAlert.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            //  quantity_foodlog = Integer.parseInt(userInput.getText().toString());
                            dialog.dismiss();
                        }
                    });
                    AlertDialog alertDialog = inputAlert.create();
                    alertDialog.show();
                }
            });


            logdishButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    if (GlobalVar.mealList.size() > 0 || dishChosen.size() > 0) {
                        GlobalVar.mealList = dishChosen;
                        Log.e("Size", "" + GlobalVar.mealList.toString());
                    } else {
                        Toast.makeText(getActivity(), "Please select something", Toast.LENGTH_SHORT).show();
                    }

                    if (GlobalVar.estimateList.size() > 0 || estimatechosen.size() > 0) {
                        GlobalVar.estimateList = estimatechosen;
                        Log.e("Size", "" + GlobalVar.estimateList.toString());
                    } else {
                        Toast.makeText(getActivity(), "Please select something", Toast.LENGTH_SHORT).show();
                    }

                    Intent logFoodActivity = new Intent(getActivity(), LogFoodActivity.class);
                    startActivity(logFoodActivity);
                }
            });

            lv1.setOnItemClickListener(new OnItemClickListener() {


                public void onItemClick(AdapterView<?> parent,
                                        View view, int position, long id) {

                    // When clicked, save the dish item to the DB
                    //      final Dish d = mealAdapter.getItem(position);
                    final Dish d = (Dish) dishFavAdapter
                            .getItem(position);
                    new AlertDialog.Builder(getActivity())
                            .setTitle("You are about to consume:")
                            .setMessage(d.getDish())
                            .setCancelable(true)

                            .setNeutralButton("Having it",
                                    new DialogInterface.OnClickListener() {
                                        public void onClick(
                                                DialogInterface dialog,
                                                int whichButton) {
                                            //  cal = cal - d.getCalNo();
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
                                            } catch (IllegalArgumentException e1) {
                                                e1.printStackTrace();
                                            }
                                            DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
                                            Calendar cald = Calendar.getInstance();
                                            String date = dateFormat.format(cald.getTime()).toString();
                                            meallog.put("consumption_date", date);
                                            user.put("mealNo_balance", noOfMeal);
                                            //          user.put("meal_cal_balance", cal);
                                            // saving all objects all at once using saveallinbackground.
                                            List<ParseObject> parseobjlist = new ArrayList<ParseObject>();
                                            parseobjlist.addAll(Arrays.asList(meallog, user));
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

                                                                //// TODO: 20/8/15
//                                                                Intent intent = new Intent(
//                                                                        getActivity(),
//                                                                        MealHistoryActivity.class);
//                                                                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
//                                                                startActivity(intent);
                                                            } else {
                                                                Log.d("Error in saving meal&cal balances", e.getMessage());
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
                                        }
                                    })
                            .setNegativeButton("Cancel",
                                    new DialogInterface.OnClickListener() {
                                        public void onClick(
                                                DialogInterface dialog,
                                                int whichButton) {
                                            dialog.dismiss();
                                        }
                                    })

                            .setPositiveButton("Outdated info",
                                    new DialogInterface.OnClickListener() {
                                        public void onClick(
                                                DialogInterface dialog,
                                                int whichButton) {
                                            // outdated meal = send email to
                                            // foodingo
                                            // with user info and update
                                            // database dish counter
                                            // email
                                            doorbellAPI = new DoorbellApi(
                                                    getActivity());
                                            doorbellAPI.setAppId(1681);
                                            doorbellAPI
                                                    .setApiKey("JI9oZF0g2hRN8Z9wyqI3spUX8UlqadstBD7YJtWhYlOr4KbRSBxIJqqVJFgLVxwH");
                                            JSONObject mProperties = new JSONObject();
                                            try {
                                                mProperties.put("User",
                                                        user.getUsername());
                                            } catch (JSONException ex) {
                                                Log.d("JSON Error",
                                                        ex.getMessage());
                                            }
                                            doorbellAPI
                                                    .setCallback(new RestCallback() {
                                                        @Override
                                                        public void success(
                                                                Object obj) {
                                                            Toast.makeText(
                                                                    getActivity(),
                                                                    obj.toString(),
                                                                    Toast.LENGTH_LONG)
                                                                    .show();
                                                        }
                                                    });
                                            try {
                                                String info = "Reported outdated dish by :"
                                                        + user.getUsername();
                                                info += "\nUser ID: "
                                                        + user.getObjectId();
                                                info += "\nDish " + d.getDish();
                                                info += "\nDish ID: "
                                                        + d.getObjectId();
                                                info += "\nRestaurant: "
                                                        + d.getRestaurant();
                                                doorbellAPI.sendFeedback(info,
                                                        user.getEmail(),
                                                        mProperties,
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
                                                public void done(
                                                        ParseException e) {
                                                    if (e == null) {
                                                        Toast.makeText(getActivity(), "Thank you for the feedback", Toast.LENGTH_SHORT).show();
                                                        // Saved successfully.
                                                        //     refreshNewDayCaloriesData();
                                                        Log.d("Increment field report_counter success", "SUCCESS");
                                                    } else {
                                                        // The save failed.
                                                        Log.d("Increment field report_counter error", e.getMessage());
                                                    }
                                                }
                                            });
                                            dialog.dismiss();
                                        }
                                    })

//                            .setNegativeButton(android.R.string.no, new DialogInterface.OnClickListener() {
//                                public void onClick(DialogInterface dialog, int which) {
//                                    // do nothing
//                                }
//                            })
//                            .setIcon(android.R.drawable.ic_dialog_alert)

                            .show();
                    Toast.makeText(getActivity(),
                            "You are about to consume : " + d.getDish(), Toast.LENGTH_SHORT)
                            .show();


                }


            });


            lv2.setOnItemClickListener(new OnItemClickListener() {


                public void onItemClick(AdapterView<?> parent,
                                        View view, int position, long id) {

                    // When clicked, save the dish item to the DB
                    //      final Dish d = mealAdapter.getItem(position);
                    final Dish d = (Dish) dishHistAdapter
                            .getItem(position);
                    new AlertDialog.Builder(getActivity())
                            .setTitle("You are about to consume:")
                            .setMessage(d.getDish())
                            .setCancelable(true)

                            .setNeutralButton("Having it",
                                    new DialogInterface.OnClickListener() {
                                        public void onClick(
                                                DialogInterface dialog,
                                                int whichButton) {
                                            //               cal = cal - d.getCalNo();
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
//                                                meallog.put("energyKcal", d.getKCal());

                                            } catch(IllegalArgumentException e2){
                                                e2.printStackTrace();
                                            }

                                                DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
                                                Calendar cald = Calendar.getInstance();
                                                String date = dateFormat.format(cald.getTime()).toString();
                                                meallog.put("consumption_date", date);


                                                user.put("mealNo_balance", noOfMeal);
                                                //          user.put("meal_cal_balance", cal);
                                                // saving all objects all at once using saveallinbackground.
                                                List<ParseObject> parseobjlist = new ArrayList<ParseObject>();
                                                parseobjlist.addAll(Arrays.asList(meallog, user));
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

                                                                    //// TODO: 20/8/15
//                                                                Intent intent = new Intent(
//                                                                        getActivity(),
//                                                                        MealHistoryActivity.class);
//                                                                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
//                                                                startActivity(intent);
                                                                } else {
                                                                    Log.d("Error in saving meal&cal balances", e.getMessage());
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
                                            }
                                        }

                                        )
                                                .

                                        setNegativeButton("Cancel",
                                                                  new DialogInterface.OnClickListener() {
                                            public void onClick (
                                                    DialogInterface dialog,
                                            int whichButton){
                                                dialog.dismiss();
                                            }
                                        }

                                        )

                                                .

                                        setPositiveButton("Outdated info",
                                                                  new DialogInterface.OnClickListener() {
                                            public void onClick (
                                                    DialogInterface dialog,
                                            int whichButton){
                                                // outdated meal = send email to
                                                // foodingo
                                                // with user info and update
                                                // database dish counter
                                                // email
                                                doorbellAPI = new DoorbellApi(
                                                        getActivity());
                                                doorbellAPI.setAppId(1681);
                                                doorbellAPI
                                                        .setApiKey("JI9oZF0g2hRN8Z9wyqI3spUX8UlqadstBD7YJtWhYlOr4KbRSBxIJqqVJFgLVxwH");
                                                JSONObject mProperties = new JSONObject();
                                                try {
                                                    mProperties.put("User",
                                                            user.getUsername());
                                                } catch (JSONException ex) {
                                                    Log.d("JSON Error",
                                                            ex.getMessage());
                                                }
                                                doorbellAPI
                                                        .setCallback(new RestCallback() {
                                                            @Override
                                                            public void success(
                                                                    Object obj) {
                                                                Toast.makeText(
                                                                        getActivity(),
                                                                        obj.toString(),
                                                                        Toast.LENGTH_LONG)
                                                                        .show();
                                                            }
                                                        });
                                                try {
                                                    String info = "Reported outdated dish by :"
                                                            + user.getUsername();
                                                    info += "\nUser ID: "
                                                            + user.getObjectId();
                                                    info += "\nDish " + d.getDish();
                                                    info += "\nDish ID: "
                                                            + d.getObjectId();
                                                    info += "\nRestaurant: "
                                                            + d.getRestaurant();
                                                    doorbellAPI.sendFeedback(info,
                                                            user.getEmail(),
                                                            mProperties,
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
                                                    public void done(
                                                            ParseException e) {
                                                        if (e == null) {
                                                            Toast.makeText(getActivity(), "Thank you for the feedback", Toast.LENGTH_SHORT).show();
                                                            // Saved successfully.
                                                            //     refreshNewDayCaloriesData();
                                                            Log.d("Increment field report_counter success", "SUCCESS");
                                                        } else {
                                                            // The save failed.
                                                            Log.d("Increment field report_counter error", e.getMessage());
                                                        }
                                                    }
                                                });
                                                dialog.dismiss();
                                            }
                                        }

                                        ).

                                        show();

                                        Toast.makeText(

                                                getActivity(),

                                                "You are about to consume : " + d.getDish(), Toast.LENGTH_SHORT)
                                                .

                                        show();

                                    }


                });


        }

        return rootView;

    }



    public void performSearch() {
        if (!searchText.getText().toString().equals("")) {
            progressDialog = ProgressDialog.show(getActivity(), "",
                    "Searching...", true);
            query = searchText.getText().toString().trim();
            query = query.replace(" ", "+");
            url = "https://api.nutritionix.com/v1_1/search/" + query
                    + "?results=0%3A20&cal_min=" + cal_min + "&cal_max="
                    + cal_max + "&fields=" + fields + "&&appId=" + appId
                    + "&appKey=" + appKey + "&format=json#";
            new NetworkOperation().execute();
        }
        // hiding keyboard after showing search result
        InputMethodManager inputManager = (InputMethodManager) getActivity()
                .getSystemService(Context.INPUT_METHOD_SERVICE);
        inputManager.hideSoftInputFromWindow(getActivity().getCurrentFocus()
                .getWindowToken(), InputMethodManager.HIDE_NOT_ALWAYS);
    }



    public void initialiseAdapter() {

        dishFavAdapter = new FavDishHistoryAdapter(getActivity(), new ArrayList<Dish>());
        lv1.setAdapter(dishFavAdapter);
        dishHistAdapter = new FavDishHistoryAdapter(getActivity(), new ArrayList<Dish>());
        lv2.setAdapter(dishHistAdapter);


        estimateadapter = new ArrayAdapter<Estimate>(getActivity().getBaseContext(),
                android.R.layout.simple_list_item_1, estimates);

//        estimateadapter = new EstimateAdapter(getActivity(),new ArrayList<Estimate>());
        lv3.setAdapter(estimateadapter);
      //  lv3.setAdapter(adapter);

    }


// dummyquery=null;
    public void updateFavData()  {

        ParseQuery<Dish> dummyquery = ParseQuery.getQuery(Dish.class);
        ParseQuery<MealStored> mealquery = ParseQuery.getQuery(MealStored.class);
        dummyquery.whereExists("user_created_meal");
        mealquery.whereEqualTo("user_id", user);
        mealquery.whereMatchesQuery("dish_id", dummyquery);
        mealquery.orderByDescending("updatedAt");
        mealquery.include("dish_id");
        mealquery.setLimit(10);


        mealquery.findInBackground(new FindCallback<MealStored>() {

            //  HashMap<Integer,String> h = new HashMap<Integer,String>();


            @Override
            public void done(List<MealStored> dishess, ParseException error) {

                ArrayList<String> dishList = new ArrayList<String>();
                Map<String, Dish> dishWithKeyMap = new HashMap<String, Dish>();
                for (int i = 0; i < dishess.size(); i++) {
                    dishList.add(dishess.get(i).getDish().getDish());
                    dishWithKeyMap.put(dishess.get(i).getDish().getDish(), dishess.get(i).getDish());

                }
                Map<String, Integer> dishWithFrequency = new HashMap<String, Integer>();
                for (MealStored dish : dishess) {
                    dishWithFrequency.put(dish.getDish().getDish(), Collections.frequency(dishList, dish.getDish().getDish()));
                }


                Map<String, Integer> sortedmMap = sortByComparator(dishWithFrequency);
                List<Dish> dishListWithDish = new ArrayList<Dish>();
                for (Map.Entry<String, Integer> entry : sortedmMap.entrySet()) {
                    dishFavAdapter.add(dishWithKeyMap.get(entry.getKey()));
                }
                Log.d("finall list", dishess.size() + "");


            }


        });


    }


    private static Map<String, Integer> sortByComparator(Map<String, Integer> unsortMap) {

        List<Map.Entry<String, Integer>> list =
                new LinkedList<Map.Entry<String, Integer>>(unsortMap.entrySet());

        Collections.sort(list, new Comparator<Map.Entry<String, Integer>>() {
            public int compare(Map.Entry<String, Integer> o1,
                               Map.Entry<String, Integer> o2) {
                return (o2.getValue()).compareTo(o1.getValue());
            }
        });


        Map<String, Integer> sortedMap = new LinkedHashMap<String, Integer>();
        for (Iterator<Map.Entry<String, Integer>> it = list.iterator(); it.hasNext();) {
            Map.Entry<String, Integer> entry = it.next();
            sortedMap.put(entry.getKey(), entry.getValue());
        }
        return sortedMap;
    }






    public void updateRecData()  {

        ParseQuery<Dish> dummyquery = ParseQuery.getQuery(Dish.class);
        ParseQuery<MealStored> mealquery = ParseQuery.getQuery(MealStored.class);
        dummyquery.whereExists("user_created_meal");
        mealquery.whereEqualTo("user_id", user);
        mealquery.whereMatchesQuery("dish_id", dummyquery);
        mealquery.orderByDescending("updatedAt");
        mealquery.include("dish_id");
        mealquery.setLimit(10);
        mealquery.findInBackground(new FindCallback<MealStored>() {

            @Override
            public void done(List<MealStored> dishes, ParseException error) {


                for (int i = 0; i < dishes.size(); i++) {
                    dishHistAdapter.add(dishes.get(i).getDish());
                }

                Log.d("finall list", dishes.size() + "");

            }


        });


    }


    public void estimateData()
    {

        ParseQuery<Estimate> estim = ParseQuery.getQuery("estimates");
        //estim.whereExists("dishgroup");
        estim.whereExists("calories");
        //estim.whereEqualTo("user_id",user);
        estim.orderByDescending("calories");
        //   estim.include("dishgroup");

        //  estim.setLimit(10);
        estim.findInBackground(new FindCallback<Estimate>() {

            @Override
            public void done(List<Estimate> estimate, ParseException error) {


                for (int i = 0; i < estimate.size(); i++) {
//                    Estimate ef = new Estimate(estimate.get(i).getDishgroup(),estimate.get(i).getExamples(),estimate.get(i).getCalories());
//                    estimates.add(ef);
//                    estimateadapter.add(estimate.get(i));
              //      Estimate ef = new Estimate(estimate.get(i).getDishgroup(),estimate.get(i).getExamples(),estimate.get(i).getCalories());
                    estimates.add(estimate.get(i));
                   // estimateadapter.add(estimate.get(i));
                    //estimateadapter.add(estimate.get(i));
                }



                Log.d("finall list", estimate.size() + "");


            }


        });

    }




    public void loadContents() {
        if (dishCollection.size() == 0) {

            Toast.makeText(getActivity(), "No Result.", Toast.LENGTH_LONG)
                    .show();
            Log.d("load Contents", "No Result");
        } else {
            adapter = new ArrayAdapter<LogFood>(getActivity().getBaseContext(),
                    android.R.layout.simple_list_item_1, dishCollection);
            lv.setAdapter(adapter);
            tabHost.setVisibility(View.GONE);

        }
    }



    public class NetworkOperation extends AsyncTask<Void, Void, Void> {

        @Override
        protected Void doInBackground(Void... arg0) {
            dishCollection = new ArrayList<LogFood>();

            JsonParser parser = new JsonParser();
            parser.url = url;
            Log.d("url being run", url);
            try {
                String result = parser.getHttpConnection();
                JSONObject jsonObject = new JSONObject(result);
                items = jsonObject.getJSONArray("hits");

                for (int i = 0; i < items.length(); i++) {
                    jsonObject = items.getJSONObject(i);
                    JSONObject fields = jsonObject.getJSONObject("fields");
                    Double carbD = 0.0;
                    Double protein = 0.0;
                    Double fatD = 0.0;
                    Double calories = 0.0;
                    String itemname = "";
                    String brand_name = "";
                    try {
                        // for itemname
                        itemname = fields.getString("item_name");

                        // for brandname
                        brand_name = fields.getString("brand_name");

                        // for calories
                        String nf_calories = fields.getString("nf_calories");

                        if (nf_calories != null) {
                            calories = Double.parseDouble(nf_calories);
                        }
                        if (calories != null && calories > 0) {
                            // for prot nf_protein
                            String prot = fields.getString("nf_protein");
                            if (!prot.equals("null")) {
                                protein = Double.parseDouble(prot);
                            }

                            // for fat nf_total_fat
                            String fat = fields.getString("nf_total_fat");
                            if (!fat.equals("null")) {
                                fatD = Double.parseDouble(fat);
                            }

                            // for carb nf_total_carbohydrate
                            String carb = fields
                                    .getString("nf_total_carbohydrate");
                            if (!carb.equals("null")) {
                                carbD = Double.parseDouble(carb);
                            }
                        }
                    } catch (Exception e) {
                        Log.e("[error]:", e.getMessage());
                    }

                    // logfood item
                    LogFood lf = new LogFood(itemname, brand_name, calories,
                            fatD, protein, carbD);
                    dishCollection.add(lf);
                    //Estimate ef = new Estimate();

                }

            } catch (ClientProtocolException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (JSONException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

            return null;
        }

        @Override
        protected void onPostExecute(Void result) {
            loadContents();
            super.onPostExecute(result);
            progressDialog.dismiss();
        }

    }
    @Override
    public void onResume() {
        super.onResume();

        if (GlobalVar.mealList.size() > 0 || GlobalVar.estimateList.size()>0) {
            if (GlobalVar.totalcal != 0) {
                energyChosen = GlobalVar.totalcal;
                dishChosen = GlobalVar.mealList;
                estimenergrychosen=GlobalVar.estimateTotalCal;
                estimatechosen = GlobalVar.estimateList;
            }

                int count = GlobalVar.mealList.size()+GlobalVar.estimateList.size();
                 DecimalFormat form = new DecimalFormat("0.00");
                logdishButton.setText(form.format(energyChosen + estimenergrychosen) + " " + "KCAL ("
                        + count + ")");

        } else {
            logdishButton.setText(R.string.logdish);
            if (GlobalVar.totalcal == 0)
                energyChosen = 0;
            estimenergrychosen=0;
            if(GlobalVar.mealList != null) {
                GlobalVar.mealList.clear();
                dishChosen.clear();
            }
            if(GlobalVar.mealList != null) {
                GlobalVar.estimateList.clear();
                estimatechosen.clear();
            }


        }
    }
	
    @Override
    public void onStart() {
        super.onStart();
        if(GlobalVar.totalcal==0) {
            energyChosen=0;
        }if(GlobalVar.estimateTotalCal ==0){
            estimenergrychosen=0;
        }
    }

    @Override
    public void onPause() {
           super.onPause();
        // show the number in the button
        if (dishChosen.size() > 0 || estimatechosen.size() >0){


            GlobalVar.mealList = dishChosen;
            GlobalVar.estimateList=estimatechosen;
            GlobalVar.totalcal =  energyChosen ;
            GlobalVar.estimateTotalCal= estimenergrychosen;

            int count=GlobalVar.mealList.size()+GlobalVar.estimateList.size();
            DecimalFormat form = new DecimalFormat("0.00");
            logdishButton.setText(form.format(energyChosen + estimenergrychosen) + " " + "KCAL ("
                    +count+ ")");
        }
		
		
        //Mixpanel step 24-c
        end = Calendar.getInstance().getTimeInMillis();
        double total = (end-start)*0.001;
        try {
            JSONObject props = new JSONObject();
            props.put("Food Cart", total);
            mixpanel.track("Time Spent", props);
        } catch (JSONException e) {
            Log.e("mixpanel food cart time spent", "Unable to add properties to JSONObject", e);
        }
    }


}