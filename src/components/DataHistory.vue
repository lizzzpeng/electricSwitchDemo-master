<template>
    <div>
        <!-- 日期 -->
        <div class="watch">
            <span class="demonstration">记录时间</span>
            <el-date-picker v-model="queryTime" type="daterange" range-separator="至" start-placeholder="开始日期"
                size="small" end-placeholder="结束日期" :unlink-panels="unlinkPanels" :value-format="timeFormat"
                :picker-options="pickOptions">
            </el-date-picker>

            <span class="demonstration" style="margin-left:10px">电闸类型</span>
            <el-select v-model="value" placeholder="请选择" size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <span class="demonstration" style="margin-left:10px">地址选择</span>
            <el-select v-model="addressValue" placeholder="请选择" size="small">
                <el-option v-for="item in addressData" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>

            <el-button class="btn1" type="primary" @click="queryHistory">查询</el-button>
            <el-button class="btn2" @click="reset">重置</el-button>
            <el-button class="btn2" type="info" @click="Output">导出</el-button>
        </div>
        <!-- 表格 -->
        <div class="table">
            <el-table :data="tableData" style="width: 100%" :border="tableBorder" v-show="swichTable"
                :header-cell-style="{textAlign:'center',background:'#eef1f6',color:'#606266',borderColor:'rgba(0,0,0,0.5)'}"
                :cell-style="{textAlign:'center',background:'rgba(246,246,246,0.5)',borderColor:'rgba(0,0,0,0.5)'}">
                <!-- 表头 -->
                <!-- 加个地址 -->

                <el-table-column prop="address" label="电闸地址">
                </el-table-column>
                <el-table-column prop="leakageCurrentL" label="泄露电流">
                </el-table-column>
                <el-table-column prop="nphaseTerminalTemperature" label="N相温度">
                </el-table-column>
                <el-table-column prop="aphaseTerminalTemperature" label="A相温度">
                </el-table-column>
                <el-table-column prop="aphaseEffectiveVoltageU" label="A相电压">
                </el-table-column>
                <el-table-column prop="aphaseEffectiveCurrentI" label="A相电流">
                </el-table-column>
                <el-table-column prop="aphaseActivePowerP" label="有功功率">
                </el-table-column>
                <el-table-column prop="aphaseReactivePowerQ" label="无功功率">
                </el-table-column>
                <el-table-column prop="aphaseApparentPowerS" label="视在功率">
                </el-table-column>
                <el-table-column prop="aphaseActiveQuantityElectricityH" label="A相激活(高)">
                </el-table-column>
                <el-table-column prop="aphaseActiveQuantityElectricityL" label="A相激活(低)">
                </el-table-column>
                <el-table-column prop="time" label="时间">
                </el-table-column>
            </el-table>
        </div>

        <div class="table">
            <el-table :data="tableData" style="width: 100%" :border="tableBorder" v-show="!swichTable"
                :header-cell-style="{textAlign:'center',background:'#eef1f6',color:'#606266',borderColor:'rgba(0,0,0,0.5)'}"
                :cell-style="{textAlign:'center',background:'rgba(246,246,246,0.5)',borderColor:'rgba(0,0,0,0.5)'}">
                <!-- 表头 -->
                <el-table-column prop="time" label="时间">
                </el-table-column>
                <el-table-column prop="leakageCurrentL" label="泄露电流">
                </el-table-column>
                <el-table-column prop="nphaseTerminalTemperature" label="N相温度">
                </el-table-column>

                <el-table-column prop="aphaseTerminalTemperature" label="A相温度">
                </el-table-column>
                <el-table-column prop="aphaseEffectiveVoltageU" label="A相电压">
                </el-table-column>
                <el-table-column prop="aphaseEffectiveCurrentI" label="A相电流">
                </el-table-column>

                <el-table-column prop="bphaseTerminalTemperature" label="B相温度">
                </el-table-column>
                <el-table-column prop="bphaseEffectiveVoltageU" label="B相电压">
                </el-table-column>
                <el-table-column prop="bphaseEffectiveCurrentI" label="B相电流">
                </el-table-column>

                <el-table-column prop="cphaseTerminalTemperature" label="C相温度">
                </el-table-column>
                <el-table-column prop="cphaseEffectiveVoltageU" label="C相电压">
                </el-table-column>
                <el-table-column prop="cphaseEffectiveCurrentI" label="C相电流">
                </el-table-column>

                <el-table-column prop="combinedActivePowerP" label="有功功率">
                </el-table-column>
                <el-table-column prop="combinedReactivePowerQ" label="无功功率">
                </el-table-column>
                <el-table-column prop="conjunctionAtPowerS" label="视在功率">
                </el-table-column>

                <el-table-column prop="combinedActiveQuantityElectricityH" label="三相激活(高)">
                </el-table-column>
                <el-table-column prop="aphaseActiveQuantityElectricityL" label="三相激活(低)">
                </el-table-column>
            </el-table>
        </div>
        <!-- 页码 -->
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" @current-change="currentChange" :total="total"
                :page-size="pageSize">
            </el-pagination>
        </div>


    </div>
</template>

<script>

