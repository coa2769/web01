<template>
    <div class="container">
        <!-- 속성과 슬롯의 차이를 알기위해 두가지 모두 사용 -->
        <div class="header">{{headerText}}</div>
        <div class="content">
            <slot></slot>
        </div>
        <div class="footer">{{footerText}}</div>
    </div>
</template>

<script>
    export default {
        props : ['headerText', 'footerText']
    }
</script>

<style scoped>
    .container{width:300px; margin:10px; padding:2px; border:solid 1px gray; float:left;}
    .header{padding:4px 20px 4px 20px; background-color:orange; color:aqua; text-align:center;}
    .footer {padding:4px 20px 4px 20px; background-color:aqua; text-align:left;}
    .content{padding:10px; height:auto; min-height:20px;text-align:left;}
</style>