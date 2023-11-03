import type { Database } from 'database';

const supabase = useSupabaseClient<Database>()

function getMostRecentEvent(events: Database["public"]["Tables"]["point_event"]["Row"][]):  Database["public"]["Tables"]["point_event"]["Row"] {
    //use reduce and new Date on recorded at to find most recent event
    return events[0]
}

const service = {
    getMostRecentEvent
};

export default service