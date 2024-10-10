import React, {useState} from 'react';
import {Image, View, StyleSheet, ActivityIndicator} from 'react-native';

const LazyImage = ({uri, style}: {uri: string; style: object}) => {
  const [loading, setLoading] = useState(true); // State to track image loading

  return (
    <View style={[styles.imageContainer, style]}>
      {loading && (
        <View style={styles.loaderContainer}>
          {/* Show loading indicator */}
          <ActivityIndicator size="large" color="orange" />
        </View>
      )}
      <Image
        source={{uri}}
        style={[style, {opacity: loading ? 0 : 1}]} // Make image invisible until it's loaded
        onLoadStart={() => setLoading(true)} // Set loading to true on start
        onLoadEnd={() => setLoading(false)} // Set loading to false when finished
        resizeMode="contain"
      />
    </View>
  );
};

export default LazyImage;

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey', // Background color while loading
  },
});
