import React, { useRef, useContext } from 'react';
import './index.css'
import { useDrag, useDrop } from 'react-dnd';
import { RoutesContext } from '../../context/RoutesContext';

export const Route = ({ id, name, deleteRoute }) => {

    const { routes, changeRoutes } = useContext(RoutesContext)

    const [dragProps, drag] = useDrag({
        item: { type: 'route', id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [dropProps, drop] = useDrop({
        accept: 'route',
        drop: item => changeRoutes(item.id, id),
        hover: item => {
            if (item.id === id) return
            changeRoutes(item.id, id)
            // console.log(item)
        }
    })


    const ref = useRef(null);
    drag(drop(ref));


    return (
        <div className='route' ref={ref}>
            <span>{name}</span>
            <span
                className='route_delete'
                onClick={() => deleteRoute(id)}
            >&#215;
            </span>
        </div>
    )
}