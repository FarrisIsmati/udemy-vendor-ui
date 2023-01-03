// https://swr.vercel.app/ (Try using SWR for fetching new data ONLY WHEN IMPLEMENTING ON CLIENT SIDE NOT IN STATICPROPS)
// Okay to fetch vendor data here

export interface Vendor {
    name: string,
    location: string,
    image: string
}

export interface Vendors {
    Items: Vendor[]
}

export const getVendors = async <T>(): Promise<T | Error> => {
    const url = process.env.VENDORS_API_URL;

    if (url) {
      const res = await fetch(url);

      // Recommendation: handle errors
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`error failed to fetch data: ${res.statusText}`);
      }

      return res.json();
    }
  
    throw new Error('No vendors api url available');
  }
  