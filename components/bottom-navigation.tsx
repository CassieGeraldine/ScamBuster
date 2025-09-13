"use client"

import { Home, GraduationCap, MessageCircle, Search, Trophy } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

const navigationItems = [
	{ href: "/", icon: Home, labelKey: "home" },
	{ href: "/learn", icon: GraduationCap, labelKey: "learn" },
	{ href: "/chat", icon: MessageCircle, labelKey: "aiHelper" },
	{ href: "/scan", icon: Search, labelKey: "scanDetect" },
	{ href: "/leaderboard", icon: Trophy, labelKey: "leaderboard" },
]

export function BottomNavigation() {
	const pathname = usePathname()
	const { t } = useLanguage()

	return (
		<nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
			<div className="flex items-center justify-around py-2 px-4">
				{navigationItems.map((item) => {
					const isActive = pathname === item.href
					const Icon = item.icon

					return (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"flex flex-col items-center justify-center p-3 rounded-xl transition-colors min-w-0 flex-1",
								isActive
									? "text-foreground bg-accent/10"
									: "text-muted-foreground hover:text-foreground",
							)}
						>
							<Icon className="w-5 h-5 mb-1" />
							<span className="text-xs font-medium text-center">
								{t(item.labelKey)}
							</span>
						</Link>
					)
				})}
			</div>
		</nav>
	)
}
