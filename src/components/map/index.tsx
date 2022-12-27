import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import React from "react";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
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

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

const Mep: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

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

export default function Map({GOOGLE_MAPS_API_KEY}: MainMapProps) {
    const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = React.useState(3); // initial zoom
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
      lat: 0,
      lng: 0,
    });
    const onClick = (e: google.maps.MapMouseEvent) => {
      // avoid directly mutating state
      setClicks([...clicks, e.latLng!]);
    };
    const [marker, setMarker] = React.useState<google.maps.Marker>();

    const onIdle = (m: google.maps.Map) => {
      console.log("onIdle");
      setZoom(m.getZoom()!);
      setCenter(m.getCenter()!.toJSON());
    };
  
    
    return (
      <Wrapper apiKey={GOOGLE_MAPS_API_KEY} render={(status: Status) => {
        switch (status) {
          case Status.LOADING:
            return <p>loading</p>;
          case Status.FAILURE:
            return <p>fail</p>;
          case Status.SUCCESS:
            return <MapContainer><Mep
              center={center}
              onClick={onClick}
              onIdle={onIdle}
              zoom={zoom}
              style={{ flexGrow: "1", height: "100%" }}
            >
          </Mep></MapContainer>
        }
      }}/>
    )
  }
