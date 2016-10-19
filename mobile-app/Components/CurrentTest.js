
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
            maxselectOptions: 1,
            buttonText: 'Next'
        }
        // console.log("parameter value " +this.props.parameter);
    }

    navigate(routeName) {
        // debugger;
        this.props.navigator.push({
            name: routeName
        });
    }
    redirect(routeName, id) {
        this.props.navigator.push({
            routeName: routeName,
            passProps: {
                testUserId: id,
            }
        });
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
            this.state.questionSetid = questionSetDetails.question_set_id;
            this.state.userid = questionSetDetails.user_id;
            this.state.onlineTestUserId = questionSetDetails.online_test_user_id;
            this.getQuestions();
        } catch (error) {
            console.log("error:" + error.message);
        }
    }

    async getQuestions() {
        try {
            questionService.getQuestions(this.state).then((responseData) => {
                if (responseData.online_test_user_id) {
                    this.setQuestion(responseData);
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
        //alert(JSON.stringify(this.state.selectedOptions));
        if (this.state.isMultiOptions != 1) {
            this.state.selectedOptions = [];
        }
        var selectedvalue = this.state.question.options.filter(function (obj) {
            return obj.description === option;
        })[0];
        if (this.state.selectedOptions.indexOf(selectedvalue) > -1) {
            this.state.selectedOptions.splice(this.state.selectedOptions.indexOf(selectedvalue), 1);
        }
        else {
            this.state.selectedOptions.splice(this.state.selectedOptions.length, 0, selectedvalue);
        }
    }
    next() {
        // alert(JSON.stringify(this.state.selectedOptions));
        try {

            JSON.stringify(this.state);
            //  alert(JSON.stringify(this.state.selectedOptions));
            questionService.saveAns(this.state).then((responseData) => {
                if (responseData.online_test_user_id) {
                    this.setQuestion(responseData);
                }
                else if (responseData.id) {

                    this.redirect('FinishTest', responseData.id);
                }
                else {
                    this.navigate('Login');
                }
            });
        } catch (error) {
            console.log("error" + JSON.stringify(error));
        }
    }
    setQuestion(question) {
        this.state.selectedOptions = [];
        var optionsDescription = question.options.map(function (val) {
            return val.description;
        });
        this.setState({ question: question });
        this.setState({ optionsArr: optionsDescription });
        this.setState({ optionsa: question.options });
        this.state.selectedQuestion = question.selectedQuestion;
        this.state.totalQuestions = question.totalQuestions;
        if (this.state.selectedQuestion == this.state.totalQuestions) {
            this.setState({ buttonText: 'Submit' });
        }
        this.state.isMultiOptions = question.is_multiple_option;
        if (this.state.isMultiOptions == 1) {
            this.setState({ maxselectOptions: this.state.optionsArr.length });
        }
    }

    render() {
        var htmlContent = this.state.question_description;

        return (
            <View style={styles.container}>
                <View style={styles.contentrow}>
                    <CountDown navigator={this.props.navigator} />
                    <View style={styles.contentrow} >
                        <Text> Question No: {this.state.question.selectedQuestion}</Text>
                        <Text>/ {this.state.question.totalQuestions}</Text>
                    </View>
                </View>
                <Text> TestTitle: {this.state.question.online_test_title}</Text>
                <HTMLView value={htmlContent} stylesheet={styles} />
                <MultipleChoice
                    options={this.state.optionsArr}
                    maxSelectedOptions={this.state.maxselectOptions}
                    onSelection={(option) => this.selectedOption(option)}
                    />
                <TouchableHighlight style={styles.button} onPress={() => this.next()}>
                    <Text style={styles.buttonText} >
                        {this.state.buttonText}
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

module.exports = CurrentTest
