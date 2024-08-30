import { ChevronDown } from "lucide-react";
import LogoItem from "../Teams/LogoItem";
import { CountriesWithLeagues } from "@/types/GameData";

interface CountryListProps {
    sortedCountries: CountriesWithLeagues[];
    accordionID: string;
    showLeagues: (id: string) => void;
}

export function CountryList({ sortedCountries, accordionID, showLeagues }: CountryListProps) {
    return (
        <div className='flex flex-col border-b border-projectGrays-100 py-1'>
            {sortedCountries.map((item) => (
                <div key={item.country.id}>
                    <div
                        onClick={(e) => showLeagues(e.currentTarget.id)}
                        id={item.country.id}
                        className={`flex p-1 px-2 group rounded-md hover:bg-projectGrays-500 cursor-pointer items-center gap-2 justify-between ${item.country.id === accordionID ? "bg-projectGrays-500" : "bg-transparent"}`}
                    >
                        <div className='flex justify-between w-full items-center gap-1'>
                            <h2 className='text-xs font-semibold'>{item.country.name}</h2>
                            <div className={`${item.country.id === accordionID ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                <ChevronDown color='#878787' size={18} />
                            </div>
                        </div>
                    </div>
                    {item.country.id === accordionID && (
                        <div className='pl-3 flex flex-col gap-1 my-1 rounded-lg'>
                            {item.leagues.map(league => (
                                <LogoItem
                                    key={league.id}
                                    id={league.id}
                                    name={league.name}
                                    srcLogo={league.logo || "https://apiv3.apifootball.com/badges/logo_country/166_world-cup.png"}
                                />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}