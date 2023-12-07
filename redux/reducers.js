const initialState = {
    list: [],
};
const reducer = (state = initialState, action) =>{
switch (action.type){
case 'ADD_OR_UPDATE_ITEM':
const updatedItem = action.payload;
const existingItemIndex = state.list.findIndex(item => item.id === updatedItem.id);

if(existingItemIndex !== -1){
const updatedList = [...state.list];
updatedList[existingItemIndex] = updatedItem;

return {...state, list: updatedList};
}else{
return{...state, list: [...state.list, updatedItem]};
}
case 'REMOVE_ITEM':
const itemIdToRemove = action.payload;
const filteredList = state.list.filter(item => item.id !== itemIdToRemove);
return {...state, list: filteredList};
default:
return state;
    }
};
export default reducer;