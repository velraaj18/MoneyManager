export interface Category{
    name : string,
    value : number
}

export interface CategoryResponse{
    categoryUID : number,
    categoryName : string,
    description : string
}

export interface CategoryRequest{
    categoryName : string,
    description : string
}