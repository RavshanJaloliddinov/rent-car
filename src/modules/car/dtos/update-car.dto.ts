type fuel = 'metan' | 'disel' | 'electric'

export class UpdateCarDTO{
    model : string
    price : number
    fuel_type : fuel
}