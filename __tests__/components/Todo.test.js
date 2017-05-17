import { shallow, mount } from 'enzyme'
import React, { Component } from 'react'
import Todo from 'Todo'
test('<Todo />', () => {
    const onTodoClick = jest.fn();
    let data = { completed: true, text: 'hello world' };
    const wrapper = shallow(<Todo {...data} onClick={onTodoClick} />);
    expect(wrapper.text()).toBe('hello world');
})

test('<Todo /> Evnets',()=>{
    const onTodoClick = jest.fn();
    let data = {completed: true,text:'hello world'};
    const shallowWrapper = shallow(<Todo {...data} onClick={onTodoClick} />);
    shallowWrapper.simulate('click',0);
    expect(onTodoClick).toHaveBeenCalledWith(0);
    expect(onTodoClick).toHaveBeenCalledTimes(1);
})