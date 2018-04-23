export class system_creds_list {
    public system: string = "";
    public url: string = "";
    public client_key_id: string = "";
    public client_secret: string = "";
    public account_info_dict = new account_info_dict();
}
export class account_info_dict {
    public UserName: string = "";
    public Password: string = "";
    public ServerName: string = "";
    public Database: string = "";
    public Platform: string = "";
}
export class CompanyModel {
    public company_id: string = "";
    public name: string = "";
    public description: string = "";
    public web_site: string = "";
    public address_list: AddressList[] = new Array<AddressList>();
    public phone_list: PhoneList[] = new Array<PhoneList>();
    public email_list: EmailList[] = new Array<EmailList>();
    public system_creds_list=[];
    public management_id='';
}
export class PhoneList {
    public type: string = "";
    public phone: string = "";
}
export class EmailList {
    public type: string = "";
    public email: string = "";
}
export class IconHighlightsList {
    public text: string = "";
    public popup_text: string = "";
    public icon_image: string = "";
}
export class AddressList {
    public type: string = "location";
    public address: string = "";
}

//========================save dummy model===================
export class saveModel {
    public action: string = "";
    public payload: any;
}
//=====================common variable declaration===============
export class CommonVariable {
    public emailType: string = "";
    public email: string = "";
    public phoneType: string = "";
    public phone: string = "";

}
