import React from "react";
import { IconType } from "react-icons";
import { IconContext } from "react-icons";
interface TheIconProps {
  Icon: IconType;
  size?: string;
  color?: string;
  iconstyle?: string;
  iconAction?: () => any;
}

export const TheIcon = ({
  Icon,
  color,
  iconAction,
  iconstyle,
  size,
}: TheIconProps) => {
  const handleClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation();
    iconAction && iconAction();
    // other logic for handling the icon's click event
  };

  return (
    <IconContext.Provider
      value={{
        size,
        color,
        className: iconstyle,
      }}
    >
      <Icon onClick={handleClick} />
    </IconContext.Provider>
  );
};
