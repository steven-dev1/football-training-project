export interface OriginalApiData {
  match_id: string;
  country_id: string;
  country_name: string;
  league_id: string;
  league_name: string;
  match_date: string;
  match_status: MatchStatus;
  match_time: string;
  match_hometeam_id: string;
  match_hometeam_name: string;
  match_hometeam_score: string;
  match_awayteam_name: string;
  match_awayteam_id: string;
  match_awayteam_score: string;
  match_hometeam_halftime_score: string;
  match_awayteam_halftime_score: string;
  match_hometeam_extra_score: string;
  match_awayteam_extra_score: string;
  match_hometeam_penalty_score: string;
  match_awayteam_penalty_score: string;
  match_hometeam_ft_score: string;
  match_awayteam_ft_score: string;
  match_hometeam_system: string;
  match_awayteam_system: string;
  match_live: string;
  match_round: string;
  match_stadium: string;
  match_referee: string;
  team_home_badge: string;
  team_away_badge: string;
  league_logo: string;
  country_logo: string;
  league_year: string;
  fk_stage_key: string;
  stage_name: string;
  goalscorer: Goalscorer[];
  substitutions: Substitutions;
  cards: CardElement[];
  lineup: Lineup;
  statistics: Statistic[];
  statistics_1half: Statistic[];
  team_id: string;
  team_name: string;
  overall_promotion: string;
  overall_league_position: string;
  overall_league_payed: string;
  overall_league_W: string;
  overall_league_D: string;
  overall_league_L: string;
  overall_league_GF: string;
  overall_league_GA: string;
  overall_league_PTS: string;
  home_league_position: string;
  home_promotion: string;
  home_league_payed: string;
  home_league_W: string;
  home_league_D: string;
  home_league_L: string;
  home_league_GF: string;
  home_league_GA: string;
  home_league_PTS: string;
  away_league_position: string;
  away_promotion: string;
  away_league_payed: string;
  away_league_W: string;
  away_league_D: string;
  away_league_L: string;
  away_league_GF: string;
  away_league_GA: string;
  away_league_PTS: string;
  league_round: string;
  team_badge: string;
}

export interface TeamStats {

}

export interface CardElement {
  time: string;
  home_fault: string;
  card: CardEnum;
  away_fault: string;
  info: CardInfo;
  home_player_id: string;
  away_player_id: string;
  score_info_time: ScoreInfoTime;
}

export enum CardEnum {
  YellowCard = "yellow card",
  YellowRed = "yellow red"
}

export enum CardInfo {
  Away = "away",
  Empty = "",
  Home = "home",
}

export enum ScoreInfoTime {
  The1StHalf = "1st Half",
  The2NdHalf = "2nd Half",
}

export interface Goalscorer {
  time: string;
  home_scorer: string;
  home_scorer_id: string;
  home_assist: string;
  home_assist_id: string;
  score: string;
  away_scorer: string;
  away_scorer_id: string;
  away_assist: string;
  away_assist_id: string;
  info: GoalscorerInfo;
  score_info_time: ScoreInfoTime;
}

export enum GoalscorerInfo {
  Empty = "",
  Penalty = "Penalty",
}

export interface Lineup {
  home: LineupAway;
  away: LineupAway;
}

export interface LineupAway {
  starting_lineups: Coach[];
  substitutes: Coach[];
  coach: Coach[];
  missing_players: any[];
}

export interface Coach {
  lineup_player: string;
  lineup_number: string;
  lineup_position: string;
  player_key: string;
}

export enum MatchStatus {
  Empty = "",
  Finished = "Finished",
  InProgress = "In Progress",
  Postponed = "Postponed",
  Scheduled = "Scheduled",
}

export interface Statistic {
  type: string;
  home: string;
  away: string;
}

export interface Substitutions {
  home: AwayElement[];
  away: AwayElement[];
}

export interface AwayElement {
  time: string;
  substitution: string;
  substitution_player_id: string;
}
