type SortOrderType = "ASC" | "DESC"

declare interface FilterOptionsInterface {
    table: string;
    page?: number;
    limit?: number;
    sort?: string;
    sortOrder?: SortOrderType;
    fields?: string[];
    filters?: Record<string, any>
}


export class ApiFeature {

    #_queryString: string | null = null
    #_filterOptions: FilterOptionsInterface


    constructor(tableName: string) {
        this.#_filterOptions = {
            table: tableName,
            page: 1,
            limit: 10,
            sort: "id",
            sortOrder: 'ASC',
            fields: ['*'],
            filters: {}
        };
    }


    paginate() { }

    filter() { }

    limitFields() { }

    sort() { }

    getQuery() {
        const selectedFields = this.#_filterOptions.fields.join(', ')
        const offset = this.#_filterOptions.page * this.#_filterOptions.limit - this.#_filterOptions.limit

        let filterQuery: string = Object.entries(this.#_filterOptions.filters)
        .length
        ? ' WHERE '
        : '';

        Object.entries(this.#_filterOptions.filters).forEach((fl, i, arr) => {
            if(arr.length - 1 == i) {
                filterQuery += `${fl[0]} ${fl[1]}  `;   
            }else {
                filterQuery += `${fl[0]} ${fl[1]} AND`
            }
        })

        this.#_queryString = `SELECT ${selectedFields} FROM ${this.#_filterOptions.table} 
        WHERE ${filterQuery}
        LIMIT ${this.#_filterOptions.limit} 
        OFFSET${offset}
        ORDER BY ${this.#_filterOptions.sort} ${this.#_filterOptions.sortOrder}`;

        return this.#_queryString
    }
}