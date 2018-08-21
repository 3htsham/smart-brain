import React, { Component } from 'react';
import ParticlesBg from './components/Particles/Particles';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLink from './components/ImageLink/ImageLink';
import Rank from './components/Rank/Rank';
import './App.css';


const initialState = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signin',
			isSignedIn: false,
			user: {
				id: '',
				name: '',
				email: '',
				entries: 0,
				joined: ''
			}
		}


class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	loadUser = (userdata) => {
		this.setState({user: {
						id: userdata.id,
						name: userdata.name,
						email: userdata.email,
						entries: userdata.entries,
						joined: userdata.joined
					}})

	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	LocateFace = ( data ) => {
		const face = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: face.left_col * width,
			topRow: face.top_row * height,
			rightCol: width - (face.right_col * width),
			bottomRow: height - (face.bottom_row * height)
		}
	}

	FaceBox = (box) => {
		this.setState({box: box})
	}

	onButtonClick = () => {
		this.setState( {imageUrl: this.state.input} );

		fetch('https://cryptic-forest-31788.herokuapp.com/imageurl', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				input: this.state.input
			})
		})
		.then(response => response.json())
		.then( response => {
			if(response) {
				fetch('https://cryptic-forest-31788.herokuapp.com/image', {
					method: 'put',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						id: this.state.user.id
					})
				})
				.then(response => response.json())
				.then (counts => {
					this.setState(Object.assign(this.state.user, {
						entries: counts
					}))
				})
				.catch(console.log)
			}
			this.FaceBox(this.LocateFace(response))
		})
	 	.catch(err => console.log(err));
	}

	onRouteChange = (route) => {
		if (route === 'home'){
			this.setState({isSignedIn: true})
		} else {
			this.setState(initialState)
		}
		this.setState({route: route});
	}

	render() {
		const { imageUrl, box, route, isSignedIn } =this.state;
		return (
			<div className='App'>
			
				<ParticlesBg className='particles' />
				<Navigation 
				onRouteChange={ this.onRouteChange }
				isSignedIn={ isSignedIn } />
				
				{ 
				route === 'home'
					? 	<div>
							<Logo />
							<Rank
								name={this.state.user.name}
								entries={this.state.user.entries}
							 />
							
							<ImageLink 
								onInputChange = {this.onInputChange} 
								onButtonClick = {this.onButtonClick}
							/>

							<FaceRecognition 
							box= {box}
							imageUrl= {imageUrl}
							/>
						</div>
					: ( this.state.route === 'signin'
						? <Signin loadUser={this.loadUser} onRouteChange={ this.onRouteChange} />
						: <Register loadUser={this.loadUser} onRouteChange={ this.onRouteChange} />
					)
				}
			</div>
		);
	}
}

export default App;