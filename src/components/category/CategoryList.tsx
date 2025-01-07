import { useEffect, useState } from 'react';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../../api/categoryApi';
import { categoryInteface, createCategoryData } from '../../types/category';
import CategoryItem from './CategoryItem';
import Loading from '../shared/Loading';
import { useNavigate, useSearchParams } from 'react-router';
import { paginationLink } from '../../types/pagination';
import Pagination from '../shared/Pagination';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import CategoryForm from './CategoryForm';
import { toast, ToastContainer } from 'react-toastify';
function CategoryList() {
    const [categories, setCategories] = useState<categoryInteface[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const [pagination, setPagination] = useState<paginationLink[]>([])
    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<categoryInteface>()
    const [categoryToDeleteId, setCategoryToDeleteId] = useState<number | undefined>();
    const [confirmModal, setConfirmModal] = useState<boolean>(false);
    const [loadingConfirmModal, setLoadingConfirmModal] = useState<boolean>(false)
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    function onCloseModal() {
        setSelectedCategory(undefined)
        setActiveModal(false)
    }

    function onCloseconfirmModal() {
        setConfirmModal(false)
    }
    function onOpenModal() {
        setActiveModal(true)
    }
    function handleSelectedCategory(id: number) {
        setSelectedCategory(categories.find((category) => category.id === id));
    }

    function changeCategoryToDeleteId(id: number) {
        setCategoryToDeleteId(id);
        setConfirmModal(true);
    }

    async function handleCreateCategory(data: createCategoryData) {
        const response = await createCategory(data);
        const category = Object.values(response)[0];
        setCategories((prevCategories) => [...prevCategories, category]);
        onCloseModal();
    }

    async function handleEditCategory(id: number, data: createCategoryData) {
        await updateCategory(id, data)
        setCategories((prevCategories) => prevCategories.map((category) => category.id === id ? { ...category, ...data } : category))
        onCloseModal();
    }

    async function handleDeleteCategory(): Promise<void> {
        try {
            setLoadingConfirmModal(true);
            if (!categoryToDeleteId) return;
            await deleteCategory(categoryToDeleteId);
            toast.success('Category successfully deleted', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryToDeleteId));
            setLoading(false);
            onCloseconfirmModal()
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Unknown error', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLoadingConfirmModal(false);
        }
    }

    useEffect(() => {
        getCategories(searchParams.get('page') ?? "1", searchParams.get('limit') ?? "10").then((data) => {
            if (data.data.length === 0) {
                navigate('/category?limit=' + searchParams.get('limit'));
            }
            setCategories([...data.data])
            setPagination(data.links);
            setLoading(false)
        }).catch(() => setLoading(false));
    }, [searchParams])
    return (
        <>
            <div className="relative overflow-x-auto w-11/12 shadow-md sm:rounded-lg sm:w-8/12 sm:m-auto">
                <Button width='w-fit' type='button' bgColor='green' text="Add New Category" handleClick={onOpenModal} />
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map((category) =>
                                <CategoryItem key={category.id} category={category} onOpenModal={onOpenModal} handleSelectedCategory={handleSelectedCategory} handleDeleteCategory={changeCategoryToDeleteId} />
                            )
                        }
                    </tbody>
                </table>
                {loading && <Loading height='h-[100px]' />}
                <Pagination pagination={pagination} limit={searchParams.get('limit') ?? "10"} />
                {
                    activeModal &&
                    <Modal closeModal={onCloseModal} title={selectedCategory ? 'Edit Category' : 'Add New Category'}>
                        <CategoryForm textBtn={selectedCategory ? 'Edit category' : 'Add new category'} editCategory={selectedCategory} handleSubmitCreateCategory={handleCreateCategory} handleSubmitEditCategory={handleEditCategory} />
                    </Modal>
                }
                {
                    confirmModal && <Modal closeModal={onCloseconfirmModal} title={'Confirmation of category deletion'}>
                        <div>
                            <p className='p-2 my-3'>Are you sure you want to delete the category?</p>
                            {
                                loadingConfirmModal ? <Loading height='h-fit' />
                                    : <Button type='button' text='Yes' bgColor='red' handleClick={handleDeleteCategory} />
                            }
                        </div>
                    </Modal >
                }
            </div >
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>

    );
}

export default CategoryList;