import { useContext, createContext, useState} from "react";

export const SidebarContext = createContext({
      sidebarState: "",
      changeSidebarState: (name:string) => {},
});

export function SidebarContextWrapper(
      {children}:any
) {
      const [sidebarState, changeSidebarState]= useState("")

      return (
            <SidebarContext.Provider value={{sidebarState,changeSidebarState}}>
                  {children}
            </SidebarContext.Provider>
      )
}

export const useSidebarContext = ()=>{
      return useContext(SidebarContext)
}