import React from 'react';
class C2 extends React.Component{
  componentDidMount() {

  }
  toC1= () => {
    this.props.history.push('/C1');
    console.log(process.env.REACT_APP_BASEPAI)
  }
  render() {
    return (
      <div onClick={this.toC1}>
        2
      </div>
    )
  }
}

export default C2;
