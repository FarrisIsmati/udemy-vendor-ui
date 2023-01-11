import { useEffect, useState } from "react";
import { Tweet, Vendors } from "../../api/types"
import Dashboard from "../dashboard";
import Map from '../../components/map';
import styled from "styled-components";
import { websocket } from "../../api/websocket";
import { vendorsSort } from "../../helper/util";

interface MainProps {
    initVendors: Vendors
}

const MainStyled = styled.main`
  display: flex;
`;

export default function Main({ initVendors }: MainProps) {
    // Vendor,Marker data is used at all levels below (not using redux)
    const [vendors, setVendors] = useState(initVendors);
    const [markers, setMarkers] = useState<{[key: string]: google.maps.Marker}>({});

    const websocketUrl = process.env.NEXT_PUBLIC_VENDORS_WEBSOCKET_URL;

    // Websocket connect
    useEffect(() => {
        if (websocketUrl) {
            const ws = websocket(websocketUrl);

            const connected = () => {
                console.log('connected')
            }
            ws.addEventListener('open', connected)
    
            // On message update
            const message = (ev: MessageEvent) => {
                const data: Tweet = JSON.parse(ev.data);
                console.log(data);
                
                // Set vendors
                // NOTE: will not handle bringing a non loaded vendor into the browsers data
                // future option for users
                setVendors(prev => {
                    const updatedItems = [...prev.Items];
    
                    // Update tweet of targeted (only going to update ones that are within our view)
                    updatedItems.forEach(vendor => {
                        if (vendor.twitterId === data.userId) {
                            vendor.tweets.push(data)                        
                        }
                    })
    
                    return {
                        Items: vendorsSort(updatedItems), // sorting might not be necessary for video
                        count: prev.count,
                        lastEvaluatedKey: prev.lastEvaluatedKey
                    };
                })
            }
            ws.addEventListener('message', message)
    
            // close connection on unmount
            return () => {
                ws.removeEventListener('open', connected);
                ws.removeEventListener('sendvendor', message as EventListener);
                ws.close();
            }
        }
    })

    return (
        <MainStyled>
            <Dashboard 
                vendors={vendors} 
                setVendors={setVendors} 
            />
            <Map 
                markers={markers}
                setMarkers={setMarkers}
                vendors={vendors} 
            />
        </MainStyled>
    )
}