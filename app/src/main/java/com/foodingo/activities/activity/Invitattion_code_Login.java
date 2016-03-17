package com.foodingo.activities.activity;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.content.IntentCompat;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.foodingo.activities.R;
import com.foodingo.activities.model.InvitationCode;
import com.foodingo.activities.model.emailForInvitationCode;
import com.foodingo.activities.model.OnBoardUser;
import com.parse.FindCallback;
import com.parse.ParseException;
import com.parse.ParseQuery;
import com.parse.ParseUser;

import java.util.List;

/**
 * Created by Ellipsonic on 12/3/2015.
 */
public class Invitattion_code_Login extends AppCompatActivity {
    public static OnBoardUser onBoardUser;
    private Button validate, joinTheQueue;
    private EditText invitation_Code;
    private boolean clicked = false;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        onBoardUser = Login.onBoardUser;
        setContentView(R.layout.fragment_invitation);

        validate = (Button) findViewById(R.id.validateBtn);
        joinTheQueue = (Button) findViewById(R.id.joinque);
        invitation_Code = (EditText) findViewById(R.id.invitation_code);


        validate.setOnClickListener(myhandler1);
        joinTheQueue.setOnClickListener(myhandler2);

    }

    ParseUser user = ParseUser.getCurrentUser();
    View.OnClickListener myhandler1 = new View.OnClickListener() {

        public void onClick(View v) {
        //    Toast.makeText(getApplicationContext(), "validate button clicked", Toast.LENGTH_SHORT).show();
            final String invitaion_Code = invitation_Code.getText().toString().trim();
            if (invitaion_Code != null) {
                ParseQuery<InvitationCode> query = ParseQuery.getQuery("invitationCode");
                query.whereEqualTo("invitationCode", invitaion_Code);
                query.findInBackground(new FindCallback<InvitationCode>() {
                    public void done(List<InvitationCode> objects, ParseException e) {
                        if (e == null) {
                            if (objects.size() != 0) {
//                                Toast.makeText(getApplicationContext(), "ParseKey is present", Toast.LENGTH_SHORT).show();

                                if (user == null) {
                                    onBoardUser.setInvitationCode(objects.get(0));
                                } else {
                                    user.put("invitationCode", objects.get(0));
                                    onBoardUser.setInvitationCode(objects.get(0));
                                }

                                Intent intent = new Intent(Invitattion_code_Login.this, PersonalDetails.class);
                                startActivity(intent);
                                finish();
                            } else {
                                Toast.makeText(getApplicationContext(), "Invalid code.Please join the queue to get invitation code.", Toast.LENGTH_SHORT).show();
                            }
                        } else {
//                            Toast.makeText(getApplicationContext(), "ParseKey is not present", Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            }
        }
    };
    View.OnClickListener myhandler2 = new View.OnClickListener() {
        public void onClick(View v) {
            String eMailEntered = onBoardUser.getEmail();
            ParseQuery<emailForInvitationCode> query = ParseQuery.getQuery("emailForInvitationCode");
            query.whereEqualTo("email", eMailEntered);
            query.findInBackground(new FindCallback<emailForInvitationCode>() {
                public void done(List<emailForInvitationCode> objects, ParseException e) {
                    if (e == null) {
                        emailForInvitationCode emailForInvitationCode = new emailForInvitationCode();
                        if (objects.size() == 0) {
                            emailForInvitationCode.setEmail(onBoardUser.getEmail());
                            emailForInvitationCode.setsentFlag(true);
                            emailForInvitationCode.saveInBackground();
                            Toast.makeText(getApplicationContext(), "successfully joined", Toast.LENGTH_SHORT).show();
                        } else {
                            //toast message
                            Toast.makeText(getApplicationContext(), "already joined", Toast.LENGTH_SHORT).show();



                        }


                    }

                }


            });
        }


    };

    public void onBackPressed() {
        if (clicked) {
            finishAffinity();
            clicked=false;

        } else {
            Toast.makeText(Invitattion_code_Login.this, "Tap again to Exit", Toast.LENGTH_SHORT).show();
            clicked = true;
        }
    }
}
