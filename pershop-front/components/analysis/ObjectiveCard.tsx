import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ObjectiveCardProps {
    id: string;
    label: string;
    icon: LucideIcon;
    selected: boolean;
    onSelect: (id: string) => void;
}

export function ObjectiveCard({ id, label, icon: Icon, selected, onSelect }: ObjectiveCardProps) {
    return (
        <div
            onClick={() => onSelect(id)}
            className={cn(
                "cursor-pointer group relative flex items-center p-4 gap-4 rounded-xl border transition-all duration-300 h-24",
                selected
                    ? "bg-[#D4AF37]/10 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                    : "bg-white/5 border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/10"
            )}
        >
            <div className={cn(
                "p-3 rounded-lg transition-colors",
                selected ? "bg-[#D4AF37] text-black" : "bg-white/5 text-[#D4AF37] group-hover:bg-[#D4AF37]/20"
            )}>
                <Icon className="h-6 w-6" />
            </div>

            <span className={cn(
                "font-medium text-lg leading-tight transition-colors",
                selected ? "text-white" : "text-white/80 group-hover:text-white"
            )}>
                {label}
            </span>

            {selected && (
                <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_5px_#D4AF37]" />
            )}
        </div>
    );
}
