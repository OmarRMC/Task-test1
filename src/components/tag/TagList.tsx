import { useEffect, useState } from "react";
import { getTags } from "../../api/tagApi";
import { paginationLink } from "../../types/pagination";
import { tagInterface } from "../../types/tag";
import Pagination from "../shared/Pagination";
import { useNavigate, useSearchParams } from "react-router";
import Loading from "../shared/Loading";
import TagItem from "./TagItem";

function TagList() {
    const [tags, setTags] = useState<tagInterface[]>();
    const [pagination, setPagination] = useState<paginationLink[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        getTags(searchParams.get('page') ?? "1", searchParams.get('limit') ?? "10")
            .then((data) => {
                if (data.data.length === 0) {
                    navigate('/tag?limit=' + searchParams.get('limit'));
                }
                setTags(data.data)
                setPagination(data.meta.links);
            }).catch(() => {
                setLoading(false);
            })
    }, [searchParams])
    return (<>
        <div className="flex flex-col gap-1 min-w-72">
            {
                tags?.map((tag) => <TagItem key={tag.id} tag={tag} />)
            }
        </div>
        {loading && <Loading height='h-[100px]' />}
        <Pagination pagination={pagination} limit={searchParams.get('limit') ?? "10"} />
    </>);
}

export default TagList;