import { Dispatch, SetStateAction, useEffect } from "react";
import { websocket } from "../../../api/websocket";
import getConfig from "next/config";
import { Tweet, Vendor, Vendors } from "../../../api/types";

const { publicRuntimeConfig } = getConfig()
const { VENDORS_WEBSOCKET_URL } = publicRuntimeConfig

interface UseWebsocketProps {
    setVendors: Dispatch<SetStateAction<Vendors>>;
}

export default ({setVendors}: UseWebsocketProps) => {
    useEffect(() => {
        const ws = websocket(VENDORS_WEBSOCKET_URL);

        const connected = () => {
            console.log('connected')
        }
        ws.addEventListener('open', connected)

        const message = (ev: MessageEvent) => {
            const data: Tweet = JSON.parse(ev.data);
            console.log(data);
            
            setVendors(prev => {
                const updatedItems = [...prev.Items];

                // Future question (how to get a vendor to show up)
                // If they aren't already loaded?

                // Update tweet of targeted
                updatedItems.forEach(vendor => {
                    if (vendor.twitterId === data.userId) {
                        // set to start of array
                        vendor.tweets.push(data)
                    }
                })

                return {
                    Items: updatedItems,
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
    }, [VENDORS_WEBSOCKET_URL])

}