"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/install", label: "Install" },
  { href: "/try", label: "Try Demo" },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="font-mono text-lg font-bold tracking-tight text-foreground">
          RICO<span className="text-primary">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-mono text-xs uppercase tracking-wider transition-colors",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <Link 
            href="/scan" 
            className="hidden border border-primary bg-transparent px-6 py-2 font-mono text-xs uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground md:block"
          >
            Launch Scanner
          </Link>
          <button
            className="inline-flex items-center justify-center p-2 text-muted-foreground hover:text-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-border md:hidden" aria-label="Mobile navigation">
          <div className="mx-auto max-w-[1200px] space-y-1 px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/scan" 
              onClick={() => setMobileOpen(false)}
              className="mt-4 block border border-primary bg-transparent px-6 py-2 text-center font-mono text-xs uppercase tracking-wider text-primary"
            >
              Launch Scanner
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
