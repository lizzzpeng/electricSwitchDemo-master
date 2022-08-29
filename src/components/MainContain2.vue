<template>
  <div>

  </div>
</template>

<script>
export default {
  name: 'MainContain2',
  data() {
    return {
      activeName: 'second'
    };
  },
  created() {
    this.$notify.error({
      title: '错误',
      message: "登录失败",
      confirmButtonTest: "确定"
    }).then(() => {
      localStorage.removeItem('access-admin')
      this.$router.replace({
        path: "/login"
      })
    });

  }
}
</script>

<style scoped>
/* .LineInformationContent {
    width: 265x;
    height: 100%;
    background: #F7F8FA;
    border: 1px solid #E5E9EE;
    border-radius: 2px;
    margin-right: 18px;
    margin-bottom: 18px;
    transition: all .5s;
}
 */
</style>