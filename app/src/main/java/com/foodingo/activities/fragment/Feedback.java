package com.foodingo.activities.fragment;

/**
 * Created by Shaik on 20/8/15.
 */
import org.json.JSONException;
import org.json.JSONObject;

import io.doorbell.android.Doorbell;
import io.doorbell.android.DoorbellApi;
import io.doorbell.android.manavo.rest.RestCallback;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.database.DataSetObserver;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.EditorInfo;
import android.webkit.WebView;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.foodingo.activities.R;
import com.foodingo.activities.activity.Login;

import com.foodingo.activities.model.GlobalVar;
import com.foodingo.activities.model.LogFood;
import com.parse.ParseUser;





public class Feedback extends Fragment {
    ParseUser currentUser;
    EditText feedbackText;
    DoorbellApi doorbellAPI;

    boolean flag = false;
    Button mButton;
    WebView webView;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_feedback, container,
                false);

        mButton = (Button)rootView.findViewById(R.id.buttonClick);
        webView = (WebView)rootView.findViewById(R.id.webview);
        webView.loadUrl("file:///android_asset/faq.html");
        flag = true;
        mButton.setOnClickListener(new View.OnClickListener() {


            @Override
            public void onClick(View v) {

                if (flag==true){
                    webView.setVisibility(View.VISIBLE);
                    flag = false;
                }
                else
                     {
                        webView.setVisibility(View.GONE);
                        flag = true;
                    }



            }
        });





        currentUser = ParseUser.getCurrentUser();
        Button sendButton = (Button) rootView.findViewById(R.id.sndbutton);
        feedbackText = (EditText) rootView.findViewById(R.id.feedbackText);

        sendButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (!feedbackText.getText().toString().isEmpty()
                        && feedbackText.getText().toString().length() >= 10) {
                    doorbellAPI = new DoorbellApi(getActivity());
                    doorbellAPI.setAppId(1681);
                    doorbellAPI
                            .setApiKey("JI9oZF0g2hRN8Z9wyqI3spUX8UlqadstBD7YJtWhYlOr4KbRSBxIJqqVJFgLVxwH");
                    JSONObject mProperties = new JSONObject();
                    try {
                        mProperties.put("User", "Me");
                    } catch (JSONException e) {
                        Log.d("JSON Error", e.getMessage());
                    }
                    doorbellAPI.setCallback(new RestCallback() {
                        @Override
                        public void success(Object obj) {
                            Toast.makeText(getActivity(), obj.toString(),
                                    Toast.LENGTH_LONG).show();
                        }
                    });
                    try {
                        TelephonyManager tm = (TelephonyManager)getActivity().getSystemService(getActivity().TELEPHONY_SERVICE);
                        //String info = "\nDebug info: "+tm.getLine1Number();
                        String info =  "\nCarrier: "+tm.getNetworkOperatorName();
                        info += "\nManufacturer: "+Build.MANUFACTURER;
                        info += "\nModel: "+Build.MODEL;
                        info += "\nOS: "+Build.VERSION.RELEASE;
                        info += "\nConnection: "+getNetworkClass(getActivity());
                        PackageManager manager = getActivity().getPackageManager();
                        PackageInfo packinfo = manager.getPackageInfo(getActivity().getPackageName(), 0);
                        info += "\nApp Version:"+ packinfo.versionName;
                        doorbellAPI.sendFeedback(currentUser.toString()+"\n\n"+feedbackText.getText()
                                        .toString()+"\n\n--Support Info--"+info, currentUser.getEmail(),
                                mProperties, currentUser.toString());
                    } catch (Exception e) {
                        Log.d("Feedback Doorbell Error", e.getMessage());

                    }
                } else if (feedbackText.getText().toString().length() < 10) {
                    Toast.makeText(getActivity(),
                            "Please further describe your problem.",
                            Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(getActivity(),
                            "Please describe your problem.", Toast.LENGTH_SHORT)
                            .show();
                }

            }
        });

        return rootView;
    }

    public static String getNetworkClass(Context context) {
        ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo info = cm.getActiveNetworkInfo();
        if(info==null || !info.isConnected())
            return "-"; //not connected
        if(info.getType() == ConnectivityManager.TYPE_WIFI)
            return "WIFI";
        if(info.getType() == ConnectivityManager.TYPE_MOBILE){
            int networkType = info.getSubtype();
            switch (networkType) {
                case TelephonyManager.NETWORK_TYPE_GPRS:
                case TelephonyManager.NETWORK_TYPE_EDGE:
                case TelephonyManager.NETWORK_TYPE_CDMA:
                case TelephonyManager.NETWORK_TYPE_1xRTT:
                case TelephonyManager.NETWORK_TYPE_IDEN: //api<8 : replace by 11
                    return "2G";
                case TelephonyManager.NETWORK_TYPE_UMTS:
                case TelephonyManager.NETWORK_TYPE_EVDO_0:
                case TelephonyManager.NETWORK_TYPE_EVDO_A:
                case TelephonyManager.NETWORK_TYPE_HSDPA:
                case TelephonyManager.NETWORK_TYPE_HSUPA:
                case TelephonyManager.NETWORK_TYPE_HSPA:
                case TelephonyManager.NETWORK_TYPE_EVDO_B: //api<9 : replace by 14
                case TelephonyManager.NETWORK_TYPE_EHRPD:  //api<11 : replace by 12
                case TelephonyManager.NETWORK_TYPE_HSPAP:  //api<13 : replace by 15
                    return "3G";
                case TelephonyManager.NETWORK_TYPE_LTE:    //api<11 : replace by 13
                    return "4G";
                default:
                    return "?";
            }
        }
        return "?";
    }

    public boolean isOnline() {
        ConnectivityManager cm = (ConnectivityManager) getActivity().getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo netInfo = cm.getActiveNetworkInfo();
        return netInfo != null && netInfo.isConnectedOrConnecting();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        //LikeView.handleOnActivityResult(this, requestCode, resultCode, data);
        Log.d("About us", "OnActivityResult...");
    }

    @Override
    public void onResume() {
        super.onResume();
        if (!isOnline()) {
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

}
