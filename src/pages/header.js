import React from 'react';
  class Header extends React.Component{
    constructor(props) {
      super(props);
      this.state = {text: props.text,nums: props.nums};
    }
    handleClick = (e) => {
      e.preventDefault();
      console.log('The link was clicked.');
      this.setState({text: '子组件切换父组件的文本'});
      if(this.state.text === '子组件切换父组件的文本'){
        this.setState({listItems:this.state.nums.reverse().map((number) =>
            <li key={number}>{number}</li>
          )})
      }
    }
    componentDidMount() {
      const numbers = this.state.nums;
      this.setState({listItems:numbers.map((number) =>
          <li key={number}>{number}</li>
        )})
    }
    render() {
      return (
        <div>
          <p onClick={this.handleClick}>
            {this.state.text}
          </p>
          <ul>{this.state.listItems}</ul>
        </div>
      )
    }
  }

export default Header;
