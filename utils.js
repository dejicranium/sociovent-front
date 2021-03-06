const axios = require('axios');
const { store } = require('./store/auth');
const Cookies = require('js-cookie');


module.exports = {
    
    googleAnalytics(){
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-165985781-1');
    },
    setSessionId(){
        let i  =  '_' + Math.random().toString(36).substr(2, 9) + new Date().toISOString().split('-').join('').split(':').join('').split('.').join('')
        const token = Cookies.get('sociosessionid');
        if (!token) {
            Cookies.set('sociosessionid', i);
        }
    },

    getSessionId() {
        return Cookies.get('sociosessionid');
    },

    toggleButtonActiveness(btn, original_text) {
       if (btn.disabled === true) {
           btn.innerHTML = original_text
           btn.disabled = false
       }
       else {
           btn.innerHTML = '...';
           btn.disabled = true;
       }
    },

    async request(url, method, headers={}, data={},query={}, pageMeta={},  baseUrl=process.env.baseUrl,) {
        let queryString = ''

        if (query) {
            queryString = module.exports.serialize(query);
        }
       
        url = url + "?" +queryString

        headers = {...headers, 'Content-Type': 'application/json'}
        const token = Cookies.get('socioventtoken');
        headers.Authorization = 'Bearer ' + token;
        
        console.log('calling ' + url);
        return await axios({
            method,
            url: baseUrl + url,
            data,
            headers,
        })
    },

    checkAuthStatus() {
        return module.exports.request('/auth/rax', 'POST')
            .then(resp => {
                return 1
            })
            .catch(err=> {
                if (err.response && err.response.data.message.indexOf('token') > -1) {
                    // clear cache
                    Cookies.remove('socioventtoken');
                    return 0;
                }
                console.log(err)
            });

    },

    convertObjToQueryString(object) {
        if (object && typeof(object) ==='object')
        {
            Object.keys(query).forEach(q=> {
                if (query[q]) {
                    queryString += `${q}=${query[q]}&`
                }
            })
        }
    },

    serialize(obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    },

    undoSerialize(obj) {
        let result = {}
       if (obj) {
        const strings = result.split('&');
        strings.forEach(string=> {
            const keyitem = string.split('=');
            // if key item has both key and item
            if (keyitem.length == 2) {
                result.keyitem[0] = result.keyitem[1];
            }
        })
       }
       return result;
    }


    

}
