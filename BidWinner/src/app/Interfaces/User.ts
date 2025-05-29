export interface User {
    userId:string;
    userName: string,
    email :string,
    userBids: [{
        itemId:string,
        bid:number,
    }],
    userAuctions: [],
    userCountry: string,
    userAddress: string
    userVerified: boolean,
    wonAuctions:[]
}

