import React, { useState, useEffect } from 'react';
import { View,  StyleSheet } from 'react-native';

import MapView, {Callout, Marker} from 'react-native-maps';
import Api from '../service/axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCloud, faCloudRain, faSnowflake, faCloudSun, faCloudSunRain} from '@fortawesome/free-solid-svg-icons'
import { Text } from 'react-native-elements';

const AnyReactComponent = ({value}) => <View>{icons[value.temp]}</View>;

const icons = {
  Clouds:   <FontAwesomeIcon icon={faCloud}  color="#9FF5F7"/>,
  Drizzle:  <FontAwesomeIcon icon={faCloudSunRain}  color="#A7ACAC"/>,
  Rain:     <FontAwesomeIcon icon={faCloudRain}  color="#1482F0"/>,
  Thunderstorm: <FontAwesomeIcon icon={faCloudRain}  color="#1482F0"/>,
  Snow:     <FontAwesomeIcon icon={faSnowflake}  color="#74AFEB"/>,
  Clear:    <FontAwesomeIcon icon={faCloudSun}  color="#B2BD00"/>,
}

const Main = () => {
  const [data, setData] = useState([]);
  const [position, setPosition] = useState({
    latitude: -14.23,
    longitude: -51.92,
    latitudeDelta: 25.0,
    longitudeDelta: 25.0,
  });

  useEffect(() => {
    Api.get(`posts`)
      .then(response => setData(response.data))
      .catch(err =>  console.log(err));
  }, []);

  function formatTemp(fahrenheit) {
    return  fahrenheit+'\xB0F';
  } 

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={position}
        onPress={e =>
          setPosition({
            ...position,
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          })
        }>
        {Object.values(data).map((values, index) => {
              const coordinate = {
                latitude: parseFloat(values.Cordenadas.lat),
                longitude: parseFloat(values.Cordenadas.lon),
                latitudeDelta: 25.0,
                longitudeDelta: 25.0}
      
              return(
                <Marker key={index} coordinate={coordinate}>
                  <AnyReactComponent
                    value={{
                      temp: values.Clima,
                    }
                  }/>
                  <Callout style={styles.plainView}>
                      <View>
                        <Text>
                          Cidade: {values.Cidade}{"\n"}
                          Descricao: {values.Descricao}{"\n"}
                          Grau: {formatTemp(values.temperatura)}{"\n"} 
                          Clima: {values.Clima}{"\n"} 
                          pressao do ar: {values.pressao}{"\n"} 
                        </Text>
                      </View>
                  </Callout>
                </Marker>
              );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  plainView: {
    width: 200,
  },
});

export default Main; 