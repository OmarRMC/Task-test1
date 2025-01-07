import { categoryInteface, createCategoryData, getCategoriesResponse } from "../types/category";

const apiUrl = import.meta.env.VITE_API_URL;

export const getCategories = async (page: string = "1", limit: string = "10") => {
    if (!localStorage.getItem("token")) throw new Error('No token available');
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/category?limit=${limit}&page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status === 401) throw new Error('No autorization')
    if (response.status !== 200) throw new Error('Error: Request failed with status ' + response.status)
    const data: getCategoriesResponse = await response.json();
    return data;
}

export const createCategory = async (categoryData: createCategoryData): Promise<categoryInteface> => {
    if (!localStorage.getItem("token")) throw new Error('No token available');
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiUrl}/category`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
    });

    if (response.status === 401) throw new Error('No authorization');
    if (response.status !== 201) throw new Error('Error: Request failed with status ' + response.status);
    const data: categoryInteface = await response.json();
    return data;
};


export const updateCategory = async (id: number, categoryData: createCategoryData): Promise<void> => {
    if (!localStorage.getItem("token")) throw new Error('No token available');
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/category/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
    });

    if (response.status === 401) throw new Error('No authorization');
    if (response.status !== 204) throw new Error('Error: Request failed with status ' + response.status);
};

export const deleteCategory = async (id: number): Promise<void> => {
    if (!localStorage.getItem("token")) throw new Error('No token available');
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/category/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
    if (response.status === 401) throw new Error('No authorization');
    if (response.status === 400) throw new Error('Cannot delete the category because it has associated tasks');
    if (response.status !== 204) throw new Error('Error: Request failed with status ' + response.status);
};
