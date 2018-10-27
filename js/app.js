(function (window, Vue) {
    // 自己准备一个临时数组，渲染页面
    // 添加功能做好之后，就不需要临时数组了
    // var list = [
    //     {
    //         id: 1,
    //         content: 'abc',
    //         isFinish: true
    //     },
    //     {
    //         id: 2,
    //         content: 'def',
    //         isFinish: false
    //     },
    //     {
    //         id: 3,
    //         content: 'hig',
    //         isFinish: true
    //     }
    // ];
    new Vue({
        el: "#app",
        data: {
            // list: list,
            // list: [],
            // JSON.parse() 将json形式的字符串转为数组
            list: JSON.parse(window.localStorage.getItem('list')) || [],
            newTodo: ''
        },
        // 自定义指令，获取光标
        directives: {
            focus: {
                inserted(el) {
                    el.focus();
                }
            }
        },
        methods: {
            // 添加todo
            addTodo() {
                if(this.newTodo.trim() !== "") {
                    // console.log(this.newTodo);
                    // 存放到list里
                    this.list.push({
                        content: this.newTodo.trim(),
                        isFinish: false,
                        // 给所有id排序，找到最后一个+1

                        // ????????????????????
                        id: this.list.length?( this.list.sort(function(a,b){return a.id- b.id})[this.list.length-1])['id']+1:1
                    })
                    this.newTodo = "";
                } else {
                    return
                }            
            },
            // 删除todo
            deleTodo(index) {
                this.list.splice(index,1);
                console.log(index)
            },                                                                                                                                                         
            deleAll() {
                // 把没有完成的再给到list，显示list
                this.list = this.list.filter(item=>item.isFinish===false)
            }
        },
        // 只要有变化，就监听
        watch: {
            list: {
                handler(newArr) {
                      // JSON.stringify() 将json形式的数组转化为字符串
                    window.localStorage.setItem('list', JSON.stringify(newArr))
                },
                deep: true
            }
        },
        computed: {
            // 未完成的条数
            activeItem() {
               return this.list.filter(item=>item.isFinish===false).length
            },
            // 全选按钮的
            toggleAll: {
                // 这里要返回true或false
                // 只要数组发生变化，就遍历数组是否已经全为true,若是，就返回true，否则返回false
               get() {
                //    已经计算出来的内容，只要被计算项没有改变，值就不会改变
                // 遍历数组的没一项，如果都是true,返回true，有一个是false, 返回false
                    return this.list.every(item=>item.isFinish)
               },
               set(val) {
                //    这里要改变被计算项和val的值是一致的
                   console.log(val)
                   this.list.forEach(item=>item.isFinish = val)
               }
            }
        }
        
    });
})(window, Vue);
