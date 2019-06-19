<template>
    <div>
        <!-- $style이라는 계산형 속성을 통해서 style module을 이용한다. -->
        <button :class="$style.hand">CSS Modeule을 적용한 버튼 </button>
    </div>
</template>

<script>
    export default{
        name:'module1',
        created() {
            console.log(this.$style);            
        }
    }
</script>

<style module>
    .hand{cursor:pointer; background-color: purple; color:yellow;}
</style>