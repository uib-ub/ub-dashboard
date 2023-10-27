"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from './ui/navigation-menu'

export type MainNavProps = {
  href: string
  label: string
}

const menuItems: MainNavProps[] = [
  { href: "/persons", label: "Personer" },
  { href: "/groups", label: "Grupper" },
  { href: "/projects", label: "Prosjekt" },
  { href: "/timeline", label: "Tidslinje" },
  { href: "/software", label: "Programvare" },
  { href: "/links", label: "Lenker" },
]

export function MainNav({
  className,
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <NavigationMenu
      className={cn("flex items-center justify-start space-x-4 lg:space-x-6 overflow-x-scroll", className)}
    >
      <NavigationMenuList>
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.label}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
{/* <nav
      className={cn("flex items-center space-x-4 lg:space-x-6 overflow-x-scroll", className)}
      {...props}
    >
      <Link
        href="/persons"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Personer
      </Link>
      <Link
        href="/groups"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Grupper
      </Link>
      <Link
        href="/projects"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Prosjekt
      </Link>
      <Link
        href="/timeline"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Tidslinje
      </Link>
      <Link
        href="/software"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Programvare
      </Link>
      <Link
        href="/links"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Lenker
      </Link>
    </nav> */}