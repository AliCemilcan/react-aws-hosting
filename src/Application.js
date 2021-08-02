import React, { Component } from 'react';
import ToDoList from './ToDoList';
import ToDoCompleted from './ToDoCompleted';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

class Application extends Component {
	constructor(props) {
		super(props);
		this.state = {
			grudges: [],
			seconds: 0,
			items: [],
			done_items:[],
			text: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.removeToDo = this.removeToDo.bind(this);
	}

	tick() {
		this.setState((state) => ({
			seconds: state.seconds + 1,
		}));
	}

	componentDidMount() {
		this.interval = setInterval(() => this.tick(), 1000);
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	render() {
		return (
			<div>
				<div>
					<Alert variant={'info'}>
						Selam {this.props.name} {this.state.seconds}
					</Alert>
				</div>
				<div class="form-group-property">
					<form onSubmit={this.handleSubmit}>
						<div class="form-group-flex">
							<InputGroup size="sm" className="mb-3">
								<InputGroup.Text>
									What needs to be done ?
								</InputGroup.Text>
								<FormControl
									className="form-text-control"
									as="textarea"
									aria-label="With textarea"
									id="new-todo"
									onChange={this.handleChange}
									value={this.state.text}
								/>
							</InputGroup>
							<Button type="submit" variant="outline-primary">
								Ekle
							</Button>
						</div>
					</form>

					<ToDoList
						removeToDo={this.removeToDo}
						items={this.state.items}
					/>
					<ToDoCompleted items={this.state.done_items} />
				</div>
				<AmplifySignOut />
			</div>
		);
	}

	handleSubmit(e) {
		e.preventDefault();
		if (this.state.text.length === 0) {
			return;
		}
		const newItem = {
			text: this.state.text,
			id: Date.now(),
		};
		this.setState((state) => ({
			items: state.items.concat(newItem),
			text: '',
		}));
	}
	handleChange(e) {
		this.setState({ text: e.target.value });
	}
	removeToDo(item) {
		let new_state = this.state.items.filter((elem) => elem.id != item.id);
		this.setState((state) => ({
			items: new_state,
			text: '',
		}));
		const newItem = {
			text: item.text,
			id: item.id,
		};
		console.log(item, newItem)
		this.setState((state) => ({
			done_items: state.done_items.concat(newItem),
			text: '',
		}));
		console.log(this.state);
	}
}

export default withAuthenticator(Application);