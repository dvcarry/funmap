import React, { useState, useContext } from 'react';
import './App.css';
// import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps';
import { RoutesContext } from './context/RoutesContext';
import { Maps } from './components/Maps/Maps'

import { Routes } from './components/Routes/Routes';




function App() {

  const [center, setCenter] = useState(null)

  return (
    <div className="App">
      <div className='grid'>
        <Routes center={center}/>
        <Maps setCenter={setCenter}/>
        {/* <YMaps>
          <Map
            defaultState={{ center: [55.75, 37.57], zoom: 9 }}
            width={640}
            height={640}
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
                strokeWidth: 4,
                strokeOpacity: 0.5,
              }}
            />
          </Map>
        </YMaps> */}
      </div>

    </div>
  );
}

export default App;
