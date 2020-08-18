
//栈    先进后出（LIFO）原则
//在栈里  新元素都靠近 栈顶    旧元素都接近栈底
// export function Stack() {
//   var items = [];
//
//   //添加一个（或几个）新元素到栈顶
//   this.push = function (element) {
//     items.push(element);
//   };
//
//   //移除栈顶元素
//   this.pop = function () {
//     return items.pop();
//   };
//
//   //查看栈顶元素
//   this.peek = function () {
//     return items[items.length - 1];
//   };
//
//   //检查栈是否为空
//   this.isEmpty = function () {
//     return items.length == 0;
//   };
//
//   //返回栈里的元素个数
//   this.size = function () {
//     return items.length;
//   };
//
//   //清空栈
//   this.clear = function () {
//     items = [];
//   };
//
//   //打印栈
//   this.print = function () {
//     console.log(items.toString());
//   };
// }

//缺点：变量tiems 是公共的
// export class Stack {
//
//   constructor(){
//     this.items = [];
//   }
//
//   //添加一个（或几个）新元素到栈顶
//   push(element) {
//     this.items.push(element);
//   };
//
//   //移除栈顶元素
//   pop() {
//     return this.items.pop();
//   };
//
//   //查看栈顶元素
//   peek() {
//     return this.items[this.items.length - 1];
//   };
//
//   //检查栈是否为空
//   isEmpty() {
//     return this.items.length == 0;
//   };
//
//   //返回栈里的元素个数
//   size() {
//     return this.items.length;
//   };
//
//   //清空栈
//   clear() {
//     this.items = [];
//   };
//
//   //打印栈
//   print() {
//     console.log(this.items.toString());
//   };
//
// }

//缺点：可以通过 Object.getOwnPropertySymbols(stack)  来获取 _items 进而修改数组

//栈
 let Stack = (function () {

//缺点：扩展类不可继承私有属性
  let items = new WeakMap();

  class Stack {

    constructor(){
      items.set(this,[])
    }

    //添加一个（或几个）新元素到栈顶
    push(element) {
      let s = items.get(this);
      s.push(element);
    };

    //移除栈顶元素
    pop() {
      let s = items.get(this);
      return s.pop();
    };

    //查看栈顶元素
    peek() {
      let s = items.get(this);
      return s[s.length - 1];
    };

    //检查栈是否为空
    isEmpty() {
      let s = items.get(this);
      return s.length == 0;
    };

    //返回栈里的元素个数
    size() {
      let s = items.get(this);
      return s.length;
    };

    //清空栈
    clear() {
      let s = items.get(this);
      s = [];
    };

    //打印栈
    print() {
      let s = items.get(this);
      console.log(s.toString());
    };

  }
  return Stack
})();


