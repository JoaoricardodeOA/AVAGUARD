import { Input, Textarea } from "@nextui-org/input";

interface CustomFormTextAreaProps {
    variant: 'sm' | 'md' | 'lg',
    radius?: "none" | "sm" | "md" | "lg" | "full"
    type: string
    label: string
    className?: string
}

function CustomFormTextArea(props: CustomFormTextAreaProps) {
    return (
        <div className={`text-center ${props.className}`}>
            <p className="text-xl text-neutral-dGrey font-semibold mb-3">{props.label}</p>
            <Textarea />
        </div>
    );
}

export {
    CustomFormTextArea
}