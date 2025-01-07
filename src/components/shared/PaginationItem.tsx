import { Link } from 'react-router';
import { paginationItemProps } from '../../types/pagination';

function PaginationItem({ to, isActive = false, path, label }: paginationItemProps) {
    return (
        <li>
            <Link
                to={to}
                className={`flex items-center justify-center px-3 h-8 leading-tight ${isActive
                    ? 'z-10 text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    }`}
            >
                {label ?? (
                    path &&
                    <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path} />
                    </svg>
                )}
            </Link>
        </li>
    );
}

export default PaginationItem;
