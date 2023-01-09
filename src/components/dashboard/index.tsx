import styled from 'styled-components';
import Tile from './tile';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getVendors } from '../../api/vendors';
import { Dispatch, SetStateAction } from 'react';
import CircularIndeterminate from './loader';
import { Vendors } from '../../api/types';
import { vendorsSort } from '../../helper/util';

interface DashboardProps {
    vendors: Vendors;
    setVendors: Dispatch<SetStateAction<Vendors>>;
    markers: {[key: string]: google.maps.Marker};
}

const Dashboard = styled.div`
    width: 400px;
    overflow: auto;
`;

export default ({vendors, setVendors, markers}: DashboardProps) => {
    const next = async () => {
        try {
            const updatedVendors: Vendors = {
                Items: [...vendors.Items],
                count: 0,
                lastEvaluatedKey: null
            };

            // Where you would use try catch to show error handling in case of bad API call (future case)
            const res = await getVendors<Vendors | Error>(2, vendors.lastEvaluatedKey ?? undefined) as Vendors;

            // For each new vendor add it to the list
            // Note: future case if you are going to bring in new vendors in the event data gets updated to render the marker (and it's not loaded)
            // you need to check if it is already loaded in browser and if not bring it in
            res.Items.forEach((newVendor) => {
                console.log('add vendor', newVendor.name);
                updatedVendors.Items.push(newVendor)
            })
            
            updatedVendors.Items = vendorsSort(updatedVendors.Items);
            updatedVendors.count = vendors.count + res.count;
            updatedVendors.lastEvaluatedKey = res.lastEvaluatedKey;
            setVendors(updatedVendors);
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message);
            } else {
                throw new Error('getVendors unexpected error');   
            }
        }
    }

    return (
        <Dashboard id="scrollableDiv">
            <InfiniteScroll
                dataLength={vendors.Items.length}
                next={next}
                hasMore={!!vendors.lastEvaluatedKey}
                loader={<CircularIndeterminate/>}
                scrollableTarget="scrollableDiv"
            >
                {
                vendors.Items.map(
                    vendor => (
                        <Tile 
                            key={vendor.twitterId} 
                            name={vendor.name} 
                            geo={vendor.tweets[vendor.tweets.length - 1]?.geo} 
                            imgUrl={vendor.image}
                        />
                    ))}
            </InfiniteScroll>
        </Dashboard>
    )
}
