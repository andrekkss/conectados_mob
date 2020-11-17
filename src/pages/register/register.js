import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar } from 'react-native';

import api from '../../service/axios';
import { StackActions, NavigationActions } from 'react-navigation';

import {
  Container,
  Logo,
  SuccessMessage,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignInLink,
  SignInLinkText,
} from './styles';

export default class SignUp extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
      goBack: PropTypes.func,
    }).isRequired,
  };

  state = {
    firstName: 'andre',
    lastName: 'kitano',
    userName: 'andrekitano3',
    email: 'andre.kitano3@gmail.com',
    password: '1234567',
    error: '',
    success: '',
  };

  handleUsernameChange = (userName) => {
    this.setState({ userName });
  };

  handleFirstNameChange = (firstName) => {
    this.setState({ firstName });
  };

  handleLastNameChange = (lastName) => {
    this.setState({ lastName });
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleBackToLoginPress = () => {
    this.props.navigation.goBack();
  };

  handleSignUpPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha todos os campos para continuar!' }, () => false);
    } else {
      try {
        await api.post('/client', {
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          userName: this.state.userName,
          password: this.state.password,
        });

        this.setState({ success: 'Conta criada com sucesso! Redirecionando para o login', error: '' });
        setTimeout(this.goToLogin, 2500);
      } catch (_err) {
        console.log(JSON.stringify(_err));
        this.setState({ error: 'Houve um problema com o cadastro, verifique os dados preenchidos!' });
      }
    }
  };

  goToLogin = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="#ffff" barStyle="dark-content"/>  
        {this.state.success.length !== 0 && <SuccessMessage>{this.state.success}</SuccessMessage>}
        <Input
          placeholder="Primeiro nome"
          value={this.state.firstName}
          onChangeText={this.handleFirstNameChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
         <Input
          placeholder="Ultimo nome"
          value={this.state.lastName}
          onChangeText={this.handleLastNameChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Nome de usuário"
          value={this.state.userName}
          onChangeText={this.handleUsernameChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Endereço de e-mail"
          value={this.state.email}
          onChangeText={this.handleEmailChange}
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
        <Button onPress={this.handleSignUpPress}>
          <ButtonText>Criar conta</ButtonText>
        </Button>
        <SignInLink onPress={this.handleBackToLoginPress}>
          <SignInLinkText>Voltar ao login</SignInLinkText>
        </SignInLink>
      </Container>
    );
  }
}