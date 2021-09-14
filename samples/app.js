import { createElement, Component } from "react";
import { render } from "react-dom";
import { demo, xyz } from "./unused";

import * as styles from "./app.css";

demo();
xyz();

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			stories: [
				{
					id: 1,
					name: "[Webpack] — Smart Loading Assets For Production",
					url: "https://hackernoon.com/webpack-smart-loading-assets-for-production-3571e0a29c2e",
				},
				{
					id: 2,
					name: "V8 Engine Overview",
					url: "https://medium.com/@MQuy90/v8-engine-overview-7c965731ced4",
				},
			],
		};
	}
	render() {
		const { stories } = this.state;

		return (
			<div>
				<ul>
					{stories.map((story, index) => (
						<Story key={index} story={story} onRemove={this.removeStory} />
					))}
				</ul>
			</div>
		);
	}
	removeStory = story => () => {
		const { stories } = this.state;

		const index = stories.findIndex(s => s.id == story.id);
		stories.splice(index, 1);

		this.setState(stories);
	};
}

class Story extends Component {
	constructor(props) {
		super(props);

		this.state = { likes: Math.ceil(Math.random() * 100) };
	}
	render() {
		const { story, onRemove } = this.props;
		const { likes } = this.state;

		return (
			<li className={styles.notExist}>
				<button onClick={this.handleClick}>
					{likes}
					❤️
				</button>
				<a className={styles.xxx} href={story.url}>
					{story.name}
				</a>
				<button onClick={onRemove(story)}>Remove</button>
			</li>
		);
	}
	handleClick = () => {
		this.setState({
			likes: this.state.likes + 1,
		});
	};
}

export function reload() {
	render(<App />, document.getElementById("root"));
}
