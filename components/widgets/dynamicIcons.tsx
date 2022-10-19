import React from "react";
import * as IconsFA from "react-icons/fa";
import * as IconsAI from "react-icons/ai"
import * as IconsBS from "react-icons/bs"
import * as IconsBI from "react-icons/bi"
import * as IconsCI from "react-icons/ci"
import * as IconsDI from "react-icons/di"
import * as IconsFI from "react-icons/fi"
import * as IconsFC from "react-icons/fc"
import * as IconsGI from "react-icons/gi"
import * as IconsGO from "react-icons/go"
import * as IconsGR from "react-icons/gr"
import * as IconsHI2 from "react-icons/hi2"
import * as IconsHI from "react-icons/hi"
import * as IconsIM from "react-icons/im"
import * as IconsIO from "react-icons/io"
import * as IconsIO5 from "react-icons/io5"
import * as IconsMD from "react-icons/md"
import * as IconsRI from "react-icons/ri"
import * as IconsSI from "react-icons/si"
import * as IconsSL from "react-icons/sl"
import * as IconsTB from "react-icons/tb"
import * as IconsTFI from "react-icons/tfi"
import * as IconsTI from "react-icons/ti"
import * as IconsVSC from "react-icons/vsc"
import * as IconsWI from "react-icons/wi"
import * as IconsCG from "react-icons/cg"
import { IconType } from "react-icons";

/* Your icon name from database data can now be passed as prop */
export const DynamicIcon = (c: { name: string }): JSX.Element => {

  const allIcons = [
    IconsFA,
    IconsAI,
    IconsBS,
    IconsBI,
    IconsCI,
    IconsDI,
    IconsFI,
    IconsFC,
    IconsGI,
    IconsGO,
    IconsGR,
    IconsHI2,
    IconsHI,
    IconsIM,
    IconsIO,
    IconsIO5,
    IconsMD,
    IconsRI,
    IconsSI,
    IconsSL,
    IconsTB,
    IconsTFI,
    IconsTI,
    IconsVSC,
    IconsWI,
    IconsCG,
  ]

  for (let icons of allIcons) {
    if (icons[c.name as keyof typeof icons]) {
      const IconComponent: IconType = icons[c.name as keyof typeof icons];
      return (
        <>
          <IconComponent />
        </>);
    }
  }

  return <IconsFA.FaBeer />;
};