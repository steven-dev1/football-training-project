import { OriginalApiData } from "@/types/Api.model";
import { RemapFunctionType } from "@/types/Functions";
import { CountriesWithLeagues, Country, Match, League, MatchesByLeague, StandingTables, Scorers, MatchesByDate } from "@/types/GameData";

export const remapFavorites: RemapFunctionType<Match, OriginalApiData> = (data) => {
    return data.map((item) => ({
        matchInfo: {
            date: item.match_date,
            time: item.match_time,
            league: item.league_name,
            logo: item.league_logo,
            live: item.match_live,
            status: item.match_status,
            id: item.match_id,
        },
        teamHome: {
            id: item.match_hometeam_id,
            name: item.match_hometeam_name,
            srcLogo: item.team_home_badge,
            score: item.match_hometeam_score,
        },
        teamAway: {
            id: item.match_awayteam_id,
            name: item.match_awayteam_name,
            srcLogo: item.team_away_badge,
            score: item.match_awayteam_score,
        }
    }));
}

export const remapMatchesByLeague: RemapFunctionType<MatchesByLeague, OriginalApiData> = (data) => {
    return data.reduce((acc: Record<string, MatchesByLeague>, item) => {
        const league = {
            id: item.league_id,
            name: item.league_name,
            season: item.stage_name
        }
        const match = {
            matchInfo: {
                id: item.match_id,
                date: item.match_date,
                time: item.match_time,
                live: item.match_live,
                league: item.league_name,
                logo: item.league_logo,
                status: item.match_status,
            },
            teamHome: {
                id: item.match_hometeam_id,
                name: item.match_hometeam_name,
                srcLogo: item.team_home_badge,
                score: item.match_hometeam_score,
            },
            teamAway: {
                id: item.match_awayteam_id,
                name: item.match_awayteam_name,
                srcLogo: item.team_away_badge,
                score: item.match_awayteam_score,
            }
        }
        if (!acc[league.id]) {
            acc[league.id] = {
                league,
                matches: []
            };
        }
        acc[league.id]?.matches.push(match);
        return acc;
    }, {} as Record<string, MatchesByLeague>);
}

export const remapAndGroupMatchesByDate = (data: any[]): MatchesByDate => {
    const remappedMatches = data.map((match) => ({
      matchInfo: {
        date: match.match_date,
        live: match.match_live,
        time: match.match_time,
        league: match.league_name,
        logo: match.league_logo,
        status: match.match_status,
        id: match.match_id,
      },
      teamHome: {
        id: match.match_hometeam_id,
        name: match.match_hometeam_name,
        srcLogo: match.team_home_badge,
        score: match.match_hometeam_score,
      },
      teamAway: {
        id: match.match_awayteam_id,
        name: match.match_awayteam_name,
        srcLogo: match.team_away_badge,
        score: match.match_awayteam_score,
      } 
    }));
  
    
    return remappedMatches.reduce((acc: MatchesByDate, match: Match) => {
      const matchDate = match.matchInfo.date;
  
      if (!acc[matchDate]) {
        acc[matchDate] = [];
      }
  
      acc[matchDate].push(match);
      
      return acc;
    }, {});
  };

export const remapLeaguesByCountry: RemapFunctionType<CountriesWithLeagues, OriginalApiData> = (data) => {
    return data.reduce((accumulator: Record<string, CountriesWithLeagues>, item) => {
        const country: Country = {
            id: item.country_id,
            name: item.country_name,
            logo: item.country_logo,
        };
        const league: League = {
            id: item.league_id,
            name: item.league_name,
            logo: item.league_logo,
        };

        if (!accumulator[country.id]) {
            accumulator[country.id] = {
                country,
                leagues: []
            };
        }
        accumulator[country.id]?.leagues.push(league);
        return accumulator;
    }, {} as Record<string, CountriesWithLeagues>);
}

export const remapStandingTable: RemapFunctionType<StandingTables, OriginalApiData> = (data) => {
    return data.map((item) => ({
        countryName: item.country_name,
        league: {
            id: item.league_id,
            name: item.league_name,
            season: item.stage_name
        },
        teamInfo: {
            id: item.team_id,
            name: item.team_name,
            srcLogo: item.team_badge,
        },
        teamStats: {
            position: Number(item.overall_league_position),
            played: item.overall_league_payed,
            wins: item.overall_league_W,
            draws: item.overall_league_D,
            losses: item.overall_league_L,
            goalsFavor: item.overall_league_GF,
            goalsAgainst: item.overall_league_GA,
            points: item.overall_league_PTS,
        },
        homeStats: {
            position: Number(item.home_league_position),
            played: item.home_league_payed,
            wins: item.home_league_W,
            draws: item.home_league_D,
            losses: item.home_league_L,
            goalsFavor: item.home_league_GF,
            goalsAgainst: item.home_league_GA,
            points: item.home_league_PTS,
        },
        awayStats: {
            position: Number(item.away_league_position),
            played: item.away_league_payed,
            wins: item.away_league_W,
            draws: item.away_league_D,
            losses: item.away_league_L,
            goalsFavor: item.away_league_GF,
            goalsAgainst: item.away_league_GA,
            points: item.away_league_PTS,
        }
    }));
};

export const remapScorers: RemapFunctionType<Scorers, OriginalApiData> = (data) => {
    return data.map((item) => ({
        position: item.player_place,
        name: item.player_name,
        key: item.player_key,
        teamName: item.team_name,
        teamKey: item.team_key,
        goals: item.goals,
        assists: item.assists,
        penaltyGoals: item.penalty_goals
    }));
};

