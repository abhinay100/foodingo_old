package com.foodingo.activities.activity;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.DatePickerDialog;
import android.app.DatePickerDialog.OnDateSetListener;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.foodingo.activities.R;
import com.foodingo.activities.model.Dish;
import com.foodingo.activities.model.Estimate;
import com.foodingo.activities.model.GlobalVar;
import com.foodingo.activities.model.LogFood;
import com.foodingo.activities.model.MealStored;
import com.mixpanel.android.mpmetrics.MixpanelAPI;
import com.parse.ParseException;
import com.parse.ParseFile;
import com.parse.ParseImageView;
import com.parse.ParseObject;
import com.parse.ParseUser;
import com.parse.SaveCallback;
import com.soundcloud.android.crop.Crop;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;


public class LogFoodActivity extends Activity implements OnClickListener,
		OnDateSetListener {

	private static ParseUser user;
	private String priceregex = "^\\d+(\\.\\d{1,2})?$";
	ArrayAdapter<LogFood> adapter_chosen;
	ArrayAdapter<Estimate> adapter_estimate;
	ArrayAdapter adapter_combined;
	double estimenergrychosen = 0;
	// for saving the chosen ones so we can use this to add up for the final
	// ones when we try to log the meal constructed
	double fatChosen = 0;
	double protChosen = 0;
	double carbChosen = 0;
	double energyChosen = 0;
	ListView lv_chosen;
	ParseImageView dishPic;
	EditText price;
	EditText dateText;
	RadioGroup btn;
	EditText input;
	Button logbutton,clear_Cart;
	TextView totalcalTextView;
	ProgressDialog progressDialog;
	private int _day;
	private int _month;
	private int _year;
	boolean logdish;

	int cropCount = 0;
	Bitmap bm = null;
	ParseFile dishProfilePic = null;
	//Mixpanel step 22-a
	MixpanelAPI mixpanel ;
	long start;
	long end;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// ***! - all things to be improved are starting with ***!
		super.onCreate(savedInstanceState);
		logdish = false;
		setContentView(R.layout.activity_logfood);
		dishPic = (ParseImageView) findViewById(R.id.dishPic);
		dishPic.setPlaceholder(getResources().getDrawable(
				R.drawable.placeholder_icon));
		price = (EditText) findViewById(R.id.editTextAmtSpent);
		btn = ((RadioGroup) findViewById(R.id.radioGroup1));
		input = (EditText) findViewById(R.id.dishName);
		dateText = (EditText) findViewById(R.id.editTextDate);
		dateText.setOnClickListener(this);// a date picker dialog pops
		lv_chosen = (ListView) findViewById(R.id.listView_chosen);
		logbutton = (Button) findViewById(R.id.logbutton);
		clear_Cart = (Button) findViewById(R.id.button_clearcart);
		totalcalTextView = (TextView) findViewById(R.id.totalcalTextView);
		DateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy");
		Calendar cald = Calendar.getInstance();
		String date = dateFormat.format(cald.getTime()).toString();
		dateText.setText(date);

		clear_Cart.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				clearCart();
			}
		});
		//mixpanel step 22-b
		mixpanel = MixpanelAPI.getInstance(getApplicationContext(), getString(R.string.mixpanel_projectToken));
		start = Calendar.getInstance().getTimeInMillis();
	/*	for (LogFood x : GlobalVar.mealList) {
			energyChosen = energyChosen + x.getCal();
		}
		*/
		energyChosen=GlobalVar.totalcal;
		estimenergrychosen = GlobalVar.estimateTotalCal;

		logbutton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				if (adapter_combined.isEmpty()==true){
					Toast.makeText(getApplicationContext(),"not items in here",Toast.LENGTH_SHORT).show();
				}
				logdish();
			}

				public void logdish() {
				if (!GlobalVar.mealList.isEmpty() || !GlobalVar.estimateList.isEmpty()&& !adapter_combined.isEmpty()) {
					// then flush the memory in globalvar in resume page if
					// logdish is true.
					logdish = true;
					// get user input : dishname, price, type of food
					int selectedId = btn.getCheckedRadioButtonId();
					RadioButton selectedbtn = (RadioButton) findViewById(selectedId);
					String type = (String) selectedbtn.getText();
					String amt = price.getText().toString().trim();
					String dishname = input.getText().toString();

					if (amt.isEmpty()) {
						amt = "0";
					}

					if (amt.matches(priceregex)) {
						energyChosen = 0;
						fatChosen = 0;
						carbChosen = 0;
						protChosen = 0;
						for (LogFood x : GlobalVar.mealList) {
							energyChosen = energyChosen + x.getCal();
							fatChosen = fatChosen + x.getFat();
							protChosen = protChosen + x.getProtein();
							carbChosen = carbChosen + x.getCarb();
						}
						for (Estimate x : GlobalVar.estimateList) {
							energyChosen = energyChosen + x.getCalories();

						}
						int count=adapter_combined.getCount();
						for (int i=1;i<count;i++)
						{
							adapter_combined.getItem(i);
							if (adapter_combined.getItem(i)instanceof LogFood)
							{
								for (LogFood x : GlobalVar.mealList) {
									energyChosen = energyChosen + x.getCal();
									fatChosen = fatChosen + x.getFat();
									protChosen = protChosen + x.getProtein();
									carbChosen = carbChosen + x.getCarb();
								}
							}
							else if (adapter_combined.getItem(i)instanceof Estimate)
							{
								for (Estimate x : GlobalVar.estimateList) {
									energyChosen = energyChosen + x.getCalories();
//									fatChosen = fatChosen + x.getFat();
//									protChosen = protChosen + x.getProtein();
//									carbChosen = carbChosen + x.getCarb();\
								}
							}
//
						}

						// to log dish to calstory
						// database only
						// if
						try {
							progressDialog = ProgressDialog.show(
									LogFoodActivity.this, "", "Saving data...",
									true);

							// save constructed meal or // snack to //
							// db....here...
							// 1) create dish in mealsdummyx
							Dish d = new Dish();
							if (dishname.isEmpty()) {
								dishname = "Logged " + type;
							}
                            d.put("price", Double.valueOf(amt));
							d.put("dish", dishname);
							d.put("user_created_meal", user);
							d.put("restaurant", type + " logged");
							d.put("carbgms", carbChosen);
							d.put("fatgms", fatChosen);
							d.put("proteingms", protChosen);
							d.put("energyKcal", Double.valueOf(String.format(
									"%.0f", energyChosen)));


							if(bm!=null) {
								ByteArrayOutputStream stream = new ByteArrayOutputStream();
								bm.compress(Bitmap.CompressFormat.PNG, 100, stream);
								byte[] image = stream.toByteArray();
								dishProfilePic = new ParseFile("dish_pic.png", image);
								if (dishProfilePic != null) {
									d.put("image",dishProfilePic);
								}
							}

							// 2) save consumption date, type,dish_id, price
							//ParseObject meallog = new ParseObject("mealhistory");
                            ParseObject meallog = new MealStored();
							Double amtdouble = Double.valueOf(amt);
							meallog.put("price", amtdouble);
							meallog.put("type", type);
							meallog.put("dish_id", d);
							meallog.put("user_id", user);

//							meallog.put("energyKcal", Double.valueOf(String.format(
//									"%.0f", energyChosen)));

							String date = dateText.getText().toString().trim();
							Calendar calender = Calendar.getInstance();
							calender.setTime(new SimpleDateFormat("dd MMM yyyy")
									.parse(date));
							SimpleDateFormat sdf = new SimpleDateFormat(
									"dd/MM/yyyy");
							meallog.put("consumption_date",
									sdf.format(calender.getTime()));

							// 3) only deal with the no of snacks etc if the
							// consumption is on the day as it affects the daily
							// recommendation.
							DateFormat dateFormat = new SimpleDateFormat(
									"dd MMM yyyy");
							Calendar caldtoday = Calendar.getInstance();
							String datetoday = dateFormat.format(
									caldtoday.getTime()).toString();

							if (date.equals(datetoday)) {
								if (type.equals("meal")) {
									// user select meal
									int noOfMeal = user
											.getInt("mealNo_balance");
									Double cal = user
											.getDouble("meal_cal_balance");
									noOfMeal = noOfMeal - 1;
									user.put("mealNo_balance", noOfMeal);
									user.put("meal_cal_balance",
											(cal - energyChosen));
								} else {
									int noOfSnack = user
											.getInt("snackNo_balance");
									Double cal = user
											.getDouble("snack_cal_balance");
									user.put("snackNo_balance", noOfSnack - 1);
									user.put("snack_cal_balance", cal
											- energyChosen);
								}
								// saving all objects all at once using
								// saveallinbackground.
								List<ParseObject> parseobjlist = new ArrayList<ParseObject>();
								parseobjlist.addAll(Arrays.asList(d, meallog,
										user));
								ParseObject.saveAllInBackground(parseobjlist,
										new SaveCallback() {
											@Override
											public void done(ParseException e) {
												if (e == null) {
													Toast.makeText(
															getApplicationContext(),
															"Food logged in Calstory!",
															Toast.LENGTH_SHORT)
															.show();
													Intent intent = new Intent(
															LogFoodActivity.this,
															MainActivity.class);
													intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
													startActivity(intent);
												} else {
													Toast.makeText(
															getApplicationContext(),
															e.getMessage()
																	.toString(),
															Toast.LENGTH_LONG)
															.show();
												}
											}
										});

							} else {
								// saving all objects all at once using
								// saveallinbackground.
								List<ParseObject> parseobjlist = new ArrayList<ParseObject>();
								parseobjlist.addAll(Arrays.asList(d, meallog,
										user));
								ParseObject.saveAllInBackground(parseobjlist,
										new SaveCallback() {
											@Override
											public void done(ParseException e) {
												if (e == null) {

													Toast.makeText(
															getApplicationContext(),
															"Food logged on Calstory of "
																	+ dateText
																	.getText()
																	.toString()
																	.trim()
																	+ "!",
															Toast.LENGTH_SHORT)
															.show();
													clearCart();
													Intent intent = new Intent(
															LogFoodActivity.this,
															MainActivity.class);
													intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
													startActivity(intent);
												} else {
													Toast.makeText(
															getApplicationContext(),
															e.getMessage()
																	.toString(),
															Toast.LENGTH_LONG)
															.show();
												}
											}
										});
							}
						} catch (Exception e) {
							Log.d("Exception while saving meal history",
									e.getMessage());
						}

						progressDialog.dismiss();
					} else {

						Toast.makeText(LogFoodActivity.this,
								"Please enter valid format of price",
								Toast.LENGTH_LONG).show();
					}
				} else {
					Toast.makeText(LogFoodActivity.this,
							"Please select some ingredients", Toast.LENGTH_LONG)
							.show();
				}

			}
		});


		// WHEN CLICKED, USER CAN DELETE
		adapter_combined = new ArrayAdapter(this,
				android.R.layout.simple_list_item_1);
	lv_chosen.setOnItemClickListener(new OnItemClickListener() {

			public void onItemClick(AdapterView<?> parent, View view,
									final int position, long id) {

				// When clicked, save the dish item to the DB
				AlertDialog.Builder alert = new AlertDialog.Builder(
						LogFoodActivity.this);

				alert.setTitle("Delete?");
				alert.setMessage("Are you sure you want to delete "
						+ "?");
				alert.setCancelable(true);
				alert.setNeutralButton("Yes",
						new DialogInterface.OnClickListener() {
							public void onClick(DialogInterface dialog,int whichButton) {
								Toast.makeText(LogFoodActivity.this, "Item deleted.", Toast.LENGTH_SHORT).show();

								if (adapter_combined.getItem(position) instanceof LogFood) {

									LogFood Item_toremove = ((LogFood) adapter_combined.getItem(position));
									energyChosen = Item_toremove.getCal() - energyChosen;
									adapter_combined.remove(Item_toremove);

								} else if (adapter_combined.getItem(position) instanceof Estimate) {

									double cal_value = ((Estimate) adapter_combined.getItem(position)).getCalories() ;
									estimenergrychosen = estimenergrychosen - cal_value;
									adapter_combined.remove(adapter_combined.getItem(position));

								}
								int count;
								if (adapter_combined.isEmpty()){
									 count=adapter_combined.getCount();
								}
								else{
									 count=adapter_combined.getCount();
								}
								DecimalFormat form = new DecimalFormat("0.00");
								totalcalTextView.setText(form.format(energyChosen + estimenergrychosen) + " " + "KCAL(" + count + ")");

								Log.d("Log Food Activity", "deleted 1 item");

								if (adapter_combined.getCount() == 0) {
									clearCart();
								}
							}
						});

				alert.setNegativeButton("No",
						new DialogInterface.OnClickListener() {
							public void onClick(DialogInterface dialog,int whichButton) {
								dialog.dismiss();
							}
						});

				alert.show();
			}
		});

		user = ParseUser.getCurrentUser();
		Log.e("Size in here", "" + GlobalVar.mealList.toString());

				for (LogFood x : GlobalVar.mealList) {
					adapter_combined.add(x);  }
			//	lv_chosen.setAdapter(adapter_combined);

				for(Estimate y: GlobalVar.estimateList){
					adapter_combined.add(y);
				}
				lv_chosen.setAdapter(adapter_combined);
	}

	public void fail() {
		Toast.makeText(LogFoodActivity.this, "Please select something",
				Toast.LENGTH_SHORT).show();
	}

	public boolean isOnline() {
		ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
		NetworkInfo netInfo = cm.getActiveNetworkInfo();
		return netInfo != null && netInfo.isConnectedOrConnecting();
	}

	@Override
	public void onResume() {
		super.onResume();
		if (!logdish) {
			if (GlobalVar.logdishname != null) {
				if (!GlobalVar.logdishname.isEmpty()) {
					input.setText(GlobalVar.logdishname);
				}
			}
			if (GlobalVar.price != 0) {
				price.setText(GlobalVar.price + "");
			}
			if (GlobalVar.selectedRadioBtn != 0) {
				btn.check(GlobalVar.selectedRadioBtn);
			}
			DecimalFormat form = new DecimalFormat("0.00");
			totalcalTextView.setText(form.format(energyChosen + estimenergrychosen) + " " + "KCAL("
					+ (GlobalVar.mealList.size() + GlobalVar.estimateList.size()) + ")");

		} else {
			clearCart();
		}
		if (isOnline()) {
			ParseUser currentUser = ParseUser.getCurrentUser();
			if (currentUser == null) {
				startLoginActivity();
			}
		} else {
			AlertDialog.Builder alert = new AlertDialog.Builder(this);
			alert.setTitle("Error");
			alert.setMessage("No network connection Please try to login when there is internet connection.");
			alert.show();
			logout();

		}
	}


	private void logout() {
		// Log the user out
		ParseUser.logOut();

		// Go to the login view
		startLoginActivity();
	}

	private void startLoginActivity() {
		Intent intent = new Intent(this, Login.class);
		intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
		intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
		startActivity(intent);
	}


	@Override
	public void onPause() {
		super.onPause();
		if (!logdish) {
			if (!input.getText().equals("")) {
				GlobalVar.logdishname = input.getText().toString();
			}
			if (!price.getText().equals("")
					&& price.getText().toString().matches(priceregex)) {
				GlobalVar.price = Integer.parseInt(price.getText().toString());
			}
			GlobalVar.selectedRadioBtn = btn.getCheckedRadioButtonId();

			if (GlobalVar.totalcal != 0) {
				GlobalVar.totalcal = energyChosen;
			}
			if(GlobalVar.estimateTotalCal !=0){
				GlobalVar.estimateTotalCal = estimenergrychosen;
			}
			if (GlobalVar.mealList != null || GlobalVar.estimateList != null) {
				GlobalVar.itemNo = GlobalVar.mealList.size() + GlobalVar.estimateList.size();
			}
		} else {
			clearCart();
			energyChosen = 0;
			estimenergrychosen = 0;
		}
		//Mixpanel step 22-c
		end = Calendar.getInstance().getTimeInMillis();
		double total = (end-start)*0.001;
		try {
			JSONObject props = new JSONObject();
			props.put("Log Food", total);
			mixpanel.track("Time Spent", props);
		} catch (JSONException e) {
			Log.e("mixpanel log food time spent", "Unable to add properties to JSONObject", e);
		}
	}

	@Override
	public void onDateSet(DatePicker view, int year, int monthOfYear,
						  int dayOfMonth) {
		progressDialog = ProgressDialog.show(this, "", "Loading...", true);
		_year = year;
		_month = monthOfYear;
		_day = dayOfMonth;
		updateDisplay();
		progressDialog.dismiss();
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
			// get today's date
			DatePickerDialog dialog = new DatePickerDialog(this, this, year,
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

			DatePickerDialog dialog = new DatePickerDialog(this, this,
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


	public void clearCart() {
		GlobalVar.mealList = new ArrayList<LogFood>();
		GlobalVar.estimateList = new ArrayList<Estimate>();
		GlobalVar.logdishname = "";
		GlobalVar.price = 0;
		GlobalVar.selectedRadioBtn = 0;
		GlobalVar.totalcal = 0;
		GlobalVar.itemNo = 0;
		totalcalTextView.setText("empty cart");
		GlobalVar.estimateTotalCal=0;

		if (adapter_combined != null) {
			adapter_combined.clear();
		}

		onBackPressed();
	}


	public void dishPicUpload(View v) {
		Intent pickPhoto = new Intent(Intent.ACTION_PICK, android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
		startActivityForResult(pickPhoto, 1);
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
				dishPic.setImageBitmap(bm);
			} catch (IOException e) {
				e.printStackTrace();
			}

		} else if (resultCode == Crop.RESULT_ERROR) {
			Toast.makeText(this, Crop.getError(result).getMessage(), Toast.LENGTH_SHORT).show();
		}
	}

	//handle the picked image
	protected void onActivityResult(int requestCode, int resultCode, Intent imageReturnedIntent) {
		super.onActivityResult(requestCode, resultCode, imageReturnedIntent);
		switch(requestCode) {
			case 0:
				if(resultCode == RESULT_OK){
					Uri selectedImage = imageReturnedIntent.getData();
					beginCrop(selectedImage);
				}
				break;
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

}
