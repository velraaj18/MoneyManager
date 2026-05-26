export interface Category{
    name : string,
    value : number,
    transactionType : number;
}

export interface CategoryResponse{
    categoryUID : number,
    categoryName : string,
    transactionType: number,
    description : string
}

export interface CategoryRequest{
    categoryName : string,
    transactionType : number,
    description : string
}