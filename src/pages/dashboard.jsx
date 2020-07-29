import React, { Component, useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import logo from '../logo.svg';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {generate,presetPalettes} from '@ant-design/colors';
import axios from 'axios'

const {Header, Content, Sider, Footer} = Layout; 


function DashBoard() {
    const [news, setNews] = useState('')
    useEffect(()=>{
        axios.get('http://newsapi.org/v2/everything?q=bitcoin&from=2020-06-28&sortBy=publishedAt&apiKey=6c19551830ff42658f68b53c37b3ea84')
    .then(
        res=>setNews(res.data.articles)
    )
    // We only want to fetch data when the component mounts. That's why you 
    // can provide an empty array as second argument to the effect hook to avoid 
    // activating it on component updates but only for the mounting of the component.
} ,[])

return (
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
             </Breadcrumb></Content>
             <div style={{ background: '#fff', padding: 24, minHeight: 350 }}><big><span className='left'>Latest Cryptocurrency News</span></big><br/>
             <div>{Object.keys(news).map((key)=>(
                    <div id="news-container">
                        <span className='right'><img src={news[key].urlToImage} height='80px' width='80px' ></img></span>
                        <span className='left'>{news[key].title}</span>
                        <br/>
                        {news[key].description} 
                    </div>
                ))}</div>
            </div>
            <br />
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    </div>
)

}







// class DashBoard extends Component{
//     _isMounted=false;
//     constructor(props){
//       super(props);
//       this.state={
//           news: ''}
//       }
          
//     componentDidMount(){
//     this._isMounted=true;
//     axios.get('http://newsapi.org/v2/everything?q=bitcoin&from=2020-06-24&sortBy=publishedAt&apiKey=6c19551830ff42658f68b53c37b3ea84')
//     .then(res=>{
//         const news=res.data.articles;
//         if (this._isMounted){
//         this.setState({news: news});
//       }
//     })}

//     componentWillUnmount(){
//         this._isMounted = false;
//       }

            


//     render(){
//         console.log(this.state.news)
//     return(
//         <div>
//         <Layout className="layout">
//         <Header>
//             <div className="logo" />
//             <Menu
//                 theme="dark"
//                 mode="horizontal"
//                 defaultSelectedKeys={['1']}
//                 style={{ lineHeight: '64px' }}>
//                 <Menu.Item key="1">Cryptocurrency News</Menu.Item>
//                 <Menu.Item key="2"><Link to ="/Prices">Price</Link></Menu.Item>

//             </Menu>
//         </Header>
//         <Content style={{ padding: '0 50px' }}>
//             <Breadcrumb style={{ margin: '16px 0' }}>
//                 <Breadcrumb.Item>Home</Breadcrumb.Item>
//                 <Breadcrumb.Item>News</Breadcrumb.Item>
//             </Breadcrumb>
//             <div style={{ background: '#fff', padding: 24, minHeight: 350 }}><big><span className='left'>Latest Cryptocurrency News</span></big><br/>
//             <div>{Object.keys(this.state.news).map((key)=>(
//                     <div id="news-container">
//                         <span className='right'><img src={this.state.news[key].urlToImage} height='80px' width='80px' ></img></span>
//                         <span className='left'>{this.state.news[key].title}</span>
//                         <br/>
//                         {this.state.news[key].description} 
//                     </div>
//                 ))}</div>
//             </div>
//             <br />
//         </Content>
//         <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
//       </Layout>,
//      </div>
//     )
    
// }
// }


export default DashBoard
