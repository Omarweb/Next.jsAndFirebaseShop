

import ProductsFeatured from '../components/products/ProductsFeatured'
import styles from '../styles/Home.module.css'
import Layout from './layout'
import { db } from "../firebase/firebaseApp";
import { collection, getDocs } from "firebase/firestore";
import { product } from '../types';


export default function Home({ products }: { products: product[] }) {
  console.log(products)
  return (
    <Layout>
      <h1 className={styles.title}>
        Welcome to <span className='text-second'>Next.Js Shop</span>
      </h1>
      <ProductsFeatured products={products} />
    </Layout>
  )
}

export async function getServerSideProps() {

  const res = await getDocs(collection(db, "products"))
  const data = res.docs.map((doc) => {

    return {
      id: doc.id,
      data: {
        ...doc.data()
      }
    }
  })

  return { props: { products: data } }
}
