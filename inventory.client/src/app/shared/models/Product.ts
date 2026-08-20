import { Category } from "./Category"
export interface Product{
    id?:number,
    categoryId:number,
    name:string,
    description:string,
    serialNumber:string,
    purchaseCost:string,
    quantityInStock:number,
    purchaseDate:Date,
    status:string,
    createdAt?:Date,
    updatedAt:Date,
    category?:Category
}