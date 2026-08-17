export const getFormattedDate = (isoDate: string) => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(isoDate))
}

export const getFormattedDetailedDate = (isoDate: string) => {
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric"
    }
    return new Intl.DateTimeFormat('pt-BR', options).format(new Date(isoDate))
}