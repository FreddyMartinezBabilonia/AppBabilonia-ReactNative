export interface ListingDetail {
    data:           Data;
    execution_time: string;
}

export interface Data {
    id:                   number;
    id_realtor:           null;
    url:                  URL;
    listing_type:         string;
    property_type:        string;
    price:                number;
    maintenance_price:    number;
    m2price:              number;
    description:          string;
    area:                 number;
    built_area:           number;
    terrain_area:         number;
    year_of_construction: number;
    bedrooms_count:       number;
    bathrooms_count:      number;
    half_bathrooms_count: number;
    parking_slots_count:  null;
    parking_for_visits:   boolean;
    total_floors_count:   null;
    floor_number:         null;
    qty_env:              null;
    pet_friendly:         boolean;
    primary_image_id:     number;
    location:             Location;
    nearby:               Nearby;
    info:                 Info;
    contacts:             Contact[];
    user:                 User;
    breadcumb:            Breadcumb;
    views_count:          number;
    contacts_count:       number;
    favourites_count:     number;
    images:               Image[];
    videos:               Video[];
    objects_360:          any[];
    facilities:           AdvancedDetail[];
    advanced_details:     AdvancedDetail[];
    created_at:           Date;
    updated_at:           Date;
    ad_purchased_at:      Date;
    ad_expires_at:        Date;
    ad_plan:              string;
    state:                string;
    status:               string;
    publisher_role:       string;
    favourited:           boolean;
}

export interface AdvancedDetail {
    id:           number;
    key:          string;
    title:        string;
    icon:         StaticMap;
    icon_ios:     StaticMap;
    icon_android: StaticMap;
}

export interface StaticMap {
    url: string;
}

export interface Breadcumb {
    listing_type:  string;
    property_type: string;
    department:    string;
    province:      string;
    district:      string;
}

export interface Contact {
    name:   string;
    email:  string;
    prefix: string;
    phone:  string;
}

export interface Image {
    id:          number;
    order_image: number;
    created_at:  Date;
    photo:       Avatar;
    alt:         Alt;
}

export enum Alt {
    BabiloniaPE = "babilonia.pe",
}

export interface Avatar {
    url:     string;
    url_min: string;
}

export interface Info {
    footer:       string;
    footer_links: FooterLink[];
}

export interface FooterLink {
    title:   Title;
    options: Option[];
}

export interface Option {
    label: Title;
    link:  string;
}

export interface Title {
    en: null | string;
    es: string;
}

export interface Location {
    reference:           null;
    address_alternative: string;
    address:             string;
    district:            string;
    province:            string;
    department:          string;
    country:             string;
    longitude:           number;
    latitude:            number;
    static_map:          StaticMap;
}

export interface Nearby {
    restaurants:  Hospital[];
    parks:        Hospital[];
    transports:   Hospital[];
    stores:       Hospital[];
    supermarkets: Hospital[];
    hospitals:    Hospital[];
}

export interface Hospital {
    name:     string;
    distance: number;
}

export interface URL {
    main:  null;
    share: string;
}

export interface User {
    id:        number;
    full_name: string;
    avatar:    Avatar;
    company:   Company;
}

export interface Company {
    id:                     string;
    name:                   string;
    commercial_name:        string;
    commercial_address:     string;
    commercial_description: string;
}

export interface Video {
    content:    string;
    created_at: Date;
}
