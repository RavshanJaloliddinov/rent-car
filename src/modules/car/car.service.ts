import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PgService } from "src/pg";
import { ICreateCarRequest } from "./interfaces/create-car.interface";
import { IUpdateCarRequest } from "./interfaces/update-car.interface";
import { ApiFeature } from "src/utils";

@Injectable()
export class CarService {
    constructor(private readonly pgService: PgService) { }

    create = async (carInterface: ICreateCarRequest): Promise<any> => {
        try {
            const result = await this.pgService.fetchData(`INSERT INTO Car (model, price, fuel_type)  
            VALUES ($1, $2, $3) RETURNING *`,
                carInterface?.model,
                carInterface?.price,
                carInterface?.fuel_type,
            );

            return result[0];
        } catch (error) {
            throw new InternalServerErrorException(`Error: ${error.message}`)
        }

    }

    getAll = async (): Promise<any> => {
        try {
            const query = new ApiFeature('cars').getQuery()
            return await this.pgService.fetchData('SELECT * FROM car')
        } catch (error) {
            throw new InternalServerErrorException(`Error: ${error.message}`)
        }
    }

    update = async (id: number, carInterface: IUpdateCarRequest): Promise<any> => {
        try {
            await this.pgService.fetchData(`UPDATE Car SET model = $1, daily_price =  $2, fuel_type = $3, WHERE id = $4`,
                carInterface?.model,
                carInterface?.price,
                carInterface?.fuel_type,
                id
            )

            return {
                message: 'Car Updated successfully'
            }
        } catch (error) {
            throw new InternalServerErrorException(`Error: ${error.message}`)
        }
    }

    delete = async (id: number): Promise<any> => {
        try {
            await this.pgService.fetchData(`DELETE FROM Car WHERE id = $1`,
                id)

            return {
                message: 'Car Deleted successfully'
            }
        } catch (error) {
            throw new InternalServerErrorException(`Error: ${error.message}`)
        }
    }

}