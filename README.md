##介绍
开发人员编写测试单元已经是软件开发很重要的一部分。如果你的代码结构清晰组织良好，你编写测试单元时会觉得很轻松。但是如果你发现单元测试无法下手写时，往往是因为你的代码结构上有问题了，这时你需要重新组织下代码结构了。  
Jest 是Facebook 开源维护的一款测试React应用的测试框架。Jest 不限于测试React应用，它能够满足前端各种测试需求。  
以Todo做为项目例子，这篇文章将介绍如果对React项目的业务逻辑和组件，DOM,EVENT进行测试。
##安装和配置Jest
现需要安装Jest和Babel以及可以使两者可以协同工作的模块。

	yarn add jest jest-babel babel-preset-env babel-preset-react babel-plugin-transform-object-rest-spread -D
.babelrc 文件配置内容：

	{
    	"presets":[["env",{"modules": false}],"react"],
    	"plugins": ["transform-object-rest-spread"] 
	}
项目目录结构

	|---actions  //Redux 中 actions文件
	|	-index.js
	|---components // React 组件
	|	-AddTodo.js
	|	-App.js
	|	-Footer.js
	|	-Todo.js
	|	-TodoList.js
	|---__tests__
	|---index.js // React入口文件
	|---reducers.js // Redux中 reducer
	|---.babelrc
	|---jest.config.json // Jest 配置文件
	|---wepack.config.js
	|---package.json
##业务逻辑测试
Reduce中业务逻辑一般放在 reducer，action中。测试文件夹目录结构。  

	|---__tests__
	|	-actions
	|		-index.test.js //action 测试方法
	|	-components
	|	-reducers.test.js //reducer 测试方法
	|---other		
actions/index.test.js 引入需要测试action

	import {addTodo, toggleTodo, setVisibilityFilter} from 'Actions/index';

	test('addTodo action test',()=>{
    	const result = addTodo('hello');
    	expect(result).toEqual({type:'ADD_TODO',text:'hello'});
	})
'Actions/index'是个别名路径，别名的定义是在jest的配置文件'moduleNameMapper'对象中。

	{
    	"moduleFileExtensions": [
        	"js",
        	"jsx"
    	],
    	testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|	tsx|js)$",
    	"moduleNameMapper":{
        "Components":"<rootDir>/components/",
        "Actions":"<rootDir>/actions/"
    	}
	}
## DOM测试 Enzyme
React组件测试推荐使用 Airbnb开源维护的[Enzyme](https://github.com/airbnb/enzyme)。React官方也推荐使用Enzyme进行组件测试。

	npm i enzyme -D
Enzyme主要有三种渲染方式：shallow、mount、render
### [shallow](http://airbnb.io/enzyme/docs/api/shallow.html) ###
shallow是组件的浅渲染，它只渲染当前组件，如果包含其他组件它并不会渲染。因为只渲染当前组件，所以shallow性能很高，内存占用也少。
shallow 返回 ShallowWrapper对象。
### [mount](http://airbnb.io/enzyme/docs/api/mount.html) ###
如果需要渲染当前组件和其子组件就需要用mount。mount还可以测试组件的声明周期。

mount和shallow渲染结果并不是真正的html的dom树,而是返回一个ReactWrapper对象。ReactWrapper具有丰富的API，可以满足我们各种测试需求。

### [render](http://airbnb.io/enzyme/docs/api/render.html) ###
render是将react组件渲染成静态的HTML结构。它是使用第三方库Cheerio的渲染。  
render返回一个CheerioWrapper 类似于ReactWrapper和ShallowWrapper。

TodoList组件DOM测试单元

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
因为TodoList组件有子组件，所以要使用mount渲染。  
模拟了两条数据，先检测子组件渲染是否正常。模拟渲染正常的jsx结构放入数组中，传给containsAnyMatchingElements方法进行检测。

	wrapper.find("ul").children()
最后获取ul节点下的子节点。
 
	expect(wrapper.find("ul").children()).toHaveLength(2);
判断模拟ul子节点数是否是2条。

### Events测试
Enzyme中通过simulate可以模拟事件的触发，然后通过Jest的toHaveBeenCalled方法判断事件是否被正确触发。

	import { shallow, mount } from 'enzyme'
	import React, { Component } from 'react'
	import Todo from 'Todo'

	test('<Todo /> Evnets',()=>{
    	const onTodoClick = jest.fn();
    	let data = {completed: true,text:'hello world'};
    	const shallowWrapper = shallow(<Todo {...data} onClick={onTodoClick} />);
    	shallowWrapper.simulate('click',0); //模拟 click事件，并传递一个参数 0
    	expect(onTodoClick).toHaveBeenCalled(0); //检测事件是否被正常触发
	})
Jest提供了多种检测函数Api

	.toHaveBeenCalledTimes(number) // 被触发次数
	.toHaveBeenCalledWith(arg1, arg2, ...) // 函数触发传递的参数

### Snapshot 测试
Snapshot tests是个很有用的测试工具，当你需要确保你的UI的变化没有超出你的预期。

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
Jest在测试文件同级目录下会创建一个\_\_snapshots\_\_文件夹保存着组件的快照

	// Jest Snapshot v1, https://goo.gl/fbAQLP

	exports[`<TodoList /> SnapShot 1`] = `
	<ul>
  		<li
    		class="complete"
  		>
    hello world
  		</li>
  		<li
    		class="default"
  		>
    		eat
  		</li>
	</ul>
	`;


--- 

### 参考
[https://auth0.com/blog/testing-react-applications-with-jest/](https://auth0.com/blog/testing-react-applications-with-jest/)
[http://echizen.github.io/tech/2017/02-12-jest-enzyme-method](http://echizen.github.io/tech/2017/02-12-jest-enzyme-method)
[https://facebook.github.io/jest/docs/en/tutorial-react.html#content](https://facebook.github.io/jest/docs/en/tutorial-react.html#content)
[https://www.oschina.net/translate/test-react-components-jest](https://www.oschina.net/translate/test-react-components-jest)