import bananojs from '@bananocoin/bananojs'

const bananoJsInstance = () => {
    bananojs.setBananodeApiUrl('https://kaliumapi.appditto.com/api');
    return bananojs
}

export default bananoJsInstance;