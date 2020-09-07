import React, { useContext } from 'react';
import './index.css'
import { RoutesContext } from '../../context/RoutesContext';
import { Draggable } from 'react-beautiful-dnd';


export const Route = ({ id, name, index }) => {

    const { deleteRoute } = useContext(RoutesContext)

    return (
        <Draggable draggableId={id.toString()} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`route${snapshot.isDragging ? ' dragged' : ''}`}                   
                >
                    <span>{name}</span>
                    <span
                        className='route_delete'
                        onClick={() => deleteRoute(id)}
                    >
                        &#215;
                    </span>
                </div>
            )}
        </Draggable>
    )
}