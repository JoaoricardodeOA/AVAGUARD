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
import { ArrowBigRight, ArrowRight } from "lucide-react"
import { ButtonPrimary } from "./Buttons/ButtonPrimary"
import { siteConfig } from '../config/site'
import { useRouter } from "next/router"

export const Navbar = () => {
  const router = useRouter();

  const handleClick = () => {
      router.push('/login'); // Replace with the desired route
  };
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
          {siteConfig.navItems.map((item) => (
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
          ))}
          <NavbarItem key='/test' className="">
            <ButtonPrimary variantIcon="right" variant="md" icon={<ArrowRight size={16} />} 
           onClick={handleClick}>
              Entrar
            </ButtonPrimary>
          </NavbarItem>
        </ul>

      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  )
}
