import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './Map.css';

const handleApiLoaded = (map, maps, establishments) => {
    let heatmapData = [];
    // for (let i = 0; i < 250; i++) {
    //     const max = 0.01;
    //     const min = -max;
    //     let x = Math.random() * (max - min) + min;
    //     let y = Math.random() * (max - min) + min;
    //     heatmapData.push({ location: new maps.LatLng(49.265 + x, -123.250 + y), weight: 0.1 });
    // }

    // const heatmapData = establishments.map((establishment) => {
    //     let lat = establishment.lat;
    //     let lng = establishment.lng;

    //     return { location: new maps.LatLng(lat, lng), weight: 0.1 }
    // })

    if (establishments.length > 0) {
        console.log(establishments);

        heatmapData = establishments.map((establishment) => {
            let lat = establishment.lat;
            let lng = establishment.lng;

            return { location: new maps.LatLng(lat, lng), weight: 0.1 }
        })
    }

    console.log(heatmapData)

    let heatmap = new maps.visualization.HeatmapLayer({
        data: heatmapData
    });

    heatmap.set("radius", heatmap.get("radius") ? null : 20);

    heatmap.setMap(map);
};


class Map extends Component {



    static defaultProps = {
        center: {
            lat: 49.2656534435675,
            lng: -123.25035467904151
        },
        zoom: 13
    };

    render() {
        return (
            <div className="mapContainer">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyB12Z1ngare18mezYXsvcfjInBIhbmdu-Y' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, this.props.establishments)}
                >
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;