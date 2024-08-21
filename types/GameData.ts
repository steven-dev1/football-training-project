export interface Positions {
    country_name: string,
    league_id: string,
    league_name: string,
    team_id: string,
    team_name: string,
    overall_promotion: string,
    overall_league_position: number,
    overall_league_payed: string,
    overall_league_W: string,
    overall_league_D: string,
    overall_league_L: string,
    overall_league_GF: string,
    overall_league_GA: string,
    overall_league_PTS: string,
    home_league_position: string,
    home_promotion: string,
    home_league_payed: string,
    home_league_W: string,
    home_league_D: string,
    home_league_L: string,
    home_league_GF: string,
    home_league_GA: string,
    home_league_PTS: string,
    away_league_position: string,
    away_promotion: string,
    away_league_payed: string,
    away_league_W: string,
    away_league_D: string,
    away_league_L: string,
    away_league_GF: string,
    away_league_GA: string,
    away_league_PTS: string,
    league_round: string,
    team_badge: string,
    fk_stage_key: string,
    stage_name: string

}

export type OriginalDataType = {
    match_date: string;
    league_name: string;
    league_logo: string;
    match_status: string;
    match_id: string;
    match_hometeam_name: string;
    team_home_badge: string;
    match_hometeam_score: string;
    match_awayteam_name: string;
    team_away_badge: string;
    match_awayteam_score: string;
};

// Tipo para la información del partido remapeada
export type MatchInfo = {
    date: string;
    league: string;
    logo: string;
    status: string;
    id: string;
};

// Tipo para la información del equipo remapeada
export type TeamInfo = {
    name: string;
    srcLogo: string;
    score: string;
};

// Tipo para los datos después del remapeo
export type RemappedDataType = {
    matchInfo: MatchInfo;
    teamHome: TeamInfo;
    teamAway: TeamInfo;
};

// Tipo de la función de remapeo
export type RemapFunctionType = (data: OriginalDataType[]) => RemappedDataType[];