import Net from '../js/request.js'
export default {
    name: "DataHistory",
    data() {
        return {
            queryTime: '',
            timeFormat: "yyyy-MM-dd",
            unlinkPanels: false,
            tableData: [],
            nowPage: 1,
            total: 0,
            pageSize: 20,
            tableBorder: true,
            pickOptions: {
                disabledDate: (time) => {
                    var nowDate = new Date(Date.now())
                    //  console.log(nowDate.prototype.getHours())
                    nowDate.setHours(0);
                    nowDate.setMinutes(0);
                    nowDate.setSeconds(0);
                    nowDate.setMilliseconds(0);
                    return time.getTime() > nowDate || time.getTime() < nowDate - 89 * 24 * 3600 * 1000;
                }
            },
            // 给数据查询用
            // switchState: "",
            // address: "",
            swichTable: false,

            options: [{
                value: '1',
                label: '单相电闸'
            }, {
                value: '2',
                label: '三相电闸'
            },
            ],
            value: '',

            addressData: [
            {
                value: ' ',
                label: '全选'
            },{
                value: '01',
                label: '地址1微断'
            }, {
                value: '02',
                label: '地址2微断'
            }, {
                value: '03',
                label: '地址3微断'
            }, 
            ],
            addressValue: '',


        }
    },
    methods: {
        queryError(e) {
            this.$notify.error({
                title: '错误',
                message: e
            });
        },
        querySuccess() {
            this.$notify({
                title: '成功',
                message: '查询成功',
                type: 'success'
            })
        },

        queryHistory() {
            if (this.value == 1) {
                this.queryOridinaryHistory()
            }
            else if (this.value == 2) {
                this.queryThreeHistory()
            }
        },

        // 查询单相电闸
        queryOridinaryHistory() {
            Net.queryOrdinaryData('192.168.0.7', '9999', this.addressValue, this.queryTime[0], this.queryTime[1], this.nowPage, this.pageSize, "1")
                .then((res) => {
                    //解析数据
                    if (res.code == 200) {
                        this.tableData = res.data.list;
                        this.total = res.data.total;
                        console.log(res.data.total + "这是total")
                        this.querySuccess();
                    }
                    else {
                        this.queryError(res.message);
                    }
                }
                )
                .catch((e) => {
                    //this.netError();
                    console.log(e)
                })
            // 记得添加检查数据是否正确的警告
        },
        queryThreeHistory() {
            // 最后一位是state
            Net.queryThreeData('192.168.0.7', '9999', this.addressValue, this.queryTime[0], this.queryTime[1], this.nowPage, this.pageSize, "2")
                .then((res) => {
                    //解析数据
                    if (res.code == 200) {
                        this.tableData = res.data.list;
                        this.total = res.data.total;
                        this.querySuccess();
                    }
                    else {
                        this.queryError(res.message);
                    }
                }
                )
                .catch((e) => {
                    //this.netError();
                    console.log(e)
                })
            // 记得添加检查数据是否正确的警告
        },
        // 重置
        reset() {
            this.queryTime = '';
            this.tableData = [];
            this.historyData = [];
            this.total = 0;
        },
        currentChange(e) {
            this.nowPage = e;
            this.queryHistory();
        },
        // 导出数据
        Output() {
            if(this.queryTime[0]&&this.queryTime[1]){
                Net.exportData('192.168.0.7', '9999', this.addressValue, this.queryTime[0], this.queryTime[1], this.value)
                    .then((res) => {
                        //解析数据
                        console.log(res)
                        console.log(res.data)
                        this.downloadCallback(res,"电闸数据导出.xlsx");
                    }
                    )
                    .catch((e) => {
                        console.log(e)
                    })
            }else
            {
                this.$notify.error({
                title: '错误',
                message: "请先选择时间。"
            });
            }

        },
        
        downloadCallback(res,fileName) {
            const content = res;
            const blob = new Blob([content],{type:"application/vnd.ms-excel;charset=UTF-8"});
            if ("download" in document.createElement("a")) {
                // 非IE下载
                const elink = document.createElement("a");
                // 下载名称
                elink.download = fileName;
                elink.style.display = "none";
                // blob 应该是一个对象
                elink.href = URL.createObjectURL(blob);
                // 给文档的body对象添加， 也就是表示 DOM页面上添加对应的 elink(标签)
                document.body.appendChild(elink);
                // a 标签的点击；
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink);
            } else {
                // IE10+下载
                navigator.msSaveBlob(blob, fileName);
            }

        },
    },
    mounted() {
        if (this.value == 1) {
            this.swichTable = false
        } else if (this.value == 2) {
            this.swichTable = true
        }
    },
    watch: {
        // 底部表格数据
        value(newData) {
            console.log(newData)
            if (newData == 1)
                this.swichTable = true
            this.switchState = 1
            if (newData == 2)
                this.swichTable = false
            this.switchState = 2
            this.reset()
        },
        // 地址数据
        addressValue(newaddressValue) {
            console.log(newaddressValue)
            this.address = newaddressValue
        },
    },
    created() {
        this.value = this.options[0].value
        this.addressValue = this.addressData[0].value
    },
}
</script>

<style scoped>
.watch .demonstration {
    margin-right: 10px;
}

.watch .btn1 {
    margin-left: 20px;
}

.watch {
    height: 80px;
    text-align: center;
    line-height: 80px;

}

.table {
    margin-top: 20px;
}

.table .el-table {
    border: solid 1px black;
}

.pagination .el-pagination {
    text-align: center;
}
</style>