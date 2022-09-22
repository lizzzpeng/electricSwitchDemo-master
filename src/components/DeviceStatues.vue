<template>
    <el-collapse v-model="activeNames" @change.once="handleChange">
        <el-collapse-item title="#微断1" name="01" @click.native="setAddress(1)" v-loading="itemLoading1">
            <div text-align=left>
                <el-card class="box-select">
                    <el-radio-group v-model="radio1" @change="query">
                        <el-radio :label="1">单相电闸</el-radio>
                        <el-radio :label="2">三相电闸</el-radio>
                    </el-radio-group>
                </el-card>
            </div>
            <div>
                <el-card class="box-card" v-loading="swichLoading1">
                    <div slot="header" class="clearfix">
                        <span>#微断1</span>
                        <el-tag type="success" v-if="test1">合闸</el-tag>
                        <el-tag type="danger" v-if="!test1">分闸</el-tag>
                        <span class="button">
                            <template>
                                <el-popconfirm title="确定要进行操作吗？" @confirm="swichChange(1)" @cancel="resetButton(1)">
                                    <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949"
                                        :active-value="11" :inactive-value='10' slot="reference"
                                        v-loading="swichLoading1">
                                    </el-switch>
                                </el-popconfirm>
                            </template>
                        </span>
                    </div>
                    <div class="content">
                        <el-image v-if="test1" style=" height: 100px" :src="pictureOpen"></el-image>
                        <el-image v-if="!test1" style=" height: 100px" :src="pictureClose"></el-image>
                    </div>
                </el-card>
                <el-card class="box-content">
                    <div style="text-align: left; font-weight:bold">
                        <!-- card 标识为1的为单项 标识为2 的为三相 -->
                        <el-descriptions v-if="card1">
                            <el-descriptions-item label="有功功率">{{  StandParam1.aphaseActivePowerP  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="无功功率">{{  StandParam1.aphaseReactivePowerQ  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="视在功率">{{  StandParam1.aphaseApparentPowerS  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="运行电流">{{  StandParam1.aphaseEffectiveCurrentI  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="泄露电流">{{  StandParam1.leakageCurrentL  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="运行电压">{{  StandParam1.aphaseEffectiveVoltageU  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="N触头温度">{{  StandParam1.nphaseTerminalTemperature  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A触头温度">{{  StandParam1.aphaseTerminalTemperature  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量H">{{  StandParam1.aphaseActiveQuantityElectricityH  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量L">{{  StandParam1.aphaseActiveQuantityElectricityL  }}
                            </el-descriptions-item>
                        </el-descriptions>
                        <el-descriptions v-if="!card1">
                            <!-- 三相 -->
                            <el-descriptions-item label="有功功率">{{  ThreeParam1.combinedActivePowerP  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="无功功率">{{  ThreeParam1.combinedReactivePowerQ  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="视在功率">{{  ThreeParam1.conjunctionAtPowerS  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A触头温度">{{  ThreeParam1.aphaseTerminalTemperature  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A相电压">{{  ThreeParam1.aphaseEffectiveVoltageU  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A相电流">{{  ThreeParam1.aphaseEffectiveCurrentI  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="B触头温度">{{  ThreeParam1.bphaseTerminalTemperature  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="B相电压">{{  ThreeParam1.bphaseEffectiveVoltageU  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="B相电流">{{  ThreeParam1.bphaseEffectiveCurrentI  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="C触头温度">{{  ThreeParam1.cphaseTerminalTemperature  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="C相电压">{{  ThreeParam1.cphaseEffectiveVoltageU  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="C相电流">{{  ThreeParam1.cphaseEffectiveCurrentI  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="N触头温度">{{  ThreeParam1.nphaseTerminalTemperature  }}
                            </el-descriptions-item>

                            <el-descriptions-item label="泄露电流">{{  ThreeParam1.leakageCurrentL  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量H">{{  ThreeParam1.combinedActiveQuantityElectricityH  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量L">{{  ThreeParam1.combinedActiveQuantityElectricityL  }}
                            </el-descriptions-item>
                        </el-descriptions>
                    </div>
                </el-card>
            </div>
        </el-collapse-item>

        <el-collapse-item title="#微断2" name="02" @click.native="setAddress(2)" v-loading="itemLoading2">
            <el-card class="box-select">
                <el-radio-group v-model="radio2" @change="query">
                    <el-radio :label="1">单相电闸</el-radio>
                    <el-radio :label="2">三相电闸</el-radio>

                </el-radio-group>
            </el-card>
            <div>

                <el-card class="box-card" v-loading="swichLoading2">
                    <div slot="header" class="clearfix">
                        <span>#微断2</span>
                        <el-tag type="success" v-if="test2">合闸</el-tag>
                        <el-tag type="danger" v-if="!test2">分闸</el-tag>
                        <span class="button">
                            <template>
                                <el-popconfirm title="确定要进行操作吗？" @confirm="swichChange(2)" @cancel="resetButton(2)">
                                    <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ff4949"
                                        :active-value="21" :inactive-value='20' slot="reference"
                                        v-loading="swichLoading2">
                                    </el-switch>
                                </el-popconfirm>
                            </template>
                        </span>
                    </div>
                    <div class="content">
                        <el-image v-if="test2" style=" height: 100px" :src="pictureOpen"></el-image>
                        <el-image v-if="!test2" style=" height: 100px" :src="pictureClose"></el-image>
                    </div>
                </el-card>
                <el-card class="box-content">
                    <div style="text-align: left; font-weight:bold">
                        <el-descriptions v-if="card2">
                            <el-descriptions-item label="有功功率">{{  StandParam2.aphaseActivePowerP  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="无功功率">{{  StandParam2.aphaseReactivePowerQ  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="视在功率">{{  StandParam2.aphaseApparentPowerS  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="运行电流">{{  StandParam2.aphaseEffectiveCurrentI  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="泄露电流">{{  StandParam2.leakageCurrentL  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="运行电压">{{  StandParam2.aphaseEffectiveVoltageU  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="N触头温度">{{  StandParam2.nphaseTerminalTemperature  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A触头温度">{{  StandParam2.aphaseTerminalTemperature  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量H">{{  StandParam2.aphaseActiveQuantityElectricityH  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量L">{{  StandParam2.aphaseActiveQuantityElectricityL  }}
                            </el-descriptions-item>
                        </el-descriptions>

                        <el-descriptions v-if="!card2">
                            <!-- 三相 -->
                            <el-descriptions-item label="有功功率">{{  ThreeParam2.combinedActivePowerP  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="无功功率">{{  ThreeParam2.combinedReactivePowerQ  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="视在功率">{{  ThreeParam2.conjunctionAtPowerS  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A触头温度">{{  ThreeParam2.aphaseTerminalTemperature  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A相电压">{{  ThreeParam2.aphaseEffectiveVoltageU  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A相电流">{{  ThreeParam2.aphaseEffectiveCurrentI  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="B触头温度">{{  ThreeParam2.bphaseTerminalTemperature  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="B相电压">{{  ThreeParam2.bphaseEffectiveVoltageU  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="B相电流">{{  ThreeParam2.bphaseEffectiveCurrentI  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="C触头温度">{{  ThreeParam2.cphaseTerminalTemperature  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="C相电压">{{  ThreeParam2.cphaseEffectiveVoltageU  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="C相电流">{{  ThreeParam2.cphaseEffectiveCurrentI  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="N触头温度">{{  ThreeParam2.nphaseTerminalTemperature  }}
                            </el-descriptions-item>

                            <el-descriptions-item label="泄露电流">{{  ThreeParam2.leakageCurrentL  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量H">{{  ThreeParam2.combinedActiveQuantityElectricityH  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量L">{{  ThreeParam2.combinedActiveQuantityElectricityL  }}
                            </el-descriptions-item>
                        </el-descriptions>
                    </div>
                </el-card>
            </div>
        </el-collapse-item>

        <el-collapse-item title="#微断3" name="03" @click.native="setAddress(3)" v-loading="itemLoading3">
            <el-card class="box-select">
                <el-radio-group v-model="radio3" @change="query">
                    <el-radio :label="1">单相电闸</el-radio>
                    <el-radio :label="2">三相电闸</el-radio>
                </el-radio-group>
            </el-card>
            <div>
                <el-card class="box-card" v-loading="swichLoading3">
                    <div slot="header" class="clearfix">
                        <span>微断3</span>
                        <el-tag type="success" v-if="test3">合闸</el-tag>
                        <el-tag type="danger" v-if="!test3">分闸</el-tag>
                        <span class="button">
                            <template>
                                <el-popconfirm title="确定要进行操作吗？" @confirm="swichChange(3)" @cancel="resetButton(3)">
                                    <el-switch v-model="value3" active-color="#13ce66" inactive-color="#ff4949"
                                        :active-value="31" :inactive-value='30' slot="reference"
                                        v-loading="swichLoading3">
                                    </el-switch>
                                </el-popconfirm>
                            </template>



                        </span>
                    </div>
                    <div class="content">
                        <el-image v-if="test3" style=" height: 100px" :src="pictureOpen"></el-image>
                        <el-image v-if="!test3" style=" height: 100px" :src="pictureClose"></el-image>
                    </div>
                </el-card>

                <el-card class="box-content">
                    <div style="text-align: left; font-weight:bold">
                        <el-descriptions v-if="card3">
                            <el-descriptions-item label="有功功率">{{  StandParam3.aphaseActivePowerP  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="无功功率">{{  StandParam3.aphaseReactivePowerQ  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="视在功率">{{  StandParam3.aphaseApparentPowerS  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="运行电流">{{  StandParam3.aphaseEffectiveCurrentI  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="泄露电流">{{  StandParam3.leakageCurrentL  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="运行电压">{{  StandParam3.aphaseEffectiveVoltageU  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="N触头温度">{{  StandParam3.nphaseTerminalTemperature  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A触头温度">{{  StandParam3.aphaseTerminalTemperature  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量H">{{  StandParam3.aphaseActiveQuantityElectricityH  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量L">{{  StandParam3.aphaseActiveQuantityElectricityL  }}
                            </el-descriptions-item>
                        </el-descriptions>

                        <el-descriptions v-if="!card3">
                            <!-- 三相 -->
                            <el-descriptions-item label="有功功率">{{  ThreeParam3.combinedActivePowerP  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="无功功率">{{  ThreeParam3.combinedReactivePowerQ  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="视在功率">{{  ThreeParam3.conjunctionAtPowerS  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A触头温度">{{  ThreeParam3.aphaseTerminalTemperature  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A相电压">{{  ThreeParam3.aphaseEffectiveVoltageU  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A相电流">{{  ThreeParam3.aphaseEffectiveCurrentI  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="B触头温度">{{  ThreeParam3.bphaseTerminalTemperature  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="B相电压">{{  ThreeParam3.bphaseEffectiveVoltageU  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="B相电流">{{  ThreeParam3.bphaseEffectiveCurrentI  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="C触头温度">{{  ThreeParam3.cphaseTerminalTemperature  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="C相电压">{{  ThreeParam3.cphaseEffectiveVoltageU  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="C相电流">{{  ThreeParam3.cphaseEffectiveCurrentI  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="N触头温度">{{  ThreeParam3.nphaseTerminalTemperature  }}
                            </el-descriptions-item>

                            <el-descriptions-item label="泄露电流">{{  ThreeParam3.leakageCurrentL  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量H">{{  ThreeParam3.combinedActiveQuantityElectricityH  }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量L">{{  ThreeParam3.combinedActiveQuantityElectricityL  }}
                            </el-descriptions-item>
                        </el-descriptions>
                    </div>
                </el-card>
            </div>
        </el-collapse-item>


    </el-collapse>

</template>

<script>
import Net from '../js/request.js'
export default {
    name: "DeviceStatues",
    data() {
        return {
            

            flag1: false,
            flag2: false,
            flag3: false,
            //类别 
            itemLoading1: false,
            itemLoading2: false,
            itemLoading3: false,

            swichLoading1: false,
            swichLoading2: false,
            swichLoading3: false,
            // 点击电闸 的加载项
            // loading1: false,
            // loading2: false,
            // loading3: false,
            // test 动态绑定图片用于开关和图片联动
            test1: false,
            test2: false,
            test3: false,
            display: true,
            // 用于单个查询的  现直接暴力轮询各个点击过的radio
            // address: "",
            pictureClose: require('./分闸.png'),
            pictureOpen: require('./微断.png'),
            // 开关的状态 
            value1: 10,
            value2: 20,
            value3: 30,
            // 动态绑定数据卡片 展示不同类型数据
            card1: true,
            card2: true,
            card3: true,
            // 默认展开
            activeNames: [''],
            // 默认单选框
            // 绑定电闸类型 对应1为单项 2为三相
            radio: '',
            radio1: '',
            radio2: '',
            radio3: '',
            // 储存 不同电闸数据 standparam 为单相 ； threeparam为三相
            StandParam1: [],
            StandParam2: [],
            StandParam3: [],
            ThreeParam1: [],
            ThreeParam2: [],
            ThreeParam3: [],
        }
    },
    methods: {
        handleChange() {
            this.$message({
                message: '请优先选择电闸',
                type: 'warning'
            });
        },
        setAddress(name) {
            // 通过不同的页签标示不同的电闸地址， address 用于后面接口判断查询对应数据
            this.address = name;
            // console.log("我是 setaddress 的"+name)
            // console.log(this.activeNames)
        },
        resetButton(address) {
            if (address == 1) {
                if (this.value1 == 11) {
                    this.value1 = 10
                } else if (this.value1 == 10) {
                    this.value1 = 11
                }
            }
            if (address == 2) {
                if (this.value2 == 21) {
                    this.value2 = 20
                } else if (this.value2 == 20) {
                    this.value2 = 21
                }
            }
            if (address == 3) {
                if (this.value3 == 31) {
                    this.value3 = 30
                } else if (this.value3 == 30) {
                    this.value3 = 31
                }
            }
        },
        swichChange(address) {
            if (this.value1 === 11 && address === 1) {
                this.swichLoading1 = true;
                this.openSwich(address)
            } else if (this.value1 === 10 && address === 1) {
                this.swichLoading1 = true;
                this.closeSwich(address)
            }

            if (this.value2 === 21 && address === 2) {
                this.swichLoading2 = true;
                this.openSwich(address)
            } else if (this.value2 === 20 && address === 2) {
                this.swichLoading2 = true;
                this.closeSwich(address)
            }
            if (this.value3 === 31 && address === 3) {
                this.swichLoading3 = true;
                this.openSwich(address)
                // 开关状态
            } else if (this.value3 === 30 && address === 3) {
                this.swichLoading3 = true;
                this.closeSwich(address)
            }
            // else{
            //     console.log("address 03未触发接口") 
            // }
        },
        // 单个查询
        query() {
            // 测试用
            // console.log(this.address)
            if (this.radio1 === 1 && this.address === 1) {
                // radio1 为单相 radio2 为三相
                // 更改展示数据类型 
                this.itemLoading1 = true;
                this.card1 = true;
                // alert("微断地址1"+' '+this.radio+"号电闸"+"正在请求单项电闸请稍等");
                Net.queryOrdinarySwitchData('192.168.0.7', '9999', '01')
                    .then((res) => {
                        console.log(res.data)
                        this.StandParam1 = res.data;
                        this.itemLoading1 = false;
                        if (res.data.status == '240') {
                            this.value1 = 11
                            this.test1 = true;
                            this.$notify({
                                title: '成功',
                                message: "微端" + this.address + '查询数据成功',
                                type: 'success'
                            });
                        } else if (res.data.status === '15') {
                            this.value1 = 10
                            this.test1 = false;
                            this.$notify({
                                title: '成功',
                                message: "微端" + this.address + '查询数据成功',
                                type: 'success'
                            });
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: res.data,
                            });
                            console.log("微断" + this.address + " 查询电闸状态异常")
                        }
                    }
                    ).catch(() => {
                        this.itemLoading1 = false;
                    })
            }
            else if (this.radio1 === 2 && this.address === 1) {
                // 更改展示数据类型
                this.card1 = false;
                this.itemLoading1 = true;
                // alert("微断地址1"+' '+this.radio+"号电闸"+"正在请求三项电闸请稍等");
                Net.queryThreePhaseSwitchData('192.168.0.7', '9999', '01')
                    .then((res) => {
                        //解析数据
                        console.log(res.data);
                        this.ThreeParam1 = res.data;
                        this.itemLoading1 = false;
                        if (res.data.status == '240') {
                            this.value1 = 11
                            this.test1 = true;
                            this.$notify({
                                title: '成功',
                                message: "微端" + this.address + '查询数据成功',
                                type: 'success'
                            });
                        } else if (res.data.status === '15') {
                            this.value1 = 10
                            this.test1 = false;
                            this.$notify({
                                title: '成功',
                                message: "微端" + this.address + '查询数据成功',
                                type: 'success'
                            });
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: res.data,
                            });
                            console.log("微断" + this.address + " 查询电闸状态异常")
                        }
                    }
                    )
                    .catch(() => {
                        this.itemLoading1 = false;
                    })

            }

            if (this.radio2 === 1 && this.address === 2) {
                // 更改展示数据类型
                this.card2 = true;
                this.itemLoading2 = true;

                // alert("微断地址2"+' '+this.radio+"号电闸"+"正在请求单项电闸请稍等");
                Net.queryOrdinarySwitchData('192.168.0.7', '9999', '02')
                    .then((res) => {
                        // console.log(res.data);
                        this.StandParam2 = res.data;
                        this.itemLoading2 = false;
                        // console.log("这里是 单项电闸信息")

                        // 
                        if (res.data.status == '240') {
                            this.value2 = 21
                            this.test2 = true;
                            this.$notify({
                                title: '成功',
                                message: "微端" + this.address + '查询数据成功',
                                type: 'success'
                            });
                        } else if (res.data.status === '15') {
                            this.value2 = 20
                            this.test2 = false;
                            this.$notify({
                                title: '成功',
                                message: "微端" + this.address + '查询数据成功',
                                type: 'success'
                            });
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: res.data,
                            });
                            console.log("微断" + this.address + " 查询电闸状态异常")
                        }
                    }
                    )
                    .catch(() => {
                        this.itemLoading2 = false;
                    })
            }
            else if (this.radio2 === 2 && this.address === 2) {
                // 更改展示数据类型
                this.card2 = false;
                this.itemLoading2 = true;
                // alert("微断地址2"+' '+this.radio+"号电闸"+"正在请求三项电闸请稍等");
                Net.queryThreePhaseSwitchData('192.168.0.7', '9999', '02')
                    .then((res) => {
                        //解析数据
                        this.ThreeParam2 = res.data;
                        this.itemLoading2 = false;

                        if (res.data.status == '240') {
                            this.value2 = 21
                            this.test2 = true;
                            this.$notify({
                                title: '成功',
                                message: "微端" + this.address + '查询数据成功',
                                type: 'success'
                            });
                        } else if (res.data.status === '15') {
                            this.value2 = 20
                            this.test2 = false;
                            this.$notify({
                                title: '成功',
                                message: "微端" + this.address + '查询数据成功',
                                type: 'success'
                            });
                        } else {
                            this.value2 = 20
                            this.$notify.error({
                                title: '错误',
                                message: res.data,
                            });
                            console.log("微断" + this.address + " 查询电闸状态异常")
                        }
                    }
                    )
                    .catch(() => {
                        this.itemLoading2 = false;
                    })

            }
            if (this.radio3 === 1 && this.address === 3) {
                // 更改展示数据类型
                this.card3 = true;
                this.itemLoading3 = true;
                // alert("微断3"+' '+this.radio+"号电闸"+"正在请求单项电闸请稍等");
                Net.queryOrdinarySwitchData('192.168.0.7', '9999', '03')
                    .then((res) => {
                        // console.log(res.data);
                        this.StandParam3 = res.data;
                        this.itemLoading3 = false;
                        if (res.data.status == '240') {
                            this.value3 = 31
                            this.test3 = true;
                            this.$notify({
                                title: '成功',
                                message: "微端" + this.address + '查询数据成功',
                                type: 'success'
                            });
                        } else if (res.data.status === '15') {
                            this.value3 = 30
                            this.test3 = false;
                            this.$notify({
                                title: '成功',
                                message: "微端" + this.address + '查询数据成功',
                                type: 'success'
                            });
                        } else {
                            this.value3 = 30
                            this.$notify.error({
                                title: '错误',
                                message: res.data,
                            });
                            console.log("微断" + this.address + " 查询电闸状态异常")
                        }
                    }
                    )
                    .catch(() => {
                        this.itemLoading3 = false;
                    })
            }
            else if (this.radio3 === 2 && this.address === 3) {
                // 更改展示数据类型
                this.card3 = false;
                this.itemLoading3 = true;
                // alert("微断3"+' '+this.radio+"号电闸"+"正在请求三项电闸请稍等");
                Net.queryThreePhaseSwitchData('192.168.0.7', '9999', '03')
                    .then((res) => {
                        //解析数据
                        // console.log(res.data);
                        this.ThreeParam3 = res.data;
                        this.itemLoading3 = false;

                        if (res.data.status == '240') {
                            this.value3 = 31
                            this.test3 = true;
                            this.$notify({
                                title: '成功',
                                message: "微端" + this.address + '查询数据成功',
                                type: 'success'
                            });
                        } else if (res.data.status === '15') {
                            this.value3 = 30
                            this.test3 = false;
                            this.$notify({
                                title: '成功',
                                message: "微端" + this.address + '查询数据成功',
                                type: 'success'
                            });
                        } else {
                            this.value3 = 30
                            this.$notify.error({
                                title: '错误',
                                message: res.data,
                            });
                            console.log("微断" + this.address + " 查询电闸状态异常")
                        }
                    }
                    )
                    .catch(() => {
                        this.itemLoading3 = false;
                    })

            }
        },
        // 轮询接口
        queryFortime() {
            if (this.activeNames.indexOf("01") == -1) {
                // console.log("地址1不轮询")
            }
            else {
                
                this.timer1 = setTimeout(() => {
                    // console.log("查询了3")
                                   // console.log("查询了1")
                if (this.radio1 === 1) {
                    // radio1 为单相 radio2 为三相
                    // 更改展示数据类型 
                    // alert("微断地址1"+' '+this.radio+"号电闸"+"正在请求单项电闸请稍等");
                    Net.queryOrdinarySwitchData('192.168.0.7', '9999', '01')
                        .then((res) => {
                            this.StandParam1 = res.data;
                            console.log(res.data.status)
                            if (res.data.status == '240') {
                                this.value1 = 11
                                this.test1 = true
                            } else if (res.data.status === '15') {
                                this.value1 = 10
                                this.test1 = false
                            }
                        }
                        )

                }
                else if (this.radio1 === 2) {
                    // 更改展示数据类型  
                    Net.queryThreePhaseSwitchData('192.168.0.7', '9999', '01')
                        .then((res) => {
                            //解析数据
                            this.ThreeParam1 = res.data;
                            // console.log(res.data.status)
                            if (res.data.status == '240') {
                                this.value1 = 11
                                this.test2 = true
                            } else if (res.data.status === '15') {
                                this.value1 = 10
                                this.test2 = false
                            }
                        }
                        )
                }
                },
                10000)
            }

            if (this.activeNames.indexOf("02") == -1) {
                // console.log("地址2未展开")
            }
            else {
                this.timer1 = setTimeout(() => {
                    // console.log("我在轮询2")
                    if (this.radio2 === 1) {
                        // 更改展示数据类型
                        Net.queryOrdinarySwitchData('192.168.0.7', '9999', '02')
                            .then((res) => {
                                this.StandParam2 = res.data;
                                if (res.data.status == '240') {
                                    this.value2 = 21
                                    this.test2 = true
                                } else if (res.data.status === '15') {
                                    this.value2 = 20
                                    this.test2 = false
                                }
                            }
                            )
                    }
                    else if (this.radio2 === 2) {
                        // 更改展示数据类型
                        // alert("微断地址2"+' '+this.radio+"号电闸"+"正在请求三项电闸请稍等");
                        Net.queryThreePhaseSwitchData('192.168.0.7', '9999', '02')
                            .then((res) => {
                                //解析数据
                                this.ThreeParam2 = res.data;

                                if (res.data.status == '240') {
                                    this.value2 = 21
                                    this.test2 = true
                                } else if (res.data.status === '15') {
                                    this.value2 = 20
                                    this.test2 = false
                                }
                            }
                            )

                    }
                }, 10000)

            }
            if (this.activeNames.indexOf("03") == -1) {
                console.log("地址2未展开")
            }
            else {

                this.timer1 = setTimeout(() => {
                    // console.log("查询了3")
                    if (this.radio3 === 1) {
                        // 更改展示数据类型
                        // alert("微断3"+' '+this.radio+"号电闸"+"正在请求单项电闸请稍等");
                        Net.queryOrdinarySwitchData('192.168.0.7', '9999', '03')
                            .then((res) => {
                                this.StandParam3 = res.data;
                                if (res.data.status == '240') {
                                    this.value3 = 31
                                    this.test3 = true
                                } else if (res.data.status === '15') {
                                    this.value2 = 30
                                    this.test2 = false
                                }
                            }
                            )
                    }
                    else if (this.radio3 === 2) {
                        Net.queryThreePhaseSwitchData('192.168.0.7', '9999', '03')
                            .then((res) => {
                                //解析数据
                                this.StandParam3 = res.data;
                                // console.log(res.data);
                                if (res.data.status == '240') {
                                    this.value3 = 31
                                    this.test3 = true
                                } else if (res.data.status === '15') {
                                    this.value2 = 30
                                    this.test2 = false
                                }
                            }
                            )

                    }
                },
                    10000)



            }






        },

        // 合闸功能 网络状态正常时用res.statues 来反馈 
        // 网络状态不正常时，会处理catch数据 并且页面返回在js文件中，统一报错
        openSwich(address) {
            console.log(this.address)
            Net.openSwitch('192.168.0.7', '9999', '0' + address)
                .then((res) => {
                    // console.log(res.data);
                    // console.log("合闸")
                    // 合闸 240
                    this.swichLoading1 = false;
                    this.swichLoading2 = false;
                    this.swichLoading3 = false;
                    if (res.data.status == '240') {
                        this.query()
                        this.$notify({
                            title: '成功',
                            message: "微断" + this.address + '合闸成功',
                            type: 'success'
                        });
                        if (address === 1) {
                            this.test1 = true
                        } else if (address === 2) {
                            this.test2 = true
                        } else if (address === 3) {
                            this.test3 = true
                        }
                    } else {
                        if (address === 1) {
                            this.value1 = 10
                            this.test1 = false
                        } else if (address === 2) {
                            this.value2 = 20
                            this.test2 = false

                        } else if (address === 3) {
                            this.value3 = 30
                            this.test3 = false
                        }
                        this.$notify.error({
                            title: '错误',
                            message: res.data,
                        });
                        // console.log(res.data)
                        return false;
                    }

                }
                )
                .catch(() => {
                    this.query()
                    if (address === 1) {
                        this.value1 = 10
                        this.test1 = false
                    } else if (address === 2) {
                        this.value2 = 20
                        this.test2 = false

                    } else if (address === 3) {
                        this.value3 = 30
                        this.test3 = false
                    }
                    this.swichLoading1 = false;
                    this.swichLoading2 = false;
                    this.swichLoading3 = false;
                })
        },
        // 分闸功能同上
        closeSwich(address) {
            // console.log(address)
            Net.closeSwtich('192.168.0.7', '9999', '0' + address)
                .then((res) => {
                    // console.log(res.data);
                    //  网络状态200 ； 15 ； 成功 ；0 返回字段 
                    // console.log("分闸")
                    this.swichLoading1 = false;
                    this.swichLoading2 = false;
                    this.swichLoading3 = false;
                    if (res.data.status == '15') {
                        this.query()
                        this.$notify({
                            title: '成功',
                            message: "微断" + this.address + '分闸成功',
                            type: 'success'
                        });
                        if (address === 1) {
                            this.test1 = false
                        } else if (address === 2) {
                            this.test2 = false
                        } else if (address === 3) {
                            this.test3 = false
                        }

                    }// 出现
                    else {
                        if (address === 1) {
                            this.value1 = 11
                            this.test1 = true
                        } else if (address === 2) {
                            this.value2 = 21
                            this.test2 = true
                        } else if (address === 3) {
                            this.value3 = 31
                            this.test3 = true
                        }
                        this.$notify.error({
                            title: '错误',
                            message: res.data,
                        });
                        // console.log("微断" + this.address + " 分闸异常")
                    }


                }
                )

        },
    },
    computed: {
    },
    // 暂时取消轮询方便开发
    mounted() {

        this.queryFortime();
        this.timer = window.setInterval(() => {
            setTimeout(() => {
                this.queryFortime()
                // console.log("queryFortime")
            }, 0)
        }, 30000)

    },
    destroyed() {
        window.clearInterval(this.timer)
        window.clearInterval(this.timer1)
    }


}   
</script>

<style scoped>
.box-card {
    border-radius: 2px;
    margin-bottom: 18px;
    margin-right: 10px;
    transition: all .5s;
    width: 200px;
    height: 220px;
    float: left;
    font-size: smaller;
}

.box-content {
    margin-right: 8px;
    height: 220px;
}

.box-select {
    margin-right: 8px;

}

.button {
    float: right;
}

.el-image {
    object-fit: none;
}

.radio_inline {
    display: inline-block;
    width: 35%;
}

.radio_inline label {

    width: 5%;
    padding-left: 35px;
    padding-right: 35px;
}

.radio_inline input[type=radio] {

    width: 5%;
    /* right: auto; */
}

.content {
    /* text-align: center */
    margin-left: 20px;
}
</style>