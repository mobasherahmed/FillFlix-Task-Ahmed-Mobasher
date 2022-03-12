export interface permissions{
    Value:permission[],
    HasError:boolean
}
export interface permission{
    id: number,
    permissionName: string,
    permissionType: number,
    permissionTypeName: string
}
export interface multiSelectionDto{
    id: number,
    name: string,
}