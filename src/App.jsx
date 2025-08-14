import './App.css'
import {getEmotionImgById} from './util'
import {Route, Routes} from "react-router-dom";
import Edit from "./pages/Edit.jsx";
import Diary from "./pages/Diary.jsx";
import Home from "./pages/Home.jsx";
import New from "./pages/New.jsx";
import React, {useEffect, useReducer, useRef, useState} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const DiaryStateContext = React.createContext()
// eslint-disable-next-line react-refresh/only-export-components
export const DiaryDispatchContext = React.createContext()

function reducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return [action.data, ...state]
        case 'UPDATE':
            return state.map(it =>
                String(it.id) === String(action.data.id) ? {...action.data} : it)
        case 'DELETE':
            return state.filter(it => String(it.id) !== String(action.targetId))
        case 'INIT':
            return action.data
        default:
            return state;
    }
}

const mockData = [
    {
        id: 'mock1',
        date: new Date().getTime() -1,
        content: 'mock1',
        emotionId: 1,
    },
    {
        id: 'mock2',
        date: new Date().getTime() -2,
        content: 'mock2',
        emotionId: 2,
    },
    {
        id: 'mock3',
        date: new Date().getTime() -3,
        content: 'mock3',
        emotionId: 3,
    },
]

function App() {
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [data, dispatch] = useReducer(reducer, [])
    const idRef = useRef(0)
    useEffect(() => {
        dispatch({
            type: 'INIT',
            data: mockData,
        })
        setIsDataLoaded(true)
    }, [])

    const onCreate = (date, content, emotionId) => {
        dispatch({
            type: 'CREATE',
            data: {
                id: idRef.current,
                date: new Date(date).getTime(),
                content: content,
                emotionId: emotionId,
            }
        })
        idRef.current += 1;
    }

    const onUpdate = (targetId, date, content, emotionId) => {
        dispatch({
            type: 'UPDATE',
            data: {
                id: targetId,
                date: new Date(date).getTime(),
                content: content,
                emotionId: emotionId,
            }
        })
    }

    const onDelete = (targetId) => {
        dispatch({
            type: 'DELETE',
            targetId: targetId
        })
    }
    if (!isDataLoaded) {
        return <div>데이터를 불러오는 중입니다</div>
    } else {
        return (
            <DiaryStateContext.Provider value={data}>
                <DiaryDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/new" element={<New/>}/>
                            <Route path="/diary/:id" element={<Diary/>}/>
                            <Route path="/edit/:id" element={<Edit/>}/>
                        </Routes>
                    </div>
                </DiaryDispatchContext.Provider>
            </DiaryStateContext.Provider>
        )
    }
}

export default App
