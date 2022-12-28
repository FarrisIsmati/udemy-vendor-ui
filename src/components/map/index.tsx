import { Status, Wrapper } from "@googlemaps/react-wrapper";
import mapStyle from './style';
import React, { useEffect } from "react";
// import { useDeepCompareEffectForMaps } from './hooks';
import styled from 'styled-components';

interface MainMapProps {
  GOOGLE_MAPS_API_KEY: string;
}

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`;

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  // Set the map
  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }

    if (map) {
      map.setOptions(options);

    }
  }, [ref, map]);

  // Set the markers
  useEffect(() => {
    const myLatLng = { lat: 38.9072, lng: -77.036 };

    if (map) {
      // First marekr
      const marker = new google.maps.Marker({
        position: myLatLng,
        title: "Hello World!",
      });

      marker.addListener('click', () => {
        console.log('CLICKED');
      })

      marker.setMap(map)
      // marker.setMap(null);
    }
  }, [map])
  

  // // Double check once you end up changing props for markers
  // // because React does not do deep comparisons, a custom hook is used to prevent onIdle from continously firing
  // // see discussion in https://github.com/googlemaps/js-samples/issues/946
  // useDeepCompareEffectForMaps(() => {
  //   if (map) {
  //     map.setOptions(options);
  //   }
  // }, [map, options]);

  // React.useEffect(() => {
  //   if (map) {
  //     // If listeners change clear them
  //     ["click", "idle"].forEach((eventName) =>
  //       google.maps.event.clearListeners(map, eventName)
  //     );

  //     if (onClick) {
  //       map.addListener("click", onClick);
  //     }

  //     if (onIdle) {
  //       map.addListener("idle", () => onIdle(map));
  //     }
  //   }
  // }, [map, onClick, onIdle]);

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

export default ({GOOGLE_MAPS_API_KEY}: MainMapProps) => {
  // const [zoom, setZoom] = React.useState(3); // initial zoom
  // const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
  //   lat: 0,
  //   lng: 0,
  // });

  // const onIdle = (m: google.maps.Map) => {
    // console.log("onIdle");
    // setZoom(m.getZoom()!);
    // setCenter(m.getCenter()!.toJSON());
  // };

    return (
      <Wrapper apiKey={GOOGLE_MAPS_API_KEY} render={(status: Status) => {
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
                // onIdle={onIdle}
                disableDefaultUI
                zoom={13}
                style={{ height: "100%" }}
              >
            </Map>
            </MapContainer>
          )
        }
      }}/>
    )
  }
