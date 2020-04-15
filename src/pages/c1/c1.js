import React from 'react';
import styles from "./c1.scss"
import appStore from '../../store/index'
import { observer } from 'mobx-react';

@observer
class C1 extends React.Component{
  toWallet= () => {
    this.props.history.push({pathname:'/wallet/index?platformCoin=200&platformCoinName=金币',state: { platformCoin:200,platformCoinName:"金币" }});
    console.log(process.env.REACT_APP_BASEPAI)
  }
  toC2 =()=>{
    this.props.history.push('/C2')
  }
  render() {
    const store = appStore;
    return (
      <div className="a">
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
      </div>
    )
  }
}

export default C1;
