<template>
    <el-collapse v-model="activeNames" @change="handleChange">
        <el-dialog title="监控设置" :visible.sync="dialogFormVisible" width="30%" @closed="closedEvent" @open="openEvent">
            <el-form label-width="70px" size="small">
                <el-form-item label="A相温度">
                    <el-badge class="item">{{form.temperatureA}}℃</el-badge>
                    <el-input v-model="formInput.temperatureA" oninput="value=value.replace(/[^\d]/g,'')"
                        style="display:inline" placeholder="请输入数字"></el-input>
                </el-form-item>
                <el-form-item label="B相温度">
                    <el-badge class="item">{{form.temperatureB}}℃</el-badge>
                    <el-input v-model="formInput.temperatureB" style="display:inline"
                        oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字"></el-input>
                </el-form-item>
                <el-form-item label="C相温度">
                    <el-badge class="item">{{form.temperatureC}}℃</el-badge>
                    <el-input v-model="formInput.temperatureC" style="display:inline"
                        oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字"></el-input>
                </el-form-item>
                <el-form-item label="N相温度">
                    <el-badge class="item">{{form.temperatureN}}℃</el-badge>
                    <el-input v-model="formInput.temperatureN" style="display:inline"
                        oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字"></el-input>
                </el-form-item>
                <el-form-item label="泄漏电流">
                    <el-badge class="item">{{form.currentLeakage}}mA</el-badge>
                    <el-input v-model="formInput.currentLeakage" autocomplete="off" style="display:inline"
                        oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="DataSet">更新</el-button>
                <el-button @click="Cancel">取 消</el-button>
            </div>
        </el-dialog>


        <el-collapse-item title="#微断1" name="01" @click.native="setAddress(1)" v-loading="itemLoading1">
            <div text-align=left>
                <el-card class="box-select">
                    <el-radio-group v-model="radio1" @change="query">
                        <el-radio :label="1">单相电闸</el-radio>
                        <el-radio :label="2">三相电闸</el-radio>

                        <!-- 阈值开关  -->
                        <el-popconfirm title="确定要进行操作吗？" @confirm="watchSwichChange" @cancel="resetWatchButton">
                            <el-switch class="watchSwitch" v-model="watching1" active-color="#13ce66"
                                inactive-color="#ff4949" :active-value="11" :inactive-value='10' slot="reference">
                            </el-switch>
                        </el-popconfirm>
                        <el-tag class="watchSwitchTag" type="danger" size="small" v-if="watching1==10">监控关</el-tag>
                        <el-tag class="watchSwitchTag" type="success" size="small" v-if="watching1==11">监控开</el-tag>
                        <el-button round class="ml-5" @click="dialogFormVisible = true" size="small"
                            v-loading="updateloading1">阈值设置</el-button>
                    </el-radio-group>
                </el-card>
            </div>
            <div>
                <el-card class="box-card" v-loading="swichLoading1">
                    <div slot="header" class="clearfix">
                        <span>#微断1</span>
                        <el-tag type="success" size="small" v-if="test1">合闸</el-tag>
                        <el-tag type="danger" size="small" v-if="!test1">分闸</el-tag>
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
                            <el-descriptions-item label="有功功率">{{ StandParam1.aphaseActivePowerP }}
                            </el-descriptions-item>
                            <el-descriptions-item label="无功功率">{{ StandParam1.aphaseReactivePowerQ }}
                            </el-descriptions-item>
                            <el-descriptions-item label="视在功率">{{ StandParam1.aphaseApparentPowerS }}
                            </el-descriptions-item>
                            <el-descriptions-item label="运行电流">{{ StandParam1.aphaseEffectiveCurrentI }}
                            </el-descriptions-item>
                            <el-descriptions-item label="泄露电流">{{ StandParam1.leakageCurrentL }}
                            </el-descriptions-item>
                            <el-descriptions-item label="运行电压">{{ StandParam1.aphaseEffectiveVoltageU }}
                            </el-descriptions-item>
                            <el-descriptions-item label="N触头温度">{{ StandParam1.nphaseTerminalTemperature }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A触头温度">{{ StandParam1.aphaseTerminalTemperature }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量H">{{ StandParam1.aphaseActiveQuantityElectricityH }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量L">{{ StandParam1.aphaseActiveQuantityElectricityL }}
                            </el-descriptions-item>
                            <el-descriptions-item label="当前时间">{{dateFormat(date)}}
                            </el-descriptions-item>

                        </el-descriptions>
                        <el-descriptions v-if="!card1">
                            <!-- 三相 -->
                            <el-descriptions-item label="有功功率">{{ ThreeParam1.combinedActivePowerP }}
                            </el-descriptions-item>
                            <el-descriptions-item label="无功功率">{{ ThreeParam1.combinedReactivePowerQ }}
                            </el-descriptions-item>
                            <el-descriptions-item label="视在功率">{{ ThreeParam1.conjunctionAtPowerS }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A触头温度">{{ ThreeParam1.aphaseTerminalTemperature }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A相电压">{{ ThreeParam1.aphaseEffectiveVoltageU }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A相电流">{{ ThreeParam1.aphaseEffectiveCurrentI }}
                            </el-descriptions-item>
                            <el-descriptions-item label="B触头温度">{{ ThreeParam1.bphaseTerminalTemperature }}
                            </el-descriptions-item>
                            <el-descriptions-item label="B相电压">{{ ThreeParam1.bphaseEffectiveVoltageU }}
                            </el-descriptions-item>
                            <el-descriptions-item label="B相电流">{{ ThreeParam1.bphaseEffectiveCurrentI }}
                            </el-descriptions-item>
                            <el-descriptions-item label="C触头温度">{{ ThreeParam1.cphaseTerminalTemperature }}
                            </el-descriptions-item>
                            <el-descriptions-item label="C相电压">{{ ThreeParam1.cphaseEffectiveVoltageU }}
                            </el-descriptions-item>
                            <el-descriptions-item label="C相电流">{{ ThreeParam1.cphaseEffectiveCurrentI }}
                            </el-descriptions-item>
                            <el-descriptions-item label="N触头温度">{{ ThreeParam1.nphaseTerminalTemperature }}
                            </el-descriptions-item>

                            <el-descriptions-item label="泄露电流">{{ ThreeParam1.leakageCurrentL }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量H">{{ ThreeParam1.combinedActiveQuantityElectricityH }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量L">{{ ThreeParam1.combinedActiveQuantityElectricityL }}
                            </el-descriptions-item>
                            <el-descriptions-item label="当前时间">{{dateFormat(date)}}
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

                    <el-popconfirm title="确定要进行操作吗？" @confirm="watchSwichChange" @cancel="resetWatchButton">
                        <el-switch class="watchSwitch" v-model="watching2" active-color="#13ce66"
                            inactive-color="#ff4949" :active-value="21" :inactive-value='20' slot="reference">
                        </el-switch>
                    </el-popconfirm>

                    <el-tag class="watchSwitchTag" type="danger" size="small" v-if="watching2==20">监控关</el-tag>
                    <el-tag class="watchSwitchTag" type="success" size="small" v-if="watching2==21">监控开</el-tag>
                    <el-button round class="ml-5" @click="dialogFormVisible = true" size="small" v-loading="updateloading2">阈值设置</el-button>


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
                            <el-descriptions-item label="有功功率">{{ StandParam2.aphaseActivePowerP }}
                            </el-descriptions-item>
                            <el-descriptions-item label="无功功率">{{ StandParam2.aphaseReactivePowerQ }}
                            </el-descriptions-item>
                            <el-descriptions-item label="视在功率">{{ StandParam2.aphaseApparentPowerS }}
                            </el-descriptions-item>
                            <el-descriptions-item label="运行电流">{{ StandParam2.aphaseEffectiveCurrentI }}
                            </el-descriptions-item>
                            <el-descriptions-item label="泄露电流">{{ StandParam2.leakageCurrentL }}
                            </el-descriptions-item>
                            <el-descriptions-item label="运行电压">{{ StandParam2.aphaseEffectiveVoltageU }}
                            </el-descriptions-item>
                            <el-descriptions-item label="N触头温度">{{ StandParam2.nphaseTerminalTemperature }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A触头温度">{{ StandParam2.aphaseTerminalTemperature }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量H">{{ StandParam2.aphaseActiveQuantityElectricityH }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量L">{{ StandParam2.aphaseActiveQuantityElectricityL }}
                            </el-descriptions-item>
                        </el-descriptions>

                        <el-descriptions v-if="!card2">
                            <!-- 三相 -->
                            <el-descriptions-item label="有功功率">{{ ThreeParam2.combinedActivePowerP }}
                            </el-descriptions-item>
                            <el-descriptions-item label="无功功率">{{ ThreeParam2.combinedReactivePowerQ }}
                            </el-descriptions-item>
                            <el-descriptions-item label="视在功率">{{ ThreeParam2.conjunctionAtPowerS }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A触头温度">{{ ThreeParam2.aphaseTerminalTemperature }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A相电压">{{ ThreeParam2.aphaseEffectiveVoltageU }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A相电流">{{ ThreeParam2.aphaseEffectiveCurrentI }}
                            </el-descriptions-item>
                            <el-descriptions-item label="B触头温度">{{ ThreeParam2.bphaseTerminalTemperature }}
                            </el-descriptions-item>
                            <el-descriptions-item label="B相电压">{{ ThreeParam2.bphaseEffectiveVoltageU }}
                            </el-descriptions-item>
                            <el-descriptions-item label="B相电流">{{ ThreeParam2.bphaseEffectiveCurrentI }}
                            </el-descriptions-item>
                            <el-descriptions-item label="C触头温度">{{ ThreeParam2.cphaseTerminalTemperature }}
                            </el-descriptions-item>
                            <el-descriptions-item label="C相电压">{{ ThreeParam2.cphaseEffectiveVoltageU }}
                            </el-descriptions-item>
                            <el-descriptions-item label="C相电流">{{ ThreeParam2.cphaseEffectiveCurrentI }}
                            </el-descriptions-item>
                            <el-descriptions-item label="N触头温度">{{ ThreeParam2.nphaseTerminalTemperature }}
                            </el-descriptions-item>

                            <el-descriptions-item label="泄露电流">{{ ThreeParam2.leakageCurrentL }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量H">{{ ThreeParam2.combinedActiveQuantityElectricityH }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量L">{{ ThreeParam2.combinedActiveQuantityElectricityL }}
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

                    <el-popconfirm title="确定要进行操作吗？" @confirm="watchSwichChange" @cancel="resetWatchButton">
                        <el-switch class="watchSwitch" v-model="watching3" active-color="#13ce66"
                            inactive-color="#ff4949" :active-value="31" :inactive-value='30' slot="reference">
                        </el-switch>
                    </el-popconfirm>

                    <el-tag class="watchSwitchTag" type="danger" size="small" v-if="watching3==30">监控关</el-tag>
                    <el-tag class="watchSwitchTag" type="success" size="small" v-if="watching3==31">监控开</el-tag>
                    <el-button round class="ml-5" @click="dialogFormVisible = true" size="small" v-loading="updateloading3">阈值设置</el-button>


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
                            <el-descriptions-item label="有功功率">{{ StandParam3.aphaseActivePowerP }}
                            </el-descriptions-item>
                            <el-descriptions-item label="无功功率">{{ StandParam3.aphaseReactivePowerQ }}
                            </el-descriptions-item>
                            <el-descriptions-item label="视在功率">{{ StandParam3.aphaseApparentPowerS }}
                            </el-descriptions-item>
                            <el-descriptions-item label="运行电流">{{ StandParam3.aphaseEffectiveCurrentI }}
                            </el-descriptions-item>
                            <el-descriptions-item label="泄露电流">{{ StandParam3.leakageCurrentL }}
                            </el-descriptions-item>
                            <el-descriptions-item label="运行电压">{{ StandParam3.aphaseEffectiveVoltageU }}
                            </el-descriptions-item>
                            <el-descriptions-item label="N触头温度">{{ StandParam3.nphaseTerminalTemperature }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A触头温度">{{ StandParam3.aphaseTerminalTemperature }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量H">{{ StandParam3.aphaseActiveQuantityElectricityH }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量L">{{ StandParam3.aphaseActiveQuantityElectricityL }}
                            </el-descriptions-item>
                        </el-descriptions>

                        <el-descriptions v-if="!card3">
                            <!-- 三相 -->
                            <el-descriptions-item label="有功功率">{{ ThreeParam3.combinedActivePowerP }}
                            </el-descriptions-item>
                            <el-descriptions-item label="无功功率">{{ ThreeParam3.combinedReactivePowerQ }}
                            </el-descriptions-item>
                            <el-descriptions-item label="视在功率">{{ ThreeParam3.conjunctionAtPowerS }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A触头温度">{{ ThreeParam3.aphaseTerminalTemperature }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A相电压">{{ ThreeParam3.aphaseEffectiveVoltageU }}
                            </el-descriptions-item>
                            <el-descriptions-item label="A相电流">{{ ThreeParam3.aphaseEffectiveCurrentI }}
                            </el-descriptions-item>
                            <el-descriptions-item label="B触头温度">{{ ThreeParam3.bphaseTerminalTemperature }}
                            </el-descriptions-item>
                            <el-descriptions-item label="B相电压">{{ ThreeParam3.bphaseEffectiveVoltageU }}
                            </el-descriptions-item>
                            <el-descriptions-item label="B相电流">{{ ThreeParam3.bphaseEffectiveCurrentI }}
                            </el-descriptions-item>
                            <el-descriptions-item label="C触头温度">{{ ThreeParam3.cphaseTerminalTemperature }}
                            </el-descriptions-item>
                            <el-descriptions-item label="C相电压">{{ ThreeParam3.cphaseEffectiveVoltageU }}
                            </el-descriptions-item>
                            <el-descriptions-item label="C相电流">{{ ThreeParam3.cphaseEffectiveCurrentI }}
                            </el-descriptions-item>
                            <el-descriptions-item label="N触头温度">{{ ThreeParam3.nphaseTerminalTemperature }}
                            </el-descriptions-item>

                            <el-descriptions-item label="泄露电流">{{ ThreeParam3.leakageCurrentL }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量H">{{ ThreeParam3.combinedActiveQuantityElectricityH }}
                            </el-descriptions-item>
                            <el-descriptions-item label="有功电量L">{{ ThreeParam3.combinedActiveQuantityElectricityL }}
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
            address: "",
            date: new Date(),
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
            activeNames: ['1'],
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

            headerBg: 'headerBg',

            isdot: true,

            watching1: 10,
            watching2: 20,
            watching3: 30,

            // 同步的数据库中的数据
            form: {
                // address: '',
                currentLeakage: '',
                // ip: '',
                // port: '',
                startState: '',
                temperatureA: '',
                temperatureB: '',
                temperatureC: '',
                temperatureN: '',
            },
            // 输入框中的数据 输入后更新到form 和数据库中，然后清空
            formInput: {
                // address: '',
                currentLeakage: "",
                // ip: '',
                // port: '',
                startState: "",
                temperatureA: "",
                temperatureB: "",
                temperatureC: "",
                temperatureN: "",
            },

            updateloading1: false,
            updateloading2: false,
            updateloading3: false,

            dialogFormVisible: false,
        }
    },


    methods: {
        // 阈值设置弹出时的更新数据的方法
        openEvent() {
            this.queryWatchData(this.address, (data) => {
                // console.log("我是data的数据")
                console.log("已经同步" + this.address + "状态码" + data.startState)
                if (this.address == 1) {
                    this.updateForm(data)
                    if (data.startState == 1) {
                        this.watching1 = 11
                    } else if (data.startState == 0) {
                        this.watching1 = 10
                    }
                }
                if (this.address == 2) {
                    this.updateForm(data)
                    if (data.startState == 1) {
                        this.watching2 = 21
                    } else if (data.startState == 0) {
                        this.watching2 = 20
                    }
                }
                if (this.address == 3) {
                    this.updateForm(data)
                    if (data.startState == 1) {
                        this.watching3 = 31
                    } else if (data.startState == 0) {
                        this.watching3 = 30
                    }
                }
            })

        },
        // 这是阈值设置 点击更新的事件
        DataSet() {
            console.log(this.address)
            if (this.address == 1) {
                this.updateloading1 = true
            }
            if (this.address == 2) {
                this.updateloading2 = true
            }
            if (this.address == 3) {
                this.updateloading3 = true
            }

            // console.log(this.dialogFormVisible)

            // this.dialogFormVisible = true
            this.dialogFormVisible = false
            this.updateForm(this.formInput)
            this.editWatchData(this.address)
            this.resetFrom()
        },
        // 阈值设置 取消按钮的设置。更新输入框表格
        Cancel() {
            this.dialogFormVisible = false
            this.resetFrom()
        },
        //阈值弹窗关闭时处理
        closedEvent() {
            this.resetFrom()
        },


        // 这个是阈值按钮的开关
        watchSwichChange() {
            if (this.address == 1) {
                if (this.watching1 == 11) {
                    this.form.startState = '1'
                    console.log("开启")
                } else if (this.watching1 == 10) {
                    this.form.startState = '0'
                    console.log("关闭")
                }
            } else if (this.address == 2) {
                if (this.watching2 == 21) {
                    this.form.startState == '1'
                    console.log("开启")
                } else if (this.watching2 == 20) {
                    this.form.startState = '0'
                    console.log("关闭")
                }
            } else if (this.address == 3) {
                if (this.watching3 == 31) {
                    this.form.startState = '1'
                    console.log("开启")
                } else if (this.watching3 == 30) {
                    this.form.startState = '0'
                    console.log("关闭")
                }
            }
            this.editWatchData(this.address)
        },
        // 阈值按钮回弹
        resetWatchButton() {
            console.log(this.address)
            if (this.address == 1) {
                if (this.watching1 == 11) {
                    this.watching1 = 10
                } else if (this.value1 == 10) {
                    this.watching1 = 11
                }
            }
            if (this.address == 2) {
                if (this.watching2 == 21) {
                    this.watching2 = 20
                } else if (this.value2 == 20) {
                    this.watching2 = 21
                }
            }
            if (this.address == 3) {
                if (this.watching3 == 31) {
                    this.watching3 = 30
                } else if (this.value3 == 30) {
                    this.watching3 = 31
                }
            }


        },
        // 重置formInput数组
        resetFrom() {
            this.formInput.temperatureA = ""
            this.formInput.temperatureB = ""
            this.formInput.temperatureC = ""
            this.formInput.temperatureN = ""
            this.formInput.currentLeakage = ""
        },
        //  更新form 数组 而不改变startstate
        updateForm(newForm) {
            if (newForm.currentLeakage) {
                this.form.currentLeakage = newForm.currentLeakage
            }
            if (newForm.temperatureA) {
                this.form.temperatureA = newForm.temperatureA
            }
            if (newForm.temperatureB) {
                this.form.temperatureB = newForm.temperatureB
            }
            if (newForm.temperatureC) {
                this.form.temperatureC = newForm.temperatureC
            }
            if (newForm.temperatureN) {
                this.form.temperatureN = newForm.temperatureN
            }

        },
        // 点开更新按钮状态
        UpdateStatue() {
            // 每次点开页窗请求数据状态
            this.queryWatchData(this.address, (data) => {
                // console.log(data)
                console.log("已经同步" + this.address + "状态码" + data.startState)
                if (this.address == 1) {
                    if (data.startState == 1) {
                        this.watching1 = 11
                    } else if (data.startState == 0) {
                        this.watching1 = 10
                    }
                }
                if (this.address == 2) {
                    if (data.startState == 1) {
                        this.watching2 = 21
                    } else if (data.startState == 0) {
                        this.watching2 = 20
                    }
                }
                if (this.address == 3) {
                    if (data.startState == 1) {
                        this.watching3 = 31
                    } else if (data.startState == 0) {
                        this.watching3 = 30
                    }
                }
            })
        },


        handleChange() {
            this.$message({
                message: '请优先选择电闸',
                type: 'warning'
            });
            this.UpdateStatue()
        },
        setAddress(name) {
            // 通过不同的页签标示不同的电闸地址， address 用于后面接口判断查询对应数据
            this.address = name;
            // console.log(this.address)
        },
        // 电闸开关回弹
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
                // console.log("地址2未展开")
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
            // console.log(this.address)
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
                        // if (address === 1) {
                        //     this.test1 = false
                        // } else if (address === 2) {
                        //     this.test2 = false
                        // } else if (address === 3) {
                        //     this.test3 = false
                        // }

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
        dateFormat(time) {
            var date = new Date(time);
            var year = date.getFullYear();
            /* 在日期格式中，月份是从0开始的，因此要加0
            * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
            * */
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            // 拼接
            return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        },
        queryWatchData(address, callback) {
            console.log(address + " address")
            Net.queryThresholdData('192.168.0.7', '9999', '0' + address)
                .then((res) => {
                    // this.swichLoading1 = false;
                    // this.swichLoading2 = false;
                    // this.swichLoading3 = false;
                    console.log(res)
                    if (res.data) {
                        // this.$notify({
                        //     title: '成功',
                        //     message: "微断" + this.address + '查询阈值数据成功',
                        //     type: 'success'
                        // });
                        callback(res.data)
                        // if (address === 1) {
                        //     this.test1 = true
                        // } else if (address === 2) {
                        //     this.test2 = true
                        // } else if (address === 3) {
                        //     this.test3 = true
                        // }
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
        editWatchData(address) {
            console.log("请求数据")
            console.log(this.form)
            Net.editThresholdData('192.168.0.7', '9999', '0' + address, this.form.startState, this.form.currentLeakage, this.form.temperatureA, this.form.temperatureB, this.form.temperatureC, this.form.temperatureN)
                .then((res) => {
                    // this.swichLoading1 = false;
                    // this.swichLoading2 = false;
                    // this.swichLoading3 = false;
                    // console.log("编辑数据接口成功")
                    // console.log(res)
                    if (res.message == "成功") {
                        this.$notify({
                            title: '成功',
                            message: "微断" + this.address + '操作成功',
                            type: 'success'
                        });
                        this.UpdateStatue()
                        // this.updateloading = false
                        if (address === 1) {
                            this.updateloading1 = false
                        } else if (address === 2) {
                            this.updateloading2 = false
                        } else if (address === 3) {
                            this.updateloading3 = false
                        }
                    } else {
                        if (address === 1) {
                            this.updateloading1 = false
                        } else if (address === 2) {
                            this.updateloading2 = false
                        } else if (address === 3) {
                            this.updateloading3 = false
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
                        this.updateloading1 = false
                    } else if (address === 2) {
                        this.updateloading2 = false
                    } else if (address === 3) {
                        this.updateloading3 = false
                    }
                    this.swichLoading1 = false;
                    this.swichLoading2 = false;
                    this.swichLoading3 = false;
                })
        },
        // buttonChange(address) {
        //     console.log("请求数据")
        //     Net.editThresholdData('192.168.0.7', '9999', '0' + address, this.form.startState, this.form.currentLeakage, this.form.temperatureA, this.form.temperatureB, this.form.temperatureC, this.form.temperatureN)
        //         .then((res) => {
        //             // this.swichLoading1 = false;
        //             // this.swichLoading2 = false;
        //             // this.swichLoading3 = false;
        //             console.log("编辑数据接口成功")
        //             console.log(res)
        //             if (res.message == "成功") {
        //                 this.$notify({
        //                     title: '成功',
        //                     message: "微断" + this.address + '更新阈值数据成功',
        //                     type: 'success'
        //                 });
        //                 // if (address === 1) {
        //                 //     this.test1 = true
        //                 // } else if (address === 2) {
        //                 //     this.test2 = true
        //                 // } else if (address === 3) {
        //                 //     this.test3 = true
        //                 // }
        //             } else {
        //                 if (address === 1) {
        //                     this.value1 = 10
        //                     this.test1 = false
        //                 } else if (address === 2) {
        //                     this.value2 = 20
        //                     this.test2 = false

        //                 } else if (address === 3) {
        //                     this.value3 = 30
        //                     this.test3 = false
        //                 }
        //                 this.$notify.error({
        //                     title: '错误',
        //                     message: res.data,
        //                 });
        //                 // console.log(res.data)
        //                 return false;
        //             }

        //         }
        //         )
        //         .catch(() => {
        //             this.query()
        //             if (address === 1) {
        //                 this.value1 = 10
        //                 this.test1 = false
        //             } else if (address === 2) {
        //                 this.value2 = 20
        //                 this.test2 = false

        //             } else if (address === 3) {
        //                 this.value3 = 30
        //                 this.test3 = false
        //             }
        //             this.swichLoading1 = false;
        //             this.swichLoading2 = false;
        //             this.swichLoading3 = false;
        //         })
        // }
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
        let _this = this// 声明一个变量指向Vue实例this，保证作用域一致
        this.timer = setInterval(() => {
            _this.date = new Date(); // 修改数据date
        }, 1000)

    },
    destroyed() {
        window.clearInterval(this.timer)
        window.clearInterval(this.timer1)
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
        }
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

.ml-5 {
    margin-left: 10px
}

.content {
    /* text-align: center */
    float: left;
}



.el-switch {
    width: 35px;
}

.watchSwitch {
    margin-left: 200px;
    margin-top: -10px;
    width: 20px;
}

.watchSwitchTag {
    margin-left: 5px;
    margin-top: -10px;
}


/deep/.el-input__inner {
    margin-right: 100px;
    color: black;
    width: 100px;
    float: right;
}

.el-form-item {
    margin-left: 40px;
}

/* .item {
  margin-top: 10px;
  margin-right: 40px;
} */
</style>