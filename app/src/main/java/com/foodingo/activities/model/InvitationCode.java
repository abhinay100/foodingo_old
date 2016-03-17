package com.foodingo.activities.model;

        import com.parse.ParseClassName;
        import com.parse.ParseObject;
        import com.parse.ParseException;

/**
 * Created by Ellipsonic on 12/3/2015.
 */
@ParseClassName("invitationCode")
public class InvitationCode extends ParseObject {

    String invitationCode;

    public InvitationCode(String invitationCode){
        super();
        this.invitationCode=invitationCode;
    }
    public InvitationCode(){

    }
    public String getInvitationCode() {
        return invitationCode;
    }

    public void setInvitationCode(String invitationCode) {
        this.invitationCode = invitationCode;
    }
}
