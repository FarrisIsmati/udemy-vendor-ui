import { Vendors } from "../api/types";

export const vendorsSort = (vendors: Vendors) => vendors.Items.sort((a,b) => {
    const ad: number = a.tweets.length && new Date(a.tweets[0].date).getTime(); // must sort by number in TypeScript
    const bd: number = b.tweets.length && new Date(b.tweets[0].date).getTime();
    return bd - ad
})

