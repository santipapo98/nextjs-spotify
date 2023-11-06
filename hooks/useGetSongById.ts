import { Song } from "@/types"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"

const useGetSongById = (id?: string) => {
    const [isLoading, setIsLoaging] = useState(false)
    const [song, setSong] = useState<Song | undefined>()
    const {supabaseClient} = useSessionContext()

    useEffect(() => {
        if(!id){
            return
        }

        setIsLoaging(true)
        const fetchSong = async () => {
            const {data, error} = await supabaseClient.from("songs").select("*").eq("id", id).single()
            if(error) {
                setIsLoaging(false)
                return toast.error(error.message)
            }
            setSong(data as Song)
            setIsLoaging(false)
        }

        fetchSong()
    }, [id, supabaseClient])

    return useMemo(() => ({isLoading, song }), [isLoading, song])
}

export default useGetSongById