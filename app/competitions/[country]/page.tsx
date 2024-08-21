'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const apikey: string = process.env.NEXT_PUBLIC_API_KEY_FOOTBALL || ""

interface League {
  country_id: string,
  country_name: string,
  league_id: string,
  league_name: string,
  league_season: string,
  league_logo: string,
  country_logo: string
}

interface CountryData {
  id: string,
  name: string,
  logo: string,
  season: string
}

export default function CountryCompetitions() {
  const { country } = useParams()
  const [leagues, setLeagues] = useState<League[]>([])
  const [countryData, setCountryData] = useState<CountryData>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://apiv3.apifootball.com/?action=get_leagues&country_id=${country}&APIkey=${apikey}`)
      .then(res => res.json())
      .then(res => {
        setCountryData({
          id: res[0].country_id,
          name: res[0].country_name,
          logo: res[0].country_logo,
          season: res[0].league_season
        })
        setLeagues(res)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [country])

  if (loading) {
    return <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Cargando...</p>
    </main>
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex flex-col items-center mt-2 mb-4'>
        <h1 className='font-bold text-2xl'>{countryData?.name}</h1>
        <p className='text-gray-400'>Ligas | {countryData?.season}</p>
      </div> 
      <div className='flex gap-4 justify-start flex-wrap sm:justify-center'>
        {leagues.map((country) => {
          return (
            <Link key={country.league_id} href={`/competitions/${country.league_id}`} className="w-full sm:w-auto odd:bg-neutral-900 group hover:bg-neutral-800 p-2 flex items-center gap-2 my-1">
              <Image src={country.country_logo == "" ? 'https://apiv3.apifootball.com/badges/logo_country/133_world.png' : country.country_logo} className="w-[100px] cursor-pointer transition-all duration-150" width={100} height={50} alt="Logo pais" />
              <p className="cursor-pointer  transition-all duration-150">{country.league_name}</p>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
