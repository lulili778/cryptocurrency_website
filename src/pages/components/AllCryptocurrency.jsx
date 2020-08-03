import React, {useContext, useState,useEffect} from "react";
import {Layout, Menu, Breadcrumb, Icon, Card,Col, Row,Table, Radio, Divider,Button } from 'antd';
import {Link} from "react-router-dom";
import axios from 'axios'






export default props => {

    const data = [




    ] 

    const columns = [
        // {
        //   title: 'Icon',
        //   dataIndex: 'ICON',
        //   render: imgg => <img src={imgg} height='50px' width='50px'></img>,
        // },
        {
          title: 'Name',
          dataIndex: 'name',
        render: text => <a>{text}</a>
        },
        {
          title: 'Currency',
          dataIndex: 'SGD',
          sorter:{
            compare : (a, b ) => a.SGD - b.SGD
          },
        },
        {
            title: 'Change 24Hr',
            dataIndex: 'CHANGE_24',
          },
      ];
    
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
      };

    
      
    

    const [cryptos,setCryptos] = useState([{
        cryptosObject : {}
    }]);


    const cryptoObject_SGD = [];
    useEffect(()=>{
        axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,DASH,XRP,EOS,LTC,BCH,TRX,PRC,YBC,DANK,GIVE,KOBO,DT,CETI,SUP,XPD,NXTI,HT,VET,CRO,ERD,SXP,DOGE,KNC,ONT,QTUM,ATOM,USDC,THETA,XMR,SOLO,TRUE,NULS,MONA,TUSD,KCASH,LEND,HBAR,BAT,LRC,BCD,BTM,MKR,ICX,DGB,TT,HYN,KAVA,RVN,MCO,GTO,REP,DAI,ELF,MBL,SWFTC,MOF,ITC,RLC&tsyms=SGD,USD,EUR&api_key=4159168a1743c1005c8a3805c9b2cd52e2e882ce4f4bc60608b51e07d5657b58')
        .then(
        res => setCryptos({
            ...res.data.RAW,
                // name : Object.keys(res.data.RAW).map(key =>({key})),
                cryptosObject : Object.keys(res.data.RAW).map(key =>(
                        {
                          //key is compulsory for table
                            // key : key,
                            name : key , 
                            SGD : res.data.RAW[key].SGD.PRICE,
                            USD : res.data.RAW[key].USD.PRICE,
                            EUR : res.data.RAW[key].EUR.PRICE,
                            ICON : res.data.RAW[key].SGD.IMAGEURL,
                            CHANGE_24 : res.data.RAW[key].SGD.CHANGEPCT24HOUR,
                        }
                    ))
                
        }),
    )
},[''])

    console.log("CRYYYY",cryptos.cryptosObject)

    

    function onChange(pagination, filters, sorter, extra){
      console.log("sorter",pagination, filters, sorter, extra)
    }

    return (
        <div>    
          <Table
            rowSelection={
              rowSelection
            }
            rowKey={'name'}
            columns={columns}
            dataSource={cryptos.cryptosObject}
            onChange={onChange}
          />
          <Button type='primary'>Compare</Button>
        </div>
      );
    };


//     return(
//         <div>
//             <div>!!!!!!!!!!TEST for all cryptocurrency!!</div>
//             <div>
//                 { Object.keys(cryptos).map(item =>(
//                     <li>{item}</li>
//                 ))}
//                 <li>
                    
//                 </li>
//             </div>
//         </div>
//     )
// }
