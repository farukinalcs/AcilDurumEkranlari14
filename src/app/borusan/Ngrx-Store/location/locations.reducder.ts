import { createAction, createReducer, on } from "@ngrx/store"
import { changeLocation, loadData } from "./locations.action"

export interface LocationState {
    id:string
}

export const initialState:LocationState = {
    id:""
}
export const locationReducer = createReducer(
    initialState,
    on(changeLocation,(state,{id}) => ({
        ...state,
        id:id
    })),
    
    // on(loadData(state,{id}) => ({
    //     ...state,

    // }))
)

// export const locationReducer2 = createReducer(
//     "",
//     on(createAction("[State] getState"),(state:string) => {
//         return state = "s"
//     })
// )