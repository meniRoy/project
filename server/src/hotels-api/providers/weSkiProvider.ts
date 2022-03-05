import {HotelApiProvider} from "../hotel-api-provider";
import {roomResult, Search} from "../../types";
import axios from "axios";
import {WeSkiResponse} from "./weSkiProviderTypes";
import {uuid} from 'uuidv4';

const url:string = process.env.WE_SKI_URL!;


export class WeSkiProvider extends HotelApiProvider {
    readonly providerName = "weSkiExampleProvider"

    search(search: Search): Promise<roomResult[]|undefined>[] {
        this.onRequest(search);
        return search.groupSize.map(async size => {
            const response = await this.request(search.locationId, search.startDate, search.endDate, size)
            if (!response){
                return
            }
            let roomResults = this.formatResponse(response);
            return roomResults
        })
    }

    private formatResponse(weSkiResponse: WeSkiResponse): roomResult[]|undefined {
        try {
            return weSkiResponse.accommodations.map(accommodation => ({
                hotelName: accommodation.HotelName,
                rating: accommodation.HotelInfo.Rating,
                beds: accommodation.HotelInfo.Beds,
                price: parseInt(accommodation.PricesInfo.AmountAfterTax),
                imageUrl: accommodation.HotelDescriptiveContent.Images.find(image => image.MainImage === "True")?.URL!,
                // i dont want to use hotel id as the id hare because maybe another provider will return the same hotel
                // probably there is better solution for id
                id: uuid()
            }))
        } catch (e) {
            // if it was real server i would add id for each request and log this id with request params
            // then pass this id to this error log for better monitoring
            this.logger.error(`fail to convert response from ${this.providerName} response: ${JSON.stringify(weSkiResponse)}`, e)
        }


    }

    private async request(skiSite: number, startDate: string, endDate: string, groupSize: number): Promise<WeSkiResponse|undefined> {
        // if it was real server i would add hare retry probably
        try {
            const res = await axios.post(url, {
                "query": {
                    "ski_site": skiSite,
                    "from_date": startDate,
                    "to_date": endDate,
                    "group_size": groupSize
                }
            });
            return res.data.body
        } catch (e) {
            this.logger.error(`fail to make request with params ${JSON.stringify({
                skiSite,
                startDate,
                endDate,
                groupSize
            })} `, e)
        }
    }

}







