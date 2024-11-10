import { ButtonPrimary } from "@/src/components/Buttons/ButtonPrimary"
import { InputText } from "@/src/components/Inputs/InputText"
import { ArrowRight, Eye, EyeOff, Lock, User } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/router"
import { signIn } from "next-auth/react"
import { NotificationAction } from "@/src/components/Notifications/Notification"

function LoginView() {
    const [isVisible, setIsVisible] = useState(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();

    const toggleVisibility = () => setIsVisible(!isVisible)

    function handleOnChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()

        setEmail(e.target.value)
    }

    function handleOnChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()

        setPassword(e.target.value)
    }

    async function handleOnClickLogin(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        setLoading(true)

        try {
            const res = await signIn('credentials', {
                email, password, redirect: false
            })

            if (res && res.error) {
                NotificationAction.notificationError(res.error)
            } else {
                router.push('/home')
            }
        } catch (error: any) {
            NotificationAction.notificationError(error.message)
        }

        setLoading(false)
    }

    return (
        <div className="h-screen w-full flex justify-between">
            <div className="w-3/4 flex justify-center items-center">
                <div className="w-2/4 text-center">
                    <h1 className="text-primary text-5xl mb-28">Login</h1>
                    <div className="mt-10">
                        <InputText
                            type="text"
                            variantIcon="left"
                            iconLeft={
                                <div className="me-3">
                                    <User className="text-primary" />
                                </div>
                            }
                            placeholder="Informe o seu E-mail"
                            value={email}
                            onChange={handleOnChangeEmail}
                        />
                        <InputText
                            type={isVisible ? "text" : "password"}
                            iconLeft={
                                <div className="me-3">
                                    <Lock className="text-primary" />
                                </div>
                            }
                            iconRight={
                                <button className="inline-flex focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
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
                            placeholder="Informe a sua Senha"
                            variantIcon="left-right"
                            className="mt-5"
                            onChange={handleOnChangePassword}
                            value={password}
                        />
                    </div>
                    <p className="text-end mt-5 text-md text-tint-3 font-semibold">Esqueceu a Senha?</p>
                    <ButtonPrimary className="w-full mt-5 text-lg font-light" variant="lg" variantIcon="right" icon={<ArrowRight />} onClick={handleOnClickLogin} isLoading={loading} disabled={loading}>
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