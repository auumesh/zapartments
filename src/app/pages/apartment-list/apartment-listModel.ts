// =================Property model======================
export class PropertyListModel {
    public search_text: string = "";
    public data_source: string = "";
    public city: string = "";
    public state: string = "";
    public management_id: string = "";
    public is_active: boolean = true;
    public page_size: number = 10;
    public bedroom_from: number = 0;
    public bedroom_to: number = 0;
    public rent_from: number = 0;
    public rent_to: number = 0;
}


export class TempDDL{
    public label:string="";
    public value:string="";
}

