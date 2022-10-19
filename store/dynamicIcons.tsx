import React from "react";
import * as IconsFA from "react-icons/fa";
import * as IconsAI from "react-icons/ai"

/* Your icon name from database data can now be passed as prop */
export const DynamicIcon = ( c:{name:string} ):JSX.Element => {

  if (IconsFA[c.name as keyof typeof IconsFA]) {
    const IconComponent = IconsFA[c.name as keyof typeof IconsFA];
    return <IconComponent />;
  } else if (IconsAI[c.name as keyof typeof IconsAI]) {
    const IconComponent = IconsAI[c.name as keyof typeof IconsAI];
    return <IconComponent />
  } 

  return <IconsFA.FaBeer />;
};