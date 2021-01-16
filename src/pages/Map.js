import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const handleApiLoaded = (map, maps) => {

    // var heatmapData = [
    //     new maps.LatLng(49.266083, -123.244471),
    //     new maps.LatLng(49.261933, -123.241251),
    //     new maps.LatLng(49.259019, -123.246190),
    //     new maps.LatLng(49.265199, -123.246225),
    //     new maps.LatLng(49.262998, -123.248711),
    //     new maps.LatLng(49.259663, -123.250857),
    //     new maps.LatLng(49.256395, -123.251402),
    //     new maps.LatLng(49.266086, -123.244461),
    //     new maps.LatLng(49.261943, -123.241259),
    //     new maps.LatLng(49.259119, -123.246290),
    //     new maps.LatLng(49.261199, -123.246225),
    //     new maps.LatLng(49.262298, -123.248713),
    //     new maps.LatLng(49.259963, -123.2508578),
    //     new maps.LatLng(49.253395, -123.2514022),
    // ];


    let heatmapData = [];
    for (let i = 0; i < 250; i++) {
        const max = 0.01;
        const min = -max;
        let x = Math.random() * (max - min) + min;
        let y = Math.random() * (max - min) + min;
        heatmapData.push({location: new maps.LatLng(49.265 + x, -123.250 + y), weight: 0.1});
    }    

    console.log(heatmapData);

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
            // Important! Always set the container height explicitly
            <div style={{ height: '50vh', width: '70%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyB12Z1ngare18mezYXsvcfjInBIhbmdu-Y' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                >
                    <AnyReactComponent
                        lat={49.2656534435675}
                        lng={-123.25035467904151}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;