import React, { useState, createContext } from 'react'

export const RoutesContext = createContext()

export const RoutesState = ({ children }) => {

    const [routes, setRoutes] = useState([])

    const addRoute = (name, coordinates) => {
        setRoutes([...routes,
        {
            id: new Date().valueOf(),
            name,
            coordinates
        }
        ])
    }

    const deleteRoute = id => {
        setRoutes(routes.filter(route => route.id !== id))
    }

    const reoderRoutes = (fromIndex, toIndex) => {

        const newRoutes = [...routes]
        const movedItem = newRoutes.splice(fromIndex, 1)[0]
        newRoutes.splice(toIndex, 0, movedItem)        

        setRoutes(newRoutes)
    }

    const dragPlacemark = (coordinates, id) => {
        const newRoutes = routes.map(route => {
          return route.id === id
            ? {
              ...route,
              coordinates
            }
            : route
        })
        setRoutes(newRoutes)
      }

    return (
        <RoutesContext.Provider value={{routes, addRoute, deleteRoute, reoderRoutes, dragPlacemark}}>
            {children}
        </RoutesContext.Provider>
    )
}