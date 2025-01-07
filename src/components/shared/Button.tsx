import { MouseEventHandler } from "react";

interface Props {
    type: "submit" | "reset" | "button";
    text: string;
    bgColor?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    width?: string;
}
function Button({ type, text, bgColor = "blue", handleClick, width }: Props) {
    return (
        <button onClick={handleClick} type={type} className={` ${width ?? 'w-full'} text-white bg-${bgColor}-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center    my-1 `}>
            {text}
        </button>);
}

export default Button;