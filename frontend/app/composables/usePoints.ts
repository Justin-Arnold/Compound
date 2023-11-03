import type { Database } from 'database';

export default function () {

    const supabase = useSupabaseClient<Database>()

    async function getTodaysPoints() {
        const { data: allPoints, error } = await supabase
            .from('view_points_with_latest_event')
            .select('*')

        console.log('ap', allPoints, error)
        if (error) {
            throw error
        } else {
            return allPoints
        }
    }

    function getMostRecentEvent(events: Database["public"]["Tables"]["point_event"]["Row"][]):  Database["public"]["Tables"]["point_event"]["Row"] {
        //use reduce and new Date on recorded at to find most recent event
        return events[0]
    }

    function deletePoint(pointId: string) {
        supabase.from('point_config').delete().eq('id', pointId)
        .then(() => {
            navigateTo('/')
        })
    }

    return {
        getMostRecentEvent,
        deletePoint,
        getTodaysPoints
    };
}