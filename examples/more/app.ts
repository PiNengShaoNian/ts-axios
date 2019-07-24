import axios from '../../src/index';

// document.cookie = 'a=b;b=3';

// axios.get('/more/get').then(res => {
//     console.log(res);
// });

// axios.post('http://127.0.0.1:8088/more/server2', {}, {
//     withCredentials: true
// }).then(res => {
//     console.log(res);
// });

const instace = axios.create({
    xsrfCookieName: 'XSRF-TOKEN-D',
    xsrfHeaderName: 'X-XSRF-TOKEN-D'
});

instace
    .get('/more/get')
    .then(res => {
        console.log(res);
    });