import { summaryApi } from "../common/summaryApi"
import { Axios } from "./Axios"

export const fetchUserDetails = async () => {
    try {
        const res = await Axios({
            ...summaryApi.fetchUserDetails
        })
        return res.data
    } catch (error) {
        console.log(error);
    }
}