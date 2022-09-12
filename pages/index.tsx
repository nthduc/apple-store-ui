import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import Landing from '../components/Landing';
import Product from '../components/Product';
import { fetchCategories } from '../utils/fetchCategories';
import { fetchProducts } from '../utils/fetchProducts';

interface Props {
  categories: Category[];
  products: Product[];
}

const Home: NextPage<Props> = ({categories , products}) => {

  const showProducts = (category: number) => {
    return products
    .filter((product) => product.category._ref === categories[category]._id)
    .map((product) => (<Product  product={product} key={product._id}/>))
  };
  return (
    <div className="">
      <Head>
        <title>Apple</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative h-[200vh] bg-[#E7ECEE]">
        <Landing />
      </main>
      <section className="relative z-40 -mt-[100vh] min-h-screen bg-[#1B1B1B]">
        <div className="space-y-10 py-16">
          <h1 className="text-center text-4xl font-medium tracking-wide text-white
          md:text-5xl">
            New Promos
          </h1>
        </div>
      </section>
    </div>
  )
}

export default Home;

// Backend code
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const categories = await fetchCategories();
  const products = await fetchProducts(); 

  return {
    props: {
      categories,
      products,
    },
  }
}
