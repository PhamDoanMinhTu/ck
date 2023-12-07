import { connect } from 'react-redux';
import { addOrUpdateItem, removeItem } from '../redux/action';
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const src1 = ({ addOrUpdateItem, removeItem, navigation }) => {

    const [list, setList] = useState([])
    const [close, setClose] = useState(false)
    const [name, setName] = useState("")
    const [gender, setGender] = useState(0)
    const [id, setId] = useState(null)

    useEffect(() => {
        getList();
    }, [])
    const getList = () => {
        fetch("https://654de1d3cbc325355742011e.mockapi.io/jb", {
            method: "GET"
        }).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            if (res) {
                setList(res);
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const save = (item) => {

        if (!name || !gender) {
            console.log("Nhap di dcm");
            return;
        }
        const genderValue = gender.toLowerCase() === "male" ? 1 : 0;

        const newData = {
            name: name,
            gender: genderValue,
        };

        const apiEndpoint = id
            ? "https://654de1d3cbc325355742011e.mockapi.io/jb/${id}"
            : "https://654de1d3cbc325355742011e.mockapi.io/jb";

        const method = id ? "PUT" : "POST";

        fetch(apiEndpoint, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),

        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);

                if (id) {
                    setList((preList) =>
                        preList.map((item) => (item.id === id ? res : item))
                    );
                } else {
                    setList((preList) => [...preList, res]);
                }
                setClose(false);
                setName("");
                setGender(0);
                setId(null);
            })
            .catch((err) => {
                console.log(err);
            });
        addOrUpdateItem(res);


    };

    const remove = (item) => {
        fetch(`https://654de1d3cbc325355742011e.mockapi.io/jb/${item.id}`, {
            method: "DELETE"
        })
            .then(res => {
                if (res.ok) {
                    setList(preList => preList.filter(i => i.id !== item.id));

                } else {
                    console.log("xoa cl");
                }
            })
            .catch(err => {
                console.log(err);
            });
        removeItem(item.id);

    };
    const showEdit = (item) => {
        setName(item.name)
        var genderValue = item.gender === 1 ? "Male" : "Female"
        setGender(genderValue)
        setId(item.id)
        setClose(true)
    }

    return (
        <View style={{ flex: 1 }}>

            {/* Edit src */}
            <Modal
                visible={close}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold' }}>New</Text>
                    <Pressable onPress={() => {
                        setClose(false)
                        
                    }}>

                        <Text style={{ color: "#DC143C", fontSize: 20 }}>Close</Text>

                    </Pressable>


                </View>

                <View style={{ margin: 19 }}>
                    <Text>Họ và Tên</Text>
                    <TextInput
                        style={{ margin: 10, height: 60, borderWidth: 1, borderColor: "gray" }}
                        placeholderTextColor={"gray"}
                        value={name}
                        onChangeText={(text) => {
                            setName(text)
                        }}
                    />
                    <Text>Giới tính</Text>
                    <TextInput
                        style={{ margin: 10, height: 60, borderWidth: 1, borderColor: "gray" }}
                        placeholderTextColor={"gray"}
                        value={gender}
                        onChangeText={(text) => {
                            setGender(text)
                        }}
                    />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Pressable
                        onPress={save}>
                        <Text style={{ color: "#07f7f7", fontSize: 20 }}>Lưu</Text>
                    </Pressable>


                </View>
            </Modal>

            {/* Display */}

            <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold' }}>Ten va gioi tinh</Text>
            <View style={{}}>
                <Pressable
                    onPress={() => { setClose(true) }}
                    style={{ height: "40px", width: "80px", backgroundColor: "blue" }}
                >
                    <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold' }}>New</Text>
                </Pressable>
            </View>

            <FlatList
                data={list}
                numColumns={1}
                renderItem={({ item }) => {
                    return (
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginLeft: 18, }}>
                                <Text style={{ fontSize: 20, fontWeight: '500' }}>Ten: {item.name}</Text>
                                <Text style={{ fontSize: 20, fontWeight: '500' }}>Gioi Tinh: {item.gender == 1 ? "Male" : "Female"}</Text>
                            </View>
                            <View>
                                <Pressable
                                    onPress={() => { remove(item) }}
                                    style={{ height: "35px", width: 40, backgroundColor: "red" }}
                                >
                                    <Text style={{ textAlign: 'center', marginTop: 6 }}>Delete</Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => { showEdit(item) }}
                                    style={{ height: "35px", width: 40, backgroundColor: "blue" }}
                                >
                                    <Text style={{ textAlign: 'center', marginTop: 6 }}>Edit</Text>
                                </Pressable>
                            </View>
                        </View>

                    )
                }}

            />
        </View>
    );
};

const mapStateToProps = (state) => ({
    list: state.list,
});

const mapDispatchToProps = {
    addOrUpdateItem,
    removeItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(src1);
