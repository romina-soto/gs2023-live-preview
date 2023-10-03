import Head from 'next/head'
import Image from 'next/image'
import Hero, {FullHero} from '../../components/Hero'
import Main from '../../components/Main'
import ProductGrid from '../../components/ProductGrid'
import {allProducts, getSomeProducts} from '../../utils/getProducts'

import { getPageBySlug } from '../../utils/getPages'


export default async function Home(props) {

    const {link, stripes,landingPageTitle} = await getPageBySlug('/')
  console.log({stripes})
    const products = await getSomeProducts(4)


  return (
    <>
      <Head>
        <title>Welcome to the Hygraph Shop</title>
      </Head>

      { stripes && stripes.map(stripe => {
      console.log(stripe.__typename)
        if (stripe.__typename === 'CallToAction') {
          console.log(stripe.headline)
          return <Hero
            key={stripe.id}
            title={stripe.heading}
            description={stripe.body.raw}
            button={{text: stripe.button.text, url: stripe.button.url}}
          />
        }
        if (stripe.__typename === 'ProductGrid') {
          return <ProductGrid key={stripe.id} title={stripe.headline} products={stripe.products} />
        }
      })}
    </>
  )
}
