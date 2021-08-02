import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CloseButton from 'react-bootstrap/CloseButton';
class ToDoList extends Component {
	constructor(props) {
		super(props);
		this.state = { isToggleOn: true };

		// Callback içerisinde `this` erişiminin çalışabilmesi için, `bind(this)` gereklidir
		// this.removeToDo = this.removeToDo.bind(this);
	}

	render() {
		return (
			<Card style={{ width: '18rem' }}>
				<Card.Header>
					Things to do #<b>{this.props.items.length}</b>
				</Card.Header>
				<ListGroup variant="flush">
					{this.props.items.map((item) => (
						<ListGroup.Item key={item.id}>
							{item.text}
							<CloseButton
								onClick={() => this.props.removeToDo(item)}
								className="set_right_end"
								variant="black"
							/>
						</ListGroup.Item>
					))}
				</ListGroup>
			</Card>
		);
	}
}

export default ToDoList;