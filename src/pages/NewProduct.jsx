import React, { useState } from 'react';
import Button from '../components/ui/Button';
import {uploadImage} from '../api/uploader'
import useProduct from '../hooks/useProducts';

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const {addProduct} = useProduct();

  const handleChange = (e) => {
    const {name, value, files} = e.target;
    if(name === 'file'){
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({...product, [name] : value}))
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    setIsUploading(true); 
    uploadImage(file)
    .then(url => {
        addProduct.mutate({product, url}, {onSuccess:() => {
        setSuccess("성공적으로 제품을 등록했습니다.")
        setTimeout(() => {
        setSuccess(null); 
      }, 4000);
      }})
    })
    .finally(() => setIsUploading(false))
  }

  return (
    <section className='w-full p-12 mt-[120px]'>
      <p className='mb-5 pb-3'>새 제품 등록</p>
      {success && <p className='my-2'>✅{success}</p>}
      {file && <img className='w-[500px] mx-auto mb-3' src={URL.createObjectURL(file)} alt='local file'/>}
      <form className='flex flex-col px-12 pt-5 pb-8 border-y border-gray-500' onSubmit={handleSubmit}>
        <input 
          type="file"
          accept='image/*'
          required
          name='file'
          className='border p-2 mb-3 rounded-md'
          onChange={handleChange}
        />
        <input 
          type="text" 
          name='title'
          required
          value={product.title ?? ''}
          placeholder='제품명'
          className='border p-2 rounded-md mb-2'
          onChange={handleChange}
        />
        <input 
          type="number" 
          name='price'
          required
          value={product.price ?? ''}
          placeholder='가격'
          className='border p-2 rounded-md mb-2'
          onChange={handleChange}
        />
        <input 
          type="text" 
          name='category'
          required
          value={product.category ?? ''}
          placeholder='카테고리'
          className='border p-2 rounded-md mb-2'
          onChange={handleChange}
        />
        <input 
          type="text" 
          name='description'
          required
          value={product.description ?? ''}
          placeholder='제품 설명'
          className='border p-2 rounded-md mb-2'
          onChange={handleChange}
        />
        <input 
          type="text" 
          name='options'
          required
          value={product.options ?? ''}
          placeholder='옵션들(콤마(,)로 구분)'
          className='border p-2 rounded-md mb-[50px]'
          onChange={handleChange}
        />
        <Button text={isUploading ? "업로드 중..." : "등록하기"} disabled={isUploading}/> 
      </form>
    </section>
  );
}

