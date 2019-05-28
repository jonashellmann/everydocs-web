"use strict";

class State extends React.Component {
	render(props) {
		return null;
	}
}

class States extends React.Component {
	render(props) {
		return null;
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
		return null;
	}
}

class Tags extends React.Component {
	render(props) {
		return null;
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
		return null;
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
			let documents = data.documents.map((doc) => {
				return (
					<Document id="ID" title="Title" description="Desc" state="Finished" folder="None" date="2019-05-28" person="Me" />
				); // TODO
			});
			this.setState({documents: documents});
			console.log("state", this.state.documents);
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