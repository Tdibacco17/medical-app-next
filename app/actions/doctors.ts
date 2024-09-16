'use server'
import { getSessionToken } from "@/utils/getSessionToken";
import { doctorsData } from "@/models/doctor";
import { ApiResponseInterface } from "@/types/apiTypes";
import { emailRegex } from "@/utils/regex";
import { revalidatePath } from "next/cache";

export async function getDoctorsData() {
    const session = await getSessionToken()

    return doctorsData
}

export async function createDoctor({ name, lastname, email, phone, dni, specialty_ids }: {
    name: string, lastname: string, email: string, phone: string, dni: string, specialty_ids: string[]
}): Promise<ApiResponseInterface> {
    try {
        if (!name || !lastname || !email || !phone || !dni) {
            return { message: `Debe completar todos los campos.`, status: 400 };
        }

        if (!emailRegex.test(email)) {
            return { message: `Formato de email inválido.`, status: 400 };
        }

        if (specialty_ids.length === 0) {
            return { message: `Debe seleccionar al menos una especialidad.`, status: 400 };
        }

        const session = await getSessionToken()

        const response = await fetch(`${process.env.APIGATEWAY_URL}/doctor`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.accessToken}`
            },
            body: JSON.stringify({ name, lastname, email, phone, dni, specialty_ids })
        })
        const rawResponse: ApiResponseInterface = await response.json()

        if (rawResponse.status !== 201) return rawResponse
        revalidatePath("/dashboard/doctors");
        return rawResponse
    } catch (error) {
        return { message: `Ocurrio un error inesperado.`, status: 500 };
    }
}