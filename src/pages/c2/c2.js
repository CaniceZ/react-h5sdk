import React from 'react';
import appStore from '../../store/index'

class C2 extends React.Component{
  componentDidMount() {
    document.title = "mobx值"
  }
  toC1= () => {
    this.props.history.push('/C1');
    console.log(process.env.REACT_APP_BASEPAI)
  }
  render() {

    return (
      <div onClick={this.toC1}>
        store.timer：{appStore.timer}
        <br/>
        store.desc（wallet/index的接口返回结果）：{appStore.desc}
      </div>
    )
  }
}

export default C2;
