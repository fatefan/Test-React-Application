import {visibilityFilter,todos} from '../reducers';
import * as types from 'Actions/index'
test("visibilityFilter SET_VISIBILITY_FILTER test",()=>{
    const result = visibilityFilter(
        types.SET_VISIBILITY_FILTER,
        {
            type:types.SET_VISIBILITY_FILTER,
            filter:[{text:'hello world',completed:true}]}
        );
    expect(result).toEqual([{text:'hello world',completed:true}])
});
test("visibilityFilter default test", ()=>{
    const result = visibilityFilter(types.VisibilityFilters.SHOW_ALL,{});
    expect(result).toBe(types.VisibilityFilters.SHOW_ALL);
})
test("todos default test",()=>{
    const result = todos([{completed: true,text:'hello world'}],{type:"init"});
    expect(result).toEqual([{completed: true,text:'hello world'}])
})
test("todos ADD_TODO",()=>{
    const result = todos([{completed: true,text:'hello world'}],{type:types.ADD_TODO,text:"nihao"});
    expect(result).toEqual([{completed: true,text:'hello world'},{completed:false,text:"nihao"}])
})
test("todos TOGGLE_TODO test",()=>{
    const arr = [
        {
            completed: true,
            text:"hello world"
        },
        {
            completed: false,
            text:"nihao"
        }
    ];
    const result = todos(arr,{type:types.TOGGLE_TODO,index: 1});
    expect(result).toEqual([        {
            completed: true,
            text:"hello world"
        },
        {
            completed: true,
            text:"nihao"
        }])
})