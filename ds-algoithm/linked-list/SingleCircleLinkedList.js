
/**
 * 创建一个Node类
 */

class Node {
    constructor(element,next){
        this.element = element
        this.next = next
    }
}


/**
 * 单向链表
 */

class SingleCircleLinedList {

    constructor(){
        this.first = null // 头部节点
        this.size = 0 // 链表长度
    }

    // 清空链表
    clear () {
        this.size = 0
        this.first = null
    }

    // 获取某个节点元素
    get (index) {
        this.rangeCheck(index)

        return this.getNode(index).element
    }

    // 删除某个位置index节点元素 返回当前节点ele
    remove (index) {
        // 边界问题
        this.rangeCheck(index)

        let current = this.first
        if(index === 0){ // 删除头部节点
            if(this.size === 1) { // 当链表只有一个节点的情况
                this.first = null
            } else {
                this.first = current.next
                this.getNode(this.size - 1).next = this.first
            }
        } else { // 删除中间位置和最后节点
            // 取当前index的前一个节点
            let prev = this.getNode(index - 1),
            current = prev.next // 更新当前节点
            prev.next = current.next
        }

        this.size --

        return current.element
    }

    // 删除某个节点ele 返回删除节点的位置index
    removeEle (ele) {
        // 查看是否有这个ele
        const index = this.indexOf(ele)
        if(index !== -1){
            this.remove(index)
        }

        return index
    }

    // 添加节点
    add (element,index) {
        this.rangeCheckForAdd(index)
        
        if(index === 0){ // 从头部添加
            // 拿到最后一个节点
            const newFirst = new Node(element,this.first)
            const last = this.size === 0 ? newFirst : this.getNode(this.size - 1)
            last.next = newFirst
            this.first = newFirst
        } else { // 最后追加 和 中间位置添加
            // const prev = (index === this.size) ? this.getNode(this.size - 1) : this.getNode(index - 1)
            const prev = this.getNode(index - 1)
            prev.next = new Node(element,prev.next)
        }

        this.size ++
    }

    // 从后面追加
    push (element) {
        this.add(element,this.size)
    }

    // 获取index位置的对应的节点对象
    getNode (index) {
        this.rangeCheck(index)

        let node = this.first
        for(let i = 0; i < index; i++){
            node = node.next
        }
        return node
    }

    // 查找节点的位置
    indexOf (ele) {
        let current = this.first,i = 0
        while(current){
            if(current.element === ele) return i
            i++
            current = current.next
        }
        return -1
    }

    // 边界控制
    rangeCheck (index) {
        if(index < 0 || index >= this.size){
            throw new Error(`index is out of bounds! index:${index} size:${this.size}`)
        }
    }
    // 边界控制 添加节点，index可以是size
    rangeCheckForAdd (index) {
        if(index < 0 || index > this.size){
            throw new Error(`index is out of bounds! index:${index} size:${this.size}`)
        }
    }

    // 输出数组格式 从头部节点循环输出
    to_Array () {
        const res = []
        let current = this.first,i = 0
        while(i < this.size){
            if(current.next === null){
                res.push(`${current.element}_${current.next}`)
            } else {
                res.push(`${current.element}_${current.next.element}`)
            }
            i++
            current = current.next
        }
        return res
    }
    toArray () {
        const res = []
        let current = this.first,i = 0
        while(i < this.size){
            res.push(current.element)
            i++
            current = current.next
        }
        return res
    }

    // 输出其他的格式
    toString () {
        return this.toArray().join(',')
    }
}

let testLinked = new SingleCircleLinedList()
testLinked.push(10)
testLinked.push(20)
testLinked.push(30)
testLinked.push(40)

testLinked.add(33,2) // [10,20,33,30,40]
testLinked.add(44,5) // [10,20,33,30,40,44]
testLinked.add(11,0) // [11,10,20,33,30,40,44]
testLinked.add(55,3) // [11,10,20,55,33,30,40,44]
// console.log(testLinked.toArray())
// console.log(testLinked.size)

// 删除位置节点
testLinked.remove(0)
testLinked.remove(2)
// testLinked.remove(6)
testLinked.remove(5)
// [ 10, 20, 33, 30, 40 ]
// [ '10_20', '20_33', '33_30', '30_40', '40_11' ]

// 删除目标节点
// console.log(testLinked.removeEle(11))
// console.log(testLinked.removeEle(44))
// console.log(testLinked.removeEle(23))

// 获取位置节点
// console.log(testLinked.get(0),testLinked.get(1),testLinked.get(5))
// console.log(testLinked.get(7))

// 查找
// console.log(testLinked.indexOf(10))
// console.log(testLinked.indexOf(55))
// console.log(testLinked.indexOf(11))
// console.log(testLinked.indexOf(1))


// testLinked.clear() // 清空
console.log(testLinked.toArray())
console.log(testLinked.to_Array())
// console.log(testLinked.toString())
