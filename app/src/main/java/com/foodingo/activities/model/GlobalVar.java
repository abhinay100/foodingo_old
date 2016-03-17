package com.foodingo.activities.model;

import java.util.ArrayList;
import java.util.List;

import com.parse.ParseObject;

public class GlobalVar {
	public static double mealcal;
	public static User foouser = new User();
	// LatLong
	public static String mLatitude;
	public static String mLongitude;
	// "Feeling lucky feature":to contain the meals from the recommendation list
	// and randomise it.
	public static List<LogFood> mealList = new ArrayList<LogFood>();
	public static List<Estimate> estimateList = new ArrayList<Estimate>();
	public static String logdishname;
	public static int price;
	public static int selectedRadioBtn;
	public static double totalcal;
	public static int itemNo;
	public static String email;
	public static double estimateTotalCal;
	
}
