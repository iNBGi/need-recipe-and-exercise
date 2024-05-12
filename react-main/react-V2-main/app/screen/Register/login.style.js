import { StyleSheet } from 'react-native';

export const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Set your desired background color
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    backgroundColor: '#f0f0f0', // Set your desired card background color
    borderRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    color: "#007BFF",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 8,
    elevation: 3,
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  iconButton: {
    marginRight: 10,
    backgroundColor: 'transparent'
  },
  forgotButton: {
    marginVertical: 8,
    color: "#007BFF",
  },
  loginButton: {
    marginVertical: 8,
    backgroundColor: "#007BFF",
  },
  registerButton: {
    marginVertical: 8,
    color: "#007BFF",
  },
});