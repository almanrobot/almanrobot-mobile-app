import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron, {
  asyncStorage,
  networking,
  openInEditor,
  trackGlobalErrors,
} from 'reactotron-react-native';

Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(asyncStorage())
  .use(networking())
  .use(trackGlobalErrors())
  .use(openInEditor())
  .connect(); // let's connect!
