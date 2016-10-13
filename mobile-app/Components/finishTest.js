import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    AsyncStorage,
    View
} from 'react-native';

import styles from '../Stylesheet/Style';

class Finish extends Component {
    constructor(props) {
        super(props);
        
    }
    navigate(routeName) {
        // debugger;
        this.props.navigator.push({
            name: routeName
        });
    }

    redirect(routeName) {
        this.props.navigator.push({
            routeName: routeName
        });
    }
    newTest() {
        this.navigate('Login');
    }
    
    render() {
           return (
            <View style={styles.container} >
                 <TouchableHighlight style={styles.button} onPress={() => this.newTest() }>
                    <Text style={styles.buttonText} >
                        Thanks
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }  
}

module.exports = Finish;
