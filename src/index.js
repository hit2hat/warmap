import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

setInterval(() => {
    const text = 'Данный продукт запрещено использовать без заключения договора. Для данной копии договор заключен не был!';
    alert(text);
}, 1800000);
