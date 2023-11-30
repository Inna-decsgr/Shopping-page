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
    <section className='w-full text-center'>
      <h2 className='text-2xl font-bold my-4'>새로운 제품 등록</h2>
      {success && <p className='my-2'>✅{success}</p>}
      {file && <img className='w-96 mx-auto mb-2' src={URL.createObjectURL(file)} alt='local file'/>}
      <form className='flex flex-col px-12' onSubmit={handleSubmit}>
        <input 
          type="file"
          accept='image/*'
          required
          name='file'
          onChange={handleChange}
        />
        <input 
          type="text" 
          name='title'
          required
          value={product.title ?? ''}
          placeholder='제품명'
          onChange={handleChange}
        />
        <input 
          type="number" 
          name='price'
          required
          value={product.price ?? ''}
          placeholder='가격'
          onChange={handleChange}
        />
        <input 
          type="text" 
          name='category'
          required
          value={product.category ?? ''}
          placeholder='카테고리'
          onChange={handleChange}
        />
        <input 
          type="text" 
          name='description'
          required
          value={product.description ?? ''}
          placeholder='제품 설명'
          onChange={handleChange}
        />
        <input 
          type="text" 
          name='options'
          required
          value={product.options ?? ''}
          placeholder='옵션들(콤마(,)로 구분)'
          onChange={handleChange}
        />
        <Button text={isUploading ? "업로드 중..." : "제품 등록하기"} disabled={isUploading}/>
      </form>
    </section>
  );
}

