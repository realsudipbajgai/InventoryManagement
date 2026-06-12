export interface User{
    id?:number;
    name:string;
    email:string;
    phone:string;
    address:string|null;
    age:number|null;
    role:string;
    photoPath:string|null;
    photo:File|null;
}