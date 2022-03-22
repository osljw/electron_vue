<template>
    <div>
        <el-input v-model="input"> </el-input>
        <el-button type="primary" @click="onSubumit">提交</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input: '',
            websock: null,
        }
    },
    created() {
        this.initWebSocket()
    },
    methods: {
        onSubumit(){
            //const time = new Date().Format("yyyy-MM-dd hh:mm:ss")
            let obj = {
                message: this.input
                //time: time
            }
            console.log("send msg:", JSON.stringify(obj))
            //发给后端的数据需要字符串化
            this.websock.send(JSON.stringify(obj));

            // 清空消息
            this.input = ''
        },
        //初始化weosocket
        initWebSocket(){
            //const wsuri = `wss://www.fanfei.site/ws/chat/${this.group_name}/`;
            //const wsuri = `${url.chat}/${this.group_name}/`;
            const wsuri = `ws://127.0.0.1:8000/ws/chat`;

            this.websock = new WebSocket(wsuri);
            this.websock.onmessage = this.websocketonmessage;
            this.websock.onopen = this.websocketonopen;
            this.websock.onerror = this.websocketonerror;
            this.websock.onclose = this.websocketclose;
        },
        //连接建立之后执行send方法发送数据
        websocketonopen(){ 
            console.log('WebSocket连接成功')
        },
        //连接建立失败重连
        websocketonerror(e){
            console.log(`连接失败的信息：${e}`)
            //this.initWebSocket();
        },

        //数据接收
        websocketonmessage(e){ 
            const redata = JSON.parse(e.data);
            console.log('消息接收成功', redata)

            // //let name = ''
            // //let avatar = ''
            // if(redata.from_user == this.chatToUser.user_id) {
            //     //name = this.chatToUser.username
            //     //avatar = this.chatToUser.avatar_url
            //     //const time = redata.time
            //     const obj = {
            //         name: this.chatToUser.username,
            //         msg: redata.message,
            //         avatar: this.chatToUser.avatar_url,
            //         time: redata.time
            //     }
            //     this.msgRecord.push(obj)
            //     this.$nextTick(() => {
            //         this.container.scrollTop = this.container.scrollHeight
            //     })
            //     } else if(redata.from_user == this.myUserInfo.id) {
            //     console.log('消息发送成功')
            //     } else {
            //     console.log('返回未知消息')
            // }
        },
    }

}
</script>