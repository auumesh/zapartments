// =================Property model======================
export class PropertyModel {
    public property_id: string = "";
    public name: string = "";
    public description: string = "";
    public web_site: string = "";
    public property_highlights_list: any[] = [];
    public unit_highlights_list: any[] = [];
    public feature_ids_list: any[] = [];
    public icon_highlights_list: IconHighlightsList[] = new Array<IconHighlightsList>();
    public address_list: AddressList[] = new Array<AddressList>();
    public phone_list: PhoneList[] = new Array<PhoneList>();
    public email_list: EmailList[] = new Array<EmailList>();
    public leasing_dict: LeasingDict = new LeasingDict();
    public fee_dict: FeeDictForProperty = new FeeDictForProperty();
    public pet_policy_dict: PetPolicyDict = new PetPolicyDict();
    public parking_policy_dict: parking_policy_dict = new parking_policy_dict();
    public security_deposit: string = "";
    public roommate_deposit: string = "";
    public application_fee: string = "";
    public remodeling_fee: string = "";
    public administrative_fee: string = "";
    public lease_term: string = "";
    public income_requirement: string = "";
    public pet_fee: string = "";
    public num_pets_allowed: string;
    public policy_dict = []
    public services_list = [];
}

export class services_list {
    public distance_to: any;
    public Comment: any;
    public ServiceType='';
}
export class Policy_dist {
    public pet_types: any = [];
    public pet_Name: any;
    public restriction: any;
    public deposit: any;
    public fee: any;
    public pet_care: any;
    public policyName: any;
    public policyType: any;
    public Description: any;
}
export class parking_policy_dict {
    public assigned_fee: any;
    public Types: any;
    public types: any = [];
    public spaces: any;
    public space_fee: any;
    public comment: any;
    public restriction: any;
    public parking_type: any = [];
    public ParkingType:any;
}

export class LeasingDict {
    public lease_term: string = "";
    public income_requirement: string = "";
}
export class PetPolicyDict {
    public pet_fee: string = "";
    public num_pets_allowed: string ;
}
export class FeeDictForProperty {
    public security_deposit: string = "";
    public roommate_deposit: string = "";
    public application_fee: string = "";
    public remodeling_fee: string = "";
    public administrative_fee: string = "";
}
export class ParkingPolicyDict {
    public num_parking_allowed: string = "";
    public parking_fee: string = "";
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
// ===================floor plan model===============
export class FloorPlan {
    public property_id: String = "";
    public name: String = "";
    public description: String = "";
    public unit_type_description: string = "";
    public rent: string = "";
    public total_units: string = "";
    public units_available: string = "";
    public comments: string = "";
    public deposit_dict: DepositDict = new DepositDict();
    public deposit_list = [];
    public sqft_dict: ValueRange = new ValueRange();
    public market_rent_dict: ValueRange = new ValueRange();
    public effective_rent_dict: ValueRange = new ValueRange();
    public fee_dict: FeeDict = new FeeDict();
    public room_types_list: RoomTypesList[] = new Array<RoomTypesList>();
    public floor_plan_id: any;

    public edited = false;
}
export class RoomTypesList {
    public count: string = "";
    public comment: string = "";
    public room_type: string = "";
}
export class DepositDict {

    public deposit_type: string = "";
    public amount_dict: AmountDict = new AmountDict();
}
export class AmountDict {
    public amount_type: string = "";
    public value_range: ValueRange = new ValueRange();
}
export class ValueRange {
    public min: number;
    public max: number;
}
export class FeeDict {
    public prorate_type: string = "";
    public late_type: string = "";
    public late_percent: number ;
    public late_min_fee: number ;
    public late_fee_per_day: number ;
    public non_refundable_hold_fee: number ;
    public admin_fee: number ;
    public application_fee: number ;
    public broker_fee: number;
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
    public rentEffectivePrice: any;
    public rentEffectiveTerm: any;
    public rentEffectiveStartDate: any;
    public rentEffectiveEndDate: any;
    public vacateDate: any;
    public madeReadyDate: any;
}
//===============unit saved model================
export class UnitSavedModel {
    public property_id: string = "";
    public floor_plan_id: string = "";
    public unit_type: string = "";
    public bedrooms: number;
    public bathrooms: number;
    public market_rent: number;
    public economic_status: string = "";
    public occupancy_status: string = "";
    public floor_plan_name: string = "";
    public comment: string = "";
    public comments: string = "";
    public inherit_from_floorplan: boolean = true;
    public deposit_dict: DepositDict = new DepositDict();
    public deposit_list = [];
    public fee_dict: FeeDict = new FeeDict();
    public sqft_dict: ValueRange = new ValueRange();
    public effective_rent_dict: ValueRange = new ValueRange();
    public identification_dict: IdentificationDitc = new IdentificationDitc();
    public rent_pricing_list: RentPricingList[] = new Array<RentPricingList>();
    public concession_dict: ConcessionDict = new ConcessionDict();
    public availability_dict: AvailabilityDict = new AvailabilityDict();
    public feature_ids_list = [];
}
export class IdentificationDitc {
    public id_value: string = "";
    public id_type: string = "";
}
export class RentPricingList {
    public effective_rent: number ;
    public term: number ;
    public date_range: DateRange = new DateRange();
}
export class DateRange {
    public start_date: any;
    public end_date: any;
}
export class DateFormat {
    public month: string = "";
    public day: string = "";
    public year: string = "";
}
export class ConcessionDict {
    public value: number ;
    public term: string = "";
    public description_header: string = "";
    public description_body: string = "";
    public description_footer: string = "";
    public active: string = "";
}
export class AvailabilityDict {
    public vacate_date: string = "";
    public vacancy_class: string = "";
    public made_ready_date: string = "";
}
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