<template>
  <div class="login">
    <div class="login-form">
      <van-form @submit="onSubmit">
        <van-field
          v-model="phoneNumber"
          name="phone"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="password"
          center
          clearable
          name="password"
          label="密码"
          placeholder="请输入密码"
        >
        </van-field>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { loginIn, loginStatus } from "../api/index";
import { mapActions } from "vuex";
import {getLocalStorage,setLocalStorage} from '../common/js/util'
export default {
  data() {
    return {
      phoneNumber: "",
      password: "",
    };
  },
  methods: {
    onSubmit(values) {
      console.log(values);
      loginIn({ ...values }).then((res) => {
        if (res.loginType === 1) {
          const { nickname, avatarUrl } = res.profile;
          setLocalStorage("nickname",nickname)
          setLocalStorage('avatarUrl',avatarUrl)
          setLocalStorage("loginStatus",true)
          this.setToken(res.token);
          this.$router.push("/");
        }
      });
    },
    ...mapActions(["setToken"]),
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 67.5rem;
  background: url("/img/wallpaperlogin.jpg");
 
  &-form {
    width: 80%;
    margin: auto;
   position: relative;
   top: 18.75rem;
    input {
      border: none;
      background: transparent;
      border-bottom: 1px solid black;
    }
  }
}
</style>
