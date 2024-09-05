'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon, Cross2Icon } from "@radix-ui/react-icons";

export default function SearchPatients({ searchParams }: { searchParams?: { [key: string]: string } | undefined, }) {
    let baseQueryParams: string | undefined = undefined;

    if (searchParams) {
        const { page, q, ...restParams } = searchParams;
        baseQueryParams = new URLSearchParams(restParams).toString();
    }

    const q = searchParams?.q || '';

    const router = useRouter()
    const [input, setInput] = useState<string>(q);

    const handleSearchPatient = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>, input: string) => {
        if (e.type === 'click' || (e as React.KeyboardEvent<HTMLInputElement>).key === 'Enter') {
            if (baseQueryParams) {
                if (input.trim() !== "") {
                    router.push(`?${baseQueryParams}&q=${input.trim()}&page=1`);
                } else {
                    router.push(`?${baseQueryParams}&page=1`);
                }
            } else {
                if (input.trim() !== "") {
                    router.push(`?q=${input.trim()}&page=1`);
                } else {
                    router.push(`?page=1`);
                }
            }
        }
    };

    const handleRefresh = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
        if (e.type === 'click' || (e as React.KeyboardEvent<HTMLInputElement>).key === 'Escape') {
            setInput('')
            if (baseQueryParams) {
                router.push(`?${baseQueryParams}&page=1`);
            } else {
                router.push(`?page=1`);
            }
        }
    };

    useEffect(() => {
        if (!q) {
            setInput('')
        }
    }, [q])

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 relative">
                <Input type="text" placeholder="Buscar paciente..." className="px-8 w-64 text-sm placeholder:text-xs bg-background"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => handleSearchPatient(e, input)}
                    onKeyUp={(e) => handleRefresh(e)}
                />
                <Button variant="hidden" size="sm" onClick={(e) => handleSearchPatient(e, input)} disabled={input.trim() === ""}
                    className={`w-8 h-full p-0 flex items-center justify-center absolute top-0 left-0 hover:!bg-transparent ${input.trim() !== "" ? "cursor-pointer" : ""}`}>
                    <MagnifyingGlassIcon />
                </Button>
                <Button variant="hidden" size="sm" onClick={(e) => handleRefresh(e)} disabled={!q}
                    className={`w-8 h-full p-0 flex items-center justify-center absolute top-0 right-0 hover:!bg-transparent cursor-pointer ${q ? "" : " hidden"}`}>
                    <Cross2Icon />
                </Button>
            </div>
        </div>
    )
}