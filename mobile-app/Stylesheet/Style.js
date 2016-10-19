'use strict';

import React, { StyleSheet, Platform, Dimensions, PixelRatio } from "react-native";
const {width, height, scale} = Dimensions.get("window"),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh);

export default StyleSheet.create({

// "child": {
//         "width": 5 * vw
//     },
//     "container": {
//         "flex": 1,
//         "paddingTop": 0,
//         "paddingRight": 0.1 * vmax,
//         "paddingBottom": 0,
//         "paddingLeft": 0.1 * vmax,
//         "marginTop": -20,
//         "marginRight": 0.2 * vmin,
//         "marginBottom": 0,
//         "marginLeft": 0.2 * vmin,
//         "alignItems": "center",
       
//     },
//       "description": {
//         "width": -.5 * vw,
//         "height": 50 * vh,
//         "fontSize": 18,
//         "fontFamily": "ProximaNova-Semibold",
//         "textAlign": "center",
//         "color": "#656656",
//         "writingDirection": "auto",
//         "textShadowOffset": {width: 0, height: 0},
//         "letterSpacing": 0.7,
//         "marginTop": -20,
//         "fontWeight": "700"
//     },
//     "img": {
//         "marginTop": 0,
//         "marginRight": 1,
//         "marginBottom": 2,
//         "marginLeft": 3,
//         "resizeMode": React.Image.resizeMode.cover
//     },
  titleContainer: {
    backgroundColor: '#00BFA5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    height: 100
  },
  listContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'grey'
  },
  button: {
    backgroundColor: '#26a69a',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignSelf: 'stretch'
  },

  buttonprofile: {
    backgroundColor: '#26a69a',
    margin: 15,
    marginLeft: 5,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    width: 100,
    height: 30,
    borderRadius: 8
  },
  buttonDisabled: {
    backgroundColor: '#2bbbad',
    padding: 15,
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    paddingTop: 3,
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center'
  },
  // container: {
  //   flex: 1,
  //   margin: 10,
  //   justifyContent: 'center',
  //   alignItems: "stretch"

  // },
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
  toolbar: {
    height: 60,
    backgroundColor: '#D6D2D2'
  },
  orText: {
    alignSelf: 'center',
    marginTop: 20
  },
  message: {
    color: 'red',
    marginLeft: 5
  },
  heading: {
    fontSize: 30
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'transparent'
  },
  inputText: {
    backgroundColor: '#FFFFFF',
    height: 60
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  // list: {
  //   justifyContent: 'center',
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   width: 100,
  //   height: 100
  // },
  // row: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   padding: 10,
  //   backgroundColor: '#F6F6F6',
  // },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#CCC',
    margin: 10,
    width: 100,
    height: 100,

  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 8
  },
  listView: {
    flexWrap: 'wrap',
    paddingTop: 0,
    height: 1000,
    width: 100
  },

  text: {
    flex: 1,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    padding: 20,
    marginTop: Platform.OS === 'android' ? 30 : 0,
  },
  contentrow: {
    flex: 1,
    flexDirection: 'row',
   // marginVertical: 15,
    // marginHorizontal: 100,
    //textAlign: 'center',
    //alignItems: 'stretch',
    //justifyContent: 'space-between',
  //color: '#FFFFFF',
 
  },
  list: {
    flex: 1,
    // flexWrap: 'wrap',
    // flexDirection: 'row',
    backgroundColor: '#CCC',
    width: 280,

  },
  row: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#8B8989',
    marginVertical: 5,
    // marginHorizontal: 100,
    textAlign: 'center',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    fontSize: 20,
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 7, marginRight: 7,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#00796B',
    margin: 10,
  },
  instructions: {
    fontSize: 20,
    textAlign: 'center',
    color: '#C62828',
    marginTop: 10, marginBottom: 20,
  },
   
  legendLabel: {
    textAlign: 'center',
    color: '#666666',
    marginTop: 10, marginBottom: 20,
    fontSize: 12,
    fontWeight: '300',
  },

});
