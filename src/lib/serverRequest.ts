import { GetServerSidePropsContext, NextApiRequest } from "next";
import axios, { AxiosResponse } from "axios";
import HTTP_METHODS from "../utils/httpsMethods";

interface ServerRequest {

    method : HTTP_METHODS,
    endPoint : string,
    context? : GetServerSidePropsContext,
    req? : NextApiRequest,

}

interface ServerResponse<T> {

    data: T
	status: number

}

export const serverRequest = async <T>({ method, endPoint, context, req }: ServerRequest): Promise<ServerResponse<T>> => {

	const accessTokenForRequest = context ? context.req.cookies.accessToken : req?.cookies.accessToken;

	let ip = context ? context.req?.headers['x-real-ip'] : req?.headers['x-real-ip']

    try {

		const axiosResponse: AxiosResponse<T> = await axios({
			method,
			url : `${process.env.SERVER_URL}/${endPoint}`,
			data : req?.body,
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