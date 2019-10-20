import React, { Component } from 'react';
import {Link} from "react-router-dom";
import logo from '../logo.svg';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {generate,presetPalettes} from '@ant-design/colors';
import axios from 'axios'
import { array } from 'prop-types';

const {Header, Content, Sider, Footer} = Layout; 
class DashBoard extends Component{
    _isMounted=false;
    constructor(props){
      super(props);
      this.state={
          news: '',
        cryptos:[]
    }
      }
          
    componentDidMount(){
    this._isMounted=true;
    axios.get('https://newsapi.org/v2/everything?q=bitcoin&from=2019-09-25&sortBy=publishedAt&apiKey=9c8f49f71306459189223ce29f4c6287')
    .then(res=>{
        const news=res.data.articles;
        if (this._isMounted){
        this.setState({news: news});
      }
    })

    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DASH,XRP,EOS,LTC,BCH,TRX,PRC,YBC,DANK,GIVE,KOBO,DT,CETI,SUP,XPD,NXTI&tsyms=SGD,USD&api_key=d86f430c22e3c06b84864a10dd728250ca595fb00926a3472392716b318464ad')
    .then(res=>{
        const cryptos=res.data;
        if (this._isMounted){
        this.setState({cryptos: cryptos});
      }
    }
        )
}

    componentWillUnmount(){
        this._isMounted = false;
      }


    render(){
        console.log(this.state.news)
        console.log((Object.keys(this.state.cryptos).map((key)=>({key}))))

        
        // console.log(Object.keys(this.state.cryptos).map((key)=>({[key].SGD})))

    return(
        <div>
        <Layout className="layout">
        <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}>
                <Menu.Item key="1">Cryptocurrency News</Menu.Item>
                <Menu.Item key="2"><Link to ="/Prices">Price</Link></Menu.Item>

            </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>News</Breadcrumb.Item>
            </Breadcrumb>
            <div>
            <marquee behavior='scroll' direction='left' style={{color:"#0050b3",width:'100%'}}> 
            <div>{Object.keys(this.state.cryptos).map((key)=>(
                <div><big>
                <span className='left'><pre> {key} SGD{this.state.cryptos[key].SGD}</pre></span></big>
                </div>
                ))}</div></marquee>
            </div>
            <div style={{ background: '#fff', padding: 24, minHeight: 350 }}><big><span className='left'>Latest Cryptocurrency News</span></big><br/>
            <div>{Object.keys(this.state.news).map((key)=>(
                    <div id="news-container">
                        <span className='right'><img src={this.state.news[key].urlToImage} height='80px' width='80px' ></img></span>
                        <span className='left'>{this.state.news[key].title}</span>
                        <br/>
                        {this.state.news[key].description} 
                    </div>
                ))}</div>
            </div>
            <br />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>,
     </div>
    )
    
}
}


export default DashBoard
