import { ReservationStatus } from "@/types/Reservation"

export const STATUS = {
    APPROVED: 'APPROVED',
    PENDING: 'PENDING',
    CANCELLED: 'CANCELLED',
}

export const STATUS_DICT = {
    [STATUS.APPROVED]: 'Aprovado',
    [STATUS.PENDING]: 'Pendente',
    [STATUS.CANCELLED]: 'Cancelado',
}

export const getFormattedStatus = (status: ReservationStatus) => {
    return STATUS_DICT[status] || 'Erro ao buscar status'
}