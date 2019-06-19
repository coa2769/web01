<style>
    * {
        box-sizing: border-box;
    }
    ul {
        margin: 0;
        padding: 0;
    }
    
    ul li {
        cursor: pointer;
        position: relative;
        padding: 8px 8px 8px 40px;
        background: #eee;
        font-size: 14px;
        transition: 0.2s;
        -webkit-user-select: none;
        user-select: none;
    }
    
    ul li:hover {
        background: #ddd;
    }
    
    ul li.checked {
        background: #BBB;
        color: #fff;
        text-decoration: line-through;
    }
    
    ul li.checked::before {
        content: '';
        position: absolute;
        border-color: #fff;
        border-style: solid;
        border-width: 0px 1px 1px 0px;
        top: 10px;
        left: 16px;
        transform: rotate(45deg);
        height: 8px;
        width: 8px;
    }
    
    .close {
        position: absolute;
        right: 0;
        top: 0;
        padding: 12px 16px 12px 16px
    }
    
    .close:hover {
        background: #f44336;
        color: white;
    }

</style>

<template>
    <ul id="todolist">
        <li v-for="a in todolist" :key="a.id" :class="checked(a.done)" @click="doneToggle(a.id)">
            <span>{{a.todo}}</span>
            <span v-if="a.done">(완료)</span>
            <span class="close" v-on:click.stop="deleteTodo(a.id)">&#x00D7;</span>
        </li>
    </ul>
</template>

<script type="text/javascript">
    import eventBus from '../EventBus'

    export default {
        created : function(){
            eventBus.$on('add-todo', this.addTodo);
        },
                data: function() {
            return {
                todolist: [{
                    id: 1,
                    todo: "영화보기",
                    done: false
                }, {
                    id: 2,
                    todo: "주말 산책",
                    done: true
                }, {
                    id: 3,
                    todo: "ES6 학습",
                    done: false
                }, {
                    id: 4,
                    todo: "잠실 야구장",
                    done: false
                }]
            }
        },
        methods: {
            //todolist 데이터 속성에서done속성이 true인 경우 checked클래스를 적용 여부를 결정하는 기능
            checked: function(done) {
                if (done) return {
                    checked: true
                };
                else return {
                    checked: false
                };
            },
            //추가 버튼을 클릭하거나 입력 필드에서 엔터 키를 눌렀을 때 할 일을 목록에 추가하는 기능
            addTodo: function(todo) {
                if (this.todo !== "") {
                    // $ 함수 내의 객체 list가 어떻게 남아 있지?!!!!!!
                    this.todolist.push({
                        id: new Date().getTime(),
                        todo: todo,
                        done: false
                    });
                }
            },
            //할 일 목록 오른쪽 끝의 x를 클릭하면 목록에서 삭제합니다. 삭제를 위해서 배열의 splice메서드를 사용합니다.
            deleteTodo: function(id) {
                var index = this.todolist.findIndex(function(item) {
                    return item.id === id;
                });
                this.todolist.splice(index, 1);
            },
            //할 일 목록을 클릭하면 done속성을 true/false로 토글합니다.
            doneToggle: function(id) {
                var index = this.todolist.findIndex(function(item) {
                    return item.id === id;
                });
                this.todolist[index].done = !this.todolist[index].done;
            }
        }
    }

</script>