import styled from 'styled-components';
import Tile from './tile';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getVendors } from '../../api/vendors';
import { Dispatch, SetStateAction } from 'react';
import CircularIndeterminate from './loader';
import { Vendors } from '../../api/types';

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
            const res = await getVendors<Vendors | Error>(2, vendors.lastEvaluatedKey ?? undefined) as Vendors;
            res.Items = [...vendors.Items, ...res.Items];
            res.count = vendors.count + res.count;
            setVendors(res);
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
                            geo={vendor.tweets[0]?.geo} 
                            imgUrl={vendor.image} 
                        />
                    ))}
            </InfiniteScroll>
        </Dashboard>
    )
}
