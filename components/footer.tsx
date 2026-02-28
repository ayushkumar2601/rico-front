import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row lg:px-8">
        <div className="font-mono text-sm font-bold tracking-tight text-foreground">
          RICO<span className="text-primary">.</span>
        </div>

        <nav className="flex gap-8 font-mono text-xs uppercase tracking-wider text-muted-foreground" aria-label="Footer navigation">
          <Link href="/docs" className="hover:text-foreground transition-colors">
            Docs
          </Link>
          <Link href="/install" className="hover:text-foreground transition-colors">
            Install
          </Link>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}
