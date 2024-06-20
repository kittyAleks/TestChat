import SQLite from 'react-native-sqlite-storage';
import {Comments, Comment} from '../store/comment/types';

const database = SQLite.openDatabase(
  {
    name: 'comments.db',
    location: 'default',
  },
  () => {
    console.log('Database opened successfully');
  },
  error => {
    console.error('Error opening database: ', error);
  },
);

export const createTables = async () => {
  await database.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        avatar TEXT,
        username TEXT,
        email TEXT,
        homepage TEXT,
        captcha TEXT,
        text TEXT,
        createdAt TEXT,
        file TEXT
        parentId INTEGER
      )`,
      [],
      () => {
        console.log('Table created successfully');
      },
      error => {
        console.error('Error creating table: ', error);
      },
    );
  });
};

// export const addMissingColumns = async (): Promise<void> => {
//   await database.transaction(tx => {
//     tx.executeSql(
//       'ALTER TABLE comments ADD COLUMN file TEXT',
//       [],
//       () => {
//         console.log('Column "file" added successfully.');
//       },
//       (error: any) => {
//         // Ignore error if the column already exists
//         if (error?.message?.includes('duplicate column name')) {
//           console.log('Column "file" already exists.');
//         } else {
//           console.error('Error adding column "file": ', error);
//         }
//       },
//     );
//   });
// };

export const addComment = async (comment: Comment): Promise<Comment | null> => {
  return new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        'INSERT INTO comments (avatar, username, email, homepage, captcha, text, createdAt, file) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          comment.avatar,
          comment.username,
          comment.email,
          comment.homepage,
          comment.captcha,
          comment.text,
          comment.createdAt,
          JSON.stringify(comment.file),
        ],
        (__, results: any) => {
          const newComment = {
            ...comment,
            id: results.insertId,
          };
          resolve(newComment);
        },
        error => {
          reject(error);
        },
      );
    });
  });
};

export const getComments = async (): Promise<Comments | null> => {
  return new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM comments ORDER BY createdAt DESC',
        [],
        (__, results) => {
          let rows = results.rows.raw();
          resolve(
            rows.map(row => ({
              ...row,
              file: row.file ? JSON.parse(row.file) : null,
            })),
          );
        },
        () => {
          reject(() => {
            return null;
          });
        },
      );
    });
  });
};

export const deleteCommentFromDB = async (
  commentId: string,
): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        'DELETE FROM comments WHERE id = ?',
        [commentId],
        () => {
          resolve(commentId);
        },
        () => {
          reject(null);
        },
      );
    });
  });
};
