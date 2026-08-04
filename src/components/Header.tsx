import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"
import { ME, NAV_ITEMS } from "@/data/site"

function ThemeToggle() {
  const [dark, setDark] = useState(
    () => document.documentElement.classList.contains("dark")
  )

  const toggle = () => {
    const next = !dark
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
    setDark(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-body transition-colors hover:bg-secondary hover:text-primary"
    >
      {dark ? <Sun size={15} strokeWidth={1.8} /> : <Moon size={15} strokeWidth={1.8} />}
    </button>
  )
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 320)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur-[10px]">
      <div className="mx-auto flex h-16 max-w-[920px] items-center justify-between gap-4 px-5 sm:gap-6 sm:px-8">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          tabIndex={scrolled ? 0 : -1}
          className={cn(
            "min-w-0 cursor-pointer text-left text-[15px] leading-[1.15] font-extrabold tracking-[-0.02em] transition-[opacity,transform] duration-250 ease-out sm:text-[17px]",
            scrolled
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-1.5 opacity-0"
          )}
        >
          {ME}
        </button>
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-[26px]">
          <nav className="flex items-center gap-2.5 sm:gap-[26px]">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.target}
                type="button"
                onClick={() => scrollToSection(item.target)}
                className="cursor-pointer text-[13px] font-semibold whitespace-nowrap text-body transition-colors hover:text-primary sm:text-sm"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
