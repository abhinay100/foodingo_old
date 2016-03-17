package com.foodingo.activities.fragment;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.DatePickerDialog;
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
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.EditorInfo;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.foodingo.activities.R;
import com.foodingo.activities.activity.Login;
import com.foodingo.activities.activity.MainActivity;
import com.foodingo.activities.adapters.DishHistoryAdapter;
import com.foodingo.activities.model.GlobalVar;
import com.foodingo.activities.model.LogFood;
import com.foodingo.activities.model.MealStored;
import com.mixpanel.android.mpmetrics.MixpanelAPI;
import com.parse.DeleteCallback;
import com.parse.FindCallback;
import com.parse.ParseException;
import com.parse.ParseObject;
import com.parse.ParseQuery;
import com.parse.ParseUser;
import com.parse.SaveCallback;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by Shaik on 20/8/15.
 */
public class MealHistory extends Fragment implements View.OnClickListener,
        DatePickerDialog.OnDateSetListener {
    private ListView listView;
    private ParseUser user;
    private DishHistoryAdapter dishHistAdapter;
    private EditText dateText;
    private TextView callogView,noMealsTV;
    private TextView expenselogView;
    private int _day;
    private int _month;
    private int _year;
    Dialog progressDialog;
    DecimalFormat df = new DecimalFormat("#");
    DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
    Calendar cal = Calendar.getInstance();
    String date;
    ImageView noStoryIV;
    //Mixpanel step 26-a
    MixpanelAPI mixpanel ;
    long start;
    long end;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_mealhistory, container,
                false);

        noStoryIV = (ImageView) rootView.findViewById(R.id.noStoryIV);
        noMealsTV = (TextView) rootView.findViewById(R.id.noMealsTV);
        user = ParseUser.getCurrentUser();
        //Mixpanel step 26-b
        mixpanel = MixpanelAPI.getInstance(getContext(), getString(R.string.mixpanel_projectToken));
        start = Calendar.getInstance().getTimeInMillis();

        // Fetch Facebook user info if the session is active
        //Session session = ParseFacebookUtils.getSession();
        if (user != null) {
            try {

                user = ParseUser.getCurrentUser();
                dateText = (EditText) rootView.findViewById(R.id.dateEditText);
                callogView = (TextView) rootView.findViewById(R.id.totalCalTextView);
                expenselogView = (TextView) rootView.findViewById(R.id.totalExpenseTextView);
                dateText.setOnClickListener(this);// a date picker dialog pops

                noStoryIV.setVisibility(View.INVISIBLE);
                noMealsTV.setVisibility(View.INVISIBLE);

                ImageButton ystyButton = (ImageButton) rootView.findViewById(R.id.button1_yesterday);
                ystyButton.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        try {
                            progressDialog = ProgressDialog.show(
                                    getActivity(), "",
                                    "Retrieving...", true);
                            String dateStr = dateText.getText().toString();
                            SimpleDateFormat curFormater = new SimpleDateFormat(
                                    "dd MMM yyyy");
                            Date dateObj = curFormater.parse(dateStr);
                            Calendar calendar = Calendar.getInstance();
                            calendar.setTime(dateObj);
                            calendar.add(Calendar.DATE, -1);
                            curFormater.format(calendar.getTime());

                            SimpleDateFormat sdf = new SimpleDateFormat(
                                    "dd/MM/yyyy");
                            String dateFormatted = sdf.format(calendar
                                    .getTime());
                            _year = Integer.parseInt(dateFormatted.substring(6,
                                    10));
                            _month = Integer.parseInt(dateFormatted.substring(
                                    3, 5)) - 1;
                            _day = Integer.parseInt(dateFormatted.substring(0,
                                    2));

                            updateDisplay();

                            updateData();

                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                });

                ImageButton nextdayButton = (ImageButton) rootView.findViewById(R.id.button2_nextdate);
                nextdayButton.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        try {

                            String dateStr = dateText.getText().toString();
                            SimpleDateFormat curFormater = new SimpleDateFormat(
                                    "dd MMM yyyy");
                            Date dateObj = curFormater.parse(dateStr);
                            Calendar calendar = Calendar.getInstance();
                            calendar.setTime(dateObj);
                            calendar.add(Calendar.DATE, 1);

                            if (calendar.after(Calendar.getInstance())) {
                                Toast.makeText(getActivity(),
                                        "Latest date view is today.",
                                        Toast.LENGTH_SHORT).show();
                            } else {
                                curFormater.format(calendar.getTime());
                                SimpleDateFormat sdf = new SimpleDateFormat(
                                        "dd/MM/yyyy");
                                String dateFormatted = sdf.format(calendar
                                        .getTime());

                                _year = Integer.parseInt(dateFormatted
                                        .substring(6, 10));
                                _month = Integer.parseInt(dateFormatted
                                        .substring(3, 5)) - 1;
                                _day = Integer.parseInt(dateFormatted
                                        .substring(0, 2));
                                updateDisplay();
                                updateData();
                            }

                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                });
                SimpleDateFormat sdf = new SimpleDateFormat("dd MMM yyyy");
                date = sdf.format(cal.getTime()).toString();
                dateText.setText(date);
                listView = (ListView) rootView.findViewById(R.id.list);
                dishHistAdapter = new DishHistoryAdapter(
                        getActivity(), new ArrayList<ParseObject>());

                listView.setAdapter(dishHistAdapter);

                // WHEN CLICKED, USER CAN DELETE
                listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {

                    public void onItemClick(AdapterView<?> parent, View view,
                                            int position, long id) {

                        // When clicked, save the dish item to the DB
                        final ParseObject dishhistory = dishHistAdapter
                                .getItem(position);
                        AlertDialog.Builder alert = new AlertDialog.Builder(
                                getActivity());

                        alert.setTitle("Delete?");
                        alert.setMessage("You are about to delete a logged food?");
                        alert.setCancelable(true);
                        alert.setNeutralButton("Yes",
                                new DialogInterface.OnClickListener() {
                                    public void onClick(DialogInterface dialog,
                                                        int whichButton) {
                                        SimpleDateFormat sdf = new SimpleDateFormat(
                                                "dd MMM yyyy");
                                        String todaysdate = sdf.format(
                                                cal.getTime()).toString();
                                        Log.d("date", dateText.getText()
                                                .toString());
                                        Log.d("todaysdate", todaysdate);
                                        if (dateText.getText().toString()
                                                .equals(todaysdate)) {
                                            // update the calories and no of
                                            // meals/snack
                                            try {
                                                Double energy = dishhistory
                                                        .getParseObject("dish_id")
                                                        .getDouble("energyKcal");

                                                String type = dishhistory
                                                        .getString("type");

                                                Log.d("dish cal deleted is:",
                                                        energy + "type:" + type);
                                                Log.d("Before deletion",
                                                        "Meal/snack cal is "
                                                                + user.get("meal_cal_balance")
                                                                + "/"
                                                                + user.get("snack_cal_balance"));
                                                Log.d("meal no bal/snack no bal",
                                                        user.get("mealNo_balance")
                                                                + "/"
                                                                + user.get("snackNo_balance"));
                                                if (type.equals("meal")) {

                                                    Double newbal = user
                                                            .getDouble("meal_cal_balance")
                                                            + energy;
                                                    user.increment("mealNo_balance");
                                                    user.put("meal_cal_balance",
                                                            newbal);

                                                } else {// snack

                                                    Double newbal = user
                                                            .getDouble("snack_cal_balance")
                                                            + energy;
                                                    if (newbal > user
                                                            .getDouble("snack_cal")) {
                                                        user.put(
                                                                "snack_cal_balance",
                                                                user.getDouble("snack_cal"));
                                                        double diff = energy
                                                                - user.getDouble("snack_cal");
                                                        double newbalformeal = diff
                                                                + user.getDouble("meal_cal_balance");
                                                        user.put(
                                                                "meal_cal_balance",
                                                                newbalformeal);
                                                    } else {
                                                        user.put(
                                                                "snack_cal_balance",
                                                                newbal);
                                                    }
                                                    user.increment("snackNo_balance");
                                                }
                                            }
                                            catch (NullPointerException e2){
                                                e2.printStackTrace();
                                            }
                                        } else {
                                            Log.d("Deleting in calstory",
                                                    "Deleted a dish not from today");

                                        }

                                        // saving all objects all at once using
                                        // saveallinbackground.
                                        List<ParseObject> parseobjlist = new ArrayList<ParseObject>();
                                        parseobjlist.addAll(Arrays.asList(user));
                                        ParseObject.saveAllInBackground(
                                                parseobjlist,
                                                new SaveCallback() {
                                                    @Override
                                                    public void done(
                                                            ParseException e) {
                                                        if (e == null) {
                                                            Log.d("Delete item in mealhistory class",
                                                                    "updated user and mealsdummyx tables");
                                                            Log.d("After deletion",
                                                                    "Meal/snack cal is "
                                                                            + user.get("meal_cal_balance")
                                                                            + "/"
                                                                            + user.get("snack_cal_balance"));
                                                            Log.d("meal no bal/snack no bal",
                                                                    user.get("mealNo_balance")
                                                                            + "/"
                                                                            + user.get("snackNo_balance"));
                                                        } else {
                                                            Log.d("DEBUG in mealhistory class",
                                                                    e.getMessage());
                                                        }
                                                    }
                                                });
                                        try {
                                            if (dishhistory.getParseObject(
                                                    "dish").has(
                                                    "user_created_meal"));
                                            {
                                                dishhistory.getParseObject(
                                                        "dish")
                                                        .deleteEventually();

                                            }
                                        }
                                        catch (NullPointerException e4){
                                            e4.printStackTrace();
                                        }
                                        dishhistory
                                                .deleteEventually(new DeleteCallback() {
                                                    public void done(
                                                            ParseException e) {
                                                        if (e != null) {
                                                            Toast.makeText(
                                                                    getActivity(),
                                                                    "Error: "
                                                                            + e.getMessage(),
                                                                    Toast.LENGTH_SHORT)
                                                                    .show();
                                                        } else {
                                                            Toast.makeText(
                                                                    getActivity(),
                                                                    "Dish deleted!",
                                                                    Toast.LENGTH_SHORT)
                                                                    .show();
                                                            updateData();
                                                        }
                                                    }
                                                });
                                   }
                                });

                        alert.setNegativeButton("No",
                                new DialogInterface.OnClickListener() {
                                    public void onClick(DialogInterface dialog,
                                                        int whichButton) {
                                        dialog.dismiss();
                                    }
                                });

                        alert.show();

                    }
                });

                updateData();

            } catch (Exception e) {
                Toast.makeText(getActivity(), "Error: " + e.getMessage(),
                        Toast.LENGTH_LONG).show();
            }

            // Add your initialization code here
            listView = (ListView) rootView.findViewById(R.id.list);
            // listView.setTextFilterEnabled(true);
            // RemoteDataTask task = new RemoteDataTask();
            // task.execute();

        } else {
            Toast.makeText(getActivity(), "Error: Please restart Foodingo App!",
                    Toast.LENGTH_SHORT).show();
        }

        return rootView;
    }


    public void updateData() {
        try {
            ParseQuery<ParseObject> query = ParseQuery.getQuery("mealhistory");
            query.whereEqualTo("user_id", user);
            if (!dateText.getText().toString().isEmpty()) {
                String date = dateText.getText().toString().trim();
                Calendar cal = Calendar.getInstance();
                cal.setTime(new SimpleDateFormat("dd MMM yyyy").parse(date));
                SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

                query.whereEqualTo("consumption_date",
                        sdf.format(cal.getTime()));
            }
            query.include("dish_id");
            query.findInBackground(new FindCallback<ParseObject>() {

                @Override
                public void done(List<ParseObject> dishes, ParseException error) {
                    if (error == null) {
                        double calconsumed = 0;
                        double expense = 0;
                        if (dishes != null) {
                            dishHistAdapter.clear();
                            if (dishes.size() > 0) {
                                for (int i = 0; i < dishes.size(); i++) {
                                    dishHistAdapter.add(dishes.get(i));
                                    if ((dishes.get(i)).has("dish_id")) {
                                        if ((dishes.get(i)).getParseObject(
                                                "dish_id").has("energyKcal")) {
                                            calconsumed = calconsumed
                                                    + (dishes.get(i))
                                                    .getParseObject(
                                                            "dish_id")
                                                    .getDouble(
                                                            "energyKcal");
                                        }
                                    }
                                    if ((dishes.get(i)).has("price")) {
                                        expense = expense
                                                + (dishes.get(i))
                                                .getDouble("price");
                                    }
                                }
                                noStoryIV.setVisibility(View.INVISIBLE);
                                noMealsTV.setVisibility(View.INVISIBLE);
                                listView.setVisibility(View.VISIBLE);
                                callogView.setText("Total Calories Consumed: "
                                        + String.format("%.2f", calconsumed)
                                        + " kcal");
                                expenselogView.setText("Total Expense: SGD "
                                        + String.format("%.2f", expense));
								/*
								 * meallogstatusView.setText("You have consumed "
								 * + df.format(calconsumed / calBank * 100) +
								 * " % for the day");
								 */
                            } else {
                                noStoryIV.setVisibility(View.VISIBLE);
                                noMealsTV.setVisibility(View.VISIBLE);
                                listView.setVisibility(View.INVISIBLE);
                                callogView.setText(" ");
                                expenselogView.setText("");
                            }

                        } else {
                            Toast.makeText(getActivity(),
                                    "Please report this error",
                                    Toast.LENGTH_SHORT).show();
                        }
                    } else {

                        Log.d("ends", error.getMessage());
                    }
                    if (progressDialog != null) {
                        progressDialog.dismiss();
                    }
                }
            });

        } catch (Exception e) {
            Log.d("updateData", e.getMessage());
        }
        listView.setAdapter(dishHistAdapter);
    }

    public void onBackPressed() {
        Intent intent = new Intent(getActivity(), MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        startActivity(intent);
    }

    @Override
    public void onDateSet(DatePicker view, int year, int monthOfYear,
                          int dayOfMonth) {
        progressDialog = ProgressDialog.show(getActivity(), "", "Fetching your data...",
                true);
        _year = year;
        _month = monthOfYear;
        _day = dayOfMonth;
        updateDisplay();
        updateData();
    }

    @Override
    public void onClick(View v) {
        if (dateText.getText().toString().equals("")) {
            DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            Calendar cal = Calendar.getInstance();
            String date = dateFormat.format(cal.getTime()).toString();
            int year = Integer.parseInt(date.substring(6, 10));
            int month = Integer.parseInt(date.substring(3, 5));
            int day = Integer.parseInt(date.substring(0, 2));
            // TODO Auto-generated method stub
            DatePickerDialog dialog = new DatePickerDialog(getActivity(), this, year,
                    month - 1, day);
            dialog.getDatePicker().setMaxDate(System.currentTimeMillis());
            dialog.setTitle(R.string.label_logfooddate);
            dialog.show();

        } else {
            String datetext = dateText.getText().toString();
            Calendar cal = Calendar.getInstance();
            try {
                cal.setTime(new SimpleDateFormat("dd MMM yyyy").parse(datetext));
            } catch (java.text.ParseException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
            int yearBorn = Integer.parseInt(sdf.format(cal.getTime())
                    .substring(6, 10));
            int month = Integer.parseInt(sdf.format(cal.getTime()).substring(3,
                    5));
            int day = Integer.parseInt(sdf.format(cal.getTime())
                    .substring(0, 2));

            DatePickerDialog dialog = new DatePickerDialog(getActivity(), this,
                    yearBorn, month - 1, day);
            dialog.getDatePicker().setMaxDate(System.currentTimeMillis());
            dialog.setTitle(R.string.label_logfooddate);
            dialog.show();
        }

    }

    // updates the date in the birth date EditText
    private void updateDisplay() {

        StringBuilder s = null;
        if (_month > 8 && _day > 9) {
            s = new StringBuilder()
                    // Month is 0 based so add 1
                    .append(_day).append("/").append(_month + 1).append("/")
                    .append(_year).append(" ");
        } else if (_month < 9 && _day > 9) {
            s = new StringBuilder()
                    // Month is 0 based so add 1
                    .append(_day).append("/0").append(_month + 1).append("/")
                    .append(_year).append(" ");
        } else if (_month > 8 && _day < 10) {
            s = new StringBuilder()
                    // Month is 0 based so add 1
                    .append("0").append(_day).append("/").append(_month + 1)
                    .append("/").append(_year).append(" ");
        } else {
            s = new StringBuilder()
                    // Month is 0 based so add 1
                    .append("0").append(_day).append("/0").append(_month + 1)
                    .append("/").append(_year).append(" ");
        }
        Calendar call = Calendar.getInstance();
        try {
            call.setTime(new SimpleDateFormat("dd/MM/yyyy").parse(s.toString()));
        } catch (java.text.ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        SimpleDateFormat sdf = new SimpleDateFormat("dd MMM yyyy");

        dateText.setText(sdf.format(call.getTime()));
    }

    public boolean isOnline() {
        ConnectivityManager cm = (ConnectivityManager) getActivity().getSystemService(Context.CONNECTIVITY_SERVICE);
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
        //Mixpanel step 26-c
        end = Calendar.getInstance().getTimeInMillis();
        double total = (end-start)*0.001;
        try {
            JSONObject props = new JSONObject();
            props.put("Calstory", total);
            mixpanel.track("Time Spent", props);
        } catch (JSONException e) {
            Log.e("mixpanel Meal History/Calstory time spent", "Unable to add properties to JSONObject", e);
        }
    }
}
