import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
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
    </nav>
  )
}