import React from 'react';
import styles from "./c1.scss"
import appStore from '../../store/index'
import { observer } from 'mobx-react';
import Dialog from '../../components/Dialog'

@observer
class C1 extends React.Component{
  constructor(){
    super()
    this.state = {
      visible: false
    };
  }
  toWallet= () => {
    this.props.history.push({pathname:'/wallet/index?platformCoin=200&platformCoinName=金币',state: { platformCoin:200,platformCoinName:"金币" }});
    console.log(process.env.REACT_APP_BASEPAI)
  }
  toC2 =()=>{
    this.props.history.push('/C2')
  }
  showDialog=()=>{
    this.setState({visible:true})
  }
  render() {
    const store = appStore;
    return (
      <div>
        <p className={"b"} onClick={this.toWallet}>
          跳转充值平台币
        </p>
        <p className={"b"} onClick={this.toC2}>
          跳转C2（mobx测试）
        </p>
        <h3>mobx操作测试</h3>
        <p>store.timer: {store.timer}</p>
        <button onClick={()=>store.decrease()} >减</button>
        <button onClick={()=>store.resetTimer()} >重置</button>
        <button onClick={()=>store.increase()} >加</button>
        <br/>
        <br/>
        <h3 onClick={this.showDialog} style={{background:'#f0f0f0',textAlign: 'center',padding:'10px 0'}}> 弹窗组件</h3>
        <Dialog
          visible={this.state.visible}
          title={"弹窗标题"}
          leftText = {"确定"}
          rightText = {"取消"}
        >
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
          </ul>
        </Dialog>
      </div>
    )
  }
}

export default C1;
