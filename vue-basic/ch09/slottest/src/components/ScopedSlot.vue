<template>
    <div class="child">
        <!--x,y 값을 자식 컴포넌트가 가지고 있고 v-model로 입력받은 데이터 저장-->
        X : <input type="text" v-model="x" /><br />
        Y : <input type="text" v-model="y" /><br />
        <!-- :cx="x" :cy="y" 인 속성으로 부모 컴포넌트 쪽에 전달 -->
        <slot name="type1" :cx="x" :cy="y"></slot>
        <slot name="type2" :cx="x" :cy="y"></slot>
    </div>
</template>
    
<script>
export default {
    data(){
        return {x:4, y:5};
    }
}
</script>

<style scoped>
    .child {padding:5px; border:solid 1px gray;}
</style>