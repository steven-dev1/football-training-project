export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
};

export const convertTimeToLocal = (timeString: string, timeZone: string): string => {
    // Crear una fecha ficticia añadiendo la hora
    const [hours, minutes] = timeString.split(':').map(Number);

    // Suponiendo que la hora es en UTC (o ajustable)
    const utcDate = new Date(Date.UTC(2024, 7, 29, hours-2, minutes)); // Añadir cualquier fecha válida

    // Convertir a la hora local usando Intl.DateTimeFormat
    return new Intl.DateTimeFormat('en-US', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
    }).format(utcDate);
};
