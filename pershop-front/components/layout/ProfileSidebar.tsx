"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Palette, CreditCard, Bell, Shield, HelpCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarNavItems = [
  {
    title: "Profil",
    href: "/client/profile",
    icon: User,
  },
  {
    title: "Préférences style",
    href: "/client/profile/preferences",
    icon: Palette,
  },
  {
    title: "Paiement",
    href: "/client/profile/billing",
    icon: CreditCard,
  },
  {
    title: "Notifications",
    href: "/client/profile/notifications",
    icon: Bell,
  },
  {
    title: "Confidentialité",
    href: "/client/profile/privacy",
    icon: Shield,
  },
  {
    title: "Aide",
    href: "/client/profile/help",
    icon: HelpCircle,
  },
];

export function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {sidebarNavItems.map((item) => (
        <Button
          key={item.href}
          variant="ghost"
          asChild
          className={cn(
            "justify-start gap-2 hover:bg-secondary/50",
            pathname === item.href
              ? "bg-secondary text-primary hover:bg-secondary"
              : "hover:underline text-muted-foreground",
            // Special styling for active state to match Gold theme
            pathname === item.href && "border-l-2 border-primary rounded-none pl-3"
          )}
        >
          <Link href={item.href}>
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
