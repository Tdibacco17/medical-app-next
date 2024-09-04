'use client'
import { usePathname } from "next/navigation";
import { DoctorIcon, PatientsIcon } from "@/components/Icons/Icons";
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
import NavItem from "./NavItem";

export default function Navigation() {
    const { setTheme } = useTheme()
    const pathname = usePathname()
    const isDashboard = pathname === "/dashboard"
    const isPatients = pathname === "/dashboard/patients";
    const isDoctors = pathname === "/dashboard/doctors";
    const isMedicalRecords = pathname === "/dashboard/medical-records";
    const isCalendar = pathname === "/dashboard/calendar";
    const isNotify = pathname === "/dashboard/notify";

    return (
        <>
            <nav className="flex flex-col items-center gap-4 p-0 h-full">
                <NavItem href="/dashboard" isActive={isDashboard} text="Panel principal">
                    <DashboardIcon className="w-5 h-5" />
                </NavItem>
                <NavItem href="/dashboard/patients?page=1" isActive={isPatients} text="Pacientes">
                    <PatientsIcon />
                </NavItem>
                <NavItem href="/dashboard/doctors" isActive={isDoctors} text="Medicos">
                    <DoctorIcon />
                </NavItem>
                <NavItem href="/dashboard/medical-records" isActive={isMedicalRecords} text="Fichas">
                    <ArchiveIcon className="w-5 h-5" />
                </NavItem>
                <NavItem href="/dashboard/calendar" isActive={isCalendar} text="Turnos">
                    <CalendarIcon className="w-5 h-5" />
                </NavItem>
                <NavItem href="/dashboard/notify" isActive={isNotify} text="Notificaciones">
                    <BellIcon className="w-5 h-5" />
                </NavItem>
            </nav>
            <DropdownMenu >
                <DropdownMenuTrigger className={buttonVariants({ variant: "outline", size: 'icon', className: 'py-2' })} asChild>
                    <GearIcon className="w-5 h-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Tema</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => setTheme("light")}>Modo claro</DropdownMenuItem>
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