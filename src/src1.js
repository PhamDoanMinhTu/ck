import { connect } from 'react-redux';
import { addOrUpdateItem, removeItem } from '../redux/action';
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'



const src1 = ({addOrUpdateItem, removeItem}) => {
    const [list, setList] = useState([])
  return (
    <View>
      <Text>src1</Text>
    </View>
  )
}

export default src1

const styles = StyleSheet.create({})