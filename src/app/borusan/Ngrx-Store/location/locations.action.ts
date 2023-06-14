import { createAction, props } from "@ngrx/store";

export const changeLocation = createAction(
    "",
    props<{id:string}>()
);


export const loadData = createAction("Load Data");