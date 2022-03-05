export interface Search {
    startDate: string,
    endDate: string,
    locationId: number,
    groupSize: number[]
}

// this type don't contain all the data this is just to make my life easy
export interface roomResult {
    imageUrl: string,
    hotelName: string,
    price: number,
    rating: string,
    beds: string,
    id: string
};

interface _wsMessage {
    type: string,
    data: any,
    id: string
}
export interface clientSearch {
    startDate: string,
    endDate: string,
    locationId: number,
    groupSize: number
}
export interface wsSearchMessage extends _wsMessage {
    type: "search",
    data: { search: clientSearch }
}

// can be union type of all messages in ws
export type wsMessage = wsSearchMessage