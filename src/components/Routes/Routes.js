import React, { useContext, useState } from 'react';
import './index.css'
import { Droppable } from 'react-beautiful-dnd';
import { RoutesContext } from '../../context/RoutesContext';
import { Route } from '../Route/Route';
import { DragDropContext } from 'react-beautiful-dnd';
import { defaulteCenter } from './../../data/data'


export const Routes = ({ center }) => {

    const [input, setInput] = useState('')

    const { routes, addRoute, reoderRoutes, deleteAllRoutes } = useContext(RoutesContext)
    console.log("Routes -> routes", routes)

    const onChangeInputHandler = event => {
        setInput(event.target.value)
    }

    const onKeyInputHandler = event => {

        if (event.keyCode === 13 || event.which === 13) {
            if (input === '') return
            addRoute(input, center || defaulteCenter)
            setInput('')
        }
    }

    const onDragEnd = (result) => {
        if (!result.destination) return
        reoderRoutes(result.source.index, result.destination.index);
    }

    return (


        <div className='routes_section'>
            <DragDropContext onDragEnd={onDragEnd}>
                <input
                    placeholder='Введите название маршрута'
                    value={input}
                    onChange={onChangeInputHandler}
                    onKeyPress={onKeyInputHandler}
                    className='routes_input'
                />
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            className='routes'
                            {...provided.droppableProps}
                        >
                            {
                                routes.map((route, index) => {
                                    return (
                                        <Route
                                            id={route.id}
                                            name={route.name}
                                            key={route.id}
                                            index={index}
                                        />
                                    )
                                })
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            {
                routes.length > 1
                    ? <span
                        onClick={deleteAllRoutes}
                        className='routes_delete'
                    >Сбросить</span>
                    : null
            }
        </div>

    )
}