package com.foodingo.activities.model;


public class LogFood implements Cloneable{
	String type;// meal, snack
	String dish;
	Double price;
	Double cal;
	Double fat;//in gms
	Double protein;//in gms
	Double carb;//in gms
	String brand_name;
	
	public String getBrand_name() {
		return brand_name;
	}
	public void setBrand_name(String brand_name) {
		this.brand_name = brand_name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getDish() {
		return dish;
	}
	public void setDish(String dish) {
		this.dish = dish;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public Double getFat() {
		return fat;
	}
	public void setFat(Double fat) {
		this.fat = fat;
	}
	public Double getProtein() {
		return protein;
	}
	public void setProtein(Double protein) {
		this.protein = protein;
	}
	public Double getCal() {
		return cal;
	}
	public void setCal(Double cal) {
		this.cal = cal;
	}
	public LogFood(String dish,String brandname, Double cal, Double fat, Double protein,
			Double carb) {
		super();
		this.brand_name = brandname;
		this.cal = cal;
		this.dish = dish;
		this.fat = fat;
		this.protein = protein;
		this.carb = carb;
	}
	public Double getCarb() {
		return carb;
	}
	public void setCarb(Double carb) {
		this.carb = carb;
	}
	@Override
	public String toString() {
		return dish + " (" + brand_name + ")"
							+ "\n" + cal+ "kcal";
	}
	public Object clone() throws CloneNotSupportedException {
		Object obj = super.clone();

		return obj;
	}

}
