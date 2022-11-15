import React, { useLayoutEffect, useState, useEffect } from 'react'
import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { UserIcon, ChevronDownIcon, MagnifyingGlassIcon, AdjustmentsVerticalIcon } from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import client from "../sanity"

const Home = () => {
    const navigation = useNavigation();
    const [featuredCategories, setFEaturedCategories] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    useEffect(() => {
        client.fetch(`
            *[_type == "featured"]{
                ...,
                restaurants[]->{
                    ...,
                    dishes[]->
                }
            }`).then(data => {
            setFEaturedCategories(data)
        })
    }, [])

    // console.log(featuredCategories);


    return (
        <SafeAreaView className="bg-white pt-5 flex-1 grow h-screen" >

            <View>

                {/* Header */}

                <View className="flex-row pb-3 items-center mx-4 space-x-2">
                    <Image
                        source={{ uri: 'https://links.papareact.com/wru', }}
                        className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                    />
                    <View className="flex-1">
                        <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
                        <Text className="font-bold text-xl flex items-center ">
                            Current Location
                            <ChevronDownIcon size={20} color="#00CCBB" />
                        </Text>
                    </View>
                    <UserIcon size={35} color="#00CCBB" />
                </View>

                {/* Search */}

                <View className="flex-row items-center space-x-2 pb-2 mx-4">
                    <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
                        <MagnifyingGlassIcon color="#00CCBB" />
                        <TextInput placeholder="Restaurant & Cuisines" />
                    </View>
                    <AdjustmentsVerticalIcon color="#00CCBB" />
                </View>
            </View>

            {/* Scroll View */}

            <ScrollView className="bg-gray-100">

                {/* Categories */}

                <Categories />

                {/* Featured Rows */}

                {/* Featured */}

                {featuredCategories?.map((category) => (
                    <FeaturedRow
                        key={category._id}
                        id={category._id}
                        title={category.name}
                        description={category.short_description}
                        featuredCategory="featured"
                    />
                ))}


            </ScrollView>

        </SafeAreaView>
    )
}

export default Home