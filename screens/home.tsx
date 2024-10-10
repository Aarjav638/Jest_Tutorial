import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import LazyImage from '../components/LazyImage';

const Home = () => {
  const limit = 10;
  const [skip, setSkip] = React.useState(0);
  const [recipes, setRecipes] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<unknown>(null);
  const [hasMore, setHasMore] = React.useState(true);
  const isFetching = useRef(false);

  const fetchRecipes = useCallback(async () => {
    if (isFetching.current || !hasMore) {
      return;
    }
    isFetching.current = true;
    console.log('fetching recipes');
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/recipes?limit=${limit}&skip=${skip}`,
      );
      const data = await response.json();
      setRecipes(prevRecipes => [...prevRecipes, ...data.recipes]);
      setHasMore(data.recipes.length > 0);
      setSkip(prevSkip => prevSkip + limit);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [skip, hasMore]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const renderItem = useCallback(
    ({
      item,
    }: {
      item: {
        id: string;
        name: string;
        image: string;
        ingredients: string[];
      };
    }) => <Item item={item} />,
    [],
  );

  const handleEndReached = useCallback(() => {
    if (!loading && hasMore) {
      setTimeout(() => {
        fetchRecipes();
      }, 500);
    }
  }, [loading, hasMore, fetchRecipes]);

  if (error) {
    return <Text>{String(error)}</Text>;
  }

  return (
    <View>
      {loading && skip === 0 ? (
        <Skeleton />
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          onEndReachedThreshold={0.5}
          onEndReached={handleEndReached}
          ListFooterComponent={hasMore ? <Skeleton /> : null}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={10}
          removeClippedSubviews={true}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  skeletonContainer: {
    gap: 10,
    marginBottom: 10,
    padding: 10,
    justifyContent: 'space-between',
    flex: 1,
  },
  skeletonChildContainer: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
    padding: 10,
  },
  skeletonChildText: {
    padding: 8,
    width: '10%',
    backgroundColor: 'grey',
  },
  skeletonChildText2: {
    padding: 8,
    width: '80%',
    backgroundColor: 'grey',
  },
  skeletonImage: {
    padding: 100,
    margin: 10,
    width: '60%',
    backgroundColor: 'grey',
  },
  image: {
    width: '80%',
    height: 250,
    padding: 10,
    alignSelf: 'center',
    marginBottom: '4%',
    objectFit: 'contain',
  },
  flatlistContainer: {borderBottomWidth: 1, marginBottom: 10, padding: 10},
  flatlistChild: {flexDirection: 'row', marginBottom: '4%'},
  flatlistText: {margin: 5, fontSize: 18, color: 'orange'},
  ingredientContainer: {flexDirection: 'row', marginBottom: '4%'},
});

const Skeleton = () => {
  return (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonChildContainer}>
        <View style={styles.skeletonChildText} />
        <View style={styles.skeletonChildText2} />
      </View>
      <View style={styles.skeletonImage} />
    </View>
  );
};

const Item = React.memo(
  ({
    item,
  }: {
    item: {
      id: string;
      name: string;
      image: string;
      ingredients: string[];
    };
  }) => (
    <View style={styles.flatlistContainer}>
      <View style={styles.flatlistChild}>
        <Text>{item.id}.</Text>
        <Text>{item.name}</Text>
      </View>
      {item.image ? (
        <LazyImage uri={item.image} style={styles.image} />
      ) : (
        <Text>Image Not Available</Text>
      )}
      <Text style={styles.flatlistText}> Ingredients Required </Text>
      {item.ingredients.map((ingredient: string, index: number) => (
        <View key={index} style={styles.ingredientContainer}>
          <Text>{index + 1}</Text>
          <Text>{ingredient}</Text>
        </View>
      ))}
    </View>
  ),
);
