import {useMutation, useQueryClient, useQuery} from '@tanstack/react-query';
import {addNewProduct, getProducts as fetchProducts} from '../api/firebase'



export default function useProduct() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({queryKey:['products'], queryFn:() => fetchProducts(), ...{staleTime: 1000 * 60}})

  const addProduct = useMutation({mutationFn:({product, url}) => addNewProduct(product, url), onSuccess: () => queryClient.invalidateQueries('products')})

  return {productsQuery, addProduct}

}