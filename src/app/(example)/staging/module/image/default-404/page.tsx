import {Body2, CustomImage} from '@forworkchoe/core/components';
import {numberWithComma, range} from '@forworkchoe/core/utils';
import styles from './page.module.scss';
import React from 'react';

// URL: http://localhost:3000/staging/module/image/default-404
// Doc: https://docs.google.com/document/d/1ZX8A70x6DlfBDeVmBDUdE5-B4hSGtPHKURaVW_IXUuE/edit
export default function Page() {
  const list: Product[] = range(1, 100).map(value => ({
    pk: value,
    name: `${value}번 상품`,
    thumbnail: value % 4 === 0 ? '' : 'https://picsum.photos/200/300',
    price: 100000
  }));

  return (
    <div className={styles.listContainer}>
      {list.map(product => (
        <ProductListItem key={product.pk} product={product}/>
      ))}
    </div>
  );
}

interface Product {
  pk: number;
  thumbnail: string;
  name: string;
  price: number;
}

function ProductListItem({product}: {product: Product}) {
  return (
    <div className={styles.productItem}>
      <CustomImage src={product.thumbnail} width={200} height={300} alt="상품 이미지" fallback={{type: 'default-404'}}/>
      <Body2>{product.name}</Body2>
      <Body2>{numberWithComma(product.price)}원</Body2>
    </div>
  );
}
