'use server'
import { getSessionToken } from "@/utils/getSessionToken";
import { ApiDataResponseInterface, ApiResponseInterface } from "@/types/apiTypes";
import { emailRegex } from "@/utils/regex";
import { revalidatePath } from "next/cache";
import { NewFormDataDoctorInterface } from "@/types/DoctorTypes";

export async function getDoctorsData(): Promise<ApiDataResponseInterface> {
    try {
        const session = await getSessionToken()

        const response = await fetch(`${process.env.APIGATEWAY_URL}/doctors`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session?.accessToken}`
            },
        })
        const rawResponse: ApiDataResponseInterface = await response.json()

        if (rawResponse.status !== 200) return { message: rawResponse.message, status: rawResponse.status, data: [] };

        return rawResponse
    } catch (e: any) {
        return { message: `Ocurrio un error inesperado.`, status: 500, data: [] };
    }
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

export async function deleteDoctorById({ doctorId }: { doctorId: string }): Promise<ApiResponseInterface> {
    try {
        if (!doctorId) return { message: `Algo salio mal.`, status: 500, };
        const session = await getSessionToken()

        const response = await fetch(`${process.env.APIGATEWAY_URL}/doctor/${doctorId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${session?.accessToken}`
            },
        })
        const rawResponse: ApiResponseInterface = await response.json()

        if (rawResponse.status !== 200) return rawResponse;
        revalidatePath("/dashboard/doctors");
        return rawResponse
    } catch (e: any) {
        return { message: `Ocurrio un error inesperado.`, status: 500, };
    }
}

export async function updateDoctorData({ doctorData, specialty_ids }: { doctorData: NewFormDataDoctorInterface, specialty_ids: string[] }): Promise<ApiResponseInterface> {
    try {
        if (!doctorData.id) return { message: `Algo salio mal.`, status: 500, };
        if (!doctorData.name || !doctorData.lastname || !doctorData.email || !doctorData.phone || !doctorData.dni) return { message: `Deben completar todos los campos.`, status: 400 };

        if (!emailRegex.test(doctorData.email)) {
            return { message: `Formato de email inválido.`, status: 400 };
        }

        if (specialty_ids.length === 0) {
            return { message: `Debe seleccionar al menos una especialidad.`, status: 400 };
        }

        const session = await getSessionToken()

        const response = await fetch(`${process.env.APIGATEWAY_URL}/doctor/${doctorData.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.accessToken}`
            },
            body: JSON.stringify({
                name: doctorData.name,
                lastname: doctorData.lastname,
                dni: doctorData.dni,
                phone: doctorData.phone,
                email: doctorData.email,
                specialty_ids
            })
        })
        const rawResponse: ApiDataResponseInterface = await response.json()

        if (rawResponse.status !== 200) return rawResponse;
        revalidatePath("/dashboard/doctors");
        return rawResponse
    } catch (e: any) {
        return { message: `Ocurrio un error inesperado.`, status: 500 };
    }
}