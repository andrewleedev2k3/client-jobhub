export interface District {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    province_code: number;
    wards: [] 
}
export interface Location {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    phone_code: number;
    districts: District[]
}
