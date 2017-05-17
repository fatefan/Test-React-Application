import React, { Component } from 'react'
import TodoList from 'TodoList';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';

test('<TodoList /> SnapShot', ()=>{
    let data = [{completed: true,text:'hello world'},{completed: false,text:'eat'}];
    const onTodoClick = jest.fn();
    const wrapper = render(<TodoList  todos={data} onTodoClick={onTodoClick}  />)
    expect(toJson(wrapper)).toMatchSnapshot();
})