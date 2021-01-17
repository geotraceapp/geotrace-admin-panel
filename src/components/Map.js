import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import './Map.css';

const handleApiLoaded = (map, maps, establishments) => {
  let heatmapData = [];
  if (establishments.length > 0) {
      console.log(establishments);
      heatmapData = establishments.map((establishment) => {
          let lat = establishment.lat;
          let lng = establishment.lng;
          const weight = establishment.count / 10 ;
          return { location: new maps.LatLng(lat, lng), weight: weight }
      })
  }
  let heatmap = new maps.visualization.HeatmapLayer({
      data: heatmapData
  });
  heatmap.set("radius", heatmap.get("radius") ? null : 20);
  heatmap.setMap(map);
};

const Map = ({ establishments }) => {

  const [ loaded, setLoaded ] = React.useState(false)

  const [ map, setMap ] = React.useState()
  const [ maps, setMaps ] = React.useState()

  useEffect(() => {
    if (loaded) {
      handleApiLoaded(map, maps, establishments)
    }
  }, [establishments, loaded, map, maps])

  return (
    <div className="mapContainer">
        <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyB12Z1ngare18mezYXsvcfjInBIhbmdu-Y' }}
            defaultCenter={{
              lat: 49.2656534435675,
              lng: -123.25035467904151
            }}
            defaultZoom={13}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {
              setMap(map)
              setMaps(maps)
              // handleApiLoaded(map, maps, this.props.establishments)
              setLoaded(true)
            }}
        >
        </GoogleMapReact>
    </div>
  )
}

export default Map;