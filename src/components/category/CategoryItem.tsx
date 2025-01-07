import { categoryInteface } from '../../types/category';
import DaleteButton from '../shared/DeleteButton';
import EditButton from '../shared/EditButton';
interface Props {
    category: categoryInteface,
    onOpenModal: () => void;
    handleSelectedCategory: (id: number) => void;
    handleDeleteCategory: (id: number) => void
}


function CategoryItem({ category, onOpenModal, handleSelectedCategory, handleDeleteCategory }: Props) {

    const handleEditButtonClick = (): void => {
        onOpenModal();
        handleSelectedCategory(category.id);
    };

    const handleDeleteButtonClick = async (id: number): Promise<void> => {
        handleDeleteCategory(id)
    }

    return (<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {category.name}
        </th>
        <td className="px-6 py-4">
            {category.description}
        </td>
        <td className="px-6 py-4">
            <div className="flex gap-2 font-sans h-3 items-center">
                <EditButton handleUpdate={handleEditButtonClick} />
                <DaleteButton handleDelete={() => {
                    handleDeleteButtonClick(category.id);
                }} />
            </div>
        </td>
    </tr>);
}

export default CategoryItem;