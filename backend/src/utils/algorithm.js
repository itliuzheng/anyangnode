import { Stack, Queue, PriorityQueue } from '@/api/data'

// 十进制 转 二进制

export function divideBy2(decNumber) {
  let remStack = new Stack(),
    rem,
    binaryString = '';

  while(decNumber > 0){
    rem = Math.floor(decNumber % 2);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / 2);
  }
  while(!remStack.isEmpty()){
    binaryString += remStack.pop().toString();
  }
  return binaryString;
}

// 十进制 转 N进制

export function baseConverter(decNumber,base) {
  let remStack = new Stack(),
    rem,
    binaryString = '',
    digits = '0123456789ABCDEF';

  while(decNumber > 0){
    rem = Math.floor(decNumber % base);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / base);
  }
  while(!remStack.isEmpty()){
    binaryString += digits[remStack.pop()];
  }
  return binaryString;
}


//循环队列--击鼓传花
export function hotPotato(nameList,num) {
  let queue = new  Queue();
  for(let i = 0;i<nameList.length;i++){
    queue.enqueue(nameList[i]);
  }
  let eliminated = '';
  while(queue.size() > 1){
    for(let i = 0;i<num;i++){
      queue.enqueue(queue.dequeue());
    }
    eliminated = queue.dequeue();
    console.log(eliminated + '在击鼓传花游戏中被淘汰!');
  }
  return queue.dequeue();
}
