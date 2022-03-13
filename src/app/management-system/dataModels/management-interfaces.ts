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
export interface createRoleAndItsPermissionsRequestDto{
    name: string,
    roleId: number,
    permissionId: number[]
}
export interface Rules {
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
    permissions: permission[]
  }