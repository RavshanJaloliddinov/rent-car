type fuel_type = 'metan' | 'disel' | 'electric'

export declare interface  ICreateCarRequest {
    model : string,
    price : number,
    fuel_type : fuel_type,
}