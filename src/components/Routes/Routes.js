import React, { useContext, useState } from 'react';
import './index.css'
import { Droppable } from 'react-beautiful-dnd';
import { RoutesContext } from '../../context/RoutesContext';
import { Route } from '../Route/Route';
import { DragDropContext } from 'react-beautiful-dnd';


const defaulteCenter = [55.75, 37.57]

export const Routes = ({center}) => {

    const [input, setInput] = useState('')

    const { routes, addRoute, reoderRoutes } = useContext(RoutesContext)

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
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='routes_section'>
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
            </div>
        </DragDropContext>
    )
}