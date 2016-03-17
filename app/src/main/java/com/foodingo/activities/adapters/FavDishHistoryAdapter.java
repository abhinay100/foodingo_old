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
public class FavDishHistoryAdapter extends ArrayAdapter<Dish> implements
        Filterable {
    private Context mContext;
    private List<Dish> mdishes;
    private ParseImageView dishImage;
    private ParseFile imageFile;
    private TextView dishView,distanceView;
    private TextView restView;
    // private TextView calView;
    private Dish d;
    private TextView priceView,calView;

    public FavDishHistoryAdapter(Context context, List<Dish> objects) {
        super(context, R.layout.row_dish_adapter, objects);
        this.mContext = context;
        this.mdishes = objects;
    }

    public List<Dish> getDishesList() {
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
//

                dishView = (TextView) convertView.findViewById(R.id.dishName_ROW_TV);
                restView = (TextView) convertView.findViewById(R.id.restaurant_ROW_TV);
                priceView = (TextView) convertView.findViewById(R.id.price_ROW_TV);
                calView = (TextView) convertView.findViewById(R.id.calorie_ROW_TV);
                distanceView = (TextView) convertView.findViewById(R.id.distance_ROW_TV);
                dishImage = (ParseImageView) convertView.findViewById(R.id.icon);


                dishImage.setPlaceholder(convertView.getResources()
                        .getDrawable(R.drawable.placeholder_icon));

                if(mealIntake.has("dish")){

                    if(mealIntake.has("image")){
                        imageFile = mealIntake.getParseFile("image");
                        Log.e("Image",""+imageFile.getUrl());
                        dishImage.setParseFile(imageFile);
                        dishImage.loadInBackground();

                    }else if(mealIntake.has("imgurl")) {
                        Glide.with(convertView.getContext())
                                .load(mealIntake.get("imgurl")).into(dishImage);
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

                    dishView.setText((CharSequence) mealIntake.get("dish"));
                    calView.setText(mealIntake.getDouble("energyKcal") + "KCAL");
                    priceView.setText("SGD " + mealIntake.getDouble("price"));

                  //  calView.setVisibility(View.GONE);
                    restView.setVisibility(View.INVISIBLE);
                    distanceView.setVisibility(View.INVISIBLE);

                }


            } catch (Exception e) {
                Log.d("Error in retrieving dish", e.getMessage());
            }
        }
        return convertView;
    }

}
