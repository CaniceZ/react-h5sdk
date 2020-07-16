import React, {Component} from 'react';
import styles from "./Dialog.scss"

class Dialog extends Component {
  constructor(props) {
   super(props)
    this.state = {
      title: props.title,
      leftText: props.leftText,
      rightText: props.rightText,
      visible: props.visible
    }
  }
  componentDidMount(){

  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible
    });
  }
  closeDialog = ()=>{
    this.setState({visible: false})
  }
  render() {
    return (
      <div className={`dialog ${this.state.visible? 'active' : ''}`}>
        <div className="dialog__container">
          <div className="dialog-content">
              <p>{this.state.title}</p>
              {this.props.children}
          </div>
          <div className="dialog-footer">
            <div className="stress" onClick={this.closeDialog}>
              <span>{this.state.leftText}</span>
            </div>
            <div onClick={this.closeDialog}>
              <span>{this.state.rightText}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dialog;
