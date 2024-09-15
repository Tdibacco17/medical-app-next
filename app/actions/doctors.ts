'use server'
import { getSessionToken } from "@/utils/getSessionToken";
import { doctorsData } from "@/models/doctor";

export async function getDoctorsData() {
    const session = await getSessionToken()

    return doctorsData
}