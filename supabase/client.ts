import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4} from 'uuid';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const createSession = async (): Promise<void> => {
    const sessionId = uuidv4();
    const { data, error } = await supabase
        .from('session')
        .insert({ session_id: sessionId });
    console.log(data)

    if (error) {
        console.error('Error creating session:', error);
    } else {
        localStorage.setItem('sessionId', sessionId);
    }
};