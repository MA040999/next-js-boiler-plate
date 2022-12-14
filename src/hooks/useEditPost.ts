import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IPost } from '../interfaces/post.interface'
import nextApiRequest from '../lib/nextApiRequest'
import { EditPostForm } from '../schemas/postFormSchema'
import HTTP_METHODS from '../utils/httpsMethods'
import NEXT_API_ENDPOINTS from '../utils/nextApiEndpoints'

const editPost = (postData: EditPostForm) => {

  return nextApiRequest<IPost>(HTTP_METHODS.PUT, NEXT_API_ENDPOINTS.EDIT_POST + postData.id)
  
}

const useEditPost = () => {

  const queryClient = useQueryClient()

  return useMutation({ 
    mutationFn: editPost,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export { useEditPost, editPost }