//队列   先进先出 原则
// function Queue() {
//   let items = [];
//
//   //像队列添加元素
//   this.enqueue = function (element) {
//     items.push(element);
//   };
//
//   //从队列移除元素
//   this.dequeue = function () {
//     return items.shift();
//   };
//
//   //查看队列头元素
//   this.front = function () {
//     return items[0];
//   };
//
//   //检查队列是否为空
//   this.isEmpty = function () {
//     return items.length == 0;
//   };
//
//   this.size = function () {
//     return items.length;
//   };
//
//   this.print = function () {
//     console.log(items.toString());
//   }
//
// }

 let Queue = (function () {
  const items = new WeakMap();
  class Queue{
    constructor(){
      items.set(this,[])
    }

    //像队列添加元素
    enqueue(element) {
      let q = items.get(this);
      q.push(element);
    };

    //从队列移除元素
    dequeue() {
      let q = items.get(this);
      return q.shift();
    };

    //查看队列头元素
    front() {
      let q = items.get(this);
      return q[0];
    };

    //检查队列是否为空
    isEmpty() {
      let q = items.get(this);
      return q.length == 0;
    };

    size() {
      let q = items.get(this);
      return q.length;
    };

    print() {
      let q = items.get(this);
      console.log(q.toString());
    }

  }
  return Queue;
})();


 let PriorityQueue = (function () {
  const items = new WeakMap();

  class QueueElement{
    constructor(element,priority){
      this.element = element;
      this.priority = priority;
    }
  }

  class Queue{
    constructor(){
      items.set(this,[]);
    }

    //像队列添加元素
    enqueue(element,priority = 100) {
      let q = items.get(this);
      let queueElement = new QueueElement(element,priority);

      let added = false;
      for(let i = 0;i<q.length;i++){
        if(queueElement.priority < q[i].priority){
          q.splice(i,0,queueElement);
          added = true;
          break;
        }
      }
      if(!added){
        q.push(queueElement);
      }

    };

    //从队列移除元素
    dequeue() {
      let q = items.get(this);
      return q.shift();
    };

    //查看队列头元素
    front() {
      let q = items.get(this);
      return q[0];
    };

    //检查队列是否为空
    isEmpty() {
      let q = items.get(this);
      return q.length == 0;
    };

    size() {
      let q = items.get(this);
      return q.length;
    };

    print() {
      let q = items.get(this);
      for(let i = 0;i<q.length;i++){
        console.log(`${q[i].element} - ${q[i].priority}`);
      }
    }

  }
  return Queue;
})();



//创建链表
 let LinkedList = (function () {

  let Node = function (element) {
    this.element = element;
    this.next = null;
  };

  let length = 0;
  let head = null;

  class LinkedList{
    constructor(){

    }

    //向列表尾部添加一个新的项
    append(element){
      let node = new Node(element),
        current;

      if(head === null){
        head = node;
      }else{
        current = head;
        while(current.next){
          current = current.next;
        }
        current.next = node;
      }

      length ++;

    }

    //向列表的特定位置插入一个新的项
    insert(position,element){
      if(position >= 0 && position <= length){
        let node = new Node(element),
          current = head,
          previous,
          index = 0;

        if(position === 0){
          node.next = head;
          head = node;
        }else{
          while(index++ < position){
            previous = current;
            current = current.next;
          }
          node.next = current;
          previous.next = node;
        }
        length ++;
        return true;
      }else{
        return false;
      }

    }
    //从列表的特定位置移除一项
    removeAt(position){
      //检查越界值
      if(position > -1 && position < length){
        let current = head,
          previous,
          index = 0;

        if(position === 0){
          head = current.next;
        }else{
          while(index++ < position){
            previous = current;
            current = current.next;
          }
          // 将 previous 与 current 的下一项连接起来；跳过 current，从而移除他；
          previous.next = current.next;
        }
        length --;

        return current.element;

      }else{
        return null;
      }
    }
    // 从列表中移除一项
    remove(element){
      let index = this.indexOf(element);
      return this.removeAt(index)
    }

    //返回元素在列表中的索引，如果列表中没有该元素则返回-1
    indexOf(element){
      let current = head,
        index = 0;

      while(current){
        if(element === current.element){
          return index;
        }
        index ++;
        current = current.next;
      }

      return -1;
    }
    //如果链表中不包含任何元素，返回true， 长度大于0 则返回 false
    isEmpty(){
      return length === 0;
    }
    //返回链表包含的元素个数。
    size(){
      return length;
    }

    getHead(){
      return head;
    }

    //由于列表项使用了Node类，就需要重写继承自javaScript对象默认的 toString 方法，让其只输出元素的值
    toString(){
      let current = head,
        string = '';

      while(current){
        string += current.element + ( current.next?'n':'');
        current  = current.next;
      }
      return string;

    }

    print(){
      console.log(head);
    }

  }

  return LinkedList
})();

