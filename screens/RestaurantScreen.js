import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity';
import { ArrowLeftIcon, MapPinIcon, StarIcon, ChevronRightIcon } from 'react-native-heroicons/solid';
import { QuestionMarkCircleIcon } from 'react-native-heroicons/outline';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';

const RestaurantScreen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {
        params: {
            id,
            imageUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
        },
    } = useRoute();

    useEffect(() => {
        dispatch(setRestaurant({
            id, imageUrl, title, rating, genre, address, short_description, dishes, long, lat
        }));

    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    // console.log(dishes)

    return (
        <>
            <BasketIcon />
            <ScrollView>
                <View className="relative">
                    <Image
                        source={{ uri: urlFor(imageUrl).url() }}
                        className="w-full h-56 bg-gray-300 p-4"
                    >
                    </Image>
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className="absolute top-10 left-5 p-2 bg-gray-100 rounded-full cursor-pointer"
                    >
                        <ArrowLeftIcon size={20} color="#00CCBB" />
                    </TouchableOpacity>
                </View>
                <View className="bg-white">
                    <View className="px-4 pt-4">
                        <Text className="text-xl font-bold">{title}</Text>
                        <View className="flex-row space-x=2 my-1">
                            <View className="flex-row items-center space-x-1">
                                <StarIcon color="green" opacity={0.5} size={22} />
                                <Text className="text-xs text-gray-400">
                                    <Text className="text-green-500">{rating}</Text> . {genre}
                                </Text>
                            </View>
                            <View className="flex-row items-center space-x-1 ml-3">
                                <MapPinIcon color="gray" opacity={0.4} size={22} />
                                <Text className="text-xs text-gray-400">Nearby . {address}</Text>
                            </View>
                        </View>
                        <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
                    </View>
                    <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
                        <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
                        <Text className="text-md flex-1 font-bold pl-2">
                            Have a food allergy ?
                        </Text>
                        <ChevronRightIcon color="#00CCBB" />
                    </TouchableOpacity>
                    <View className="pb-36">
                        <Text className="text-xl px-4 pt-2 mb-3 font-bold">Menu</Text>

                        {/* DishRows */}

                        {dishes?.map((dish) => (
                            <DishRow
                                key={dish._id}
                                id={dish._id}
                                name={dish.name}
                                description={dish.short_description}
                                price={dish.price}
                                image={dish.image}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default RestaurantScreen