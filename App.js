import { Provider } from 'react-redux';
import store from '../ck/redux/store';
import Src1 from './src/src1';
const App = () => {
  return (
    <Provider store={store}>
      <Src1 />
    </Provider>
  )
}
export default App;