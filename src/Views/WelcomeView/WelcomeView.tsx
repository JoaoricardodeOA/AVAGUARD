import { ButtonPrimary } from "@/src/components/Buttons/ButtonPrimary";
import { CustomFormInput } from "@/src/components/Inputs/CustomFormInput";
import { CustomFormTextArea } from "@/src/components/Inputs/CustomFormTextArea";
import { Navbar } from "@/src/components/navbar";
import { Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { Facebook, Instagram, Send, Youtube } from "lucide-react";
import Image from "next/image";

const logos = [
    { src: '/ung.png', alt: 'Ung', width: 145 / 1.5, height: 50 },
    { src: '/unifacimed.png', alt: 'Unifacimed', width: 156.25 / 1., height: 50 },
    { src: '/unifael.png', alt: 'Unifael', width: 106.47 / 1.5, height: 30 },
    { src: '/unijuazeiro.png', alt: 'Unijuazeiro', width: 105.07 / 1.5, height: 50 },
    { src: '/unesc.png', alt: 'Unesc', width: 170 / 1.5, height: 50 },
    { src: '/uninassau.png', alt: 'Uninassau', width: 234 / 1.5, height: 50 },
    { src: '/unama.png', alt: 'Unama', width: 170 / 1.5, height: 50 },
    { src: '/univeritas.png', alt: 'Univeritas', width: 170 / 1.5, height: 50 },
    { src: '/uninabuco.png', alt: 'Uninabuco', width: 170 / 1.5, height: 50 },
    { src: '/uninorte.png', alt: 'UniNorte', width: 170 / 1.5, height: 50 },
];

export default function WelcomeView() {
    return (
        <>
            <Navbar />
            <div >
                <div className="flex flex-row justify-between items-center pt-16 pb-16 ps-28 pe-28 gap-20 w-full bg-tint-5 rounded-lg">
                    <div className="w-4/6">
                        <h1 className="text-5xl font-semibold text-neutral-dGrey mb-2">Trazendo para as mulheres de sua empresa uma</h1>
                        <h1 className="text-primary font-semibold text-5xl" style={{ fontSize: '2rem' }}>Proteção discreta, justiça segura.</h1>
                        <p className="text-neutral-dGrey mt-2 text-xs">Respeito começa com coragem. Nós te apoiamos.</p>
                    </div>
                    <div className="flex justify-center items-center w-2/6">
                        <Image
                            src="/people.png"
                            alt="Illustration"
                            width={400}
                            height={400}
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center mt-4">
                    <div className="font-semibold text-center text-2xl text-neutral-dGrey">
                        Nossos Clientes
                    </div>
                    <div className="text-center text-xs mt-2 text-neutral-grey">
                        Veja quem está sempre na busca por apoio e justiça para as mulheres vítimas de assédio no ambiente de trabalho.
                    </div>
                    <div className="flex flex-wrap items-center justify-center w-full gap-12 mb-3 mt-5">
                        {logos.map((logo, index) => (
                            <img
                                key={index}
                                src={logo.src}
                                alt={logo.alt}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col mt-5">
                    {[
                        {
                            title: 'Provas e Ferramentas Para Realizar Denúncias',
                            description:
                                'Nossa principal missão é ajudar as vítimas a reunir provas contra os agressores de forma segura e eficaz. Oferecemos soluções inovadoras para capturar evidências discretamente, garantindo proteção e privacidade.',
                            image: '/1photo.png',
                        },
                        {
                            title: 'Criação de Ambientes de Trabalho Mais Seguros',
                            description:
                                'Trabalhamos diretamente com empresas para desenvolver políticas e ambientes que promovam o respeito e combatam qualquer forma de assédio, ajudando a construir uma cultura corporativa saudável e ética.',
                            image: '/2photo.png',
                        },
                        {
                            title: 'Assistência Jurídica Completa',
                            description:
                                'Fornecemos orientação jurídica detalhada para garantir que cada vítima conheça seus direitos. Nossos advogados estão preparados para oferecer suporte em todas as etapas do processo legal.',
                            image: '/1photo.png',
                        },
                        {
                            title: 'Apoio Psicológico Personalizado',
                            description:
                                'Oferecemos suporte emocional especializado para mulheres que sofreram assédio no ambiente de trabalho. Nossos psicólogos experientes estão prontos para ajudar na recuperação e fortalecimento da autoestima.',
                            image: '/2photo.png',
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-row mt-5 pt-5 ${index % 2 === 0 ? 'justify-start ps-12' : 'justify-end pe-12'
                                }`}
                        >
                            <Image
                                src={item.image}
                                alt="photo"
                                width="307"
                                height="301"
                            />
                            <div className="w-96 mt-3">
                                <div className="pt-5">
                                    <h1 className="text-2xl font-semibold text-neutral-dGrey" style={{ fontWeight: 'bold' }}>
                                        {item.title}
                                    </h1>
                                    <p className="text-sm text-neutral-grey pt-3 mb-3">{item.description}</p>
                                    <ButtonPrimary variantIcon="no-icon" variant="md">
                                        Descubra
                                    </ButtonPrimary>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full mt-10 flex justify-center mb-10">
                    <Card className="w-2/4 h-3/4 px-10 pt-5 pb-5">
                        <CardHeader className="flex justify-center">
                            <h4 className="mt-2 text-xl text-primary font-semibold">Entre em contato com a gente!</h4>
                        </CardHeader>
                        <CardBody className="mt-8 flex justify-center mb-4">
                            <div className="flex gap-3 w-full">
                                <CustomFormInput className="w-1/2" label="Nome" type="text" variant="md" />
                                <CustomFormInput className="w-1/2" label="Sobrenome" type="text" variant="md" />
                            </div>
                            <div className="flex gap-3 w-full mt-10">
                                <CustomFormInput className="w-1/2" label="E-mail" type="text" variant="md" />
                                <CustomFormInput className="w-1/2" label="Telefone" type="text" variant="md" />
                            </div>
                            <div className="flex justify-center mt-10 w-full">
                                <CustomFormTextArea className="w-full" label="Mensagem" variant="lg" type="text" />
                            </div>
                        </CardBody>
                        <CardFooter className="flex justify-center">
                            <ButtonPrimary className="w-3/4" variantIcon="no-icon" variant="md">
                                Enviar
                            </ButtonPrimary>
                        </CardFooter>
                    </Card>
                </div>

                <div className="px-20 py-10  mt-10 bg-dark-blue flex justify-between">
                    <div>
                        <img
                            src={"/logo_withe.png"}
                            alt="photo"
                        />
                        <p className="text-xs text-white font-light">Copyright © 2024 AVAGUARD.</p>
                        <p className="mt-3 text-xs text-white font-light">Todos os direitos reservados</p>
                        <div className="flex gap-2 mt-4">
                            <Instagram className="text-white" />
                            <Facebook className="text-white" />
                            <Youtube className="text-white" />
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div>
                            <h4 className="text-white text-lg font-semibold mb-3">Companhia</h4>
                            <p className="text-white text-xs font-light mb-1">Sobre nós</p>
                            <p className="text-white text-xs font-light mb-1">Contato</p>
                            <p className="text-white text-xs font-light mb-1">Preços</p>
                            <p className="text-white text-xs font-light mb-1">Testemunhas</p>
                        </div>
                        <div>
                            <h4 className="text-white text-lg font-semibold mb-3">Suporte</h4>
                            <p className="text-white text-xs font-light mb-1">Ajuda</p>
                            <p className="text-white text-xs font-light mb-1">Termos de Serviço</p>
                            <p className="text-white text-xs font-light mb-1">Legal</p>
                            <p className="text-white text-xs font-light mb-1">Políticas de Privacidade</p>
                        </div>
                        <div>
                            <h4 className="text-white text-lg font-semibold">Receber notícias</h4>
                            <Input
                                placeholder="Endereço de E-mail"
                                endContent={
                                    <Send />
                                }
                                type="email"
                                className="max-w-xs <opacity-40></opacity-40> text-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
