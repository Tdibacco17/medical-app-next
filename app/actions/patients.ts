'use server'
import { getSessionToken } from "@/utils/getSessionToken";
import { patientsData } from "@/models/patients";

export async function getPatientsData() {
    const session = await getSessionToken()
    
    return patientsData
}