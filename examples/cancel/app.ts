import axios from '../../src/index';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

console.log(source);

axios
    .get('/cancel/get', {
        cancelToken: source.token
    })
    .catch(e => {
        if (axios.isCancel(e)) {
            console.log('Request canceled', e.message);
        }
    });


setTimeout(() => {
    source.cancel('user intentional cancellation');
    axios
    .post('/cancel/post', {a: 1}, {
        cancelToken: source.token
    })
    .catch(e => {
        if (axios.isCancel(e)) {
            console.log('Request canceled', e.message);
        }
    });
}, 1000)