"use client";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { Card,CardHeader,CardBody } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import Image from "next/image";
//import { Card, Text } from '@nextui-org/react';


import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import styles from '@/styles/homepage.module.css';

const logos = [
  { src: '/static/ung.png', alt: 'Ung', width: 145/1.5, height: 50 },
  { src: '/static/unifacimed.png', alt: 'Unifacimed', width: 156.25/1., height: 50 },
  { src: '/static/unifael.png', alt: 'Unifael', width: 106.47/1.5, height: 30 },
  { src: '/static/unijuazeiro.png', alt: 'Unijuazeiro', width: 105.07/1.5, height: 50 },
  { src: '/static/unesc.png', alt: 'Unesc', width: 170/1.5, height: 50 },
  { src: '/static/uninassau.png', alt: 'Uninassau', width: 234/1.5, height: 50 },
  { src: '/static/unama.png', alt: 'Unama', width: 170/1.5, height: 50 },
  { src: '/static/univeritas.png', alt: 'Univeritas', width: 170/1.5, height: 50 },
];

export default function Home() {
  return (
    <div className="flex flex-col"><div className="flex flex-col items-start p-0 gap-7 w-full bg-blue-100">
      <div className="flex flex-row justify-between items-center pt-16 pb-16 ps-28 pe-28 gap-20 w-full">
        <div className="flex flex-col items-start gap-3 w-4/6">
          <h1  style={{ fontSize: '2rem'}}>Trazendo para as mulheres de sua empresa uma</h1>
          <h1 className=" text-blue-800" style={{ fontSize: '2rem'}}>Proteção discreta, justiça segura.</h1>
          <p className="text-small">Respeito começa com coragem. Nós te apoiamos.</p>
        </div>
        <div className="w-72">
          <Image
            src="/static/people.png"
            alt="Illustration"
            width={454} // Adjust as necessary
            height={414} // Adjust as necessary
          />
        </div>
      </div>
    </div>
    <div className="flex flex-col items-center mt-3">
        <div
          className="font-semibold text-center"
          style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
        >
          Nossos Clientes
        </div>
        <div
          className="text-center text-small"
        >
          Veja quem está sempre na busca por apoio e justiça para as mulheres vítimas de assédio no ambiente de trabalho.
        </div>
        <div className="flex items-center justify-center w-full gap-12 mb-3">
          {logos.map((logo, index) => (
            <Image
            key={index}
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}            
          />
          ))}
        </div>
      </div>
      <div className="flex flex-row mt-5 ms-5 pt-5">
      <Image
            src='/static/1photo.png'
            alt='photo'
            width='307'
            height='301'            
          />
      <div className="w-96">
      <div className="pt-5">
        <div className="">
          <h1 className="text-large" style={{ fontWeight: 'bold' }}>Provas e Ferramentas Para Realizar Denúncias</h1>
          <p className="pt-3">
          Nossa principal missão é ajudar as vítimas a reunir provas contra os agressores de forma segura e eficaz. 
          Oferecemos soluções inovadoras para capturar evidências discretamente, garantindo proteção e privacidade.
          </p>
        </div>
        <Button color="primary" className="mt-3">
                  Descubra
                </Button>
      </div>
    </div>
    
    </div>

    <div className="w-full flex flex-row ms-96">
    <div className="flex flex-row mt-5 ms-32 pt-5">
      <Image
            src='/static/2photo.png'
            alt='photo'
            width='307'
            height='301'            
          />
      <div className="w-96">
      <div className="pt-5">
        <div className="">
          <h1 className="text-large " style={{ fontWeight: 'bold' }}>Criação de Ambientes de Trabalho Mais Seguros</h1>
          <p className="pt-3">
          Trabalhamos diretamente com empresas para desenvolver políticas e ambientes que promovam o respeito e 
          combatam qualquer forma de assédio, ajudando a construir uma cultura corporativa saudável e ética.
          </p>
        </div>
        <Button color="primary" className="mt-3">
                  Descubra
                </Button>
      </div>
    </div>
    
    </div>
    </div>
    <div className="flex flex-row mt-5 ms-5 pt-5">
      <Image
            src='/static/1photo.png'
            alt='photo'
            width='307'
            height='301'            
          />
      <div className="w-96">
      <div className="pt-5">
        <div className="">
          <h1 className="text-large" style={{ fontWeight: 'bold' }}>Assistência Jurídica Completa</h1>
          <p className="pt-3">
          Fornecemos orientação jurídica detalhada para garantir que cada vítima conheça seus direitos. 
          Nossos advogados estão preparados para oferecer suporte em todas as etapas do processo legal.
          </p>
        </div>
        <Button color="primary" className="mt-3">
                  Descubra
                </Button>
      </div>
    </div>
    
    </div>

    <div className="w-full flex flex-row ms-96">
    <div className="flex flex-row mt-5 ms-32 pt-5">
      <Image
            src='/static/2photo.png'
            alt='photo'
            width='307'
            height='301'            
          />
      <div className="w-96">
      <div className="pt-5">
        <div className="">
          <h1 className="text-large " style={{ fontWeight: 'bold' }}>Apoio Psicológico Personalizado</h1>
          <p className="pt-3">
          Oferecemos suporte emocional especializado para mulheres que sofreram assédio no ambiente de trabalho. 
          Nossos psicólogos experientes estão prontos para ajudar na recuperação e fortalecimento da autoestima.
          </p>
        </div>
        <Button color="primary" className="mt-3">
                  Descubra
                </Button>
      </div>
    </div>
    
    </div>
    </div>
    

    <div className="w-full flex justify-center">
    <Card className="py-4 mt-5 w-96">
      <CardHeader className="pb-0 pt-2 px-4 flex-col text-center">
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        
      </CardBody>
    </Card>
    </div>
    
    </div>

  );
}
