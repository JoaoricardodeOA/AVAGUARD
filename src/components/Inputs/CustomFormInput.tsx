import { Input } from "@nextui-org/input";
import { ReactNode } from "react";

interface CustomFormInputProps {
    variant: 'sm' | 'md' | 'lg',
    radius?: "none" | "sm" | "md" | "lg" | "full"
    type: string
    label: string
    className?: string
}

function CustomFormInput(props: CustomFormInputProps) {
    return (
        <div className={`text-center ${props.className}`}>
            <p className="text-xl text-neutral-dGrey font-semibold mb-3">{props.label}</p>
            <Input className="bg-white" type={props.type} size={props.variant}/>
        </div>
    );
}

export {
    CustomFormInput
}