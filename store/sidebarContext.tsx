import { useContext, createContext, useState} from "react";
import { useAnimationControls, animationControls} from "framer-motion";

export const SidebarContext = createContext({
      sidebarState: "",
      changeSidebarState: (name:string) => {},
});

export function SidebarContextWrapper(
      {children}:any
) {
      const [sidebarState, changeSidebarState]= useState("init")

      return (
            <SidebarContext.Provider value={{sidebarState,changeSidebarState}}>
                  {children}
            </SidebarContext.Provider>
      )
}

export const useSidebarContext = ()=>{
      return useContext(SidebarContext)
}