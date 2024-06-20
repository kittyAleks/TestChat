// import {useEffect} from 'react';
// import io from 'socket.io-client';
// import {useDispatch} from 'react-redux';
// import {createComment} from '../store/comment/commentsThunks.ts';
//
// const useWebSocket = url => {
//   const dispatch = useDispatch();
//
//   useEffect(() => {
//     const socket = io(url);
//
//     socket.on('connect', () => {
//       console.log('Connected to WebSocket server');
//     });
//
//     socket.on('newComment', comment => {
//       dispatch(createComment(comment));
//     });
//
//     socket.on('disconnect', () => {
//       console.log('Disconnected from WebSocket server');
//     });
//
//     return () => {
//       socket.disconnect();
//     };
//   }, [url, dispatch]);
// };
//
// export default useWebSocket;
