import { Notification } from 'element-ui'
import axios from "axios"
import router from '@/router'
const host = "http://localhost:8088"
axios.defaults.timeout=10000;
const myAxios = axios.create({
    timeout:10000
})

myAxios.interceptors.response.use(
    res=>{
        if(res.status===200){
            if(res.data.code==100){
                router.push('/LoginBegin');
            }
                
            return Promise.resolve(res)
        }
    }
)


export default {
    test() {
        console.log(host);
    },
    
    async getData(api, data) {
        if(window.localStorage.getItem('access-admin')==null){
            router.push('/LoginBegin')
        }
        const res = await myAxios({
            url: host + api,
            headers: {
                'Content-Type': 'application/json',
                'token' : JSON.parse(window.localStorage.getItem('access-admin')).data.token
            },
            method: 'post',
            data: data
        })
        .catch(function () {
            Notification.error({
                title: '错误',
                message: "链接服务器错误,请检查服务器是否开启",
            });
        })
        return res.data;
    }
    ,
    closeSwtich(ip, port, address) {//分闸
        const api = '/switch/api/v1/closeSwitch';
        const data = JSON.stringify({
            "address": address,
            "ip": ip,
            "port": port
        });
        return this.getData(api, data);
    },
    openSwitch(ip, port, address) {//合闸
        const api = '/switch/api/v1/openSwitch';
        const data = JSON.stringify({
            "address": address,
            "ip": ip,
            "port": port
        });
        return this.getData(api, data);
    },
    //testQueryOrdinarySwitchData
    // queryOrdinarySwitchData
    queryOrdinarySwitchData(ip, port, address) {//查询普通微断数据
        const api = '/switch/api/v1/queryOrdinarySwitchData';
        const data = JSON.stringify({
            "address": address,
            "ip": ip,
            "port": port
        });
        return this.getData(api, data);
    },
    // testQueryThreePhaseSwitchData
    // queryThreePhaseSwitchData
    queryThreePhaseSwitchData(ip, port, address) {//查询三相微端数据
        const api = '/switch/api/v1/queryThreePhaseSwitchData';
        const data = JSON.stringify({
            "address": address,
            "ip": ip,
            "port": port
        })
        return this.getData(api, data)
    },
    querySwitchHistoryData(ip, port, address, startTime, endTime, pageNum, pageSize) {//查询历史接口数据
        const api = '/switch/api/v1/queryHistoryLogData?pageNum=' + pageNum + '&pageSize=' + pageSize;
        const data = JSON.stringify({
            "address": address,
            "ip": ip,
            "port": port,
            "startTime": startTime,
            "endTime": endTime,
            "pageNum": pageNum,
            "pageSize": pageSize
        })
        return this.getData(api, data);
    }



}