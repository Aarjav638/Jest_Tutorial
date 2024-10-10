import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import React, {useCallback, useEffect} from 'react';

const Home = () => {
  const limit = 10;
  const [skip, setSkip] = React.useState(0);
  const [recipes, setRecipes] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<unknown>(null);
  const [hasMore, setHasMore] = React.useState(true);

  const fetchRecipes = useCallback(async () => {
    console.log('fetching recipes');
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
    }
  }, [skip]);

  useEffect(() => {
    if (skip === 0) {
      fetchRecipes();
    }
  }, [fetchRecipes, skip]);
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

  if (error) {
    return <Text>{String(error)}</Text>;
  }

  return (
    <View>
      {loading ? (
        <Sketeleton />
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          onEndReachedThreshold={0.3}
          onEndReached={hasMore ? fetchRecipes : undefined}
          ListFooterComponent={hasMore ? <Sketeleton /> : null}
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
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    height: 'auto',
  },
  skeletonChildContainer: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
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
  skeletonImage: {padding: 100, width: '60%', backgroundColor: 'grey'},
  image: {
    width: '80%',
    height: 250,
    alignSelf: 'center',
    marginBottom: '4%',
    objectFit: 'contain',
  },
  flatlistContainer: {borderBottomWidth: 1, marginBottom: 10, padding: 10},
  flatlistChild: {flexDirection: 'row', marginBottom: '4%'},
  flatlistText: {margin: 5, fontSize: 18, color: 'orange'},
  ingredientContainer: {flexDirection: 'row', marginBottom: '4%'},
});

const Sketeleton = () => {
  return (
    <FlatList
      data={Array.from({length: 10})}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderSkeleton}
    />
  );
};
const renderSkeleton = () => (
  <View style={styles.skeletonContainer}>
    <View style={styles.skeletonChildContainer}>
      <View style={styles.skeletonChildText} />

      <View style={styles.skeletonChildText2} />
    </View>
    <View style={styles.skeletonImage} />
  </View>
);
const Item = ({
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
      <Image source={{uri: item.image}} style={styles.image} />
    ) : (
      <Text>Loading</Text>
    )}
    <Text style={styles.flatlistText}> Ingredients Required </Text>
    {item.ingredients.map((ingredient: string, index: number) => (
      <View key={index} style={styles.ingredientContainer}>
        <Text>{index + 1}</Text>
        <Text>{ingredient}</Text>
      </View>
    ))}
  </View>
);
