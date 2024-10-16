import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import styles from '@/styles/homepage.module.css';

const heroSectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: 0,
  gap: '27.84px',
  position: 'relative', // Changed from absolute to relative for proper layout
  width: '100%', // Change to relative width
  height: 'auto', // Adjust based on content
};

export default function Home() {
  return (
    <div className="flex flex-col items-start p-0 gap-7">
    <div className="flex flex-row justify-between items-center pt-16 pb-16 ps-28 pe-28 gap-20 ">
      <div className="flex flex-col items-start gap-3">
        <h1>Trazendo para as mulheres de sua empresa uma Proteção discreta, justiça segura.</h1>
        <p>Respeito começa com coragem. Nós te apoiamos.</p>
      </div>
      <div className={styles.heroIllustration}>
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
