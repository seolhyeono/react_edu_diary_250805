import Header from "../component/Header.jsx";
import {useNavigate} from "react-router-dom";
import Button from "../component/Button.jsx";
import Editor from "../component/Editor.jsx";
import {useContext} from "react";
import {DiaryDispatchContext} from "../App.jsx";
const New = () => {
    const navigate = useNavigate();
    const {onCreate} = useContext(DiaryDispatchContext)
    const goBack = () => {
        navigate(-1)
    }

    const onSubmit = (data) => {
        const {date, emotionId, content} = data;
        console.log(data)
        onCreate(date, content, emotionId)
        navigate('/', {replace: true})
    }
    return (
        <div>
            <Header
             title={"새 일기 쓰기"}
             leftChild={<Button text={'< 뒤로가기'} onClick={goBack}/>}/>
            <Editor onSubmit={onSubmit}/>
        </div>
    )
}
export default New