//创建双向链表
 let DoublyLinkedList = (function () {

  let Node = function (element) {
    this.element = element;
    this.next = null;
    this.prev = null;
  };

  let length = 0;
  let head = null;
  let tail = null;

  class LinkedList{
    constructor(){

    }

    //向列表尾部添加一个新的项
    append(element){
      let node = new Node(element),
        current;

      if(head === null){
        head = node;
      }else{
        current = head;
        while(current.next){
          current = current.next;
        }
        current.next = node;
      }
      length ++;
    }

    //向列表的特定位置插入一个新的项
    insert(position,element){
      if(position >= 0 && position <= length){
        let node = new Node(element),
          current = head,
          previous,
          index = 0;

        if(position === 0){

          if(!head){
            head = node;
            tail = node;
          }else{
            node.next = current;
            current.prev = node;
          }

        }else if(position === length){
          current = tail;
          current.next = node;
          node.prev = current;
          tail = node;
        }else{
          while(index++ < position){
            previous = current;
            current = current.next;
          }
          node.next = current;
          previous.next = node;

          current.prev = node;
          node.prev = previous;
        }
        length ++;
        return true;
      }else{
        return false;
      }

    }
    //从列表的特定位置移除一项
    removeAt(position){
      //检查越界值
      if(position > -1 && position < length){
        let current = head,
          previous,
          index = 0;

        if(position === 0){
          head = current.next;

          if(length === 1){
            tail = null;
          }else{
            head.prev = null;
          }

        }else if(position === length - 1){
          current = tail;
          tail = current.prev;
          tail.next = null;

        }else{
          while(index++ < position){
            previous = current;
            current = current.next;
          }
          // 将 previous 与 current 的下一项连接起来；跳过 current，从而移除他；
          previous.next = current.next;
          current.next.prev = previous;
        }
        length --;

        return current.element;

      }else{
        return null;
      }
    }
    // 从列表中移除一项
    remove(element){
      let index = this.indexOf(element);
      return this.removeAt(index)
    }

    //返回元素在列表中的索引，如果列表中没有该元素则返回-1
    indexOf(element){
      let current = head,
        index = 0;

      while(current){
        if(element === current.element){
          return index;
        }
        index ++;
        current = current.next;
      }

      return -1;
    }
    //如果链表中不包含任何元素，返回true， 长度大于0 则返回 false
    isEmpty(){
      return length === 0;
    }
    //返回链表包含的元素个数。
    size(){
      return length;
    }

    getHead(){
      return head;
    }

    //由于列表项使用了Node类，就需要重写继承自javaScript对象默认的 toString 方法，让其只输出元素的值
    toString(){
      let current = head,
        string = '';

      while(current){
        string += current.element + ( current.next?'n':'');
        current  = current.next;
      }
      return string;

    }

    print(){
      console.log(head);
    }

  }

  return LinkedList
})();


//集合

 let Set = (function () {

  let items = new WeakMap();

  class Set{
    constructor(){
      items.set(this,{});
    }

    has(value){
      let item = items.get(this);
      return item.hasOwnProperty(value)
    }

    add(value){
      if(!this.has(value)){
        let item = items.get(this);
        item[value] = value;
        return true;
      }
      return false;
    }

    remove(value){
      if(this.has(value)){
        let item = items.get(this);
        delete item[value];
        return true;
      }
      return false;
    }

    clear(){
      let item = items.get(this);
      item = {};
    }

    size(){
      let item = items.get(this);

      return Object.keys(item).length;
    }

    values(){
      let item = items.get(this);
      let values = [];

      for(let i = 0 ,keys = Object.keys(item);i<keys.length;i++){
        values.push(item[keys[i]]);
      }

      return values;

    }

    //并集
    union(otherSet){
      let unionSet = new Set();
      let values = this.values();

      for(let i = 0;i<values.length;i++){
        unionSet.add(values[i]);
      }

      values = otherSet.values();
      for(let i = 0;i<values.length;i++){
        unionSet.add(values[i]);
      }
      return unionSet
    }

    //交集
    intersection(otherSet){
      let intersectionSet = new Set();
      let values = this.values();

      for(let i = 0;i<values.length;i++){
        if(otherSet.has(values[i])){
          intersectionSet.add(values[i]);
        }
      }
      return intersectionSet;

    }

    //差集   元素x存在于A，且x不存在于B；
    difference(otherSet){
      let differenceSet = new Set();
      let values = this.values();
      for(let i = 0;i<values.length;i++){
        if(!otherSet.has(values[i])){
          differenceSet.add(values[i]);
        }
      }
      return differenceSet;
    }

    //子集  集合A是集合B的子集 (集合B包含了集合A)     集合A中的每一个x元素，也需要存在于B中
    subset(otherSet){
      if(this.size() > otherSet.size()){
        return false;
      }else{
        let values = this.values();
        for(let i = 0;i<values.length;i++){
          if(!otherSet.has(values[i])){
            return false;
          }
        }
        return true;
      }
    }



    print(){
      let item = items.get(this);
      console.log(item);
    }

  }

  return Set;

})();


 //字典
