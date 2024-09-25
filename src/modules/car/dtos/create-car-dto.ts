type fuel = 'metan' | 'disel' | 'electric'

export class CreateCarDTO {
    model: string
    price: number
    fuel_type: fuel
}