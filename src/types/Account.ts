export interface Account{
    name: string,
    value : number
}

export interface AccountsAPIResponse{
    accountUID : number,
    accountName : string,
    description : string 
}

export interface CreateAccountRequest {
    accountName : string
    description : string
}