let Dictionary = (function () {
  let items = new WeakMap();

  class Dictionary{
    constructor() {
      items.set(this,{});
    }

    //向字典添加新元素
    set(key,value){
      let v = items.get(this);
      v[key] = value;
    }

    //通过使用键值来从字典中移除键值对应的数据值
    delete(key){
      let v = items.get(this);
      if(this.has(key)){
        delete v[key];
        return true;
      }
      return false;
    }

    //如果 key 存在于这个字典 则返回true
    has(key){
      let v = items.get(this);
      return v.hasOwnProperty(key)
    }

    //通过键值查找特定的数值 并 返回
    get(key){
      let v = items.get(this);
      return this.has(key)?v[key]:undefined;
    }

    //删除所有元素
    clear(){
      let v = items.get(this);
      v = {};
    }

    //返回 字典所包含元素的数量
    size(){
      let v = items.get(this);
      return Object.keys(v).length;
    }

    //将字典所包含的所有键名以数组的形式返回
    keys(){
      let v = items.get(this);
      return Object.keys(v);
    }

    //将字典所包含的所有数值以数组的形式返回
    values(){
      let values = [];
      let v = items.get(this);
      for(let key in v){
        if(this.has(key)){
          values.push(v[key]);
        }
      }
      return values;
    }

    getItems(){
      let v = items.get(this);
      return v
    }

  }

  return Dictionary;
})();

//散列表   作用： 尽可能快的再数据结构中找到一个值
let HashTable = (function () {
  let tables = new WeakMap();

  let loseloseHashCode = function (key) {
    let hash = 0;
    for(let i = 0;i<key.length;i++){
      hash += key.charCodeAt(i);
    }
    //为了得到比较小的数值，我们会使用hash值和一个任意数做除法的余数
    return hash % 37;
  };

  //处理上述函数的冲突 有 三种方法： 分离链接  线性探查  双散列法


  class HashTable{
    constructor() {
      tables.set(this,[]);
    }

    //向散列表增加一个新的项
    put(key,value){
      let position = loseloseHashCode(key);
      let table = tables.get(this);
      console.log( `${position} - ${key}` );
      table[position] = value;
    }
    // 根据键值从散列表中移除值
    remove(key){
      let table = tables.get(this);
      table[loseloseHashCode(key)] = undefined;

    }
    //返回根据键值检索到的特定的值
    get(key){
      let table = tables.get(this);
      return table[loseloseHashCode(key)]
    }

    print(){
      let table = tables.get(this);
      for(let i = 0;i<table.length;i++){
        if(table[i] !== undefined){
          console.log(`${i}:${table[i]}`);
        }
      }

    }

  }

  return HashTable;
})();

const Person = class{

}


export {
  Stack,
  Queue,
  PriorityQueue,
  LinkedList,
  DoublyLinkedList,
  Set,
  Dictionary,
  HashTable,
  Person
}
