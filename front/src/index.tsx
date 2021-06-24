import React from 'react';
import ReactDOM from 'react-dom';
import { socket, SocketContext } from './socket';
import './index.css';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<SocketContext.Provider value={socket}>
			<App />
		</SocketContext.Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);
