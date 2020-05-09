import axios from 'axios'
import vue from 'vue'
axios.defaults.baseURL = 'http://39.108.182.125:3000'
// @ts-ignore
axios.interceptors.response.use((res) => {
	if (res.data.code !== 200) {
    // @ts-ignore
    vue.$toast(res.data.message)
    // @ts-ignore
    vue.$hideLoading()
		return Promise.reject(res);
	}
	return res;
}, (error) => {
  // @ts-ignore
  console.log(error)
  vue.$toast("用户名或密码错误")
  // @ts-ignore
  vue.$hideLoading()
	return Promise.reject(error);
});
export default async function ajax(url,data={},method='GET'){
    method = method.toLocaleLowerCase()  
    switch (method) {
        case 'get':
           // @ts-ignore
           let resultGET =   await axios.get(url,{params:data})

           return resultGET.data
            // @ts-ignore
            break;
        case 'post':
            // @ts-ignore
            let resultPOST =   await axios.post(url,data)
            return resultPOST.data
            // @ts-ignore
            break;
        default:
            break;
    }

}   