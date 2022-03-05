import {roomResult, Search} from "../types";

export abstract class HotelApiProvider {
    constructor(protected logger = console) {
    }

    protected abstract readonly providerName: string

    // the reason that Search type hare contain array of group size because maybe some apis will support that in the future
    abstract search(search: Search): Promise<roomResult[] | undefined>[]

    onRequest(requestParams:any) {
        this.logger.log(`request to ${this.providerName} with params:`,requestParams)
    }
}
