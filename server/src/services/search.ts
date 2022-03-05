import {clientSearch, roomResult, Search} from "../types";
import { searchInAllProviders} from "../hotels-api";

export const searchHotels = (search: clientSearch): Promise<roomResult[]|undefined>[] => {
    return searchInAllProviders({...search, groupSize:[search.groupSize,search.groupSize+1,search.groupSize+2]})
}