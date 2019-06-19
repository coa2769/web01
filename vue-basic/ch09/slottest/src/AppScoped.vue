<template>
    <div class="parent">
        <child>
            <!--scope="p1" scope속성으로 받는다. 전달 받은 데이터에 p1이라는 이름 지정-->
            <template slot="type1" scope="p1">
                <div>{{p1.cx}} + {{p1.cy}} = {{parseInt(p1.cx) + parseInt(p1.cy)}}</div>
            </template>

            <template slot="type2" scope="p2">
                <div>{{p2.cx}} 더하기 {{p2.cy}} = {{parseInt(p2.cx) + parseInt(p2.cy)}}입니다.</div>                
            </template>
        </child>
    </div>
</template>

<<script>
import Child from './components/ScopedSlot.vue'

export default {
    components:{Child}
}
</script>

<style>
    .parent {border:dashed 2px black; padding:5px;}
</style>