export class signupmodel{
    public action:string="";
    public allow_skip:string="";
    public conversation_id:string="";
    public curated_response_dict:any={};
    public help:string="";
    public next_action:string="";
    public next_order_num:string="";
    public question_text:string="";
    public secondary_text:string="";
    public progress_pcnt=0;
 public answer_conversion:any=[];
 public response:any='';
 public response_list=[];
 public next_q:any;
 public prev_q:any; 
}


export class preferencesmodel{
    public first_name:string="";
    public last_name:string="";
    public email:string="";
    public phone:string="";
}

export class GeocoderRequests {
    location: any;
}

export class marker {
	lat: number;
	lng: number;
	label?: string;
    draggable: boolean;
    selectiondata:boolean=false;
}