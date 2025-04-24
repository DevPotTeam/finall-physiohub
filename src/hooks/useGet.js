import { ApiFetchRequest } from "@/axios/apiRequest";


async function useGet (url){
    const response = await ApiFetchRequest(url)
    console.log(response)
    return {data : response.data.data, error : response.error, status : response.status}
}

export default useGet;