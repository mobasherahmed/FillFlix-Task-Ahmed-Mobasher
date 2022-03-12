export interface permissions{
    Value:permission[]
}
export interface permission{
    name:string,
    id:number
}

export interface UserDtoRequest{
    email:string,
    password:string
}
export interface RegisterUserDtoRequest{
    name:string,
    phoneNumber: string,
    email: string,
    password:string
}