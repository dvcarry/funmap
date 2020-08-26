import React, { useState, useContext } from 'react';
import './App.css';
import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps';
import { Route } from './components/Route/Route';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { RoutesContext } from './context/RoutesContext';


const defaulteCenter = [55.75, 37.57]

function App() {

  const [center, setCenter] = useState(null)
  const [input, setInput] = useState('')

  const { routes, addRoute, dragPlacemark } = useContext(RoutesContext)

  const onBoundsChange = e => {
    setCenter(e.originalEvent.newCenter)
  }

  const onChangeInputHandler = event => {
    setInput(event.target.value)
  }

  const onKeyInputHandler = event => {
    if (event.keyCode === 13 || event.which === 13) {
      addRoute(input, center || defaulteCenter)
      setInput('')
    }
  }

  // const deleteRoute = id => {
  //   setRoutes(routes.filter(route => route.id !== id))
  // }



  const arrayCoordinates = routes.map(route => route.coordinates)


  return (
    <div className="App">
      <div className='grid'>
        <DndProvider backend={HTML5Backend}>
          <div>
            <input
              placeholder='Введите название маршрута'
              value={input}
              onChange={onChangeInputHandler}
              onKeyPress={onKeyInputHandler}
              className='routes_input'
            />
            {
              routes.map(route => {
                return (
                  <Route
                    id={route.id}
                    name={route.name}
                    key={route.id}
                    // deleteRoute={deleteRoute} 
                    />
                )
              })
            }
          </div>
        </DndProvider>


        <YMaps>
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
        </YMaps>
      </div>

    </div>
  );
}

export default App;
