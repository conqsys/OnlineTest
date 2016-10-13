
import React, {
    Component,
} from 'react';
import {
    Image,
    StyleSheet,
    AsyncStorage,
    Text,
    TouchableHighlight,
    View,
    WebView,
    TouchableOpacity
} from 'react-native';
var HTMLView = require('react-native-htmlview')
var MultipleChoice = require('react-native-multiple-choice')
import CountDown from './CountDown';
import Question from './Question';
import questionService from '../Services/QuestionService';
import styles from '../Stylesheet/Style';
class CurrentTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionsArr: [''],
            selectedOptions: [],
            question: {},
            maxselectOptions: 1
        }
        // console.log("parameter value " +this.props.parameter);
    }

    componentWillMount() {
        this._loadInitialState().done();
    }
    async _loadInitialState() {
        try {
            var uservalue = await AsyncStorage.getItem('user');
            var userdata = JSON.parse(uservalue);
            this.setState({ clientToken: userdata.token });
            var value = await AsyncStorage.getItem('QuestionSetDetails');
            var questionSetDetails = JSON.parse(value);
            this.setState({ questionSetid: questionSetDetails.question_set_id });
            this.setState({ userid: questionSetDetails.user_id });
            this.getQuestions();
        } catch (error) {
            console.log("error:" + error.message);
        }
    }
    // checkIsMultiOptions() {
    //     if (this.state.isMultiOptions == 0) {
    //         this.setState.maxselectOptions = this.state.optionsArr.length;
    //     }
    //     else {
    //         this.setState.maxselectOptions = 1;
    //     }
    // }

    async getQuestions() {
        try {
            questionService.getQuestions(this.state).then((responseData) => {
                if (responseData) {
                    var optionsDescription = responseData.question.options.map(function (val) {
                        return val.description;
                    });
                   
                    this.setState({ isMultiOptions: responseData.question.is_multiple_option })
                    if (this.state.isMultiOptions == 0) {
                        this.setState.maxselectOptions = this.state.optionsArr.length;
                    }
                    this.setState({ question: responseData.question });
                    this.setState({ optionsArr: optionsDescription });
                    this.setState({ optionsa: responseData.question.options });
                }
            })
            .catch((error) => {
                console.log("error" + error);
            });
        } catch (error) {
            console.log("error" + JSON.stringify(error));
        }
    }
    selectedOption(option) {
        // this.setState({ selectedOptions  });
        var selectedvalue = this.state.question.options.filter(function (obj) {
            return obj.description === option;
        })[0];
        if (this.state.selectedOptions.indexOf(selectedvalue) >= 0)
            this.state.selectedOptions.splice(this.state.selectedOptions.indexOf(selectedvalue), 1);
        else
            this.state.selectedOptions.splice(this.state.selectedOptions.length, 0, selectedvalue);
    }

    next() {
        //alert(JSON.stringify(this.state.selectedOptions));
        try {
            JSON.stringify(this.state);
            questionService.saveAns(this.state).then((responseData) => {
                if (responseData) {
                    var optionsDescription = responseData.question.options.map(function (val) {
                        return val.description;
                    });
                    this.setState({ isMultiOptions:  responseData.question.is_multiple_option });
                    this.setState({ question: responseData.question });
                    this.setState({ optionsArr: optionsDescription});
                    this.setState({ optionsa: responseData.question.options});
                    if (this.state.isMultiOptions == 0) {
                        this.setState.maxselectOptions = this.state.optionsArr.length;  
                    }
                }
                else{
                     this.navigate('FinishTest'); 
                }
            });
        } catch (error) {
            console.log("error" + JSON.stringify(error));
        }
    }
    render() {
        var htmlContent = this.state.question.question_description;

        return (
            <View style={styles.container}>
                    <CountDown />       
                    <Text> TestTitle: {this.state.question.online_test_title}</Text>
                    <HTMLView value={htmlContent} stylesheet={styles} />
                    <MultipleChoice enableEmptySections={true}
                        options={this.state.optionsArr}
                        maxSelectedOptions={this.state.maxselectOptions}
                        onSelection={(option) => this.selectedOption(option) }
                        />
                  <TouchableHighlight style={styles.button} onPress={() => this.next() }>
                    <Text style={styles.buttonText} >
                        Next
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

module.exports = CurrentTest
