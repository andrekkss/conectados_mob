import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import api, {setAuthHeader} from '../../service/axios';
import { storeData, getData, TOKEN_KEY } from '../../service/storage';

import {
  Container,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
} from './styles';

export default class SignIn extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    userName: '',
    password: '',
    error: '',
  };

  handleUserNameChange = (userName) => {
    this.setState({ userName });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleCreateAccountPress = () => {
    this.props.navigation.navigate('Cadastro');
  };

  handleSignInPress = async () => {
    if (this.state.userName.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
    } else {
      try {
        const response = await api.post('/client/auth', {
          userName: this.state.userName,
          password: this.state.password,
        });

        if(response.data.token != undefined ){
            await storeData(TOKEN_KEY, response.data.token);
            console.log(response.data.token);
            setAuthHeader(response.data.token);
            this.props.navigation.navigate('Main');
        } else {
            this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
        }
      } catch (_err) {
        this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
      }
    }
  };

  async componentDidMount(){
    const token = await getData(TOKEN_KEY);
    if(token != null){
        setAuthHeader(token);
        this.props.navigation.navigate('Main');
    }
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content"/>  
        <Input
          placeholder="Seu usuario"
          value={this.state.userName}
          onChangeText={this.handleUserNameChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Senha"
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
        <Button onPress={this.handleSignInPress}>
          <ButtonText>Entrar</ButtonText>
        </Button>
        <SignUpLink onPress={this.handleCreateAccountPress}>
          <SignUpLinkText>Criar conta</SignUpLinkText>
        </SignUpLink>
      </Container>
    );
  }
}