import { PatientInterface } from "@/types/PatientsTypes";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons"
import {
    CardFooter,
} from "@/components/ui/card"

export default function PatientsTablePaginate({
    searchParams, patientsData
}: {
    searchParams?: { [key: string]: string } | undefined,
    patientsData: PatientInterface[]
}) {
    let baseQueryParams: string | undefined = undefined;

    if (searchParams) {
        const { page, ...restParams } = searchParams;
        baseQueryParams = new URLSearchParams(restParams).toString();
    }

    // const q: string | undefined = searchParams?.q;
    const pageParam: string | undefined = searchParams?.page || '1';
    const page: number = pageParam && !isNaN(parseInt(pageParam)) && parseInt(pageParam) > 0 ? parseInt(pageParam) : 1;
    // const limit: number = 8;
    // const offset: number = (page - 1) * limit;

    // const totalPages = response.data.totalPages;
    const totalPages = patientsData.length
    const initialPageQuery = `${baseQueryParams ? `?${baseQueryParams}&page=1` : `?page=1`}`;
    const previousPageQuery = `${baseQueryParams ? `?${baseQueryParams}&page=${page - 1}` : `?page=${page - 1}`}`;
    const nextPageQuery = `${baseQueryParams ? `?${baseQueryParams}&page=${page + 1}` : `?page=${page + 1}`}`;
    const finalPageQuery = `${baseQueryParams ? `?${baseQueryParams}&page=${totalPages}` : `?page=${totalPages}`}`;

    return (
        <CardFooter className="p-0">
            <div className="flex justify-between items-center w-full bg-muted/50 p-6 border-t">
                <div className=" text-xs text-muted-foreground">
                    {patientsData?.length > 0 ? `Página ${page} de ${totalPages}` : `No hay existencias`}
                </div>
                <div className="flex gap-2">
                    {patientsData?.length > 0
                        ? <>
                            <Link href={initialPageQuery}
                                className={buttonVariants({
                                    variant: 'outline', size: 'icon', 
                                    className: page === 1 ? 'pointer-events-none opacity-50' : ''
                                })}>
                                <DoubleArrowLeftIcon />
                            </Link>
                            <Link href={previousPageQuery}
                                className={buttonVariants({
                                    variant: 'outline', size: 'icon',
                                    className: page === 1 ? 'pointer-events-none opacity-50' : ''
                                })}>
                                <ChevronLeftIcon />
                            </Link>
                            <Link href={nextPageQuery}
                                className={buttonVariants({
                                    variant: 'outline', size: 'icon',
                                    className: page === totalPages ? 'pointer-events-none opacity-50' : ''
                                })}>
                                <ChevronRightIcon />
                            </Link>
                            <Link href={finalPageQuery}
                                className={buttonVariants({
                                    variant: 'outline', size: 'icon',
                                    className: page === totalPages ? 'pointer-events-none opacity-50' : ''
                                })}>
                                <DoubleArrowRightIcon />
                            </Link>
                        </>
                        : <Link href={"?page=1"} className={buttonVariants({ variant: 'outline' })}>
                            Recargar
                        </Link>}
                </div>
            </div>
        </CardFooter>
    )
}