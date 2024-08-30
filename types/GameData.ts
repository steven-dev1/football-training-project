export interface Stats {
    country: string,
    leagueId: string,
    leagueName: string,
    promotion: string,
    teamInfo: ItemInfo,
    statsTeam: StatsTeam
    leagueRound: string,
    stageName: string

}

export interface StatsTeam {
    team: TeamStats,
    asHome: TeamStats,
    asAway: TeamStats
}

export interface TeamStats {
    position: number,
    played: string,
    wins: string,
    draws: string,
    losses: string,
    goalsFavor: string,
    goalsAgainst: string,
    points: string,
}
// Tipo para la información del partido remapeada
export interface MatchInfo {
    date: string;
    live: string;
    time: string;
    league: string;
    logo: string;
    status: string;
    id: string;
};

// Tipo para la información del equipo remapeada
export interface ItemInfo {
    id: string;
    name: string;
    srcLogo: string;
    score?: string;
    orientation?: 'vertical' | 'horizontal';
};

// Tipo para los datos después del remapeo
export interface Favorites {
    matchInfo: MatchInfo;
    teamHome: ItemInfo;
    teamAway: ItemInfo;
    orientation?: 'vertical' | 'horizontal';
};

export interface Country {
    id: string;
    name: string;
    logo: string;
}

export interface League {
    id: string;
    name: string;
    logo: string;
    season?: string;
}

export interface CountriesWithLeagues {
    country: Country;
    leagues: League[];
}