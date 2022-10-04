<template>
    <div>
        <el-tabs tab-position="top" style="height: 50px;">
            <el-tab-pane label="设备状态">
                <DeviceStatues></DeviceStatues>
            </el-tab-pane>
            <el-tab-pane label="操作记录">
                <HistoryRecord></HistoryRecord>
            </el-tab-pane>
            <el-tab-pane label="数据记录">
                <DataHistory></DataHistory>
            </el-tab-pane>
        </el-tabs>


       

    </div>
</template>

<script>
import HistoryRecord from './HistoryRecord.vue'
import DeviceStatues from './DeviceStatues.vue'
import DataHistory from './DataHistory.vue'


export default {
    name: 'MainContain',
    data() {
        return {

            value1: false,
            value2: false,
            value3: true,
            activeNames: ['1'],

        }
    },
    components: {
        HistoryRecord, DeviceStatues, DataHistory
    },
    methods: {
        handleChange(val) {
            console.log(val);
        }
    }
}
</script>

<style scoped>
.clearfix:after {
    clear: both
}



.parameter {
    margin-left: 0ch;
    list-style: none;
    font-size: 9px;
    line-height: 30px;
}

.li {
    padding-left: 0;
}
</style>


