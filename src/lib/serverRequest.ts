import { GetServerSidePropsContext, NextApiRequest } from "next";
import SERVER_API_ENDPOINTS from "../utils/serverApiEndpoints";
import axios, { AxiosResponse } from "axios";
import HTTP_METHODS from "../utils/httpsMethods";

interface ServerRequest {

    method : HTTP_METHODS,
    endPoint : SERVER_API_ENDPOINTS,
    context? : GetServerSidePropsContext,
    req? : NextApiRequest,
    body? : any,

}

interface ServerResponse<T> {

    data: T
	status: number

}

export const serverRequest = async <T>({ method, endPoint, context, body, req }: ServerRequest): Promise<ServerResponse<T>> => {

	const accessTokenForRequest = context ? context.req.cookies.accessToken : req?.cookies.accessToken;

	let ip = context ? context.req?.headers['x-real-ip'] : req?.headers['x-real-ip']

    try {

		const axiosResponse: AxiosResponse<T> = await axios({
			method,
			url : `${process.env.SERVER_URL}/${endPoint}`,
			data : body,
			headers : {
				'access-token' : accessTokenForRequest ?? '',
				'client-ip': ip ?? '',
			},
			auth : {
				username : process.env.AUTHENTICATION_USERNAME ?? '',
				password : process.env.AUTHENTICATION_PASSWORD ?? ''
			},
			withCredentials: true,
		});

		return { data: axiosResponse.data, status: axiosResponse.status };

	}

	catch (error: any) {

		return { data: error.response?.data, status: error.response?.status ?? 500 }

	}
}