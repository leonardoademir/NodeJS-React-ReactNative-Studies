import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({ host: '200.158.15.30' })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
