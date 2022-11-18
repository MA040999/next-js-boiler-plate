import type { NextApiRequest, NextApiResponse } from 'next'
import { IPost } from '../../interfaces/post.interface';
import { serverRequest } from '../../lib/serverRequest';
import HTTP_METHODS from '../../utils/httpsMethods';
import SERVER_API_ENDPOINTS from '../../utils/serverApiEndpoints';

type Response = IPost;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {

  const response = await serverRequest<Response>({
      method : req.method as HTTP_METHODS,
      endPoint : SERVER_API_ENDPOINTS.CREATE_POST,
      req,
  });

  res.status(response.status).json(response.data);

}
