import { ButtonPrimary } from "@/src/components/Buttons/ButtonPrimary";
import { Button, Input } from "@nextui-org/react"
import { ArrowRight, Eye, EyeOff, Lock, User } from "lucide-react"
import { useState } from "react";

const classNames = {
    mainWrapper: [
        "bg-white",
        "hover:bg-white",
    ],
    label: "text-black/50 dark:text-white/90",
    input: [
        "bg-white",
        "text-black/90 dark:text-white/90",
        "placeholder:text-gray-400",
        "ps-10",
    ],
    innerWrapper: [
        "bg-transparent",
        "hover:bg-transparent",
    ],
    inputWrapper: [
        "ps-5",
        "py-8",
        "bg-white",
        "border",
        "border-gray-200",
        "rounded-full",
        "shadow-sm",
        "hover:bg-white",
        "focus:border-gray-400",
        "focus:bg-white",
    ],
}

function LoginView() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="h-screen w-full flex justify-between">
            <div className="w-3/4 flex justify-center items-center">
                <div className="w-2/4 text-center">
                    <h1 className="text-primary text-5xl mb-28">Login</h1>
                    <div className="mt-10">
                        <Input
                            type={"text"}
                            classNames={classNames}
                            startContent={
                                <div className="me-3">
                                    <User className="text-primary" />
                                </div>
                            }
                            placeholder="Informe o seu E-mail"
                        />
                        <Input
                            type={isVisible ? "text" : "password"}
                            classNames={classNames}
                            startContent={
                                <div className="me-3">
                                    <Lock className="text-primary" />
                                </div>
                            }
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                    {isVisible ? (
                                        <div className="pe-3">
                                            <EyeOff className="text-2xl pointer-events-none text-primary" />
                                        </div>
                                    ) : (
                                        <div className="pe-3">
                                            <Eye className="text-2xl pointer-events-none text-primary" />
                                        </div>
                                    )}
                                </button>
                            }
                            placeholder="Informe o seu E-mail"
                            className="mt-5"
                        />
                    </div>
                    <p className="text-end mt-5 text-md text-tint-3 font-semibold">Esqueceu a Senha?</p>
                    <ButtonPrimary className="w-full mt-5 text-lg font-light" variant="lg" variantIcon="right" icon={<ArrowRight />}>
                        Entrar
                    </ButtonPrimary>
                </div>
            </div>
            <div className="flex justify-end">
                <img src="/Frame 301.svg" />
            </div>
        </div>
    )
}

export {
    LoginView
}