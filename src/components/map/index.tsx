import { Status, Wrapper } from "@googlemaps/react-wrapper";
import mapStyle from './style';
import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { Vendors } from "../../api/types";

interface MainMapProps {
  vendors: Vendors;
  markers: {[key: string]: google.maps.Marker};
  setMarkers: React.Dispatch<React.SetStateAction<{[key: string]: google.maps.Marker}>>;
}

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`;

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  children?: React.ReactNode;
  vendors: Vendors;
  markers: {[key: string]: google.maps.Marker};
  setMarkers: React.Dispatch<React.SetStateAction<{[key: string]: google.maps.Marker}>>;
}

const Map: React.FC<MapProps> = ({
  children,
  style,
  vendors,
  markers,
  setMarkers,
  ...options
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  // Set the map
  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }

    if (map) {
      map.setOptions(options);
    }
  }, [ref, map, options]);

  // Set the initial markers
  useEffect(() => {
    if (map) {
      vendors.Items.forEach(vendor => {
        if (vendor.tweets.length) {
          const newLat = vendor.tweets[vendor.tweets.length - 1].geo.coordinates.lat;
          const newLong = vendor.tweets[vendor.tweets.length - 1].geo.coordinates.long
          // Update marker if exists (and is not same position), else just add new one
          if (
            markers[vendor.twitterId]
          ) {
            if (
              markers[vendor.twitterId]?.getPosition()?.lat() !== newLat && 
              markers[vendor.twitterId]?.getPosition()?.lng() !== newLong
            ) {
              markers[vendor.twitterId].setPosition({
                lat: newLat,
                lng: newLong
              })
            }
          } else {
            const marker = new google.maps.Marker({
              position: { lat: vendor.tweets[vendor.tweets.length - 1].geo.coordinates.lat, lng: vendor.tweets[vendor.tweets.length - 1].geo.coordinates.long },
              title: vendor.twitterId,
              map: map
            });
  
            marker.addListener('click', () => {
              console.log('clicked', vendor.twitterId);
            });
  
            setMarkers({
              ...markers,
              [vendor.twitterId]: marker
            })
          }
        }
      })
    }
  }, [map, vendors.Items, markers, setMarkers])

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

export default function MapWrapper({vendors, markers, setMarkers}: MainMapProps) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
    return (
      <Wrapper apiKey={apiKey} render={(status: Status) => {
        switch (status) {
          case Status.LOADING:
            return <p>loading</p>;
          case Status.FAILURE:
            return <p>fail</p>;
          case Status.SUCCESS:
            return (
            <MapContainer>
              <Map
              styles={mapStyle}
                center={{
                  lat: 38.9072,
                  lng: -77.036
                }}
                disableDefaultUI
                zoom={13}
                style={{ height: "100%" }}
                vendors={vendors}
                markers={markers}
                setMarkers={setMarkers}
              >
            </Map>
            </MapContainer>
          )
        }
      }}/>
    )
  }
