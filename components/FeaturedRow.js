import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import client from '../sanity'

const FeaturedRow = ({ id, title, description }) => {

    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        client.fetch(`
        
            
            *[_type == "featured" && _id==$id]{
                ...,
                restaurants[]->{
                    ...,
                    dishes[]->, type->{
                        name
                    }
                },
            }[0]        
            `, { id: id }).then(data => {
            setRestaurants(data?.restaurants)
        })
    }, [])

    return (
        <View>
            <View className="mt-4 flex-row items-center justify-between px-4">
                <Text className="font-bold text-lg">{title}</Text>
                <ArrowRightIcon color="#00CCBB" />
            </View>
            <Text className="text-gray-400 px-4 text-xs">{description}</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
                className="pt-4"
            >

                {/* Restaurant Cards */}


                {restaurants?.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant._id}
                        id={restaurant._id}
                        imageUrl={restaurant.image}
                        title={restaurant.name}
                        rating={restaurant.rating}
                        genre={restaurant.type?.name}
                        address={restaurant.address}
                        short_description={restaurant.short_description}
                        dishes={restaurant.dishes}
                        long={restaurant.long}
                        lat={restaurant.lat}
                    />
                ))}

            </ScrollView>
        </View>
    )
}

export default FeaturedRow