import {addTodo, toggleTodo, setVisibilityFilter} from 'Actions/index';

test('addTodo action test',()=>{
    const result = addTodo('hello');
    expect(result).toEqual({type:'ADD_TODO',text:'hello'});
})

test('toggleTodo action test',()=> {
    const result = toggleTodo(1);
    expect(result).toEqual({type:'TOGGLE_TODO',index: 1});
})

test('setVisibilityFilter action test',()=>{
    const result = setVisibilityFilter([{text:'hello',completed:true},{text:'world!',completed:true}])
    expect(result).toEqual({type:'SET_VISIBILITY_FILTER',filter:[{text:'hello',completed:true},{text:'world!',completed:true}]})
})