import { paginationLink } from "./pagination";

export interface categoryInteface {
    id: number,
    name: string,
    description: string
}

export interface getCategoriesResponse {
    data: categoryInteface[];
    links: paginationLink[];
}

export type createCategoryData = Omit<categoryInteface, 'id'>;