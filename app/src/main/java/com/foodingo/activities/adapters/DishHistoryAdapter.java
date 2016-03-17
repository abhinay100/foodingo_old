package com.foodingo.activities.adapters;

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Filterable;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.foodingo.activities.R;
import com.foodingo.activities.helpers.UIHelper;
import com.foodingo.activities.model.Dish;
import com.parse.ParseFile;
import com.parse.ParseImageView;
import com.parse.ParseObject;

import java.util.List;


@SuppressLint("InflateParams")
public class DishHistoryAdapter extends ArrayAdapter<ParseObject> implements
		Filterable {
	private Context mContext;
	private List<ParseObject> mdishes;
	private ParseImageView dishImage;
	private ParseFile imageFile;
	private TextView dishView,distanceView;
	private TextView restView;
	// private TextView calView;
	private Dish d;
	private TextView priceView,calView;

	public DishHistoryAdapter(Context context, List<ParseObject> objects) {
		super(context, R.layout.row_dish_adapter, objects);
		this.mContext = context;
		this.mdishes = objects;
	}

	public List<ParseObject> getDishesList() {
		return mdishes;
	}

	public void clearDishesList() {
		mdishes.clear();
	}

	public View getView(int position, View convertView, ViewGroup parent) {
		if (convertView == null) {
			LayoutInflater mLayoutInflater = LayoutInflater.from(mContext);
			convertView = mLayoutInflater.inflate(R.layout.row_dish_adapter,
					null);
		}
		if (mdishes.size() > 0 && position < mdishes.size()) {
			final ParseObject mealIntake = mdishes.get(position);
			try {


				dishView = (TextView) convertView.findViewById(R.id.dishName_ROW_TV);
				restView = (TextView) convertView.findViewById(R.id.restaurant_ROW_TV);
				priceView = (TextView) convertView.findViewById(R.id.price_ROW_TV);
				calView = (TextView) convertView.findViewById(R.id.calorie_ROW_TV);
				distanceView = (TextView) convertView.findViewById(R.id.distance_ROW_TV);
				dishImage = (ParseImageView) convertView.findViewById(R.id.icon);


				dishImage.setPlaceholder(convertView.getResources()
						.getDrawable(R.drawable.placeholder_icon));


				if(mealIntake.has("dish_id")){


					if(mealIntake.getParseObject("dish_id").has("image")){
						imageFile = mealIntake.getParseObject("dish_id").getParseFile("image");
						Log.e("Image", "" + imageFile.getUrl());
						dishImage.setParseFile(imageFile);
						dishImage.loadInBackground();


					}else if(mealIntake.getParseObject("dish_id").has("imgurl")) {
						Glide.with(convertView.getContext())
								.load(mealIntake.getParseObject("dish_id").get("imgurl")).into(dishImage);
					}else {
						dishImage.setPlaceholder(convertView.getResources()
								.getDrawable(R.drawable.placeholder_icon));
					}

					UIHelper font = new UIHelper(mContext);

					dishView.setTypeface(font.bebasNeue);
					restView.setTypeface(font.bebasNeue);
					priceView.setTypeface(font.bebasNeue);
					calView.setTypeface(font.bebasNeue);
					distanceView.setTypeface(font.bebasNeue);

					dishView.setText((CharSequence) mealIntake.getParseObject("dish_id").get("dish"));
					restView.setText("at "
							+ (CharSequence) mealIntake.getParseObject("dish_id").get("restaurant"));
					priceView.setText("SGD " + mealIntake.getDouble("price"));
					calView.setText(mealIntake.getParseObject("dish_id").get("energyKcal") + "kcal");
				//	calView.setVisibility(View.GONE);
					distanceView.setVisibility(View.INVISIBLE);

				}

			} catch (Exception e) {
				Log.d("Error in retrieving dish", e.getMessage());
			}
		}
		return convertView;
	}

}
