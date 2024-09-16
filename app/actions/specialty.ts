'use server'
import { getSessionToken } from "@/utils/getSessionToken";
import { ApiDataResponseInterface, ApiResponseInterface } from "@/types/apiTypes";
import { revalidatePath } from "next/cache";

// crear especialidad
export async function createSpecialtyName({ name }: { name: string }): Promise<ApiResponseInterface> {
    try {
        if (!name) return { message: "Nombre no proporcionado.", status: 400, };
        const session = await getSessionToken()

        const response = await fetch(`${process.env.APIGATEWAY_URL}/specialty`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.accessToken}`
            },
            body: JSON.stringify({ description: name })
        })
        const rawResponse: ApiResponseInterface = await response.json()

        if (rawResponse.status !== 201) return rawResponse
        revalidatePath("/dashboard/doctors");
        return rawResponse
    } catch (error) {
        return { message: `Ocurrio un error inesperado.`, status: 500 };
    }
}

// traer especialidades
export async function getSpecialties(): Promise<ApiDataResponseInterface> {
    try {
        const session = await getSessionToken()
        const response = await fetch(`${process.env.APIGATEWAY_URL}/specialties`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session?.accessToken}`
            },
        })
        const rawResponse: ApiDataResponseInterface = await response.json()

        if (rawResponse.status !== 200) return { message: rawResponse.message, status: rawResponse.status, data: [] };
        revalidatePath("/dashboard/doctors");
        return rawResponse
    } catch (e) {
        return { message: `Ocurrio un error inesperado.`, status: 500, data: [] };
    }
}

// eliminar especialidad
export async function deleteSpecialtyById({ id }: { id: string }): Promise<ApiResponseInterface> {
    try {
        if (!id) return { message: "Id no proporcionado.", status: 400, };
        const session = await getSessionToken()

        const response = await fetch(`${process.env.APIGATEWAY_URL}/specialty/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${session?.accessToken}`
            },
        })
        const rawResponse: ApiResponseInterface = await response.json()
        if (rawResponse.status !== 200) return rawResponse
        revalidatePath("/dashboard/doctors");
        return rawResponse
    } catch (e) {
        return { message: `Ocurrio un error inesperado.`, status: 500 };
    }
}