import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import styles from '@/styles/homepage.module.css';


export default function Home() {
  return (
    <div className="flex flex-col items-start p-0 gap-7 w-full bg-blue-100">
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
  );
}
