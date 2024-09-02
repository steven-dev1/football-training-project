import { OriginalApiData } from "@/types/Api.model";
import { RemapFunctionType } from "@/types/Functions";
import { CountriesWithLeagues, Country, Favorites, League, StandingTables } from "@/types/GameData";

export const remapFavorites: RemapFunctionType<Favorites, OriginalApiData> = (data) => {
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

