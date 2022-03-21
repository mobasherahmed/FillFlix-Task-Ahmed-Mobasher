export interface buttonsGuard{
    Home?: buttons,
    Tasks?: buttons, 
    UsersList?: buttons, 
    AccessRules?: buttons,
    AddAccessRules?: buttons,
    AddUser?: buttons,
}

export interface buttons {
    Insert?: boolean,
    Update?: boolean,
    Delete?: boolean,
    Undo?: boolean,
    Approve?: boolean,
    Reject?: boolean,
    View?: boolean,
    Save?: boolean,
    Cancel?: boolean,
}