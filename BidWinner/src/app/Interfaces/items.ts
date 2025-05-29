import { NzUploadFile } from "ng-zorro-antd/upload";

export interface Item {
    id: string;
    userId: string;
    bids:[{
        bid:number,
        userId: string
    }]
    image:string,
    category: string,
    itemName: string,
    itemDescription: string,
    condition: string,
    startingBid?: number  | null,
    endingDate?: Date | null,
    currentBids: number,
    bidWinner:string
};

export interface Image {
    image: File []
}

export interface Dates{
    date: Date[] | null
}