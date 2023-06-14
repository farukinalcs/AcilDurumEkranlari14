import { createSelector } from "@ngrx/store";
import { LocationState } from "./locations.reducder";


export const selectLocation = (state:any) => state.id;
export const listen = createSelector(
    selectLocation,
    (state:LocationState)=>state.id
)