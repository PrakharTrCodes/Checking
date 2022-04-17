import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput,Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native';

const Add = ({navigation}) => {
    const route=useRoute()
    const data=route.params
    const { myData, globalIndex } = useSelector(store =>store.StudentReducer);
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [valid, setValid] = useState(true)
    const [valid1, setValid1] = useState(true)



    console.log("GlobalIndex", globalIndex)
    
    const validateFormat = (txt) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(txt);
    }
    console.log("incmimg route",data)

    const update = () => {
        if (name.length > 0 && email.length > 0) {
            if (myData.length > 0) {
                let f = myData.findIndex((ele) => { return (ele.Email == email) })
                if (f == -1) {
                    myData[globalIndex].Name=name
                    myData[globalIndex].Email=email
                    
                    let payload = {
                    myData
                    }
                    dispatch({type :"Update", payload})
                    setName('');
                    setEmail('');
                    navigation.navigate("Student")
                } else if (f == globalIndex) {
                    myData[globalIndex].Name = name;
                    let payload ={
                        myData
                    }

                    dispatch({type :"Update", payload})
                    setName('');
                    setEmail('');
                    navigation.navigate("Student")
                }
                else {
                    Alert.alert("Email Address already registered")
                }
            }
        }

    }

    

    const validateName = (txt) => {
        let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        return regName.test(txt)

    }
    const add = () => {
        if (name.length > 0 && email.length > 0) {
            if (myData.length > 0) {
                let found = myData.findIndex((ele) => { return (ele.Email === email) })
                if (found < 0) {
                    dispatch({type : "Add", payload:{id : Math.random, Name : name, Email : email}});
                    setName('');
                    setEmail('');
                }
                else {
                    Alert.alert("Email Address already registered")
                }
            }else {
                dispatch({type : "Add", payload:{id : Math.random, Name : name, Email : email}})
            }
        }
        else if (name == '') {
            setValid1(true);
        }
        else {
            setValid1(true);
        }
    }


    
    return (
        <View>
                <View style = {styles.form}>
                    <TouchableOpacity 
                    onPress={()=>{ 
                        navigation.navigate("Student")}}
                    style = {styles.cross}> 
                        <Text>{'❌'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.formTxt}>
                        {"Detail Form"}
                    </Text>

                    <TextInput
                        onChangeText={(txt) => {
                            validateName(txt)?setName(txt):setValid(true)
                        }}
                        placeholder='Full Name'
                        style={styles.inputArea} />
                    
                    <TextInput
                        onChangeText={(txt) => {
                            validateFormat(txt)?setEmail(txt):setValid1(true)
                        }}
                        placeholder='Email'
                        style={styles.inputArea} />
                    <TouchableOpacity
                        disabled = {valid && valid1&&(name == '' && email == '' )}
                        onPress={()=>{if(data.comingFrom=='Add'){add()}else{update()}}}
                        style={styles.addBtn}>
                        <Text style={{ fontSize: 16 }}>
                            {data.comingFrom}
                        </Text>
                    </TouchableOpacity>

                </View>
        </View>
    )
}

export default Add

const styles = StyleSheet.create({
    parent: {
        flex: 1,
    },
    empty:{
        height: 400,
        width: 400,
    },
    cross:{
        left: 5,
        alignSelf:'flex-start',
        marginTop: 50
    },
    headerText: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: 28,
        color: 'white',
        fontFamily: 'GillSans-Bold',

    },
    header: {
        backgroundColor: '#7c8cb2',
        width: '100%',
        height: "12%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        alignItems:'center',
        // justifyContent:'center',
        borderBottomColor:'black',
        // borderWidth:2,
        // borderBottomRightRadius:14,
        // borderBottomLeftRadius:14,
        // backgroundColor:'rgba(255, 255, 255, 0.9)',
        // flex: .4,
        // // height: '40%',
        // paddingHorizontal: 10,
        // paddingVertical:12,
    },
    inputArea: {
        width: '100%',
        backgroundColor: '#c9ccd0',
        height: 40,
        paddingHorizontal: 8,
        marginVertical: 4
    },
    addBtn: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
        marginTop: 6,
        alignSelf: 'center',
        width: '30%',
        backgroundColor: '#7c8cb2',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 20
    },
    list: {
        backgroundColor: 'yellow',
        height: '100%'
    },
    listHeaderView: {
        top: 6,
        height: 60,
        alignSelf: 'center',
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6,
        backgroundColor: '#7c8cb2',
        borderBottomRightRadius: 40,
        borderTopLeftRadius: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },
    listHeader: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
        fontSize: 20,
        paddingVertical: 4,
        fontWeight: 'bold'
    },
    flatList: {
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        top: 7,
        backgroundColor: 'white',
    },
    card: {
        top: 5,
        bottom: 20,
        width: '100%',
        marginBottom: 8,
        backgroundColor: "#6498b1",
        marginTop: 8,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
    },
    errTxt: {
        marginBottom: 8,
        color: 'red'
    },
    delete: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    deleteButton: {
        height: '35%',
        width: '10%',
        position: 'absolute',
        top: '15%',
        left: '95%',
    },
    listText: {
        fontSize: 14,
        margin: 5,
        alignSelf: 'center',
        fontFamily: 'GillSans-BoldItalic'
    },
    formTxt: {
        marginTop: 30,
        marginBottom:10,
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingBottom: 12,
        fontFamily: 'Kailasa-Bold'
    },
    edit: {
        color: 'green',
        marginTop: 3,
        bottom: 18,
        alignSelf: 'flex-end',
        fontSize: 15
    },
    addIcon:{
        alignSelf:'flex-end',
        height: 50,
        width: 50,
        marginBottom:40,
        right:8,
    }
}
)
