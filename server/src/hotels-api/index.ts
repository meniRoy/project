import {roomResult, Search} from "../types";
import {HotelApiProvider} from "./hotel-api-provider";
import {WeSkiProvider} from "./providers/weSkiProvider";

const providers: HotelApiProvider[] = [new WeSkiProvider()]

export const searchInAllProviders = (search: Search): Promise<roomResult[]|undefined>[] => {
    return providers.flatMap((provider) => provider.search(search))
}