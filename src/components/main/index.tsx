import { useState } from "react";
import { Vendors } from "../../api/types"
import Dashboard from "../dashboard";
import Map from '../../components/map';
import styled from "styled-components";
import useWebsocket from "./hooks/useWebsocket";

interface MainProps {
    GOOGLE_MAPS_API_KEY: string,
    initVendors: Vendors
}

const MainStyled = styled.main`
  display: flex;
`;

export default ({ GOOGLE_MAPS_API_KEY, initVendors }: MainProps) => {
    const [vendors, setVendors] = useState(initVendors);

    useWebsocket({setVendors});

    return (
        <MainStyled>
            <Dashboard vendors={vendors} setVendors={setVendors} />
            <Map GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY} vendors={vendors} />
        </MainStyled>
    )
}