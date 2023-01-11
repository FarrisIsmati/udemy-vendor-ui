// https://swr.vercel.app/ fetch cached hook, then revalidate cache async so it's fast UI wise

export const getVendors = async <T>(limit?: number, lastEvaluatedKey?: string): Promise<T> => {
  const vendorsApiUrl = process.env.NEXT_PUBLIC_VENDORS_API_URL;

  if (vendorsApiUrl) {
    const url = new URL(vendorsApiUrl);

    if (limit) {
      url.searchParams.append('limit', limit.toString());
    }

    if (lastEvaluatedKey) {
      url.searchParams.append('lastEvaluatedKey', JSON.stringify(lastEvaluatedKey));
    }

    const res = await fetch(url.toString());

    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error(`error failed to fetch data: ${res.statusText}`);
    }

    return res.json();
  }

  throw new Error('No vendors api url available');
}
