import { RemapFunctionType } from "@/types/Functions";
import { CountriesWithLeagues, Country, Favorites, League } from "@/types/GameData";
import { OriginalApiData } from "@/types/api.model";

export const remapFavorites: RemapFunctionType<Favorites, OriginalApiData> = (data) => {
    return data.map((item)  => ({
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
        accumulator[country.id].leagues.push(league);
        return accumulator;
    }, {} as Record<string, CountriesWithLeagues>);
}
