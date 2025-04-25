import { ApiPostRequest } from "@/axios/apiRequest";


 const useImagePost = async (url, request)=> {
    const response = await ApiPostRequest(url, request)
    if (response){
        return {data: response.data, error : response.error , status : response.status}
    }
}

export default useImagePost;