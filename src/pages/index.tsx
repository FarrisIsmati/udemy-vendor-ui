import Head from 'next/head'
import { Vendors } from '../api/types';
import { getVendors } from '../api/vendors';
import Main from '../components/main';
import { vendorsSort } from '../helper/util';

interface HomeProps {
  GOOGLE_MAPS_API_KEY: string,
  initVendors: Vendors
}

export default function Home({ GOOGLE_MAPS_API_KEY, initVendors }: HomeProps) {
  return (
    <>
      <Head>
        <title>Vendors</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Main GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY} initVendors={initVendors} />
  </>
  )
}

// Because it’s meant to be run at build time, you won’t be able to use data that’s only available during request time, 
// such as query parameters or HTTP headers.
// Need to lazy load rest of the vendors if paginated on client side after to fill out vendors prop (or state we create?)
export async function getStaticProps() {
  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY ?? ''; // Mabye we need to hdie this?
  let vendors: Vendors | Error; 
  try {
    // Future also get those with tweets first so no FE sorting
    vendors = await getVendors<Vendors>(14); //{ Items: [{name: 'lol', locaiton: 'lolz'}]}
    vendors.Items = vendorsSort(vendors.Items);
  } catch (e) {
    if (e instanceof Error) {
      vendors = { Items: [], count: 0, lastEvaluatedKey: null }
    } else {
      throw new Error('getVendors unexpected error');   
    }
  }
  
  return { 
    props: {
      GOOGLE_MAPS_API_KEY,
      initVendors: vendors
    },
    revalidate: 60, // seconds
  }
}
