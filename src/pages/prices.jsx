import React,{Component} from 'react';
import {Link} from "react-router-dom";
import logo from '../logo.svg';
import {Button} from 'antd';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import axios from 'axios'
import './prices.css';
import {Select} from 'antd'
import {Line} from 'react-chartjs-2';




const{Option} = Select;
const {Header, Content, Sider, Footer} = Layout; 



  const favReducer=(state=[],action)=>{
    const newState=[...state];
    switch (action.type){
      case 'ADD_Favourite':
        state=[action.text].concat(state)
        localStorage.setItem('favourite',[state])
        return (state)
      case 'REMOVE_Favourite':
        state=state.filter(state=> state !=action.text)
        // localStorage.removeItem('favourite')
        // localStorage.setItem('favourite',[state])
        return state
    }
    return newState

  }
  const unfavReducer=(state=[],action)=>{
    const newState=[...state];
    switch (action.type){
      case 'ADD_unFavourite':
        state=state.concat([action.text])
        localStorage.setItem('unfavourite',[state])
        return state
      case 'REMOVE_unFavourite':
        state=state.filter(state=> state !=action.text)
        // console.log('before remove',localStorage.getItem('unfavourite'))
        localStorage.removeItem('unfavourite')
        // console.log(' removing',localStorage.getItem('unfavourite'))
        localStorage.setItem('unfavourite',[state])
        // console.log('after remove',localStorage.getItem('unfavourite'))
        return state
  }
  return newState
}

  const reducers= combineReducers({
    favourite : favReducer,
    unfavourite: unfavReducer
  })


class PricePage extends Component{
  _isMounted=false;
  constructor(props){
      super(props);
      this.state={
          cryptos: [],
          currency: '',
          data:{
            labels:[],
            datasets:[
              {data:[]},
              {data:[]}
            ]
            },
            un: []
      }
      this.onclick=this.onclick.bind(this)
  }


  componentDidMount(){
    this._isMounted=true;
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DASH,XRP,EOS,LTC,BCH,TRX,PRC,YBC,DANK,GIVE,KOBO,DT,CETI,SUP,XPD,NXTI&tsyms=SGD,USD&api_key=d86f430c22e3c06b84864a10dd728250ca595fb00926a3472392716b318464ad')
    .then(res=>{
        const cryptos=res.data;
        if (this._isMounted){
        this.setState({cryptos: cryptos});
      }
      const keys =Object.keys(this.state.cryptos).map((key)=>(
        key)) 
      const store = createStore(reducers)
      for (var i=0; i< keys.length; i++){
        store.dispatch({
          type: 'ADD_unFavourite',
          text: keys[i]
        })
      }    
      
      
      const unF_local=localStorage.getItem('unfavourite').split(',')
      var unF_str= '<ul>'
      unF_local.forEach(function(uns) {
        unF_str += '<div id="crypto-container">'+uns +'&nbsp&nbsp&nbsp&nbsp&nbsp'+' SGD'+ cryptos[uns].SGD+'&nbsp'+'<button '+'align="right"'+'id='+'"'+uns+'"'+' onClick={this.onclick} position>Add</button>'+'</div>'+'<br />';})
      unF_str += '</ul>'
      document.getElementById("Local_unfavouriteContainer").innerHTML = unF_str
      
      if (localStorage.getItem('favourite')!= null){
        const F_local=localStorage.getItem('favourite').split(',')
        var F_str= '<ul>'
        F_local.forEach(function(fs) {
          F_str += '<div id="crypto-container">'+fs +'&nbsp&nbsp&nbsp&nbsp&nbsp'+' SGD'+ cryptos[fs].SGD+'&nbsp'+'</div>'+'<br />';})
        F_str += '</ul>'
        document.getElementById("Local_FavouritContainer").innerHTML = F_str;
      }
  

      this.setState({store:store, keys:keys})

// Using store to visualize state change.
      // const F=store.getState().favourite
      // var str= '<ul>'
      // F.forEach(function(fs) {
      //   str += '<span className= "left">'+ fs +' SGD '+ cryptos[fs].SGD+'</span>'+'<button '+'id='+'"'+fs+'"'+' onClick={this.onclick}></button>'+ '<br />';
      // })
      // str += '<ul>'
      // localStorage.setItem('test',str)
      // document.getElementById("favouriteContainer").innerHTML = str;
      // const unF=store.getState().unfavourite
      // var string= '<ul> '
      // unF.forEach(function(uns) {
      //   string += '<span className= "left">'+ uns +' SGD '+ cryptos[uns].SGD+'</span>'+'<button '+'id='+'"'+uns+'"'+' onClick={this.onclick}></button>'+ '<br />';
      // })
      // string += '</ul>'
      // document.getElementById("unfavouriteContainer").innerHTML = string


    });

  axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=d86f430c22e3c06b84864a10dd728250ca595fb00926a3472392716b318464ad')
  .then(res=>{
    if (this._isMounted){
    const today=res.data;
    var todayDataLow=[]
    var todayDataHigh=[]
    var todayTime=[]
    for (var i=0;i<(today.Data.Data).length; i++){
      todayDataLow.push(today.Data.Data[i].low);
      todayDataHigh.push(today.Data.Data[i].high)
      var date = new Date(1000*today.Data.Data[i].time)
      var utcString = date.toUTCString().slice(5,16); 
      todayTime.push(utcString)
    }
    this.setState({today:today, todayDataLow : todayDataLow, todayDataHigh: todayDataHigh, todayTime: todayTime})
  }
})
}
componentWillUnmount(){
  this._isMounted = false;
}

onclick=(e)=>{
  const store =this.state.store
  const cryptos=this.state.cryptos
  
  if (localStorage.getItem('unfavourite').split(',').includes(e.target.id)){
    store.dispatch({
    type: 'ADD_Favourite',
    text: e.target.id
    })
    store.dispatch({
    type: 'REMOVE_unFavourite',
    text: e.target.id
    })
    const unF_local=localStorage.getItem('unfavourite').split(',')
    var unF_str= '<ul>'
    unF_local.forEach(function(uns) {
      unF_str += '<div id="crypto-container">'+uns +'&nbsp&nbsp&nbsp&nbsp&nbsp'+' SGD'+ cryptos[uns].SGD+'&nbsp'+'<button '+'align="right"'+'id='+'"'+uns+'"'+' onClick={this.onclick} position>Add</button>'+'</div>'+'<br />';})
    unF_str += '</ul>'
    document.getElementById("Local_unfavouriteContainer").innerHTML = unF_str
      
    const F_local=localStorage.getItem('favourite').split(',')
    var F_str= '<ul>'
    F_local.forEach(function(fs) {
      F_str += '<div id="crypto-container">'+ fs +'&nbsp&nbsp&nbsp&nbsp&nbsp'+' SGD'+ cryptos[fs].SGD+'&nbsp'+'</div>'+'<br />';})
    F_str += '</ul>'
    document.getElementById("Local_FavouritContainer").innerHTML = F_str;
    }
  }


