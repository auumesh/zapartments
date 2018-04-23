export class UserInfoModel {
    public EmailID: number = 0;
    public MonthlyHousehold: string = "";
    public Sentupdate: string = '';
    public Evictions: string = '';
    public Laundry: string = '';   
    public Amenities: string = ''; 
    public CommuteMethod: string = '';   
    public CommuteLength: string = '';

}

export class user_info_detail {
    public name: any;
    public phone: any;
    public monthly_income: any;
    public movein_date: any;
    public evicted: any;   
    public email: any; 
    public bedrooms: any;   
    public baths:any;
    public pets: any;
    public main_amenities: any;
    public other_features: any;
    public lease_length: any;
    public cosigner: any;
    public formatted_address: any;
    public commute_mode: any;
    public commute_max_mins: any;
    public move_location_dict=new address();
    public commute_location_dict=new address();
}
export class address {
    formatted_address: any;
    latitude: any;
    longitude: any;
    street: any;
}
export class GeocoderRequests {
    location: any;
}


export class BedsModel {
    public BedTitle: string = 'Beds';
    public Studio: string = 'Studio';
    public coulumnOne: string = '1 Bed';
    public secondColumn: string = '2 Bed';
    public ThirdCoiumn: string = '3+'
}
export class BathsModel {
    public BathTitle: string = 'Baths';
    public coulumnOne: string = '1 Bed';
    public secondColumn: string = '2 Bed';
    public ThirdCoiumn: string = '3+'
}
export class PetsModel {
    public PetTitle: string = 'Pets';
    public coulumnOne: string = 'Cats';
    public secondColumn: string = 'Dogs';
    public ThirdCoiumn: string = 'Others'
}

