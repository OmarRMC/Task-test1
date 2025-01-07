interface Props {
    bgColor: string;
    message: string;
}
function Alert({ bgColor = "red", message }: Props) {
    return (
        <div className={`p-4 mb-4 text-sm  text-${bgColor}-800 rounded-lg bg-${bgColor}-50 dark:bg-gray-800 dark:text-${bgColor}-400`} role="alert">
            <span className="font-medium">{message}</span>
        </div>
    );
}

export default Alert;