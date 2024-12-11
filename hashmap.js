function linkedList() {
  let length = 0;
  let headNode = null;

  const append = (value) => {
      const newNode = node(value)
      if(headNode === null){
          headNode = newNode;
      }
      else{
          let currentNode = headNode

          while(currentNode.nextNode){
              currentNode = currentNode.nextNode
          }
          
          currentNode.nextNode = newNode;

      }
      length++;
  }

  const prepend = (value) => {
      const newNode = node(value);
      const previousHead = headNode;

      headNode = newNode
      newNode.nextNode = previousHead;
      length++
  }

  const size = () => length

  const head = () => headNode

  const tail = () => {
      let tailNode;
      let currentNode = headNode;
      while(currentNode.nextNode){
          currentNode = currentNode.nextNode;
      }
      tailNode = currentNode;
      return tailNode
  }

  const at = (index) => {
      let atNode;
      let currentNode = headNode

      if(index <= 0){
          console.log('ERROR! Index is too little!');
          return;
      }

      if(index > length){
          console.log(`ERROR! Index is ${index}, but the last node is ${length}!`);
          return;
      }

      else{
      for(let i = 1; i < index; i++){
          currentNode = currentNode.nextNode
      }
      atNode = currentNode;
      return atNode;
  }
}

  const pop = () => {
      let currentNode = headNode;
      let newTailNode;
      

      if(length === 1){
          headNode = null;
          length--;
      }

      else{
          for(let i = 1; i < length - 1; i++){
              currentNode = currentNode.nextNode;
          }
              newTailNode = currentNode;
              newTailNode.nextNode = null;
              length--;
      }
  }

  const contains = (value) => {
      let currentNode = headNode;

      if(currentNode.value === value) return true

      while(currentNode.nextNode){
          currentNode = currentNode.nextNode;

          if(currentNode.value === value) return true
      }
      return false
  }

  const find = (value) => {
      let currentNode = headNode;
      let index = 1;

      if(currentNode.value === value) return index

      while(currentNode.nextNode){
          currentNode = currentNode.nextNode;
          index++;

          if(currentNode.value === value) return index
      }
      return null
  }

  const toString = () => {
      let currentNode = headNode;
      let listToString = `( ${JSON.stringify(currentNode.value)} ) -> `;

      while(currentNode.nextNode){
          currentNode = currentNode.nextNode;

          listToString += `( ${JSON.stringify(currentNode.value)} ) -> `
      }

      listToString += `( null )`

      return listToString;
  }

  const insertAt = (value, index) => {
      let currentNode = headNode;
      let rightNode;
      const newNode = node(value);

      if(index < length){
          console.log(`ERROR! Index is less than length!`);
          return;
      }

      if(index > length){
          console.log(`ERROR! Index is ${index} you should insert at the end of the list which is ${length}!`);
          return;
      }

      if(index === 1){
          rightNode = currentNode;
          headNode = newNode;
          newNode.nextNode = rightNode;
      }
      else if(index === 2){
          rightNode = currentNode.nextNode;
          currentNode.nextNode = newNode;
          newNode.nextNode = rightNode;
      }
      else{
      for(let i = 1; i < index; i++){
          currentNode = currentNode.nextNode
          rightNode = currentNode.nextNode
      }
      newNode.nextNode = rightNode
      currentNode.nextNode = newNode;
  }
  length++;
  }

  const removeAt = (index) => {
      let currentNode = headNode;
      let rightNode;

      if(index <= 0){
          console.log('ERROR! Index is less than length!');
          return;
      }

      if(index > length){
          console.log(`ERROR! You tried to remove index ${index} but the list only has ${length} items!`);
          return;
      }

      if(index === 1){
          headNode = currentNode.nextNode
      }
      else if(index === 2){
          rightNode = currentNode.nextNode.nextNode;
          currentNode.nextNode = rightNode;
      }
      else{
      for(let i = 2; i < index; i++){
          currentNode = currentNode.nextNode
          rightNode = currentNode.nextNode
      }
      currentNode.nextNode = rightNode.nextNode;
  }
  length--;
  }

  return { headNode, append, prepend, head, size, tail, at, pop, contains, find, toString, insertAt, removeAt}
}

function node(value = null, nextNode = null){

  return { value, nextNode }
}

function hashMap() {
  let buckets = new Array(16);

  let loadFactor = 0.8;
  let capacity = buckets.length;

  
function hash(key) {
    let hashCode = 0;
     
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i) % 16;
    }

    return hashCode % 16; 
};

function set(key, value){
    let bucketNumber = hash(key);
    const insertedValue = { [key]: value };
  
      if(buckets[bucketNumber] !== undefined){
        let currentNode = buckets[bucketNumber].head();
        while(currentNode){
            if(Object.keys(currentNode.value)[0] === key){
                currentNode.value = insertedValue;
                return;
            }
            currentNode = currentNode.nextNode;
        }

          buckets[bucketNumber].append(insertedValue);
          return;
      }
  
      const link = linkedList();
      link.append(insertedValue);
      buckets[bucketNumber] = link;
      return;
  };

function get(key){
    let bucketNumber = hash(key);

    if(!buckets[bucketNumber]) return null;

    let currentNode = buckets[bucketNumber].head();

    while(currentNode){
        if(Object.keys(currentNode.value)[0] === key){
            return Object.values(currentNode.value)[0];
        }
        currentNode = currentNode.nextNode;
    }
  };

function has(key){
    let bucketNumber = hash(key);

    if(!buckets[bucketNumber]) return false;

    let currentNode = buckets[bucketNumber].head();

    while(currentNode){
        if(Object.keys(currentNode.value)[0] === key){
            console.log(bucketNumber)
            return true;
        }
        currentNode = currentNode.nextNode;
    }
    console.log(bucketNumber)
    return false;
}

function remove(key){
    let bucketNumber = hash(key);
    let nodeCounter = 1;

    if(!buckets[bucketNumber]){
        buckets[bucketNumber] = []
        return false;
    }

    let currentNode = buckets[bucketNumber].head();
    let rightNode = currentNode.nextNode;
    while(currentNode){
        if(Object.keys(currentNode.value)[0] === key){
            if(Object.keys(currentNode.value)[0] === Object.keys(currentNode.value)[0]){
                buckets[bucketNumber].removeAt(nodeCounter);
                console.log(buckets[bucketNumber].toString())
                // const result = buckets[bucketNumber].(nodeCounter)
                buckets[bucketNumber] = undefined;
                return;
            }


            currentNode = rightNode.nextNode;
            nodeCounter++;
            return true;
        }
        currentNode = currentNode.nextNode;
        rightNode = currentNode.nextNode;
    }
    return false;
}

  return {buckets, set, get, has, remove}
}

let test = hashMap();

test.set('a', 'Ezra');
test.set('a', 'a');
test.set('a', 'b');
test.set('a', 'c');
test.set('aaa', 'adsd');
test.set('aaa', 'bdasdasdasdasdasd');
test.set('b', 'bdasdasdasdasdasd');


test.set('faa', 'b');
test.set('da', 'da');
// console.log(test.has('ab'))
// console.log(test.has('a'))
// console.log(test.has('aaa'))
// // console.log(test.has('faa'))




test.set('b', 'bdasdasdasdasdasd');
console.log(test.has('a'))



// console.log(test.buckets)
// console.log(test.buckets[12])
 
// test.set('Kurt', 'Aaaa');

// console.log(test.buckets)
// console.log(test.buckets[12])


// FIX: LENGTH FUNCTION AND ALSO MORE TEST FOR REMOVE FUNCTION
