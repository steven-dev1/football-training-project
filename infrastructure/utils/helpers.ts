
import { CountriesWithLeagues, ItemInfo, Match, MatchInfo } from "@/types/GameData";

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
  if (!timeString || !timeZone) return '00:00'
  const [hours, minutes] = timeString.split(':').map(Number);

  const utcDate = new Date(Date.UTC(2024, 7, 29, (hours || 0) - 2, minutes || 0)); 

  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
  }).format(utcDate);
};

export const groupLeaguesByCountry = (items: any[]): CountriesWithLeagues[] => {
  const grouped = items.reduce((acc: Record<number, CountriesWithLeagues>, item: any) => {
    const countryId = item.country_id;

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

    acc[countryId].leagues.push({
      id: item.league_id,
      name: item.league_name,
      logo: item.league_logo,
    });

    return acc;
  }, {} as Record<number, CountriesWithLeagues>);

  return Object.values(grouped);
};


export const statusFilters: Record<number, (match: any) => boolean> = {
  0: () => true, // Mostrar todos los partidos
  1: (match: any) => match.matchInfo.live === '1', // Mostrar partidos en vivo
  2: (match: any) => match.matchInfo.status === '' || match.matchInfo.status === 'Postponed' , // Mostrar partidos próximos
  3: (match: any) => match.matchInfo.status !== '' && match.matchInfo.live == '0', // Mostrar partidos terminados
};

export const addFavorites = (matchInfo: MatchInfo, teamHome: ItemInfo, teamAway: ItemInfo): any => {
  const storedMatches = window.localStorage.getItem('FavoritesMatch');
  const favorites = storedMatches ? JSON.parse(storedMatches) : [];

  const newMatch = {
    matchInfo,
    teamHome,
    teamAway,
  };

  favorites.push(newMatch);
  window.localStorage.setItem('FavoritesMatch', JSON.stringify(favorites));
};

export const removeFavorites = (matchId: string): void => {
  const storedMatches = window.localStorage.getItem('FavoritesMatch')
  const favorites = storedMatches ? JSON.parse(storedMatches) : []
  if(favorites.length == 0) return
  const updatedFavorites = favorites.filter((match: Match) => match.matchInfo.id!== matchId);
  window.localStorage.setItem('FavoritesMatch', JSON.stringify(updatedFavorites));
};

