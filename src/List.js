import React, { Component } from 'react';


class Item extends Component {
	render() {
  	return <li key=	{ this.props.name } >
      	{ this.props.name }
        { this.props.children }
    </li>
  }
}

class List extends Component {
  
  list(data) {
  	const children = (items) => {
    	if (items) {
      	return <ul>{ this.list(items) }</ul>
      }
    }
    
    return data.map((node, index) => {
      return <Item key={ node.id } name={ node.name }>
        { children(node.items) }
      </Item>
    })
  }
  
  render() {
  	return <ul>
    	{ this.list(this.props.data) }
    </ul>
  }
}

export default List;