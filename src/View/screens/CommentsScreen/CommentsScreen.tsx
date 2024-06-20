// CommentsScreen.tsx
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Button} from 'react-native';

import {useSelector} from '../../../init';
import {fetchComments} from '../../../store/comment/commentsThunks.ts';
import {CommentItem} from '../../components/Comments/CommentsList.tsx';
import {Comments} from '../../../store/comment/types.ts';
import {useDispatch} from '../../../init';
import {useTheme} from '../../../assets/themes/ThemeContext.ts';
import {getStyles} from './style.ts';

export const CommentsScreen = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const dispatch = useDispatch();
  const [sortKey, setSortKey] = useState<'createdAt' | 'username' | 'email'>(
    'createdAt',
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const {comments, loading, error} = useSelector(state => state.comments);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const dataHandler = (): Comments | null => {
    if (comments) {
      const sortedComments = [...comments].sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortKey] > b[sortKey] ? 1 : -1;
        } else {
          return a[sortKey] < b[sortKey] ? 1 : -1;
        }
      });

      const commentsPerPage = 25;

      return sortedComments.slice(
        (currentPage - 1) * commentsPerPage,
        currentPage * commentsPerPage,
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <Button
        color={theme.buttonColor}
        title="Sort by User Name"
        onPress={() => {
          setSortKey('username');
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        }}
      />
      <Button
        color={theme.buttonColor}
        title="Sort by Email"
        onPress={() => {
          setSortKey('email');
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        }}
      />
      <Button
        color={theme.buttonColor}
        title="Sort by Date"
        onPress={() => {
          setSortKey('createdAt');
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        }}
      />
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      <FlatList
        data={dataHandler()}
        renderItem={({item}) => <CommentItem item={item} />}
        keyExtractor={item => item.id ?? Math.random().toString()}
        contentContainerStyle={styles.list}
      />
      <Button
        title="Previous"
        onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
      />
      <Button title="Next" onPress={() => setCurrentPage(prev => prev + 1)} />
    </View>
  );
};
