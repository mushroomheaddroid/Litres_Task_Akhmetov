import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchData, logout} from "../store/actions";
import NivoGraph from "./ResponsiveLine";
import "../scss/page.scss";

const Graph = () => {
    const dispatch = useDispatch();
    const graph = useSelector(state => state.graph.data)
    const loading = useSelector(state => state.app.loading)
    let interval

    useEffect(() => {
        dispatch(fetchData());
        dataGrabber();
    }, [])


    const dataGrabber = () => {
        interval = setInterval(() => {
            dispatch(fetchData());
        }, 5000)
    };

    const logoutHandler = () => {
        logout();
        clearInterval(interval);
    }


    if (!graph.length) {
        return (
            <div className="page__loading">
                <div className="page__loading--animation">
                    <div className="lds-dual-ring"></div>
                </div>
                <div className="page__loading--text">Пожалуйста, подождите</div>
            </div>
        )
    }


    return (
        <div className={'page'}>
            {graph && graph.length > 0 &&
            <div className="page__graph">
                {loading &&
                    <div className={"page__graph--loader"}>
                        <div className="lds-dual-ring"></div>
                    </div>
                }
                <NivoGraph data={JSON.parse(graph)}/>
            </div>
            }
            <button onClick={() => logoutHandler()}>Выйти</button>
        </div>
    )

}

export default Graph;