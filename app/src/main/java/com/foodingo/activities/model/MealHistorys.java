package com.foodingo.activities.model;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import com.parse.ParseClassName;
import com.parse.ParseObject;
import com.parse.ParseUser;

@ParseClassName("mealsintake")
public class MealHistorys extends ParseObject{


	public MealHistorys() {

	}

	public Dish getDish() {
		return (Dish) get("dish_id");
	}

	public void setDish(Dish dish) {
		put("dish_id", dish);
	}

	public void setMealNo(String mealNo) {
		put("meal_no", mealNo);
	}

	public void setUser(ParseUser user) {
		put("user_id", user);
	}

	public void setConsumptionDate() {
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Calendar cald = Calendar.getInstance();
		String date = dateFormat.format(cald.getTime()).toString();
		put("consumption_date", date);
	}



}
