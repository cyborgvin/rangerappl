import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZmxlc2hjaXJjdWl0cyIsImEiOiJjbDA4MmRyeHkwMDFoM2lvemhiaHl0MGc1In0.r5_qW822Nk9cjoUt-_Bktw';

const Map = () => {
  const mapContainerRef = useRef(null);

  //coords to dispaly, usestate = center on pollock country park
  const [lng, setLng] = useState(-4.3152);
  const [lat, setLat] = useState(55.8275);
  const [zoom, setZoom] = useState(14);

  // first map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

        // adds geolocate control 
        map.addControl(
          new mapboxgl.GeolocateControl({
              positionOptions: {
                  enableHighAccuracy: true
              },
              // When active the map will receive updates to the device's location as it changes.
              trackUserLocation: true,
              // Draw an arrow next to the location dot to indicate which direction the device is heading.
              showUserHeading: true
          })
      );

    // add navigation control buttons
    map.addControl(new mapboxgl.NavigationControl({
      showCompass: true
    }), 'top-right');



    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    return () => map.remove();
  }, []); 

  return (
    <div>
      <div className='map-container' ref={mapContainerRef} />
      <div>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
    </div>
  );
};

export default Map;
