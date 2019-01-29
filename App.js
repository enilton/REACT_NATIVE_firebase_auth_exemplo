/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase';

export default class App extends Component {

  state ={
    email:'',
    password:'',
    isAutheticated: false,
    msg: '',
  }

  login = async () => {

    if (this.state.email === '' || this.state.password === ''){
        this.setState({msg: 'verifique suas credenciais'});
    } else {

      const {email, password } = this.state;
   
      try{
          const user = await firebase.auth().signInWithEmailAndPassword(email,password);
          this.setState({isAutheticated : true});
          console.log(user);
          this.setState({msg: 'login efetuado com sucesso'});
      } catch (error){
        console.log(error);
        this.setState({msg: 'verifique suas credenciais'});
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
            <TextInput 
              placeholder="e-mail"
              value={this.state.email}
              onChangeText={email => this.setState({email})}
            />

            <TextInput 
              placeholder="password"
              value={this.state.password}
              onChangeText={password => this.setState({password})}  
            />

            <TouchableOpacity
              onPress={this.login}>
                <Text>Logar</Text>              
              </TouchableOpacity>

              <Text>{this.state.msg}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
