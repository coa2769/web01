<template>
    <div>
        <h1>About</h1>
        <h3>{{new Date().toTimeString()}}</h3>

        <h4>조직도</h4>
        <tree :subs="orgcharts"></tree>
    </div>    
</template>

<script>
import Tree from './Tree.vue'

export default {
    name:"About",
    components:{Tree},
    data : function(){
        return{
            orgcharts : [
                {
                    name : "(주) 사업부", type:"company",
                        subs : [
                            {name:"다음01",type:"division",
                                subs : [{name : "다음02-01", type:"team"},
                                        {name : "다음02-02", type:"team"}]
                            },
                            {name:"다음03", type:"division"}]
                }
            ]
        }
    }
}
</script>

<style>
    li.company{color:blue;}
    li.division {color:steelblue;}
    li.team {color:tomato;}
</style>