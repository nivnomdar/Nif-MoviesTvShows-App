import Favorite from "../Modals/FavoriteModel";

export class FavoriteState {
    public allFavorites: Favorite[] = [];
    public isFavorite: boolean = false;

}

export enum FavoriteActionType {
    add = "add",
    delete = "delete",
    search = "search",
    download = "download",
    toggleIsFavorite = "toggleIsFavorite",

}

export interface FavoriteAction {
    type: FavoriteActionType;
    payload?: any;
}

export interface ToggleIsFavoriteAction {
    type: FavoriteActionType.toggleIsFavorite;
    payload: boolean;
}

export function addFavoriteAction(newFavorite: Favorite): FavoriteAction {
    return {type: FavoriteActionType.add, payload: newFavorite};
}

export function deleteFavoriteAction(id: number): FavoriteAction {
    return { type: FavoriteActionType.delete, payload: id};
}

export function searchFavoriteAction(text: string): FavoriteAction {
    return {type: FavoriteActionType.search, payload: text};
}

export function downloadFavoritesAction(allFavorites: Favorite[]) {
    return {type: FavoriteActionType.download, payload: allFavorites };
}

export const toggleIsFavoriteAction = (isFavorite: boolean): FavoriteAction => ({
    type: FavoriteActionType.toggleIsFavorite,
    payload: isFavorite
   });



export function FavoriteReducer(
    currentState: FavoriteState = new FavoriteState(),
    action: FavoriteAction
): FavoriteState {
    const newState = { ...currentState };


    switch (action.type) {
        case FavoriteActionType.add:
            return { ...newState, allFavorites: [...newState.allFavorites, action.payload] };

        case FavoriteActionType.delete:
            return { ...newState, allFavorites: newState.allFavorites.filter(item => item.id !== action.payload) };

        case FavoriteActionType.search:
            newState.allFavorites = newState.allFavorites.filter((item) => item.title.toLowerCase().includes(action.payload)
            );
            console.log("Redux Search Complete. Games matched:", newState.allFavorites.length);
        break; 

        case FavoriteActionType.download: newState.allFavorites = action.payload;
        break;

        case FavoriteActionType.toggleIsFavorite:
            newState.isFavorite = action.payload;
            console.log("Redux Games matched:", newState.isFavorite);
          break;
      

    }
    return newState;

}