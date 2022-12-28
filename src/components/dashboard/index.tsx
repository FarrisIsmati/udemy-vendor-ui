import styled from 'styled-components';
import Tile from './tile';

const Dashboard = styled.div`
    width: 400px;
    height: 100%;
`;

export default () => {
    return (
        <Dashboard>
            <Tile />
        </Dashboard>
    )
}