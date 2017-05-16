import { shallow, mount } from 'enzyme'
import React, { Component } from 'react'
import Todo from 'Todo'
test('<Todo />', () => {
    const onTodoClick = jest.fn();
    let data = { completed: true, text: 'hello world' };
    const wrapper = shallow(<Todo {...data} onClick={onTodoClick} />);
    expect(wrapper.text()).toBe('hello world');
})