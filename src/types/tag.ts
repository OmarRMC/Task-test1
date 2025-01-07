import { paginationLink } from "./pagination";

export interface tagInterface {
    id: number;
    name: string;
}
export interface getTagResponse {
    data: tagInterface[];
    meta: {
        links: paginationLink[]
    };
}