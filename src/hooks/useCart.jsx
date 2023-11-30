import { addOrUpdateToCart, removeFromCart, getCarts } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';

export default function useCarts() {
  const {uid} = useAuthContext();
  const queryClient = useQueryClient();

  const cartQuery = useQuery({queryKey:['carts', uid || ''], queryFn:() => getCarts(uid), ...{enabled:!!uid}});

  const addOrUpdateItem = useMutation(
      {mutationFn:(product) => addOrUpdateToCart(uid, product),
        onSuccess: () => queryClient.invalidateQueries(['carts', uid])
      }
    )

    const removeItem = useMutation(
      {mutationFn:(id) => removeFromCart(uid, id),
        onSuccess:() => queryClient.invalidateQueries(['carts', uid])
      }
    )

    return {cartQuery, addOrUpdateItem, removeItem}
}