import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
class ToDoCompleted extends Component {

	render() {
		return (
			<Card style={{ width: '18rem' }}>
				<Card.Header>
					Things you have done #<b>{this.props.items.length}</b>
				</Card.Header>
				<ListGroup variant="flush">
					{this.props.items.map((item) => (
						<ListGroup.Item key={item.id}>
							{item.text}
						</ListGroup.Item>
					))}
				</ListGroup>
			</Card>
		);
	}
}

export default ToDoCompleted;
