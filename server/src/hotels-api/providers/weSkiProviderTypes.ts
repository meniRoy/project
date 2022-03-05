interface Image {
    MainImage: string;
    URL: string;
}

interface HotelDescriptiveContent {
    Images: Image[];
}

interface Distance {
    type: string;
    distance: string;
}

interface Position {
    Latitude: string;
    Longitude: string;
    Distances: Distance[];
}

interface HotelInfo {
    Position: Position;
    Rating: string;
    Beds: string;
}

interface PricesInfo {
    AmountAfterTax: string;
    AmountBeforeTax: string;
}

interface Accommodation {
    HotelCode: string;
    HotelName: string;
    HotelDescriptiveContent: HotelDescriptiveContent;
    HotelInfo: HotelInfo;
    PricesInfo: PricesInfo;
}

export interface WeSkiResponse {
    accommodations: Accommodation[];
}



