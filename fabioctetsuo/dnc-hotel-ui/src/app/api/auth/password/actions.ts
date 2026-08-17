"use server"
import axios from "@/api";
import { redirect } from "next/navigation";

export async function forgotPassword(prevState: any, formData: FormData) {
    try {
        const payload = { "email": formData.get('email') }
    
        const { data } = await axios.post('/auth/forgot-password', payload);
    } catch (error) {
        return { ...prevState, message: 'Erro ao enviar e-mail' }
    }

    redirect('/recuperar-senha')    
}

export async function recoverPassword(prevState: any, formData: FormData) {
    try {
        const payload = {
            "token": formData.get('token'),
            "password": formData.get('password'),
        }
    
        const { data } = await axios.patch('/auth/reset-password', payload);

        return { success: true, result: data }
    } catch (error) {
        return { ...prevState, message: 'Erro ao atualizar a senha' }
    }

    redirect('/recuperar-senha')    
}