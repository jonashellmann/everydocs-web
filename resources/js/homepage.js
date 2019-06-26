"use strict";

class State extends React.Component {
	render(props) {
		return (
			<div class="state">
				<p>{props.name}</p>
			</div>
		);
	}
}

class States extends React.Component {
	constructor(props) {
		super();
		this.state = {
			states: []
		}
	}
	
	componentWillMount() {
		fetch(config.url + 'states', {headers: {'Authorization': config.token}})
		.then(results => results.json())
		.then(data => {
			let states = data.map((state) => {
				return (
					<State name={state.name} />
				);
			});
			this.setState({states: states});
		});
	}
	
	render() {
		return (
			<div id="states">
				{this.state.states}
			</div>
		);
	}
}

class Person extends React.Component {
	render(props) {
		return null;
	}
}

class Persons extends React.Component {
	render(props) {
		return null;
	}
}

class Tag extends React.Component {
	render(props) {
		return (
			<div class="tag">
				<p>{props.name}</p>
			</div>
		);
	}
}

class Tags extends React.Component {
	constructor(props) {
		super();
		this.tags = {
			tags: []
		}
	}
	
	componentWillMount() {
		fetch(config.url + 'states', {headers: {'Authorization': config.token}})
		.then(results => results.json())
		.then(data => {
			let tags = data.map((tag) => {
				return (
					<Tag name={tag.name} />
				);
			});
			this.setState({tags: tags});
		});
	}
	
	render() {
		return (
			<div id="tags">
				{this.state.tags}
			</div>
		);
	}
}

class Folder extends React.Component {
	render(props) {
		return null;
	}
}

class Folders extends React.Component {
	render(props) {
		return null;
	}
}

class Search extends React.Component {
	render(props) {
		return (
			<div id="search">
				// TODO: AJAX-Suche, evtl. ohne Button, sondern bei Eingabe-Event
				<form>
					<input type="text" placeholder="Search" name="s"/>
					<input type="submit" formmethod="get" value="🔎" />
				</form>
			</div>
		);
	}
}

class Document extends React.Component {
	render(props) {
		return (
			<tr>
				<td>{this.props.id}</td>
				<td>{this.props.title}</td>
				<td>{this.props.description}</td>
				<td>{this.props.state}</td>
				<td>{this.props.folder}</td>
				<td>{this.props.date}</td>
				<td>{this.props.person}</td>
				// TODO: Untermenü
				<td></td>
			</tr>
		);
	}
}

class DocumentTable extends React.Component {
	constructor(props) {
		super();
		this.state = {
			documents: []
		}
	}
	
	componentWillMount() {
		fetch(config.url + 'documents', {headers: {'Authorization': config.token}})
		.then(results => results.json())
		.then(data => {
			let documents = data.map((doc) => {
				let state = "-"
				if (doc.state_id !== null) {
					state = doc.state.name;
				}
				let folder = "-"
				if (doc.folder_id !== null) {
					folder = doc.folder.name;
				}
				let person = "-"
				if (doc.person_id !== null) {
					person = doc.person.name;
				}
				
				return (
					<Document key={doc.id} id={doc.id} title={doc.title} description={doc.description} state={state} folder={folder} date={doc.document_date} person={person} />
				);
			});
			this.setState({documents: documents});
		});
	}
	
	render() {
		return (
			<table id="document-table">
				<tbody>
					<tr>
						<th>Doc-ID</th>
						<th>Title</th>
						<th>Description</th>
						<th>State</th>
						<th>Folder</th>
						<th>Date</th>
						<th>Person</th>
						<th></th>
					</tr>
					{this.state.documents}
				</tbody>
			</table>
		);
	}
}

class Documents extends React.Component {
	render(props) {
		return (
			<div id="documents">
				<h2>Documents</h2>
				<DocumentTable />
			</div>
		);
	}
}

class RightBar extends React.Component {
	render(props) {
		return (
			<div id="right-bar">
				<States />
				<Persons />
				<Tags />
			</div>
		);
	}
}

class LeftBar extends React.Component {
	render(props) {
		return (
			<div id="left-bar">
				<Search />
				<Folders />
			</div>
		);
	}
}

class MainContent extends React.Component {
	render(props) {
		return (
			<div id="main">
				<LeftBar />
				<Documents />
				<RightBar />
			</div>
		);
	}
}

class Header extends React.Component {
	render(props) {
		return ( 
			<div id="header">
				<ul>
					<ol><a href="/">Home</a></ol>
					<ol><a href="/new/document/">New Document</a></ol>
				</ul>
			</div>
		);
	}
}

class Homepage extends React.Component {
	render(props) {
		return (
			<div id="homepage">
					<Header />
				<MainContent />
			</div>
		);
	}
}

// ========================================

ReactDOM.render(<Homepage/>, document.getElementById("root"));