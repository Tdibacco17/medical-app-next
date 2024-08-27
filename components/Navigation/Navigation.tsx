'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { PatientsIcon } from "@/components/Icons/Icons";
import { DashboardIcon, ArchiveIcon, CalendarIcon, GearIcon, BellIcon } from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { buttonVariants } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { signOut } from "next-auth/react";

export default function Navigation() {
    const { setTheme } = useTheme()
    const pathname = usePathname()
    const isDashboard = pathname === "/dashboard"
    const isPatients = pathname === "/dashboard/patients";
    const isMedicalRecords = pathname === "/dashboard/medical-records";
    const isCalendar = pathname === "/dashboard/calendar";
    const isNotify = pathname === "/dashboard/notify";

    return (
        <>
            <nav className="flex flex-col items-center gap-4 p-0 h-full">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/dashboard"
                            className={`flex h-9 w-9 items-center justify-center text-lg font-semibold transition-colors ${isDashboard ? "rounded-full bg-blue text-blue-foreground" : "rounded-lg text-muted-foreground hover:text-foreground"}`}
                        >
                            <DashboardIcon className="w-5 h-5" />
                            <span className="sr-only">Panel principal</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Panel principal</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/dashboard/patients"
                            className={`flex h-9 w-9 items-center justify-center text-lg font-semibold transition-colors ${isPatients ? "rounded-full bg-blue text-blue-foreground" : "rounded-lg text-muted-foreground hover:text-foreground"}`}
                        >
                            <PatientsIcon />
                            <span className="sr-only">Pacientes</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Pacientes</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/dashboard/medical-records"
                            className={`flex h-9 w-9 items-center justify-center text-lg font-semibold transition-colors ${isMedicalRecords ? "rounded-full bg-blue text-blue-foreground" : "rounded-lg text-muted-foreground hover:text-foreground"}`}
                        >
                            <ArchiveIcon className="w-5 h-5" />
                            <span className="sr-only">Fichas</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Fichas</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/dashboard/calendar"
                            className={`flex h-9 w-9 items-center justify-center text-lg font-semibold transition-colors ${isCalendar ? "rounded-full bg-blue text-blue-foreground" : "rounded-lg text-muted-foreground hover:text-foreground"}`}
                        >
                            <CalendarIcon className="w-5 h-5" />
                            <span className="sr-only">Turnos</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Turnos</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/dashboard/notify"
                            className={`flex h-9 w-9 items-center justify-center text-lg font-semibold transition-colors ${isNotify ? "rounded-full bg-blue text-blue-foreground" : "rounded-lg text-muted-foreground hover:text-foreground"}`}
                        >
                            <BellIcon className="w-5 h-5" />
                            <span className="sr-only">Notificaciones</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Notificaciones</TooltipContent>
                </Tooltip>
            </nav>
            <DropdownMenu >
                <DropdownMenuTrigger className={buttonVariants({ variant: "outline", size: 'icon', className: 'py-2' })}>
                    <GearIcon className="w-5 h-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={8} className="!ml-5">
                    {/* <DropdownMenuItem onClick={() => setTheme("light")}>
                        Modo claro
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Modo oscuro
                    </DropdownMenuItem> */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Tema</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => setTheme("light")}>Modo claro</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setTheme("dark")}>Modo oscuro</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                        Cerrar sesión
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}