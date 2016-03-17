package com.foodingo.activities.adapters;

import java.util.List;

import android.annotation.SuppressLint;
import android.content.Context;
import android.location.Location;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.foodingo.activities.R.drawable;
import com.foodingo.activities.R.id;
import com.foodingo.activities.R.layout;
import com.foodingo.activities.helpers.UIHelper;
import com.foodingo.activities.model.Dish;
import com.parse.FindCallback;
import com.parse.ParseException;
import com.parse.ParseFile;
import com.parse.ParseGeoPoint;
import com.parse.ParseImageView;
import com.parse.ParseQuery;
import com.parse.ParseQuery.CachePolicy;


@SuppressLint("InflateParams")
public class DishAdapter extends ArrayAdapter<Dish> implements Filterable {
	private Context mContext;
	private List<Dish> mdishes;
	// private Filter dishFilter;
	private ParseImageView dishImage;
	private ParseFile imageFile;
	private TextView dishView;
	private TextView restView;
	private TextView distanceView;
	private TextView priceView,calView;
	private Location userLocation = new Location("");
	ImageView halalIV,vegIV,seafoodIV;

	public DishAdapter(Context context, List<Dish> objects) {
		super(context, layout.row_dish_adapter, objects);
		this.mContext = context;
		this.mdishes = objects;
	}

	public void setLocation(double lat, double longitude) {
		userLocation.setLatitude(lat);
		userLocation.setLongitude(longitude);

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
			convertView = mLayoutInflater.inflate(layout.row_dish_adapter,
					null);
		}
		if (mdishes.size() > 0 && position < mdishes.size()) {
			final Dish d = mdishes.get(position);

			dishView = (TextView) convertView.findViewById(id.dishName_ROW_TV);
			restView = (TextView) convertView.findViewById(id.restaurant_ROW_TV);
			distanceView = (TextView) convertView.findViewById(id.distance_ROW_TV);
			distanceView.setCompoundDrawablesWithIntrinsicBounds(drawable.dist, 0, 0, 0);
			priceView = (TextView) convertView.findViewById(id.price_ROW_TV);
			calView = (TextView) convertView.findViewById(id.calorie_ROW_TV);
			halalIV = (ImageView) convertView.findViewById(id.halal_ROW_IV);
			vegIV = (ImageView) convertView.findViewById(id.veg_ROW_IV);
			seafoodIV = (ImageView) convertView.findViewById(id.seafood_ROW_IV);

			ParseGeoPoint dishLocation = (ParseGeoPoint) d.get("location");

			Location loc2 = new Location("");
			if (dishLocation != null && userLocation.getLongitude() != 0.0) {
				loc2.setLatitude(dishLocation.getLatitude());
				loc2.setLongitude(dishLocation.getLongitude());
				distanceView.setText(String.format("%.0f",
						userLocation.distanceTo(loc2))
						+ " meters");
			} else {
				distanceView.setText("");
				distanceView.setCompoundDrawablesWithIntrinsicBounds(0, 0, 0, 0);
			}
			dishImage = (ParseImageView) convertView.findViewById(id.icon);
			dishImage.setPlaceholder(convertView.getResources().getDrawable(drawable.placeholder_icon));
			Glide.with(convertView.getContext()).load(d.getImageUrl()).into(dishImage);

			UIHelper font = new UIHelper(mContext);

			dishView.setTypeface(font.bebasNeue);
			restView.setTypeface(font.bebasNeue);
			priceView.setTypeface(font.bebasNeue);
			calView.setTypeface(font.bebasNeue);
			distanceView.setTypeface(font.bebasNeue);


			dishView.setText(d.getDish());
			restView.setText("at " + d.getRestaurant());
			priceView.setText(d.getFoodDetails());
			calView.setText(d.getKCal() + " kcal");

			if(d.isHalal()){
				halalIV.setVisibility(View.VISIBLE);
			}
			if(d.isSeafood()){
				seafoodIV.setVisibility(View.VISIBLE);
			}
			if(d.isVeg()){
				vegIV.setVisibility(View.VISIBLE);
			}
		}
		return convertView;
	}

	/*
	 * @Override public Filter getFilter() { if (dishFilter == null) dishFilter
	 * = new DishFilter();
	 * 
	 * return dishFilter; }
	 */

	private class DishFilter extends Filter {
		@Override
		protected FilterResults performFiltering(CharSequence constraint) {
			FilterResults results = new FilterResults();
			// We implement here the filter logic
			if (constraint == null || constraint.length() == 0) {
				// No filter implemented we return all the list
				results.values = mdishes;
				results.count = mdishes.size();

			} else {
				// We perform filtering operation
				// List<Dish> nDishList = new ArrayList<Dish>();
				/*
				 * for (Dish a : mdishes) { if
				 * (a.getDish().startsWith(constraint.toString()))
				 * nDishList.add(a); }
				 */
				ParseQuery<Dish> query = ParseQuery.getQuery(Dish.class);
				query.setCachePolicy(CachePolicy.CACHE_THEN_NETWORK);
				query.whereContains("dish", constraint.toString());
				query.findInBackground(new FindCallback<Dish>() {
					@Override
					public void done(List<Dish> dishes, ParseException error) {
						if (dishes != null) {
							mdishes.clear();
							for (int i = 0; i < dishes.size(); i++) {
								mdishes.add(dishes.get(i));
							}
						}
					}
				});
				results.values = mdishes;
				results.count = mdishes.size();
			}
			return results;
		}

		@Override
		protected void publishResults(CharSequence constraint,
				FilterResults results) {
			// TODO Auto-generated method stub
			// Now we have to inform the adapter about the new list filtered
			if (results.count == 0)
				notifyDataSetInvalidated();
			else {
				mdishes = (List<Dish>) results.values;
				notifyDataSetChanged();
			}

		}
	}

	public void resetData() {
		// TODO Auto-generated method stub
		mdishes = mdishes;
	}
}
