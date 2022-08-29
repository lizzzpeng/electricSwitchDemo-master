<template>
<div></div>
</template>

<script>
    export default {
        name: "InforError",
         created() {
            let _this = this
            this.$alert('登录信息失效！', '提示', {
                confirmButtonText: '确定'
            }).then(() => {
                localStorage.removeItem('access-admin')
                _this.$router.replace({path: '/LoginBegin'})
            })
        }
    }
</script>

<style scoped>

</style>