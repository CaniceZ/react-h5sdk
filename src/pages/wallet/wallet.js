import React from 'react';
import styles from "./wallet.scss"
import http from "../../http"
import qs from "qs";
import UAFormat from "ua-format-js";
import {observer} from "mobx-react";
import appStore from '../../store/index'
@observer
class Wallet extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      query:qs.parse(this.props.location.search.substr(1)),
      remainMoneyFinal: 1,
      remainMoneyTrue: true,
      list:[],
      listItems: "",
      money: "",
      ua: new UAFormat().getResult(),
    };
  }
  componentDidMount() {
    this.getList()
    console.log(this.state.ua,this.props)
    document.title = "平台币充值"
  }
  toRecord = ()=>{
    this.props.history.push('/C1');
  }
  showMoney = ()=>{
    this.setState({remainMoneyTrue:!this.state.remainMoneyTrue})
  }
   activeFun(data) {
    this.state.list.forEach((obj)=> {
      obj.isActive = false;
    });
    data.isActive = !data.isActive;
     this.setListItems()
    console.log(this.state.list)
  }
  setListItems(){
    this.setState({listItems:this.state.list.map((item) =>
        <div
          className="list_item"
          onClick={this.activeFun.bind(this,item)}
          className={`list_item ${item.isActive? 'active' : ''}`}
          key={item.id}
        >
          <div className="shoujia">
            <span>{item.blackBean} </span>
            {this.state.query.platformCoinName}
          </div>
          <div>售价：{item.price}元</div>
        </div>
      )})
  }
  async getList(){
    try {
      const res = await http.get(`/Api/GetH5BlackBeanList.do`, {
        ...this.state.query,
        appId: this.state.query.appId || this.state.query.gameId
      });
      if (res.state === 1) {
        appStore.setDesc(res.desc)
        if (res.data.length > 0) {
          res.data.forEach(item => {
            item.isActive = false;
          });
          res.data[0].isActive = true;
        }
        this.state.list = res.data;
        this.setListItems()
      } else {
        alert(res.desc);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async placeOrder() {
    this.state.money =
      this.state.list.filter(item => {
        if (item.isActive) {
          return item;
        }
      })[0].price * 100;
    let productName =
      this.state.list.filter(item => {
        if (item.isActive) {
          return item;
        }
      })[0].blackBean + this.state.query.platformCoinName;
    let productId = this.state.list.filter(item => {
      if (item.isActive) {
        return item;
      }
    })[0].productId;
    console.log(productName,productId)
    try {
      const res = await http.get(`/Api/H5RechargeFront.do`, {
        ...this.state.query,
        // appId: this.query.appId || this.query.gameId,
        money: this.state.money
      });
      console.log(res,2222)
      if (res.state === 1) {

      } else {
        //this.$toast(res.desc);
      }
    } catch (error) {
      //this.$toast("网络请求超时，请更换网络重试");
    }
  }
  render() {
    return (
      <div className="wallet">
        <div className="header">
          <div className="header_title">
            <div>当前余额</div>
            <div
              onClick={this.toRecord}>充值记录</div>
          </div>
          <div className={`remain_money ${this.state.remainMoneyTrue? 'active' : ''}`}>
              <div style={{width: '200px'}}>
                {!this.state.remainMoneyTrue?(this.state.query.platformCoin.replace(/./g, "*")):(this.state.query.platformCoin)}
                <span onClick={this.showMoney}>
                  {
                    this.state.remainMoneyTrue ?
                      <img  src={require('../../assets/img/eye_open.png')} />:
                        <img src={require('../../assets/img/eye_close.png')} />
                  }
                </span>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="content_title">快速充值</div>
          <div className="list">
            {this.state.listItems}
          </div>
        </div>

        <div className="pay-center__submit">
          <a onClick={this.placeOrder.bind(this)} className="pay-center__submit-button">提交订单</a>
      </div>
      </div>
    )
  }
}

export default Wallet;
