export interface distanceApi{
   rows:elements[];
}

export interface elements{
    element:distance
}
export interface distance{
    text:string,
    value:number
}