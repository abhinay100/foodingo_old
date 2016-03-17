package com.foodingo.activities.model;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import com.parse.ParseClassName;
import com.parse.ParseException;
import com.parse.ParseObject;
import com.parse.ParseUser;
import com.foodingo.activities.model.Dish;


//@ParseClassName("mealsintake")
@ParseClassName("mealhistory")
public class MealStored extends ParseObject {

    Dish dish;
    Dish energykcal;
    Double fat_gms;
    Double carb_gms;
    Double prot_gms;
    Dish price;
    String consumption_date;


    public MealStored(Dish dish,Dish energykcal,Double fat_gms,Double carb_gms,Double prot_gms,Dish price,String consumption_date)
    {
        super();
        this.dish = dish;
        this.energykcal = energykcal;
        this.fat_gms = fat_gms;
        this.carb_gms = carb_gms;
        this.prot_gms = prot_gms;
        this.price = price;
        this.consumption_date = consumption_date;



    }



    public MealStored() {

    }

    public Dish getDish() {
        Dish s = null;
        try {
            s = (Dish)fetchIfNeeded().get("dish_id"); //.get("dish_id");
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return s;
    }

//    public String getPrice() {
//        if (has("price")) {
//            return "SGD " + getNumber("price").toString() + " ";
//        } else {
//            return "";
//        }
//    }
public Dish getPrice() {
    Dish s = null;
    try {
        s = (Dish)fetchIfNeeded().get("price"); //.get("dish_id");
    } catch (ParseException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
    }
    return s;
}



//	public String getDish() {
//		String s = "";
//		try {
//			s = fetchIfNeeded().getString("dish");
//		} catch (ParseException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return s;
//	}
//
//	public void setDish(String dish) {
//		put("dish", dish);
//	}
//


//    public String getKCal(){
//        String s = "";
//        try {
//            s = fetchIfNeeded().getNumber("energyKcal").toString();
//        } catch (ParseException e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        }
//        return s;
//    }

    public Dish getKCall(){
        Dish s = null;
        try {
            s = (Dish)fetchIfNeeded().get("energyKcal");
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return s;
    }



//	public Dish getDish() {
//		return (Dish) get("dish_id");
//	}
//
//	public void setDish(Dish dish) {
//		put("dish_id", dish);
//	}
//
//	public void setMealNo(String mealNo) {
//		put("meal_no", mealNo);
//	}
//
//	public void setUser(ParseUser user) {
//		put("user_id", user);
//	}

    public void setConsumptionDate() {
        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        Calendar cald = Calendar.getInstance();
        String date = dateFormat.format(cald.getTime()).toString();
        put("consumption_date", date);
    }



}

