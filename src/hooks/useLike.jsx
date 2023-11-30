import { addToLike, getLikes, removeFromLike } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';

export default function useLike() {
  const {uid} = useAuthContext();
  const queryClient = useQueryClient();

  const likeQuery = useQuery({queryKey:['likes', uid || ''], queryFn:() => getLikes(uid), ...{enabled:!!uid}});

  const addItemToLike = useMutation(
      {mutationFn:(product) => addToLike(uid, product),
        onSuccess: () => queryClient.invalidateQueries(['likes', uid])
      }
    )

    const removeItemFromLike = useMutation(
      {mutationFn:(id) => removeFromLike(uid, id),
        onSuccess:() => queryClient.invalidateQueries(['likes', uid])
      }
    )

    return {likeQuery, addItemToLike, removeItemFromLike}
}