import { ApiPostRequest } from "@/axios/apiRequest";

const usePost = async (url, request) => {
  const response = await ApiPostRequest(url, request);
  console.log(response);
  if (response) {
    return {
      data: response.status == 201 || response.status == 200 ? response.data.data : null,
      error: response.status !== 201 && response.status !== 200
      ? response.response.data.errorMessage.message : null,
      status: response.status,
    };
  }
};

export default usePost;
