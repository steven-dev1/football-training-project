import { MAXIMUN_WAITING_TIME } from '@/infrastructure/utils/helpers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY_FOOTBALL;
    const params = req.nextUrl.searchParams;
    let url = `https://apiv3.apifootball.com/?APIkey=${apiKey}`;

    params.forEach((value, key) => {
      url += `&${key}=${encodeURIComponent(value)}`;
    });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), MAXIMUN_WAITING_TIME); 
    const response = await fetch(url);
    
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching data:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}


