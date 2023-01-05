import { isBrowser } from '../helper/util';

export const websocket = (url: string) => {
    if (isBrowser) {
        try {
            const ws = new WebSocket(url);
            return ws;
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(e.message);
            } 
            throw new Error('connectWs unexpected error');   
        }
    } else {
        throw new Error('browser not available');
    }
}
