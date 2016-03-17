package com.foodingo.activities.model;

import com.parse.ParseClassName;
import com.parse.ParseObject;

/**
 * Created by Ellipsonic on 12/5/2015.
 */
@ParseClassName("emailForInvitationCode")
public class emailForInvitationCode extends ParseObject {
    public String getEmail() {
        return getString("email");
    }

    public void setEmail(String email) {
        put("email", email);
    }

    public Boolean getsentFlag() {
        return getBoolean("sentFlag");
    }

    public void setsentFlag(Boolean sentFlag) {
        put("sentFlag", sentFlag);
    }


}
