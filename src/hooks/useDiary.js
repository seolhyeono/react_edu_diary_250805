import {DiaryStateContext} from "../App.jsx";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const useDiary = id =>{
    const data = useContext(DiaryStateContext);
    const [diary, setDiary] = useState();
    const navigate = useNavigate();
    console.log(diary)

    //useEffect를 이용해 id나 data의 값이 변경될때마다
    //일기데이터에서 매개변수 id와일치하는 일기를 찾아 state 값 diary를 업데이트
    useEffect(() => {
        const matchDiary = data.find(it => String(it.id) === String(id))
        if (matchDiary) {
            setDiary(matchDiary);
        } else{
            alert('해당 일기가 존재하지 않습니다')
            navigate('/', {replace: true});

        }
    }, [id])

    return diary
}

export default useDiary