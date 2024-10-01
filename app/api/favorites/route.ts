import { NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';
import { remapFavorites } from '@/infrastructure/utils/remap';
import { httpPostActions } from '@/infrastructure/utils/helpers';
import apiClient from '@/interceptors/axios.interceptors';

const apiKey = process.env.NEXT_PUBLIC_API_KEY_FOOTBALL;

export async function POST(req: Request) {
    const body = await req.json();
    const { match_id, sessionId, action } = body;

    const today = new Date();
    const fiveDaysAgo = new Date(today);
    fiveDaysAgo.setDate(today.getDate() - 5);

    const formattedToday = today.toISOString().split('T')[0];
    const formattedFiveDaysAgo = fiveDaysAgo.toISOString().split('T')[0];

    if (!sessionId) {
        return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }
    try {
        if (action === httpPostActions.GET_FAVORITES) {
            const { data, error } = await supabase
                .from('favorites')
                .select('match_id')
                .eq('session_id', sessionId);

            if (error) {
                console.error('Error fetching favorite matches:', error);
                return NextResponse.json({ error: 'Error fetching favorite matches: ' + error.message }, { status: 500 });
            }

            const responses = await Promise.all(
                data.map(async ({ match_id }) => {
                    const res = await apiClient.get(
                        `https://apiv3.apifootball.com/?action=get_events&from=${formattedFiveDaysAgo}&to=${formattedToday}&match_id=${match_id}&APIkey=${apiKey}`
                    );
                    if (res.status !== 200) {
                        throw new Error(`Error fetching match details: ${res.status} ${res.statusText}`);
                    }
                    return res.data
                })
            );
            const flattenedResponses = responses.flat();
            const remappedFavorites = remapFavorites(flattenedResponses);

            return NextResponse.json(remappedFavorites, { status: 200 });
        } else if (action === httpPostActions.POST_FAVORITES) {
            const { data, error } = await supabase
                .from('favorites')
                .select('match_id')
                .eq('session_id', sessionId)
                .eq('match_id', match_id);

            if (error) {
                console.error('Error fetching favorite matches:', error);
                return NextResponse.json({ error: 'Error fetching favorite matches: ' + error.message }, { status: 500 });
            } else if (data) {
                if(data.length > 0) {
                    return NextResponse.json({ message: 'Match already added as favorite' }, { status: 400 });
                } else {
                    const { data, error } = await supabase
                        .from('favorites')
                        .insert({ session_id: sessionId, match_id: match_id });
                    if (error) {
                        console.error('Error saving favorite match:', error.message);
                        return NextResponse.json({ error: 'Error saving favorite match: ' + error.message }, { status: 500 });
                    } else if (data) {
                        return NextResponse.json({ message: 'Match saved successfully' }, { status: 200 });
                    }
                }
            }
            return NextResponse.json({ message: 'Se guardó correctamente.' }, { status: 200 });
        } else if (action === httpPostActions.DELETE_FAVORITES) {
            const { data, error } = await supabase
                .from('favorites')
                .delete()
                .eq('session_id', sessionId)
                .eq('match_id', match_id);

                console.log(data)

            if (error) {
                console.error('Error deleting favorite match:', error.message);
                return NextResponse.json({ error: 'Error deleting favorite match: ' + error.message }, { status: 500 });
            } else if (data) {
                return NextResponse.json({ message: 'Match deleted successfully' }, { status: 200 });
            }

            return NextResponse.json({ message: 'Se elimino correctamente.' }, { status: 200 });
        }
        else {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }
    } catch (error) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error('Error processing request:', errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}