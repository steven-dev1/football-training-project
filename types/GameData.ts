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
    position: number,
    payed: string,
    wins: string,
    draws: string,
    losses: string,
    goalsFavor: string,
    goalsAgainst: string,
    points: string,
    homePosition: string,
    homePayed: string,
    homeWins: string,
    homeDraws: string,
    homeLosses: string,
    homeGoalsFavor: string,
    homeGoalsAgainst: string,
    homePoints: string,
    awayPosition: string,
    away_league_payed: string,
    awayWins: string,
    awayDraws: string,
    awayLosses: string,
    awayGoalsFavor: string,
    awayGoalsAgainst: string,
    awayPoints: string,
}

export interface OriginalDataType {
    match_date: string;
    league_name: string;
    league_logo: string;
    match_status: string;
    match_time: string;
    match_id: string;
    match_live: string;
    match_hometeam_id: string
    match_hometeam_name: string;
    team_home_badge: string;
    match_hometeam_score: string;
    match_awayteam_id: string
    match_awayteam_name: string;
    team_away_badge: string;
    match_awayteam_score: string;
};

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
    orientation?: string;
};

// Tipo para los datos después del remapeo
export interface RemappedDataType {
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

// Tipo de la función de remapeo
export type RemapFunctionType = (data: OriginalDataType[]) => RemappedDataType[];