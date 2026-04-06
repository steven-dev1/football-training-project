"use client";
import LeftNav from "@/components/Navs/LeftNav";
import UpcomingMatches from "@/components/Sections/Matches/UpcomingMatches";
import ScorersSection from "@/components/Sections/Scorers/ScorersSection";
import StandingTable from "@/components/Tables/StandingTable";
import apiClient from "@/interceptors/axios.interceptors";
import Image from "next/image";
import { useEffect, useState } from "react";
import SkeletonLeagueInfo from "./SkeletonLeagueInfo";


export default function Page({
  params,
}: {
  params: { id: string; country: string };
}) {
  const id = params.id;
  const country = params.country;

  const [loading, setLoading] = useState(true);
  const [leagueData, setLeagueData] = useState<any>({});
  const [activeTab, setActiveTab] = useState("table");

  useEffect(() => {
    apiClient
      .get(`/routes?action=get_leagues&country_id=${country}`)
      .then((response) => {
        response.data.map((league: any) => {
          if (league.league_id === id) {
            setLeagueData({
              id: league.league_id,
              logo: league.league_logo,
              name: league.league_name,
              season: league.league_season,
            });
            setLoading(false);
          }
          return;
        });
      });
  }, []);

  return (
    <>
      <LeftNav />
      <section className="w-full flex flex-col m-2 p-4 box-border bg-projectGrays-500 rounded-xl">
        {loading ? (
          <SkeletonLeagueInfo />
        ) : (
          <>
            <div className="max-w-full text-center rounded-lg bg-projectGrays-500 p-2">
              <h1 className="text-2xl font-semibold flex flex-col justify-center items-center gap-2">
                <Image
                  className={`rounded-lg w-[50px] ${
                    !leagueData.logo && "bg-white"
                  } `}
                  src={leagueData.logo || "/no-image.svg"}
                  alt="logo"
                  width={100}
                  height={100}
                />
                {leagueData.name}
              </h1>
              <p className="text-projectGrays-100 font-medium">
                {leagueData.season}
              </p>
            </div>
            <div className="p-2 rounded-lg mx-auto flex gap-2 bg-projectGrays-700">
              <button
                value={"table"}
                onClick={(e) => setActiveTab(e.currentTarget.value)}
                className={`p-2 rounded-lg text-sm font-medium ${
                  activeTab == "table" && "bg-projectGrays-500"
                }`}
              >
                Posiciones
              </button>
              <button value={"scorers"} onClick={(e) => setActiveTab(e.currentTarget.value)} className={`p-2 rounded-lg text-sm font-medium ${activeTab == "scorers" && "bg-projectGrays-500"}`}>
                Goleadores
              </button>
              <button
                value={"upcoming"}
                onClick={(e) => setActiveTab(e.currentTarget.value)}
                className={`p-2 rounded-lg text-sm font-medium ${
                  activeTab == "upcoming" && "bg-projectGrays-500"
                }`}
              >
                Próximos
              </button>
              <button
                value={"results"}
                onClick={(e) => setActiveTab(e.currentTarget.value)}
                className={`p-2 rounded-lg text-sm font-medium ${
                  activeTab == "results" && "bg-projectGrays-500"
                }`}
              >
                Resultados
              </button>
            </div>
          </>
        )}
        <div className="w-full">
          {activeTab.toLowerCase() == "table" && (
            <StandingTable width="large" leagueId={id} />
          )}
          {activeTab.toLowerCase() == "scorers" && (
            <ScorersSection isLarge={true} leagueId={id} />
          )}
          {activeTab.toLowerCase() == "upcoming" && (
            <UpcomingMatches type="upcoming" leagueId={id} />
          )}
          {activeTab.toLowerCase() == "results" && (
            <UpcomingMatches type="results" leagueId={id} />
          )}
        </div>
      </section>
    </>
  );
}
