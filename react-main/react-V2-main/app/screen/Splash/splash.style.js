import{ StyleSheet } from "react-native";


export const Splashstyle = StyleSheet.create({
    content: {
      
      padding: 0,
        flex: 1,
        backgroundColor:"#ffffff"
      },
      
        top: {
          flex: .2,
          borderWidth: 10,
          borderColor: "#6684a1",
        },
        bottom: {
          flex: .8,
          
        },
      image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300, height: 200
      },
    view: {
      flexDirection: 'column',
justifyContent: 'center',
alignItems: 'center',
height: '100%',
        width: "100%"
    },
    cardTitle: {
      textAlign: 'center',
        color: "#6684a1"
    },
    titleText: {
      marginBottom:15,
      borderRadius: 0,
      backgroundColor: "#1f1f1f",
      color: "#4cd964",
      textAlign: "center",
      padding:10,
      fontSize: 25,
    },
        Text: {
          marginTop: 16,
          paddingVertical: 8,
          borderWidth: 4,
          borderColor: "#20232a",
          borderRadius: 1,
          backgroundColor: "#ECE5C7",
          height:80,
          textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 25,

      },
      button:{
        
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        color:"000000"
      },
      buttonText: {
        color: "#000000", // Default text color for buttons
      },
      card1:{
       
        margin:20,
        backgroundColor: "#6684a1",
        width: 300
      },
      cardcover:{
        
      },
      card:{
     flexDirection:"row",
     backgroundColor:"#1f1f1f"

      },

      card2:{
       
        margin:10,
        backgroundColor: "#1f1f1f",
      },
      Paragraph:{
        width: 500
      },

    cardButton: {
      position: 'absolute',
      bottom:0,
      left:0,
        
    },
    cardButton1: {
      
      margin: 1,
      backgroundColor: "#1f1f1f",
      bottom:0,
  }
    
    
})