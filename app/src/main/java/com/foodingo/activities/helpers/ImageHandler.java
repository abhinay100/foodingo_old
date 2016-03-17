package com.foodingo.activities.helpers;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * Created by shaik on 13/5/15.
 */
public class ImageHandler
{
    public static boolean store(Bitmap image, String fileName, Context context, String path)
    {
        try
        {
            File dir = new File(context.getFilesDir()+path);
            if (!dir.exists())
            {
                dir.mkdirs();
            }
            OutputStream fOut = null;
            File file = new File(context.getFilesDir()+path, fileName+".png");
            fOut = new FileOutputStream(file);
            image.compress(Bitmap.CompressFormat.PNG, 80, fOut); // saving the Bitmap to a file compressed as a JPEG with 85% compression rate
            fOut.flush();
            fOut.close();

            //MediaStore.Images.Media.insertImage(getContentResolver(),file.getAbsolutePath(),file.getName(),file.getName());

            return true;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return false;
        }
    }

    public static Bitmap fetch(String fileName, Context context)
    {
        try
        {
            InputStream fin = null;
            File file = new File(context.getFilesDir(), fileName+".png");
            fin = new FileInputStream(file);
            Bitmap bmp =  BitmapFactory.decodeStream(fin);
            fin.close();
            return bmp;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return null;
        }
    }



    public static String storeInGallery(Bitmap image, String fileName, Context context, String description)
    {
        try
        {
            return MediaStore.Images.Media.insertImage(context.getContentResolver(), image, fileName , description);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return null;
        }
    }

    public static Bitmap getFromGallery(String path, Context context)
    {
        try
        {
            Uri uri = Uri.parse(path);
            return MediaStore.Images.Media.getBitmap(context.getContentResolver(), uri);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return null;
        }
    }

    public static Boolean storeInExternal(Bitmap image, String fileName, Context context, String path)
    {
        try
        {
            String root = Environment.getExternalStorageDirectory().toString();
            File dir = new File(root+ path);
            if (!dir.exists())
            {
                dir.mkdirs();
            }
            OutputStream fOut = null;
            File file = new File(root+ path, fileName+".png");
            fOut = new FileOutputStream(file);
            image.compress(Bitmap.CompressFormat.PNG, 80, fOut); // saving the Bitmap to a file compressed as a JPEG with 85% compression rate
            fOut.flush();
            fOut.close();
            return true;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return false;
        }
    }

    public static Bitmap fetchFromExternal(String fileName, Context context, String path)
    {
        try
        {
            InputStream fin = null;
            File file = new File(Environment.getExternalStorageDirectory().toString() + path, fileName+".png");
            fin = new FileInputStream(file);
            Bitmap bmp =  BitmapFactory.decodeStream(fin);
            fin.close();
            return bmp;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return null;
        }
    }
}
