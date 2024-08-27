import Navigation from "@/components/Navigation/Navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-full h-full">
            <header className="text-sm flex gap-8 justify-center py-8 w-14 px-4 h-full border-solid border-border border-r-[1px] flex-col items-center overflow-hidden bg-background">
                <Navigation />
            </header>
            <div className="h-full w-full overflow-y-auto p-8">
                {children}
            </div>
        </div>
    )
}