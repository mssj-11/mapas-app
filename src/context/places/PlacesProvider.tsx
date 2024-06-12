import { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { PlacesReducer } from "./PlacesReducer";
import { getUserLocation } from "../../helpers";

/*rafc*/
export interface PlacesState {
    isLoading: boolean;
    userLocation?: [ number, number ],
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const PlacesProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(PlacesReducer, INITIAL_STATE);

    useEffect(() => {
      //    Obteniendo la geolocalización
      getUserLocation()
        .then( lngLat => dispatch({ type: 'setUserLocation', payload: lngLat }) )
    }, [])
    


  return (
    <PlacesContext.Provider value={{
        ...state,
    }}>
        { children }
    </PlacesContext.Provider>
  )
}
