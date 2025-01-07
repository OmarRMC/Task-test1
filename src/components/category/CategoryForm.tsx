import { useState } from "react";
import { categoryInteface, createCategoryData } from "../../types/category";
import Button from "../shared/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import Loading from "../shared/Loading";
import Alert from "../shared/Alert";

type Inputs = {
    name: string;
    description: string;
};

interface Props {
    editCategory?: categoryInteface | undefined;
    textBtn: string;
    handleSubmitCreateCategory?: (data: createCategoryData) => Promise<void>;
    handleSubmitEditCategory?: (id: number, data: createCategoryData) => Promise<void>;
}


function CategoryForm({ editCategory, textBtn, handleSubmitCreateCategory, handleSubmitEditCategory }: Props) {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>(undefined);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            name: editCategory?.name || '',
            description: editCategory?.description || '',
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
        setError(undefined)
        try {
            if (editCategory) {
                if (handleSubmitEditCategory) {
                    await handleSubmitEditCategory(editCategory.id, data);
                }
            } else {
                if (handleSubmitCreateCategory)
                    await handleSubmitCreateCategory(data);
            }
            setLoading(false);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("An unknown error occurred");
            }
            setLoading(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <input
                id="name"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                {...register('name', {
                    required: "Category name is required",
                    minLength: { value: 3, message: "Category name must be at least 3 characters" }
                })}
                placeholder="category"
            />
            {errors.name && <Alert bgColor="red" message={errors.name.message ?? ""} />}

            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <input
                id="description"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                {...register('description')}
                placeholder="description"
            />
            {errors.description && <Alert bgColor="red" message={errors.description.message ?? ""} />}

            {error && <Alert bgColor="red" message={error} />}

            {
                loading ?
                    <Loading height="h-fit" />
                    :
                    <Button type="submit" text={textBtn} bgColor="orange" />
            }
        </form>
    );
}

export default CategoryForm;
