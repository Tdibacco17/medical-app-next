import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link"

interface Props {
    href: string,
    isActive: boolean,
    children: React.ReactNode,
    text: string
}

export default function NavItem({ href, isActive, children, text }: Props) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    href={href}
                    className={`flex h-9 w-9 items-center justify-center text-lg font-semibold transition-colors ${isActive ? "rounded-full bg-blue text-blue-foreground" : "rounded-lg text-muted-foreground hover:text-foreground"}`}
                >
                    {children}
                    <span className="sr-only">{text}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{text}</TooltipContent>
        </Tooltip>
    )
}