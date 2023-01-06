import React from 'react'
import { IconType } from 'react-icons';
import { IconContext } from "react-icons/lib";
interface TheIconProps {
    Icon: IconType;
    size?: string;
    color?: string;
    iconstyle?: string;
    iconAction?: () => any;
}

export const TheIcon: React.FC<TheIconProps> = (
    {
        Icon,
        color,
        iconAction,
        iconstyle,
        size,
    }) => {
    return (
        <IconContext.Provider value={{
            size, color, className: iconstyle
        }}>
            <Icon onClick={() => iconAction && iconAction()} />
        </IconContext.Provider>
    );
};

