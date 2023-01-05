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
}

const Dashboard = styled.div`
    width: 400px;
    overflow: auto;
`;

export default ({vendors, setVendors}: DashboardProps) => {
    const next = async () => {
        try {
            const updatedVendors: Vendors = {
                Items: [...vendors.Items],
                count: 0,
                lastEvaluatedKey: null
            };

            const res = await getVendors<Vendors | Error>(2, vendors.lastEvaluatedKey ?? undefined) as Vendors;

            // Check if the items you are getting already exist
            // This would happen if a truck tweeted and got added to the list
            // Not super efficent (improvement) make this better algorithmically!
            res.Items.forEach((newVendor) => {
                // If new vendor is not loaded add it else do nothing
                // This is taxing but up to user to figure out more performant ways of handling
                // Future store every vender in key store by id
                // And store every vendor in an array (array store sorting data only (for positioning) and refer to key store to get data)
                if (!vendors.Items.find((existingVendor) => newVendor.twitterId == existingVendor.twitterId)) {
                    console.log('ADD NEW VENDOR', newVendor.name);
                    updatedVendors.Items.push(newVendor)
                } else {
                    console.log('DO NOT ADD', newVendor.name)
                }
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
