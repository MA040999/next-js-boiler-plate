import axios, { AxiosResponse, GenericAbortSignal } from "axios";
import HTTP_METHODS from "../utils/httpsMethods";
import NEXT_API_ENDPOINTS from "../utils/nextApiEndpoints";

const nextApiRequest = async <T>(
  method: HTTP_METHODS,
  endPoint: NEXT_API_ENDPOINTS,
  body?: any,
  params?: any,
  signal?: GenericAbortSignal
) => {

  try {

    let data: AxiosResponse<T> = await axios({
      method,
      url: `/api/${endPoint}`,
      withCredentials: true,
      signal,
      data: body,
      params,
    });

    return data;

  } catch (error: any) {

    throw error;

  }
};

export default nextApiRequest;
