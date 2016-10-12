import React, { Component} from 'react'
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
} from 'react-native'

class Countdown extends Component {
    constructor() {
        super();
        var date = new Date();
        date.setMinutes(150);
        this.state = {
            targetDate: date.toString(),
            time: {
                total: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            }
        }

    }

    componentDidMount() {
        this._loadInitialState().done();
        this.timer = TimerMixin.setInterval(() => {
            console.log('Refreshing ' + this.state.time.seconds);
            this.refresh();
        }, 1000);
    }
 async _loadInitialState() {
        try {
            var value = await AsyncStorage.getItem('QuestionSetDetails');
            var questionSetDetails = JSON.parse(value);
            this.setState({ testStartTime: questionSetDetails.test_start_time });
            this.setState({ testEndTime: questionSetDetails.test_end_time });
            this.setState({ totalTime: questionSetDetails.total_time });
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
    }

    render() {
        return (
            <View style={styles.container}><View ><Text >
        Time Remaining {this.state.time.minutes}
        </Text></View>
        <View ><Text >
       : {this.state.time.seconds}
        </Text></View></View>
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