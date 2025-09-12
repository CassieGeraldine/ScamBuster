"use client"

import { Shield, BookOpen, MessageCircle, AlertTriangle, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

export function BottomNavigation() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const navItems = [
    {
      href: "/",
      icon: Shield,
      label: t("home"),
      isActive: pathname === "/",
    },
    {
      href: "/learn",
      icon: BookOpen,
      label: t("learn"),
      isActive: pathname === "/learn",
    },
    {
      href: "/chat",
      icon: MessageCircle,
      label: t("aiHelper"),
      isActive: pathname === "/chat",
    },
    {
      href: "/scan",
      icon: AlertTriangle,
      label: t("scan"),
      isActive: pathname === "/scan",
    },
    {
      href: "/leaderboard",
      icon: Users,
      label: t("leaderboard"),
      isActive: pathname === "/leaderboard",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors min-w-0",
                item.isActive
                  ? "text-primary-foreground bg-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
