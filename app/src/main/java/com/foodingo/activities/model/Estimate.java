package com.foodingo.activities.model;

import com.parse.ParseObject;

import com.parse.ParseClassName;
import com.parse.ParseException;
/**
 * Created by admin on 02-12-2015.
 */
@ParseClassName("estimates")
public class Estimate extends ParseObject implements Cloneable {
    //
    public Double calories;
//    Double carb_gms;
//    Double carb_kcal;
//    Double carb_percent;
//    String dishgroup;
//    String examples;
//    Double Fat_gms;
//    Double Fat_kcal;
//    Double Fat_percent;
//    Double prot_gms;
//    Double prot_kcal;
//    Double prot_percent;
//    Double servingsize;
//    String servingunit;


    public Double getCalories() {

//        return getDouble("calories");
        double s = 0.0;
        try {
            s = fetchIfNeeded().getDouble("calories");
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return s;
    }

    public void setCalories(Double calories) {
        put("calories",calories);
    }
//
//    public Double getCarb_gms() {
//        return carb_gms;
//    }
//
//    public void setCarb_gms(Double carb_gms) {
//        this.carb_gms = carb_gms;
//    }
//
//    public Double getCarb_kcal() {
//        return carb_kcal;
//    }
//
//    public void setCarb_kcal(Double carb_kcal) {
//        this.carb_kcal = carb_kcal;
//    }
//
//    public String getServingunit() {
//        return servingunit;
//    }
//
//    public void setServingunit(String servingunit) {
//        this.servingunit = servingunit;
//    }
//
//    public Double getServingsize() {
//        return servingsize;
//    }
//
//    public void setServingsize(Double servingsize) {
//        this.servingsize = servingsize;
//    }
//
//    public Double getProt_percent() {
//        return prot_percent;
//    }
//
//    public void setProt_percent(Double prot_percent) {
//        this.prot_percent = prot_percent;
//    }
//
//    public Double getProt_kcal() {
//        return prot_kcal;
//    }
//
//    public void setProt_kcal(Double prot_kcal) {
//        this.prot_kcal = prot_kcal;
//    }
//
//    public Double getProt_gms() {
//        return prot_gms;
//    }
//
//    public void setProt_gms(Double prot_gms) {
//        this.prot_gms = prot_gms;
//    }
//
//    public Double getFat_percent() {
//        return Fat_percent;
//    }
//
//    public void setFat_percent(Double fat_percent) {
//        Fat_percent = fat_percent;
//    }
//
//    public Double getFat_kcal() {
//        return Fat_kcal;
//    }
//
//    public void setFat_kcal(Double fat_kcal) {
//        Fat_kcal = fat_kcal;
//    }
//
//    public Double getFat_gms() {
//        return Fat_gms;
//    }
//
//    public void setFat_gms(Double fat_gms) {
//        Fat_gms = fat_gms;
//    }

    public String getExamples() {
        // return examples;
        String s = "";
        try {
            s = fetchIfNeeded().getString("examples");
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return s;


    }

    public void setExamples(String examples) {
        //    this.examples = examples;
        put("examples",examples);
    }


    public String getDishgroup() {
        String s = "";
        try {
            s = fetchIfNeeded().getString("dishgroup");
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return s;
    }

    public String getKCal(){
        String s = "";
        try {
            s = fetchIfNeeded().getNumber("calories").toString();
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return s;
    }


    public void setDishgroup(String dishgroup) {
//        this.dishgroup = dishgroup;
        put("dishgroup",dishgroup);
    }

//    public Double getCarb_percent() {
//        return carb_percent;
//    }
//
//    public void setCarb_percent(Double carb_percent) {
//        this.carb_percent = carb_percent;
//    }

//    public Estimate(String dishgroup,String examples,Double calories)
//    {
//        this.dishgroup = dishgroup;
//        this.examples = examples;
//        this.calories = calories;
//    }

    public Estimate() {

    }




    @Override
    public String toString() {
//        return dishgroup + " (" + examples + ")"
//                + "\n" + calories+ "kcal";
        return this.getDishgroup() + " (" + this.getExamples() + ")"
                + "\n" + this.getCalories()+ "kcal";
    }

    public Object clone() throws CloneNotSupportedException {
        Object obj = super.clone();

        return obj;
    }

}