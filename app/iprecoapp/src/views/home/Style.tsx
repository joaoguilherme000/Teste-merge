// pagina de styles para mudar o design
import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: 'center'
  },
  camera: {
    width: "auto",
    height: "92%"
  },
  button: {
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f4a100',
    alignSelf: 'center',
    height: '7%', 
    width: "90%",
    borderRadius: 10,
  },
  image: {
    width: '100%',
  },
});

export default Styles;