import { Notification } from 'element-ui'
import axios from "axios"
const host = "http://localhost:8088"


export default {
    test() {
        console.log(host);
    },
    async getData(api, data) {
        const res = await axios({
            url: host + api,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            data: data
        }).catch(function (e) {
            // alert(e.message)
            console.log(e+"我是axios")
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
    // 
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