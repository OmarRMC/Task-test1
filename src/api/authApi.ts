const apiUrl = import.meta.env.VITE_API_URL;

export const getUserFromToken = async () => {
    if (!localStorage.getItem("token")) throw new Error('No token available');
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status !== 200) throw new Error('No autorization')
    const data = await response.json();
    return data;
}
