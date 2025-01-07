import { paginationLink } from "../../types/pagination";
import PaginationItem from "./PaginationItem";

import { useEffect, useState } from "react";

interface Props {
    pagination: paginationLink[];
    limit: string;
}

function Pagination({ pagination, limit }: Props) {

    const [totalPages, setTotalPages] = useState<number>(0);

    const getQueryString = (url: string) => {
        if (!url) return "?limit=" + limit;
        return new URL(url).search + "&limit=" + limit;
    };
    useEffect(() => {
        setTotalPages(pagination.length);
    }, [pagination])
    return (
        <nav className="p-1">
            <ul className="flex items-center justify-end -space-x-px h-8 text-sm">
                {
                    pagination?.map((link, index) => {
                        if (index === 0) {
                            return <PaginationItem key={index} to={getQueryString(link.url)} isActive={link.active} path="M5 1 1 5l4 4" />
                        }
                        if (index === totalPages - 1) {
                            return <PaginationItem key={index} to={getQueryString(link.url)} isActive={link.active} path="m1 9 4-4-4-4" />
                        }
                        return <PaginationItem key={index} to={getQueryString(link.url)} isActive={link.active} label={link.label} />
                    }
                    )
                }
            </ul>
        </nav>
    );
}

export default Pagination;