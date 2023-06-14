import { createAction, createReducer, on } from "@ngrx/store";

export const StateReducer = createReducer(
    false,
    on(createAction("[State] getState"),(state) => {
        return !state
    })
)

