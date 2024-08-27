import { CountriesWithLeagues, ItemInfo } from "@/types/GameData";

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
    if(!timeString || !timeZone) return '00:00'
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

export const groupLeaguesByCountry = (items: ItemInfo[]): CountriesWithLeagues[] => {
    const grouped = items.reduce((acc: Record<number, CountriesWithLeagues>, item) => {
        const countryId = item.country_id;

        // Si el país ya existe en el acumulador, le agregamos la nueva liga
        if (!acc[countryId]) {
            acc[countryId] = {
                country: {
                    id: item.country_id,
                    name: item.country_name,
                    logo: item.country_logo,
                },
                leagues: [],
            };
        }

        // Agregar la liga correspondiente al país
        acc[countryId].leagues.push({
            id: item.league_id,
            name: item.league_name,
            logo: item.league_logo,
        });

        return acc;
    }, {});

    // Convertir el objeto agrupado en un array
    return Object.values(grouped);
};

