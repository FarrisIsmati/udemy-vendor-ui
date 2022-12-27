import { useEffect, useRef } from "react";
import { Loader } from '@googlemaps/js-api-loader';

export default({
    center,
    zoom,
  }: any) => {
    const ref = useRef();
  
    // useEffect(() => {
    //     const loader = new Loader({
    //         apiKey: 'yourAPIkey',
    //         version: 'weekly',
    //       });
      
    // });
  
    return <p>lol</p>//<div ref={ref} id="map" />;
  }