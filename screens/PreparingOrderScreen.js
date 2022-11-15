import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';

const PreparingOrderScreen = () => {
    return (
        <SafeAreaView className="flex-1 bg-white justify-center items-center">
            <Animatable.Image
                source={require("../images/processing.gif")}
                animation="slideInUp"
                iterationCount={1}
                className="h-96 w-96 bg-transparent"
            />
            <Animatable.Text animation="slideInUp" iterationCOunt={1} className="text-lg my-10 text-black font-bold text-center">
                Waiting for reatuarant to accept your order
            </Animatable.Text>

            <Progress.CircleSnail size={60} color={['red', 'green', 'blue']} fill="white" className="fill-white" />

        </SafeAreaView>
    )
}

export default PreparingOrderScreen