  setGradientColor=(canvas, color)=>{
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0,0,600,500)
    gradient.addColorStop(0,color);
    gradient.addColorStop(0.95,"rgba(103,122,144,0.5)");
    return gradient
  }


  getChartData = (datalow,datahigh,Time) =>{
      const data = this.state.data;
      if (data.datasets){
        let colors=["rgba(235,0,25,0.75)","rgba(0,0,255,0.75)"] 
        let labels=["Low","High"]
        let hours=[datalow,datahigh]
        let timelables=Time
        data.labels= timelables
        data.datasets.forEach((set,i)=>{
        set.label= labels[i]
        set.backgroundColor="transparent"
        set.borderColor=colors[i];
        set.borderWidth =2;
        set.labelColor=colors[i]
        set.data= hours[i]
        });
      }
      return (data);
  } 
  


  render(){
    return(
        <div>
        <Layout className="layout">
        <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}>
                <Menu.Item key="1"><Link to ="/News">Cryptocurrency News</Link></Menu.Item>
                <Menu.Item key="2">Price</Menu.Item>
            </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Price</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 350 }}>
              <span className="left"><big>Bitcoin Historical Price Graph (SGD v.s Date)</big></span> 
            <div style={{position:"relative",width: 1010, height: 550 }}> 
            <span className="right">
            </span>
            <!--Updated localStorage -->
            <Line options={{responsive: true}} data={this.getChartData(localStorage.getItem('todayDataLow').split(','),localStorage.getItem('todayDataHigh').split(','),localStorage.getItem('todayTime').split(','))} />
            {/* Here is the History chart, however there is a synchronize issue required to be solve */}
            {/* <Line options={{responsive: true}} data={this.getChartData(this.state.todayDataLow,this.state.todayDataHigh,this.state.todayTime)} /> */}
            </div></div><br/>
            <div style={{ background: '#e8e8e8', padding: 24, minHeight: 350 }}>
            <span className="left"><big>Latest Cryptocurrency Rate</big> </span> <br/><br/>
            <span className="left"><div><big><font color='#096dd9'>Favourite-List</font></big></div></span><br/><br/>
            <div id="Local_FavouritContainer" onClick={this.onclick}><span className='left'></span></div><br/>
                <div><big>All Cryptocurrencies </big></div><br/>
                <div id="Local_unfavouriteContainer" onClick={this.onclick}></div> </div>  
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>,
     </div>
     
    );
    
  }
};

export default PricePage
