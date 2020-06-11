import React, {Component} from 'react';
import {Dimensions, ImageBackground, StyleSheet, Text, View, TextInput, Picker} from "react-native";
import { DatePicker } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';

export const Input = ({placeholder, label, keyboardType, onChange, name}) => (
  <View style={{marginVertical: 4}}>
    <Text style={styles.LabelStyle}>
      {label}
    </Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#4F7E8D"
        keyboardType={keyboardType}
        onChangeText={(value) => onChange(name, value)}
        secureTextEntry={label === 'Password'}
        clearButtonMode="always"
      />
  </View>
);

export const DateField = ({
  label,
  placeHolder,
  handleChange
}) => (
  <View style={{marginVertical: 4}}>
    <Text style={styles.LabelStyle}>
      {label}
    </Text>
    <View style={styles.DateInput}>
      <DatePicker
        // defaultDate={new Date()}
        // minimumDate={new Date(2018, 1, 1)}
        maximumDate={new Date()}
        locale={"en"}
        timeZoneOffsetInMinutes={undefined}
        modalTransparent={false}
        animationType={"fade"}
        androidMode={"default"}
        placeholder={placeHolder}
        textStyle={{ color: "#4F7E8D", fontWeight: 'normal' }}
        placeHolderTextStyle="#4F7E8D"
        onDateChange={handleChange}
      />
    </View>
  </View>
)

export const SelectField = ({
  label,
  placeHolder,
  handleChange,
  selectedValue,
  data,
}) => (
  <View style={{marginVertical: 4}}>
    <Text style={styles.LabelStyle}>
      {label}
    </Text>
      <Dropdown
        containerStyle={styles.SelectInput}
        onChangeText={handleChange}
        dropdownOffset={{top: 5}}
        textColor='#4F7E8D'
        data={data}
      />
  </View>
)

const styles = StyleSheet.create({
  LabelStyle: {
    color: "white",
    fontWeight: 'normal',
    marginVertical: 4,
  },
  input: {
    height: 40,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ffcb11',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    width: 250,
  },
  SelectInput: {
    height: 40,
    borderRadius: 6,
    borderWidth: 2,
    fontSize: 30,
    borderColor: '#ffcb11',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginTop: 0,
    width: 250,
  },
  DateInput: {
    height: 40,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ffcb11',
    backgroundColor: 'white',
    width: 250,
  },
});
