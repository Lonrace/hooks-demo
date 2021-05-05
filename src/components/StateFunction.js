import React, { useState, useEffect, useLayoutEffect, useMemo, useCallback, useRef,
    useContext, createContext, useReducer } from 'react';

// 使用useState来创建状态
//1. 引入
//2. 接收一个参数作为初始值
//3. 返回一个数组，第一个为状态，第二个为改变状态的函数
function StateFunction_useState(){
    const [name, setName] = useState('函数')
    return <div onClick={()=>{setName('小函数')}}>这是一个{name}组件</div>
}

/**
 * useEffect
 * 接收一个函数作为参数
 * 接收第二个参数，依赖列表，只有对应的依赖更新的时候才会执行
 * 返回一个函数，先执行返回函数再执行参数函数
 */
function StateFunction_useEffect(){
    const [num, setNum] = useState(1);
    useEffect(()=>{
        console.log('函数组件结束渲染。。。');
        document.addEventListener('abc', ()=>{})
        return ()=>{
            document.removeEventListener('abc', ()=>{})
            console.log('销毁了')
        }
    }, [num])
    
    return <div onClick={()=>{
        setNum(num => num+1)
    }}>数字累加显示：{ num }</div>
}

// useLayoutEffect 在dom更新之后 早于useEffect
function StateFunction_useLayoutEffect(){
    const [num, setNum] = useState(1);
    useLayoutEffect(()=>{
        console.log('函数组件结束渲染。。。');
        document.addEventListener('abc', ()=>{})
        return ()=>{
            document.removeEventListener('abc', ()=>{})
            console.log('销毁了')
        }
    }, [num])
    
    return <div onClick={()=>{
        setNum(num => num+1)
    }}>数字累加显示：{ num }</div>
}

function StateFunction_useMemo(){
    const [num, setNum] = useState(1);
    const [age, setAge] = useState(18);
    // function getDoubleNum(){
    //     console.log('获取双倍的值');
    //     return 2*num;
    // }

    /**
     * 接收函数作为参数
     * 第二个参数为依赖列表
     * 返回的是一个值
     */
    // const getDoubleNum = useMemo(()=>{
    //     console.log('获取双倍的值')
    //     return 2*num;
    // }, [num])

    /**
     * 在使用方法上,useCallback与useMemo相同
     * useMemo返回的是一个值，useCallback返回的是一个函数
     * 不同点：useMemo缓存的是一个值，useCallback缓存的是一个函数
     */
    const getDoubleNum = useCallback(()=>{
        console.log('获取双倍的值')
        return 2*num;
    }, [num])

    return <div onClick={()=>{ setAge(age => age+1) }}>数字累加显示：{ getDoubleNum() }
    <Child callback={getDoubleNum}></Child></div>
}

function Child(props){
    useEffect(()=>{
        console.log('callback更新了')
    }, [props.callback])
    return <div>Child</div>;
}

function StateFunction_useRef(){
    const [num, setNum] = useState(1);
    // 保存一个值在整个生命周期中不改变
    //改变ref.current,并不会触发重新渲染
    const ref = useRef();
    useEffect(()=>{
        ref.current = setInterval(()=>{
            setNum(num=>num+1);
        }, 400)
    }, [])

    useEffect(()=>{
        if(num > 10){
            console.log('大于10了');
            clearInterval(ref.current);
        }
    }, [num])
    return <div onClick={()=>{ setNum(num => num+1) }}>数字累加显示：{ num }</div>
}


/**
 * 需要引入useContext, createContext
 * 通过createContext创建一个useContext句柄
 * Context.Provider来确定数据共享范围
 * 通过value来分发内容
 * 在子组件中通过useContext传入Context句柄来获取数据
 */
const Context = createContext(null);
function StateFunction_useContext(){
    const [num, setNum] = useState(1);
    return <div onClick={()=>{ setNum(num => num+1) }}>数字累加显示：{ num }
        <Context.Provider value={num}>
            <Item1></Item1>
            <Item2></Item2>
        </Context.Provider>
    </div>
}
function Item1(){
    const num = useContext(Context);
    return <div>子组件{num}</div>
}
function Item2(){
    const num = useContext(Context);
    return <div>子组件{num+2}</div>
}



const store = {
    num: 1
};
const reducer=(state, action)=>{
    switch(action.type){
        case 'changeNum':
            return {
                ...state,
                num: action.num
            };
        default:
            return '';
    }
}

//useReducer的使用方法
//需要创建数据仓库 store和管理者reducer
//通过userReducer(reducer, store)来获取state和dispatch
function StateFunction(){
    const [state, dispatch] = useReducer(reducer, store);
    return <div onClick={()=>{ 
        dispatch({
            type: 'changeNum',
            num: 100
        })
     }}>数字累加显示：{ state.num }
    </div>
}
export default StateFunction;