import React, {useContext, useState,useEffect} from "react";
import {AutoComplete, Layout, Menu, Breadcrumb, Icon, Card,Col, Row,Table, Radio, Divider,Button, Input,icons } from 'antd';
import {Link} from "react-router-dom";
import axios from 'axios'
import {SelectCryptoContext, actions, createAction} from "../allCryptocurrency_hook"
const {Search} = Input;




export default props => {

function getRandomInt(max, min=0){
  return Math.floor(Math.random() * (max - min + 1)) + min;
} 

const searchResult = query =>
  new Array(getRandomInt(5))
  .join('.')
  .split('.')
  .map((item, idx) =>{
  const category = `${query}${idx}`;
  return {
    value : category,
    label :(
      <div style={{
        display:'flex',
        justifyContent:'space-between',
      }}>
        <span>
          Found {query} on{' '}
          <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    })


    const [options, setOptions] = useState([]);
    const handleSearch = value =>{
      setOptions(value ? searchResult(value) : []);
    }
    const onSelect = value =>{
      console.log('onSelect',value);
    }

  

    const columns = [
        // {
        //   title: 'Icon',
        //   dataIndex: 'ICON',
        //   render: imgg => <img src={imgg} height='50px' width='50px'></img>,
        // },
        {
          title: 'Name',
          dataIndex: 'name',
        render: text => <a>{text}</a>,

        },
        {
          title: 'Currency',
          dataIndex: 'SGD',
          sorter: (a, b ) => a.SGD - b.SGD
          ,
        },
        {
            title: 'Change 24Hr',
            dataIndex: 'CHANGE_24',
            sorter: (a,b) => a.CHANGE_24 - b.CHANGE_24
          },
      ];
    
      const dispatch = useContext(SelectCryptoContext);
      const [selectCryptos, setSelectCryptos] = useState()

      

      const handleSelectCrypto =()=> {
        dispatch(createAction(actions.SELECTED_CRYPTO,selectCryptos))
        console.log("---1 Selected",selectCryptos)
      }


      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setSelectCryptos([selectedRowKeys]);
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
      };

    
      function disableBtn (){
        try{
          if (selectCryptos.length ===0){
            return (true)
          }
          else{
            return (false)
          }
        }
        //Need to think of a way to better handle this
        catch (err){
          console.log("exception",err)
          return (true)

        }
      }
      
    

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
          {/* <Search maxLength={10} placeholder="Search by Cryptocurrency Name" onSearch={value=>console.log(value)} enterButton /> */}
          <AutoComplete dropdownMatchSelectWidth={252}
          style={{
            width : 300,
          }}
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
          >
            <Input.Search size="large" placeholder="input here" enterButton />


          </AutoComplete>
          <br /> 
          <Card bordered={false}>
          <Table
            rowSelection={
              rowSelection
            }
            rowKey={'name'}
            columns={columns}
            dataSource={cryptos.cryptosObject}
            onChange={onChange}
          />
          </Card>
          <Button href="/compare" disabled={disableBtn()} onClick={handleSelectCrypto} type='primary'>Compare</Button>
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
