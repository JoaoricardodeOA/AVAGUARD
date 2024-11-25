import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar"
import { Button } from "@nextui-org/button"
import { Link } from "@nextui-org/link"
import { link as linkStyles } from "@nextui-org/theme"
import NextLink from "next/link"
import clsx from "clsx"
import { ArrowBigRight, ArrowLeft, ArrowRight } from "lucide-react"
import { ButtonPrimary } from "./Buttons/ButtonPrimary"
import { siteConfig } from '../config/site'
import { useRouter } from "next/router"
import { useSession, signOut } from 'next-auth/react'

export const Navbar = () => {
  const router = useRouter()
  const { data: session } = useSession() // Obtém a sessão atual

  console.log(session)

  const handleClick = () => {
    router.push('/login') // Replace with the desired route
  }

  return (
    <NextUINavbar maxWidth="xl" position="sticky" >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <img src="/logo.png"></img>
          </NextLink>
        </NavbarBrand>

      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full "
        justify="end"
      >
        <ul className="hidden lg:flex gap-4 justify-start ml-2 items-center">
          {
            session?.user ? (
              siteConfig.navMenuItems.map((item) => (
                <NavbarItem key={item.href}>
                  <NextLink
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary data-[active=true]:font-medium",
                    )}
                    color="foreground"
                    href={item.href}

                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              ))
            ) : (
              siteConfig.navItems.map((item) => (
                <NavbarItem key={item.href}>
                  <NextLink
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary data-[active=true]:font-medium",
                    )}
                    color="foreground"
                    href={item.href}

                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              ))
            )
          }

          {
            router.pathname === '/home' ? (
              <NavbarItem key='/test' className="">
                <ButtonPrimary variantIcon="right" variant="md" icon={<ArrowRight size={16} />}
                  onClick={() => signOut()}>
                  Sair
                </ButtonPrimary>
              </NavbarItem>
            ) : router.pathname !== '/home' ? (
              <NavbarItem key='/test' className="">
                <ButtonPrimary variantIcon="left" variant="md" icon={<ArrowLeft size={16} />}
                  onClick={() => router.back()}>
                  Voltar
                </ButtonPrimary>
              </NavbarItem>
            ) : (
              <NavbarItem key='/test' className="">
                <ButtonPrimary variantIcon="right" variant="md" icon={<ArrowRight size={16} />}
                  onClick={handleClick}>
                  Entrar
                </ButtonPrimary>
              </NavbarItem>
            )
          }
        </ul>
      </NavbarContent>
    </NextUINavbar>
  )
}
