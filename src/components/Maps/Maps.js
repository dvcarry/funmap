import React, { useContext } from 'react';
import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps';
import { RoutesContext } from '../../context/RoutesContext';
import { defaulteCenter } from './../../data/data'


export const Maps = ({setCenter}) => {

    const { routes, dragPlacemark } = useContext(RoutesContext)

    const onBoundsChange = e => {
        setCenter(e.originalEvent.newCenter)
    }

    const arrayCoordinates = routes.map(route => route.coordinates)

    return (
        <YMaps>
            <Map
                defaultState={{ center: defaulteCenter, zoom: 9 }} 
                width='100%'
                height='100vh'
                onBoundsChange={onBoundsChange}
            >
                {
                    routes.map((route, index) =>
                        <Placemark
                            geometry={route.coordinates}
                            key={route.id}
                            options={{
                                draggable: true,
                                useMapMarginInDragging: true,
                                openBalloonOnClick: true
                            }}
                            properties={{
                                balloonContentBody: route.name
                            }}
                            modules={['geoObject.addon.balloon']}
                            onDrag={e => dragPlacemark(e.get('target').geometry._coordinates, route.id)}
                        />)
                }
                <Polyline
                    geometry={arrayCoordinates}
                    options={{
                        balloonCloseButton: false,
                        strokeColor: '#000',
                        strokeWidth: 2,
                        strokeOpacity: 0.5,
                    }}
                />
            </Map>
        </YMaps>
    )
}