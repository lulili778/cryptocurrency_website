import React, {useContext, useState,useEffect} from "react";
import { Radio, Input } from 'antd';
import Axios from "axios";
import {Line} from 'react-chartjs-2';


export default props =>{

    const [datas, setData] = useState({
        todayDataLow : '',
        todayDataHigh : '',
        todayTime : '',
        plot :{
            labels:[],
            datasets:[
              {data:[]},
              {data:[]}
            ]
            },

    })
    useEffect(()=>{
        Axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=4159168a1743c1005c8a3805c9b2cd52e2e882ce4f4bc60608b51e07d5657b58')
        .then(
            res=>setData({
                ...res.data.Data.Data,
                todayDataLow : Object.keys(res.data.Data.Data).map((item)=>(
                    (res.data.Data.Data[item].low)
                )
                ),
                todayDataHigh : Object.keys(res.data.Data.Data).map((item)=>(
                    (res.data.Data.Data[item].high)
                )
                ),
                todayTime : Object.keys(res.data.Data.Data).map((item)=>(
                    (new Date(1000*res.data.Data.Data[item].time)).toUTCString().slice(5,16)
                )
                ),
                plot : {
                    labels : Object.keys(res.data.Data.Data).map((item)=>(
                        (new Date(1000*res.data.Data.Data[item].time)).toUTCString().slice(5,16)
                    )
                    )
                }
                // plot :getChartData(res.data.Data.Data,res.data.Data.Data.todayDataLow,res.data.Data.Data.todayDataHigh,res.data.Data.Data.todayTime)
                })
        )
    },[''])

    console.log("DATAS",datas.plot) 
    // console.log("TODAY",datas.plot)


    // const getChartData = () =>{

    //     if (data.datasets){
    //       let colors=["rgba(235,0,25,0.75)","rgba(0,0,255,0.75)"] 
    //       let labels=["Low","High"]
    //       let hours=[datas.todayDataLow,datas.todayDataHigh]
    //       let timelables=datas.todayTime
    //       data.labels= timelables
    //       data.datasets.forEach((set,i)=>{
    //       set.label= labels[i]
    //       set.backgroundColor="transparent"
    //       set.borderColor=colors[i];
    //       set.borderWidth =2;
    //       set.labelColor=colors[i]
    //       set.data= hours[i]
    //       });
    //     }
    //     console.log("DATA",data)
    //     return (data);
    // } 



    
    return (
        <div>
            <li>{JSON.stringify(datas)}</li>
            <Line></Line>
        </div>
    )




}
