export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Início",
      href: "/",
    },
    {
      label: "Nossa Solução",
      href: "/docs",
    },
    {
      label: "Suporte",
      href: "/pricing",
    },
    {
      label: "Contato",
      href: "/blog",
    },
  ],
  navMenuItems: [
    {
      label: "Análise de Provas",
      href: "/realtimeRecords",
    },
    {
      label: "Cadastro de Vítimas",
      href: "/registerVictims",
    }
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
}
