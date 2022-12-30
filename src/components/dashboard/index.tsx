import styled from 'styled-components';
import Tile from './tile';

interface DashboardProps {
    vendors: any[]
}

const Dashboard = styled.div`
    width: 400px;
    height: 100%;
`;

export default ({vendors}: DashboardProps) => {
    console.log('lol', vendors);
    return (
        <Dashboard>
            {vendors.Items.map(vendor => <Tile name={vendor.name} location={vendor.location} imgUrl={vendor.image} />)}
        </Dashboard>
    )
}