import { getTagResponse } from "../types/tag";

const apiUrl = import.meta.env.VITE_API_URL;

export const getTags = async (page: string = "1", limit: string = "10") => {
    if (!localStorage.getItem("token")) throw new Error('No token available');
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/tag?limit=${limit}&page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status === 401) throw new Error('No autorization')
    if (response.status !== 200) throw new Error('Error: Request failed with status ' + response.status)
    const data: getTagResponse = await response.json();
    return data;
}
