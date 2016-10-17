import React, { Component } from 'react'
var TimerMixin = require('react-timer-mixin');
var reactMixin = require('react-mixin');

import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    AsyncStorage,
    Image,
    Text,
    Navigator
} from 'react-native'
import questionService from '../Services/QuestionService';
class Countdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            targetDate: new Date().toString(),
            time: {
                total: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            }
        }
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
    componentDidMount() {

        this.timer = TimerMixin.setInterval(() => {

            this.refresh();
        }, 1000);
    }
    async _loadInitialState() {
        try {
            var date = new Date();
            var uservalue = await AsyncStorage.getItem('user');
            var userdata = JSON.parse(uservalue);
            this.state.clientToken = userdata.token;
            var value = await AsyncStorage.getItem('QuestionSetDetails');
            var questionSetDetails = JSON.parse(value);
            this.state.onlineTestUserId = questionSetDetails.online_test_user_id;
            this.setState({ totalTime: questionSetDetails.total_time });
            var targetDate = new Date(date.setMinutes(date.getMinutes() + 1))
            this.setState({ targetDate: targetDate });
        } catch (error) {
            console.log("error:" + error.message);
        }
    }
    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    refresh() {
        var t = Date.parse(this.state.targetDate) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        var time = {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
        this.setState({ targetDate: this.state.targetDate, time: time });
        if (this.state.time.total == 0) {
            TimerMixin.clearTimeout(this.timer);
            this.setState({ isTestBegin: 0 });
            questionService.testTimeOut(this.state).then((responseData) => {
                if (responseData.id) {
                    this.finishTest(responseData.id);
                    // this.props.navigate('FinishTest');
                }
            });
        }
    }
    finishTest(id) {
        this.redirect('FinishTest', id);
    }

    render() {
        return (
            <View style={styles.container}>
                <View ><Text>
                    Time Remaining {this.state.time.hours}
                </Text></View>
                <View><Text>
                    : {this.state.time.minutes}
                </Text></View>
                <View ><Text>
                    : {this.state.time.seconds}
                </Text></View>
            </View>
        )
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 9,
        marginBottom: 8,
        textAlign: 'center',
    },
    year: {
        textAlign: 'center',
    },
    thumbnail: {
        width: 53,
        height: 81,
    },
    listView: {
        paddingTop: 300,
        backgroundColor: '#F5FCFF',
    },
});

reactMixin(Countdown.prototype, TimerMixin);

module.exports = Countdown;