import React, {FC} from 'react';
import {Button, Image, Text, View} from 'react-native';
import {useDispatch} from '../../../init';

import {deleteComment} from '../../../store/comment/commentsThunks';
import {Comment} from '../../../store/comment/types.ts';
import {useTheme} from '../../../assets/themes/ThemeContext.ts';
import {getStyles} from '../../screens/CommentsScreen/style.ts';

export const CommentItem: FC<{item: Comment}> = ({item}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (item.id) {
      dispatch(deleteComment(item.id));
    }
  };

  return (
    <View style={styles.comment}>
      {item.avatar && (
        <Image source={{uri: item.avatar}} style={styles.avatar} />
      )}
      {item.file && item.file.uri ? (
        <Image source={{uri: item.file.uri}} style={styles.avatar} />
      ) : (
        <Image
          source={{
            uri: 'https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70.jpg',
          }}
          style={styles.avatar}
        />
      )}
      <View style={styles.info}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.text}>{item.text}</Text>
        <Button
          color={theme.buttonColor}
          title="Delete"
          onPress={handleDelete}
        />
      </View>
    </View>
  );
};
