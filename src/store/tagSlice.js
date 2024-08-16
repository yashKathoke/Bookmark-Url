import { createSlice } from '@reduxjs/toolkit';

const tagSlice = createSlice({
    name: 'tags',
    initialState: {tags: []},
    reducers: {
        setTags: (state, action) => {

            state.tags = action.payload
        },
        addTag: (state, action) => {

            let exists = state.tags.some(tag => tag.tag === action.payload.tag);
            if (!exists){

                state.tags.push(action.payload);
            }
           
            
        },

    },
});

export const { setTags, addTag } = tagSlice.actions;

export default tagSlice.reducer;