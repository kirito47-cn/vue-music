import axios from 'axios'
import vue from 'vue'
axios.defaults.baseURL = 'http://39.108.182.125:3000'
axios.interceptors.response.use((res) => {
	if (res.data.code !== 200) {
    vue.$toast('网络异常')
    vue.$hideLoading()
		return Promise.reject(res);
	}
	return res;
}, (error) => {
  vue.$toast('网络异常')
  vue.$hideLoading()
	return Promise.reject(error);
});
export default async function ajax(url,data={},method='GET'){
    method = method.toLocaleLowerCase()  
    switch (method) {
        case 'get':
           let resultGET =   await axios.get(url,{params:data})

           return resultGET.data
            break;
        case 'post':
            let resultPOST =   await axios.post(url,data)
            return resultPOST.data
            break;
        default:
            break;
    }

}   