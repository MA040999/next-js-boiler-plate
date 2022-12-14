import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IPost } from '../interfaces/post.interface'
import nextApiRequest from '../lib/nextApiRequest'
import { CreatePostForm } from '../schemas/postFormSchema'
import HTTP_METHODS from '../utils/httpsMethods'
import NEXT_API_ENDPOINTS from '../utils/nextApiEndpoints'

const createPost = (postData: CreatePostForm) => {

  return nextApiRequest<IPost>(HTTP_METHODS.POST, NEXT_API_ENDPOINTS.CREATE_POST, postData)
  
}

const useCreatePost = () => {
  
  const queryClient = useQueryClient()

  return useMutation({ 
    mutationFn: createPost,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export { useCreatePost, createPost }
