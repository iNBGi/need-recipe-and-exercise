import{ StyleSheet } from "react-native";


export const Exerstyle = StyleSheet.create({
    content: {
        padding: 0,
          flex: 1,
          backgroundColor: "#1b1e31",
        },
        
        
          top: {
            flex: .2,
            borderWidth: 10,
            borderColor: "#fffff",
          },
          bottom: {
            flex: .8,
            
          },
          card:{
            padding: 5,
            flexDirection:"row",
            backgroundColor:"#1f1f1f"
             },
        image: {
          flex: 1,
          justifyContent: "center",
          width: 340, height: 360
        },
      view: {
          width: "100%"
      },
      cardTitle: {
        textAlign: 'center',
          color: "rgb(101,37,131)"
      },
      titleText: {
       
        marginBottom:15,
        borderRadius: 0,
        backgroundColor: "#FFFFFF",
        color: "#242F9B",
        textAlign: "center",
        padding:10,
        fontSize: 20,
      },
          Text: {
            marginTop: 16,
            paddingVertical: 8,
            borderWidth: 4,
            borderColor: "#20232a",
            borderRadius: 1,
            backgroundColor: "#ECE5C7",
            height: 70,
            textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
        },
        button:{
          
          justifyContent: 'center',
          alignItems: 'center'
        },
        cardcover:{
          backgroundColor: "#2f2d26",
  
        },
        card1:{
          padding: 0,
          margin:20
        },
        card2:{
          padding: 0,
          margin:20,
          marginBottom:150
        },
      cardButton: {
          margin: 1,
        
      }
})