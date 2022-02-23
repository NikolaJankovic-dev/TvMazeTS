import axios from "axios";

export async function getTop() {
    try {
        const response = await axios.get('https://api.tvmaze.com/shows')
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}