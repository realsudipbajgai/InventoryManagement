export interface Product{
    id?:number,
    categoryId:number,
    name:string,
    description:string,
    serialNumber:string,
    purchaseCost:string,
    purchaseDate:Date,
    status:string,
    createdAt?:Date,
    updatedAt:Date,
}