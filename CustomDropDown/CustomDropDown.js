import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import countries from './CountryData';

const DropDown = () => {
    const [selectedCountry, setSelectedCountry] = useState('Select Country');
    const [isClicked, setIsClicked] = useState(false);
    const [data, setData] = useState(countries);
    const searchRef = useRef();
    const onSearch = (txt) => {
        if (txt !== '') {
            let tempData = data.filter((item) => {
                return item.country.toLowerCase().indexOf(txt.toLowerCase()) > -1;
            })
            setData(tempData);
        } else {
            setData(countries)
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>DropDown</Text>
            <TouchableOpacity
                style={styles.dropDownSelector}
                onPress={() => {
                    setIsClicked(!isClicked);
                }}>
                <Text>{selectedCountry}</Text>
                {isClicked ? (
                    <Image
                        source={require('../../assets/images/upload.png')}
                        style={styles.icon} />

                ) : (
                    <Image
                        source={require('../../assets/images/dropDown.png')}
                        style={styles.icon} />
                )}
            </TouchableOpacity>
            {/* if isClicked then show the area */}
            {isClicked ? (
                <View style={styles.dropDownArea}>
                    <TextInput
                        ref={searchRef}
                        placeholder='Search'
                        style={styles.search}
                        onChangeText={(txt) => {
                            onSearch(txt);
                        }} />
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    style={styles.countryItem}
                                    onPress={() => {
                                        setSelectedCountry(item.country);
                                        onSearch(''); // for return complete list
                                        setIsClicked(false)
                                        searchRef.current.clear();
                                    }}>
                                    <Text>{item.country}</Text>
                                    <Text>{item.code}</Text>
                                </TouchableOpacity>
                            )
                        }} />
                </View>
            ) : null}

        </View>
    )
}

export default DropDown;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headingText: {
        fontSize: 22,
        fontWeight: '800',
        alignSelf: 'center',
        marginTop: 100,

    },
    dropDownSelector: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: .5,
        borderColor: '#8e8e8e',
        alignSelf: 'center',
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    icon: {
        width: 20,
        height: 20,
    },
    dropDownArea: {
        width: '90%',
        height: 300,
        borderRadius: 15,
        marginTop: 20,
        backgroundColor: '#ffffff',
        elevation: 3,
        alignSelf: 'center'
    },
    search: {
        width: '90%',
        height: 50,
        borderWidth: .5,
        borderColor: '#8e8e8e',
        borderRadius: 9,
        alignSelf: 'center',
        marginTop: 13,
        paddingHorizontal: 15
    },
    countryItem: {
        width: '85%',
        height: 50,
        borderBottomWidth: .3,
        borderBottomColor: '#8e8e8e',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 7
    }
})