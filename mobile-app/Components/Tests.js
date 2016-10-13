
import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    AsyncStorage,
    ScrollView,
    ListView,
    View } from 'react-native';
import { Subheader, Divider } from 'react-native-material-design';
import styles from '../Stylesheet/Style';
import navstyle from '../Stylesheet/nav';
import questionService from '../Services/QuestionService';

class Test extends Component {
    constructor(props) {
        super(props);
        // console.log("parameter value " +this.props.parameter);
        this.state = {
            userName: 'admin',
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }

        this.renderTest = this.renderTest.bind(this);
        this.navigate = this.navigate.bind(this);

    }
    navigate(routeName) {
        this.props.navigator.push({
            routeName: routeName
        });
    }

    componentWillMount() {
        this._loadInitialState().done();
    }
    async _loadInitialState() {
        try {
            var value = await AsyncStorage.getItem('user');
            var userdata = JSON.parse(value);
            this.setState({ userName: userdata.user.user_name });
            this.setState({ clientToken: userdata.token });
            this.setState({ userid: userdata.user.user_id });
            console.log('Login User Data =>' + userdata);
            this.getQuestionSet();

        } catch (error) {
            console.log("error:" + error.message);
        }
    }
    storedQuestionSetDetails(questionSetValue) {
        try {
            AsyncStorage.setItem('QuestionSetDetails', JSON.stringify(questionSetValue));
        }
        catch (error) {
            console.log("error:" + JSON.stringify(error));
        }
    }

    async getQuestionSet() {
        try {

            questionService.questionSet(this.state).then((responseData) => {
                if (responseData) {

                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(responseData),
                        loaded: true,
                    });
                    // console.log(this.state.dataSource);
                }
            });
        } catch (error) {
            console.log("error" + JSON.stringify(error));
        }
    }
    selectQuestionSet(questionSet) {
        this.storedQuestionSetDetails(questionSet);
        this.navigate('CurrentTest')
    }
    renderTest(questionSet) {
        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <View>
                        <TouchableOpacity style={styles.list} onPress={() => this.selectQuestionSet(questionSet) }>
                            <Text style={styles.row}>
                                {questionSet.online_test_title}
                            </Text>
                            <Text style={styles.title}>
                               Expried Date : {questionSet.test_completed_date}
                            </Text>
                            <Text style={styles.title}>
                               Start Time : {questionSet.test_start_time}
                            </Text>
                            <Text style={styles.title}>
                               End Time : {questionSet.test_end_time}
                            </Text>
                            <Text style={styles.title}>
                              Total Time : {questionSet.total_time}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View >
            </ScrollView >
        );
    }
    render() {
        return (
            <View style={styles.container} >
                <Text  style={styles.buttonText}>
                    Welcome {this.state.userName}
                </Text>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderTest} />
            </View>
        );
    }
}
module.exports = Test;