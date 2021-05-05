import React from 'react';

class StateClass extends React.Component{
    constructor(){
        super();
        this.state = {
            name: '类'
        }
    }

    componentDidMount(){
        console.log('渲染结束了。。。')
    }

    render(){
        return (
            <div>这是一个类组件---{this.state.name}</div>
        )
    }
}
export default StateClass;