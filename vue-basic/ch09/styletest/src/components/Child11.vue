<template>
    <div>
        <div class="test">
            <h3>Child - Child </h3>
        </div>
    </div>
</template>

<script>
    export default{
        name:'child11'
    }
</script>
<!-- 
    두 컴퍼넌트에서 <style> => <style scoped> 변경
    컴포넌트 요소에 data-v-xxxx형태의 특성이 부여된다.
    스타일 클래스에도 이와 관련한 내용이 설정된다.
 -->
<style scoped>
    /* class의 이름이 Child2와 겹치므로 충돌이 일어난다. */
    .test {font-style:italic;}
</style>