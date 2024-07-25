/* eslint-disable no-undef */
import { useEffect, useState } from "react";

function useWidthSize(){
    const [width, setWidth] = useState(window.innerWidth)
    
    useEffect(() => {
        const width = () => {
            setWidth(window.innerWidth)
        }    
        window.addEventListener("resize", width)
      return () => {
        window.removeEventListener('resize', width)
      }
    }, [setWidth])
    return {width}
}


export default useWidthSize
