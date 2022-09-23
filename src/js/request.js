import axios from "axios"
const host = "http://localhost:8089"

export default{
    test(){
        console.log(host);
    },
    async getData(api,data){
        const res = await axios({
            url:host + api,
            headers:{
                'Content-Type': 'application/json'
            },
            method:'post',
            data:data
        }).catch(function(e){
            alert(e.message)
        })
        return res.data;
    },
    async getDataget(api,data){
        // console.log(data)
        const res = await axios({
            url:host + api,
            headers:{
                'Content-Type': 'application/json'
            },
            method:'get',
            data:data
        }).catch(function(e){
            alert(e.message)
        })
        return res.data;
    },
    async deleteData(api,data){
        const res = await axios({
            url:host + api,
            headers:{
                'Content-Type': 'application/json'
            },
            method:'delete',
            data:data
        }).catch(function(e){
            alert(e.message)
        })
        return res.data;
    },
    querySwitchData(id){//作业接口查询数据
        console.log(id)
        const api = '/test/selectData';
        const data = id
        return this.getData(api,data)
    },
    saveUser(user){
        const api = '/user';
        const data = JSON.stringify({
            "email": user.email,
            "id": user.id ,
            "nickname": user.nickname ,
            "phone":  user.phone,
            "username": user.username
        });
        return this.getData(api,data);
    },
    deleteUser(id){
        const api = '/user/'+id;
        const data = JSON.stringify({
            "id": id ,
        });
        return this.deleteData(api,data);
    },
    deleteBatchUser(ids){
        const api = '/user/del/batch';
        const data = ids
        return this.getData(api,data);
    },
    closeSwtich(ip, port, address){//分闸
        const api = '/switch/api/v1/closeSwitch';
        const data = JSON.stringify({
            "address":address,
            "ip":ip,
            "port":port
        });
        return this.getData(api,data);
    },
    openSwitch(ip, port, address){//合闸
        const api = '/switch/api/v1/openSwitch';
        const data = JSON.stringify({
            "address":address,
            "ip":ip,
            "port":port
        });
        return this.getData(api,data);
    },
    queryOrdinarySwitchData(ip, port, address){//查询普通微断数据
        const api = '/switch/api/v1/queryOrdinarySwitchData';
        const data = JSON.stringify({
            "address":address,
            "ip":ip,
            "port":port
        });
        return this.getData(api,data);
    },
    queryThreePhaseSwitchData(ip, port, address){//查询三相微端数据
        const api = '/switch/api/v1/queryThreePhaseSwitchData';
        const data = JSON.stringify({
            "address":address,
            "ip":ip,
            "port":port
        })
        return this.getData(api,data)
    },
    
    // queryUser()
    //     const api = '/user';
    //     const data = JSON.stringify({
    //     })
    //     return this.getData(api,data)
    // },
    queryPage(pageNum,pageSize,username,email){
        const api = '/user/page?pageNum='+pageNum+"&pageSize="+pageSize+"&username="+username+"&email="+username;
        const data = JSON.stringify({
            "pageNum":pageNum,
            "pageSize":pageSize,
            "username":username,
            "email":email,
        })
        return this.getDataget(api,data)
    },
    


}