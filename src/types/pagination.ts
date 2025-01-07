export interface paginationLink {
    url: string;
    active: boolean;
    label?: string;
}

export interface paginationItemProps {
    to: string;
    isActive: boolean;
    path?: string;
    label?: string;
}
