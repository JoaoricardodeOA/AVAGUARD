//"use client";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
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
        <div className="flex flex-col items-start gap-3">
          <h1 className="text-large">Trazendo para as mulheres de sua empresa uma</h1>
          <h1 className="text-large text-blue-800">Proteção discreta, justiça segura.</h1>
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
          className="font-semibold text-center text-large"
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
      </div></div>
  );
}
