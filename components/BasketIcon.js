import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'
import Currency from "react-currency-formatter"

const BasketIcon = () => {
    const items = useSelector(selectBasketItems)
    const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal)

    if (items.length <= 0) return;

    return (
        <View className="absolute bottom-10 w-full z-50">
            <TouchableOpacity onPress={() => navigation.navigate("Basket")} className="bg-[#00CCBB] p-4 rounded-lg mx-5 flex-row items-center space-x-1">
                <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">{items.length}</Text>
                <Text className="text-white font-extrabold text-lg flex-1 text-center">View Basket</Text>
                <Text className="text-white text-lg font-extrabold">
                    <Currency quantity={basketTotal} currency="INR" />
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default BasketIcon