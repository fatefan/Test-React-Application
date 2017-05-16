import { mount } from 'enzyme'
import React, { Component } from 'react'
import TodoList from 'TodoList'

test("<TodoList />", () => {
    const onTodoClick = jest.fn();
    let data = [{completed: true,text:'hello world'},{completed: false,text:'eat'}];
    const wrapper  = mount(<TodoList  todos={data} onTodoClick={onTodoClick}  />);
    const t = [<li className="complete">hello world</li>,<li className="default">eat</li>];
    expect(wrapper.containsAnyMatchingElements(t)).toEqual(true)    
    expect(wrapper.find("ul").children()).toHaveLength(2);
})
