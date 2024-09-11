import {
  ProductCard,
  ProductInfo
} from './Product.styles'

const Product = ({productName, productUrl}) => {
  return (
    <ProductCard>
      {/* 상품 미리보기 사진 */}
      <div></div>

      <ProductInfo>
        {/* 상품명 */}
        <div>{productName}</div>

        {/* 상품 url */}
        <div>{productUrl}</div>
      </ProductInfo>
    </ProductCard>
  )
}

export default Product