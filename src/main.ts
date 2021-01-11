import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import {DatePicker} from 'element-ui';


Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

Vue.component('DatePicker', DatePicker);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');


window.onload = function () {
    setTimeout(function () {
        window.scrollTo(0, 100000);
    }, 0);
};


if (document.documentElement.clientWidth > 500) {
    // window.alert('为保证使用体验，请使用手机打开本页面')
    const img = document.createElement('img');
    img.src = './qrcode.png';
    img.style.position = 'fixed';
    img.style.left = '50%';
    img.style.top = '50%';
    img.style.transform = 'translate(-50%,-50%)';
    // img.style.display='none'
    img.style.boxShadow = '0 0 10px rgba(0,0,0,0.25)';

    document.body.appendChild(img);


    let text = document.createElement('p');
    text.innerText = '为保证使用体验\n请用手机打开本页面';
    text.style.position = 'fixed';
    text.style.left = '50%';
    text.style.top = '50%';
    text.style.transform = 'translate(-50%,-270px)';
    text.style.color = '#333333';
    text.style.fontWeight = 'bold';
    text.style.textAlign = 'center';
    text.style.fontSize = '30px';
    document.body.appendChild(text);


    let text1 = document.createElement('p');
    text1.innerText = '(或者使用浏览器控制台调试)';
    text1.style.position = 'fixed';
    text1.style.left = '50%';
    text1.style.top = '50%';
    text1.style.transform = 'translate(-50%,-175px)';
    text1.style.color = '#333333';
    text1.style.fontWeight = 'bold';
    text1.style.textAlign = 'center';
    text1.style.fontSize = '17px';
    document.body.appendChild(text1);




    let text2 = document.createElement('p');
    let n = 21
    let int = setInterval(function (){
        n--
        if (n<=0){
            clearInterval(int)
        }
        text2.innerText = '(本提示将在'+n+'秒后关闭)';
        console.log(n);
    },1000)

    text2.style.position = 'fixed';
    text2.style.left = '50%';
    text2.style.top = '50%';
    text2.style.transform = 'translate(-50%,150px)';
    text2.style.color = '#929292';
    text2.style.fontWeight = 'bold';
    text2.style.textAlign = 'center';
    text2.style.fontSize = '17px';
    document.body.appendChild(text2);

    setTimeout(() => {
        img.style.display = 'none';
        text.style.display = 'none';
        text1.style.display = 'none';
        text2.style.display = 'none';
    }, 20000);



}

