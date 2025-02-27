export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    sellerId: string;
    rating: number;
    stockQuantity: number;
    isActive: boolean;
    createdAt: string;
    updatedAt?: string;
    salesCount: number;
}
export interface IProductFilter {
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sellerId?: string;
    isActive?: boolean;
    page: number;
    pageSize: number;
}

export interface IPagedResult<T> {
    items: IProduct[];
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}