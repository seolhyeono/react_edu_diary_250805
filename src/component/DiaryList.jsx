import './DiaryList.css'
import Button from "./Button.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import DiaryItem from "./DiaryItem.jsx";


const sortOptionList = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된 순"},
]

const DiaryList = ({data}) => {
    const [sortType, setSortType] = useState("latest");
    const [sortedData , setSortedData] = useState([]);// 정렬 결과를 저장할 state

    useEffect(() => {
        const compare = (a, b) => {
            if (sortType === "latest") {
                return Number(b.date) - Number(a.date);
            } else {
                return Number(a.date) - Number(b.date);
            }
        }
        //배열의 sort 매서드는 원본 배열을 정렬
        const copyList = JSON.parse(JSON.stringify(data)); //배열을 복사해 copyList 에 저장
        copyList.sort(compare) // 일기 데이터를 정렬. 이때 인수로 비교 함수를 전달
        setSortedData(copyList);
    }, [data, sortType]);

    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    }

    const navigate = useNavigate();

    const onClickNew = () => {
        navigate("/new");
    }
    return (
        <div className='DiaryList'>
            <div className={'menu_wrapper'}>
                <div className={"left_col"}>
                    <select value={sortType} onChange={onChangeSortType}>
                        {sortOptionList.map((it, idx) =>
                        <option key={idx} value={it.value}>{it.name}</option>
                        )}
                    </select>
                </div>
                <div className={'right_col'}>
                    <Button type={'positive'} text={"새 일기 쓰기"} onClick={onClickNew} />
                </div>
            </div>

            <div className={'list_wrapper'}>
                {sortedData.map(it => <DiaryItem key={it.id} {...it} />)}
            </div>
        </div>
    )
}
export default DiaryList