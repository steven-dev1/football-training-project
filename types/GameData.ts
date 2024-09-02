export interface TeamPerformance {
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

export interface StandingTables {
    countryName: string
    league: League;
    teamInfo: ItemInfo;
    teamStats: TeamStats;
    homeStats: TeamStats;
    awayStats: TeamStats;
}

export interface MatchInfo {
    date: string;
    live: string;
    time: string;
    league: string;
    logo: string;
    status: string;
    id: string;
};


export interface ItemInfo {
    id: string;
    name: string;
    srcLogo: string;
    score?: string;
    orientation?: 'vertical' | 'horizontal';
};

export interface Favorites {
    matchInfo: MatchInfo;
    teamHome: ItemInfo;
    teamAway: ItemInfo;
    orientation?: 'vertical' | 'horizontal';
};

export interface Country {
    id: string;
    name: string;
    logo?: string;
}

export interface League {
    id: string;
    name: string;
    logo?: string;
    season?: string;
    round?: string;
}

export interface CountriesWithLeagues {
    country: Country;
    leagues: League[];
}