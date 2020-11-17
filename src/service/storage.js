import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TOKEN_KEY = "@token"

export const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      console.log('failure on store data');
    }
}

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if(value !== null) {
            return value;
        } else return null
    } catch(e) {
        console.log('failure on get data');
    }
}
    
