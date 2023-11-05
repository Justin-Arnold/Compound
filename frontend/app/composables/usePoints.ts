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

    async function updatePoint(updatedPoint: Database["public"]["Tables"]["point_config"]["Update"]) {
        const { data, error } = await supabase.from('point_config').update(updatedPoint).eq('id', updatedPoint.id || '');
        if (error) {
            throw error
        } else {
            return data
        }
    }

    async function newEventForPoint(event: Database["public"]["Tables"]["point_event"]["Insert"]) {
        const { data, error } = await supabase.from('point_event').insert(event);
        if (error) {
            throw error
        } else {
            return data
        }
    }

    async function updateEventForPoint(event: Database["public"]["Tables"]["point_event"]["Update"]) {
        const { data, error } = await supabase.from('point_event').update({
            value: (event.value || 0) + 1
        }).eq('point_id', event.point_id || '')
        .eq('recorded_at', event.recorded_at || '');

        if (error) {
            console.error('Error incrementing tally:', error);
        } else {
            console.log('Tally incremented successfully!', data);
        }
        return data
    }

    return {
        getMostRecentEvent,
        getTodaysPoints,
        updatePoint,
        deletePoint,
        newEventForPoint,
        updateEventForPoint
    };
}