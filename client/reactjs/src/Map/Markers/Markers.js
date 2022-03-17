import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  useMap,
  Marker,
  Tooltip
} from 'react-leaflet';

import {
  latLngBounds,
  Icon
} from 'leaflet';

import markerIconPng from 'leaflet/dist/images/marker-icon.png';

function Markers({ markers }) {
  const map = useMap();

  useEffect(() => {
    if (markers.length === 1) {
      const { latitude, longitude } = markers[0].location;
      map.setView(
        // Center
        [latitude, longitude],

        // Zoom
        12
      );
      return;
    }

    const markerBounds = latLngBounds([]);
    markers.forEach(({ location }) => {
      const { latitude, longitude } = location;
      markerBounds.extend([latitude, longitude]);
    });

    map.fitBounds(markerBounds, { padding: [1, 1] });
  }, [map, markers]);

  return (
    <>
      {
        markers.map(({ location, weatherData }) => {
          const {
            latitude,
            longitude,
            placeName,
            stateAbbreviation,
            zipCode
          } = location;

          const placeState = [placeName, stateAbbreviation].join(', ');
          const psz = [placeState, zipCode].join(' ');

          const { dataseries } = weatherData;

          return (
            <Marker
              key={psz}
              riseOnHover
              position={[latitude, longitude]}
              icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
            >
              <Tooltip
                direction="top"
                offset={[0, -45]}
                opacity={1}
                permanent
                className="custom-map-marker-tooltip"
              >
                {psz}
                <div className="custom-map-markers-dataseries-list">
                  {
                    dataseries.map(({ date, weatherName }) => (
                      <div key={date}>{date}: {weatherName}</div>
                    ))
                  }
                </div>
              </Tooltip>
            </Marker>
          );
        })
      }
    </>
  );
}

Markers.propTypes = {
  markers: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default Markers;
