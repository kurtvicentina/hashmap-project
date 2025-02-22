import { linkedList } from "./linkedList.js";

function hashMap() {
  let buckets = new Array(16);
  let numOfEntries = 0;

  let capacity = buckets.length;
  let loadFactor = 0.8;

function growBuckets(load, cap){
    let entryLimit = Math.floor(cap * load);
    if(numOfEntries > entryLimit){
        const newLength = buckets.length *= 2;
        loadFactor *= 2;
        capacity = newLength;

        const newBucket = new Array(newLength)

        for (let node of buckets){
            if(node !== undefined){
            let currentNode = node.head();

            while(currentNode){
                let key = Object.keys(currentNode.value)[0];
                let value = Object.values(currentNode.value)[0];
                set(key, value, newBucket);

                currentNode = currentNode.nextNode;
            }

        }
    }
        buckets = newBucket
        console.log(newBucket.entries())
        console.log('this is buckets length '+ newBucket.length);
    }
}

  
function hash(key) {
    let hashCode = 0;
     
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i) % buckets.length;
    }

    return hashCode % buckets.length; 
};

function set(key, value, array = buckets){
    let bucketNumber = hash(key);
    const insertedValue = { [key]: value };
  
      if(array[bucketNumber] !== undefined){
        let currentNode = array[bucketNumber].head();
        while(currentNode){
            if(Object.keys(currentNode.value)[0] === key){
                currentNode.value = insertedValue;
                numOfEntries++;
                console.log(bucketNumber)
                console.log(insertedValue)
                growBuckets(capacity, loadFactor);
                return;
            }
            currentNode = currentNode.nextNode;
        }

          array[bucketNumber].append(insertedValue);
  
          console.log(bucketNumber)
          console.log(insertedValue)
          numOfEntries++;
          growBuckets(capacity, loadFactor);
          return bucketNumber;
      }
  
      const link = linkedList();
      link.append(insertedValue);
      array[bucketNumber] = link;
      numOfEntries++;
      console.log(bucketNumber)
      console.log(insertedValue)
      growBuckets(capacity, loadFactor);
      return bucketNumber;
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
        return false;
    }
    let currentNode = buckets[bucketNumber].head();

    while(currentNode){
        if(Object.keys(currentNode.value)[0] === key){
            buckets[bucketNumber].removeAt(nodeCounter);
            console.log(buckets[bucketNumber].toString())
            length--;
            return true;
        }
        currentNode = currentNode.nextNode;
        nodeCounter++;
    }

}

    function length(){
        return buckets.length;
    }

    function clear(){
        buckets = new Array(16);
    }
    
    function keys(){
        let allKeys = []
        for(let key of buckets){
            if(key !== undefined){
                let currentNode = key.head();
                while(currentNode){
                    allKeys.push(Object.keys(currentNode.value)[0]);
                    currentNode = currentNode.nextNode;
                }
            }
            
        }
        return allKeys
    }

    function values(){
        let allValues = []
        for(let key of buckets){
            if(key !== undefined){
                let currentNode = key.head();
                while(currentNode){
                    allValues.push(Object.values(currentNode.value));
                    currentNode = currentNode.nextNode;
                }
            }
            
        }
        return allValues
    }

    function entries(){
        let allEntries = []
        for(let key of buckets){
            if(key !== undefined){
                let currentNode = key.head();
                while(currentNode){
                    allEntries.push(`${Object.keys(currentNode.value)[0]}, ${Object.values(currentNode.value)[0]}`);
                    currentNode = currentNode.nextNode;
                }
            }
            
        }
        return allEntries
    }




  return {buckets, set, get, has, remove, length, clear, keys, values, entries, growBuckets}
}

let test = hashMap();

test.set('apple', 'red')
test.set('apple', 'blue')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('moon', 'silver')

 test.set('moon', 'brown')
 test.set('moon', 'light')
 console.log(test.entries())




