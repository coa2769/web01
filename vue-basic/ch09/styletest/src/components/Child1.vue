<template>
    <div>
        <div class="main test">
            {{msg}}
            <!--자식인 컴퍼런트인 child11에게도 main, test class가 똑같이 적용-->
            <child11 />
            {{msg}}
        </div>
    </div>
</template>

<script>
    import Child11 from './Child11.vue'

    export default{
        name:'child1',
        components:{Child11},
        data(){
            return{
                msg:'Child1'
            }
        }
    }
</script>
<!-- 
    두 컴퍼넌트에서 <style> => <style scoped> 변경
    컴포넌트 요소에 data-v-xxxx형태의 특성이 부여된다.
    스타일 클래스에도 이와 관련한 내용이 설정된다.
 -->
<style scoped>
    /* class의 이름이 Child2와 겹치므로 충돌이 일어난다. */
    .main {border:solid 1px black; background-color:yellow;}
    .test {padding:10px; text-decoration: underline; border:solid 1px black;}
</style>