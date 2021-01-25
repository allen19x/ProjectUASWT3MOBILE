import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View } from 'react-native';

import NavigationRouter from '../navigation/NavigationRouter'

export default class App extends Component {
	render() {
		return (
				<View style={{ flex: 1 }}>
					<NavigationRouter />
				</View>
		);
	}
}
