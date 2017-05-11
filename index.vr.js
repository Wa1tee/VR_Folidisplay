import React from 'react';
import Moment from 'moment';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  VrButton,
} from 'react-vr';
const moment = require('moment')

export default class vr_workshop extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      foliData: [],
      backColor: '#99003d',
    }

    this.fetchData = this.fetchData.bind(this);
  }
  
  fetchData(){
    console.log("fetching...");
    fetch("https://data.foli.fi/siri/sm/T42")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState((prevState) => ({ foliData: (res.result) }));
      }).catch((error) => {
        console.log("Big Network Error");
        console.log(error.message);
      })
  }

  epochConvert(seconds){
    var d = new Date(0);
    d.setUTCSeconds(seconds);
    return d;
  }

  render() {
    return (
      <View>
        <Pano source={asset('matador.jpg')}/>
        <Text
          style={{
            backgroundColor: '#2E2EFEaf',
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -5]}],
          }}>
        Line {this.state.foliData.length ? this.state.foliData[0].lineref:"no data"} to {this.state.foliData.length ? this.state.foliData[0].destinationdisplay:"no data"}
        
        </Text>
        <Text
          style={{
            backgroundColor: '#2E2EFEaf',
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -5]}],
          }}>
        Departure: {this.state.foliData.length ? moment.unix(this.state.foliData[0].aimeddeparturetime).local().format('HH:mm') :"no data"}
        </Text>
        <VrButton
            style={{
                backgroundColor: '#2E2EFEaf',
            }}
            onClick={()=> this.fetchData()}>
            <Text
              style={{
              backgroundColor: '#2E2EFEaf',
              fontSize: 0.8,
              fontWeight: '400',
              layoutOrigin: [0.5, 0.8],
              paddingLeft: 0.2,
              paddingRight: 0.2,
              textAlign: 'center',
              textAlignVertical: 'center',
              transform: [{translate: [0, -0.5, -5]}],
              }}>
            update
            </Text>
        </VrButton>
      </View>
    );
  }
};

AppRegistry.registerComponent('vr_workshop', () => vr_workshop);
