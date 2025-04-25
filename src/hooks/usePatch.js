import { ApiPatchRequest } from "@/axios/apiRequest";

const usePatch = async (url, request) => {
  try {
    const response = await ApiPatchRequest(url, request);
    console.log(response); // ✅ Now it will always log when there’s a response
    console.log("called");

    return {
      data: response.status === 201 || response.status === 200 ? response.data.data : null,
      error: response.status !== 201 && response.status !== 200
        ? response.response?.data?.errorMessage?.message || "Unknown error"
        : null,
      status: response.status,
    };
  } catch (error) {
    console.error("API Patch Request Error:", error); // ✅ Logs the error response
    return {
      data: null,
      error: error.response?.data?.errorMessage?.message || "Something went wrong",
      status: error.response?.status || 500,
    };
  }
};

export default usePatch;
