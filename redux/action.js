export const addOrUpdateItem = (item) => ({
    type: 'ADD_OR_UPDATE_ITEM',
    payload: item,
  });
  
  export const removeItem = (itemId) => ({
    type: 'REMOVE_ITEM',
    payload: itemId,
  });
  