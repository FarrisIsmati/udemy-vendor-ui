import styled from 'styled-components';
import Tile from './tile';
import { Vendors} from '../../api/vendors';

interface DashboardProps {
    vendors: Vendors;
}

const Dashboard = styled.div`
    width: 400px;
    height: 100%;
`;

export default ({vendors}: DashboardProps) => {
    return (
        <Dashboard>
            {vendors.Items.map(vendor => <Tile name={vendor.name} location={vendor.location} imgUrl={vendor.image} />)}
        </Dashboard>
    )
}