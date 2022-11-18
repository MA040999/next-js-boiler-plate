import axios, { AxiosResponse, GenericAbortSignal } from "axios";
import HTTP_METHODS from "../utils/httpsMethods";

const nextApiRequest = async <T>(
  method: HTTP_METHODS,
  endPoint: string,
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
