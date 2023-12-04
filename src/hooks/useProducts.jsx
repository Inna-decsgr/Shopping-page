import {useMutation, useQueryClient, useQuery} from '@tanstack/react-query';
import {addNewProduct, getProducts as fetchProducts} from '../api/firebase'

// product을 읽어오고 업데이트하는 query를 사용하는 모든 것들을 한곳에서 관리, 담당하도록 만들어줄거임!! custom hook 만드는거!😝

export default function useProduct() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({queryKey:['products'], queryFn:() => fetchProducts(), ...{staleTime: 1000 * 60}})

  const addProduct = useMutation({mutationFn:({product, url}) => addNewProduct(product, url),
  onSuccess: () => queryClient.invalidateQueries('products')})

  return {productsQuery, addProduct}

}