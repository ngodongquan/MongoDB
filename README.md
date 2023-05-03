# MongoDB
This is a repository I use for learning MongoDB.
- MongoDB is database
- STEP
1. use newDatabase (if newDatabase not existed, it will create new database with that name immediately, but when you show dbs, only the database have data show)
2. switch newDatabase

# MODULE
- Each database have one or more collections
- db.Collection.methods
- a document can't be inserted directly in db, need to use collection

# JSON Data
- Mongo save data as BSON because it's fast and convinient

# DOCUMENTS
- can be array, nested object, string, number
- all have a unique id (_id)

# COLECTION
- If save collection data without _id, mongo will automatically add random _id field into, but you can overide it by creating own _id
- The collection in one db can not have same _id
- Two collections in one db musn't have same schema
- The unique key of colection in Mongo is "_id"

# CRUD OPERATIONS
- Create: insertOne, insertMany
- Read: find, findOne
- Update: updateOne, updateMany, replaceOne
- Delete: deleteOne, deleteMany
* All methods still are the function with input are two paramerters(filters, options)

# RESERVED OPERATOR
- when you see some world start with # => Reserved operator
- [$set]: use for update. 
**[Example]: db.collection.updateOne({}, {$set: {key: value}})**

- [$unset]: delete particular field in document. Value of ket set must be = ''
**[Example]: db.collection.updateMany({}, {$unset: {key: ''}})**

- [$gt]: greater than. 
**[Example]: db.collection.find({key: {$gt: 50}})**

- [$gt(aggregation)]: 
**[Example]: db.collection.find({$expr: {$gt: [$value, $volume]}})**

- [$lt]: lower than. //

- [$lt(aggregation)]

- [$eq] : equal

- [$elemMatch]: find document from collections that contain at least one element that matches with the filter.
**[Example]: db.collection.find({arrKey: {$elemMatch: {key: value}}})**

- [$ne]: not equal

- [$lte]: lower than or equal

- [$gte]: greater than or equal

- [$or]: logical operation OR and select documents that satisfy at least one in the expression. Contain list expression in array.
**[Example]: db.collection.find({$or: [...]})**

- [$and]: logical operation AND and select documents pass a filter
**[Example]: db.collection.find({$and: [{value: {$exists: true}}, {value: {$gt: 5}}]})**
**[ShordHand]: db.collection.find({value: {$exists: true,  $gt: 5}})**

- [$nor]: logical expression check all documents not satisfy any expression
**[Example]: db.collection.find({$nor: [...]})**

- [$exists]: check documents contain the field, contain or value of that key even if === null: true, not including: false. 
**[Example]: db.collection.find({key: {$exist: false}})**

- [$lookup]: get the data from other document of collection match with the field of document in collection checked.
- [Example]: db.collection.aggregate({$lookup: {
  from: collection want to join,
  localField: field exist in the current collection checked, if no existed, value => null,
  foreignField: field exist in the collection to joined, if no existed, value => null,
  as: key name you want to show the data of this,
  pipeline: [{$project: {name: 1}}] // custom projection
}})

- [$in]: check the any values specified in the array
**[Example]: db.collection.find({value: {$in: [5, 10]}})**

- [$nin]: this operator opposite with $in. find values not specified in the array
**[Example]: db.collection.find({value: {$nin: [5, 10]}})**

- [$not]: as the name, it just use for opposite. $not needs a regex or a document
**[Example]: db.collection.find({value: {$not: {$eq: 5}}})**

- [$type]: check the type of value of field
**[Example]: db.collection.find({value: {$type: 'number'}})**

- [$regex]: to search the string contain for pass the regex
**[Example]: db.collection.find({content: {$regex: '//abc//'}})**

- [$size]: to search the field has type as array return the length of that array
**[Example]: db.collection.find({array: {$size: {5}}})**

- [$all]: to search the value of key have contained specified element
**[Example]: db.colection.find({array: {$all: [5, 10]}}) === db.colection.find({$and: [{array: '5'}, {array: '10'}]})**

- [$inc]: to update increment any value of field in document
**[Example]: db.collection.updateOne({}, {$inc: {value: 1, 'array.1': 1, 'obj.A': 1}})**

- [$max] : to update value of the field if $max value have lower than value of max
**[Example]: db.collection.updateOne({}, {$max: {value: 10}})**

- [$min] : opposite with max

- [$mul]: to update value of the field with multiple
**[Example]: db.collection.updateOne({}, {$mul: {value: 1.1}})**

- [$rename]: rename a field
**[Example]: db.collection.updateOne({}, {$rename: {name: newName}})**

- [upsert]: this is very useful when use don't know exactly this filter can find any document to update or not. If have: update directly, not: create new.
Upsert has two value: true or false with false is a default. true is create new if don't find any document match.
**[Example]: db.collection.updateOne({name: 'N'}, {$set: {value: 1}}, {upsert: true})**

- [$push]: this operator is used to push element into field has value type is Array. you can add more value with [$each]
**[Example]: db.collection.updateMany({}, {$push: {hobbies: {a: 1, b: 5}}})**
**[ExampleMany]: db.collection.updateMany({}, {$push: {hobbies: {$each: [{a: 1, b: 1}, {a: 2, b:2}], $sort: -1}}})**

- [$pull]: this operator is used to remove one element or list elements match with query
**[Example]: db.collection.updateMany({}, {$pull: {array: {a: 1}}})**

- [$pop]: this operator is used to remove first or last element in array. **1 is Last element. -1 is First element** 
**[Example]: db.collection.updateMany({}, {$pop: {array: 1}})**

- [$addToSet]: this operator is used to add more element into array, but this element is always unique, if not => it will not create new
**[Example]: db.collection.updateMany({}, {$addToSet: {array: {a: 1}}})**

# METHODS:
- [replaceOne()]: replace all model, not similar with updateOne or updateMany just update property field in model. This method is similar with deprecated method: update.
And this cannot use ameratic operator
- [find()]: It's look like return back the data, but actually It's give us a cursor object. It's not Array. It basically used that cursor to fetch next bunch of data.
And This method give default 20 top element. You can forEach or toArray to show all data. Not get data immediately, then we get the cursor instead. 
- [pretty()] only use with cursor object, return a cursor, not a list documents
- [stats()]: This method is provided by mongo shell to show the stats of this db.
- [aggregate()]: This method is calculated aggregate value for the data in the collection. firstParam: []
- [drop()]: this method use for delete collection in db. 
- **[Example]: db.collection.drop()**
- [dropDatabase()]: this method use for delete db
- **[Example]: db.dropDatabase()**

# CURSORS:
- [find()] always return a list of cursor to save performance. default: 20. you can use next() to determine element, hasNext() to check have element TRUE: still yet, FALSE: not yet  
Once you use forEach of list documents, cursol will be exhausted

- [sort()] sort a cursor as a value of key. 1: Descending, -1: Ascending
**[Example]: db.collection.find().sort({key: 1}, {key: 1})**

- [skip()] amount of documents you skip
**[Example]: db.collection.find().skip(10)**

-[limit()]: limit of documents you return
**[Example]: db.collection.find().limit(10)**

# PROJECTION
- In mongoDb, when the data model has 5 field, if we want to response data with just 3 neccessary field, projection helps you to do that.
- In find(), you can pass second parameter in function to use projection. The data in that is key-value pair. With 0: hide, 1: show
* Example: db.collection.find({}, {name: 1}) => will return data with only two fields => _id, name
- _id is always display return unless you config _id: 0

- The positional $ operator limits the contents of an <array> to return the first element that matches the query condition on the array
*[Example]: db.collection.find({filter}, {'array.$': 1})
- You can custom $ operator limits by $elemMatch
*[Example]: db.collection.find({}, {'array': {$elemMatch: {$eq: 5}}})

- $slice: There are two cases:
  1. $slices: n => return n elements. *[Example]: db.collection.find({}, {array: {$slice: 2}})
  2. $slices: [n, m] => n: elements to skip, m: elements return after skip. *[Example]: db.collections.find({}, {array: {$slice: [1, 2]}})

# EMBEDDED DOCUMENTS
- JSON documents exists in other nested JSON documents
- If we have a nested data, and you need to find a data in deep object, it easily use dot field to key to handle this, but you should wrap the key into ""
*[Example]: db.colection.find({"a.b.c": 'value'})

# WORKING WITH ARRAYS
- In mongodb, we can define data with type Array.
- If we have any field have data [a, b, c] => when you find({field: a}) => mongo so clever check any data have that a is contained in array => then return data exactly 
*[Example]: db.collection.find({detail: 'a'}) => This check 'a' is contain in what document ?
- If you want to find exactly data, you can pass all data into square bracket
*[Example]: db.collection.find({detail: ['a']}) => this check document is have detail equal ['a']

- update matched one element in array. find FIRST element in array match with query and update it. **Symbol: $**
**[Example]: db.collection.updateMany({array: {$elemMatch: {a: 1, b:2}}}, {$set: {'array.$.keyNew': 1}})**

- update all elements in array. **Symbol: $[]**
**[Example]: db.collection.updateMany({}, {$set: {'array.$[].keyadd': 5}})**

- update matched elements in array. You need third agrument with key is **arrayFilters**, type of value is **Array**. **Symbol: $[el]**. Remember the key el is very neccessary
You can use more el for check multiple fields.
**[Example]: db.collection.updateMany({}, ${set: {'array.$[el].keyAdd': 5}}, {arrayFilters: [{'el.key'}: 5]})**

# DOT NOTATION
*[Example]: {a: [{b: 'c'}]} => db.collection.method({'a.b': 'c'})
*[SpecialExample]: db.collection.updateOne({}, {$set: {'array.1.value': 5}}) => That have you can set array at position 1 with value is 5

# SCHEMAS
- MongoDB enforce no schema. Documents don't need to have same schema in colection.

# DATA TYPES
- ["Text"], [Boolean], [Number]: int32, int64, number decimal, [ObjectId], [ISODate]: Timestamp, [Embedded-Documents]: object, [Array]

# ONE-ONE RELATION
- Document A: {_id: 1} ; Document B: {array: [1]}
=> In any document have used value such as _id in another document

# ONE-MANY RELATION
- Citizen: [{name: 'A', cityId: 1}, {name: 'B', cityId: 1}].  City: {_id: 1}

# MANY-MANY
- Authors: [{name: 'A', id: 1}, {name: 'B', id: 2}]. Books: {author: [1, 2]}

# SCHEMA VALIDATIONS
- you can see the example of validation in validation.js

# DIVING DEEPER INTO CREATE
- Beside two methods [insertOne], [insertMany], you can use [insert] to create document. But [insert] have some disadvantages. Firstly, [insert] can use for both
one and my documents => this make the code too hard to read. Second, [insert] return output with useless data, can use that output to handle.

[ORDERED]:
- Default behaviour of mongodb: if you insertMany documents, if any document have error, the previous document also added. MongoDb never rollback the process. And when
have any document fail, the next document willnot be added. insertMany() have provide second parameter to change this behaviour. [ordered]: true | false. True is default value
*[Example]: db.collection.insertMany([{name: 'a'}, {name: 'b'}], {ordered: false})

[WRITE_CONCERN]
- Second parameter {writeConcern: {w: 1, j: 1, wtimeout: 1}}.
w: decide whether need to know that document is inserted in mongodb or not. 0: don't wait service respond. 1: Wait service respond
j: decide whether need to create backup or not
wtimeout: limit time to inserted in mongodb successfully. Example, the time inserted bigger than wtimeout => error

# INDEXES
- use for speed up query, should use index when return a small percent, if return large collections, index will make your query slowly
- [explain()]: analyze the query. You can pass argument as string for explain: **executionStats**
**[Example]: db.collection.explain().find({})**

- [createIndex()]: create index for every field in document. value: -1 or 1. You can use **explain(executionStats)** to find stats of number of documents researches.
**[Example]: db.collection.createIndex({'key': 1})**
- CreateIndex can have a second argument was a options config.
**[Example]: db.collection.createIndex({'key': 1}, {unique: true})**

- [CompoundIndexes]: this is a definition about create index with compound key. But when you use to IDXSCAN, you should use from left to right.
**[Example]: db.collection.createIndex({'key1': 1, 'key2': 1, 'key3': 3})** => Mongo will create a key => key1_1_key2_1_key3_1 => then you should use some cases like:
document.collection.find({key1: 'a'}) || document.collection.find({key1: 'a', key2: 'b', key3: 'c'})
You cannot use come between key like "{key2: 'a'}" to use INXSCAN.

- [PartialIndex]: this is a definition about to only meet a specific filter expression then create index. This use as a second arguments.
**[Example]: db.collection.createIndex({'key1': 1}, {partialFilterExpression: {'key2': 'aa'}})**
- Like above example only query pass **partialFilterExpression** then create index. You should notify that when you use query you should attach this filExpression then have IDXSCAN
**[Example]: db.collection.find({key1: 'aa', key2: 'aa'})**

- You can integrate [unique] and [partialFilterExpression] to decide whether this field should be add unique or not.
**[Example]: db.collection.createIndex({'key1': 1}, {unique: true, partialFilterExpression: {'key1': {$gt: 60}}})**
- Above example has mean key1 should be greater than 60, then add unique for key 1

- [getIndexes()]: this method is used to get all index create
**[Example]: db.collection.getIndexes()**

- [expireAfterSeconds]: A document will expire when the number of seconds in the expireAfterSeconds filed has overcome since the time specified in indexed field.
Adding a new element basically triggered mongodb to re-evaluate the entire collection.
**[Example]: db.collection.createIndex({key:1}, {expireAfterSeconds: 10})**

# HOW MONGO DB REJECTED PLAN
1. if you createIndex by compound index like this: db.collection.createIndex({a: 1, b: 1}) => save a_1_b_1 as a key in a index.
2. Then, you createIndex: db.collection.createIndex({a: 1}) || db.collection.createIndex({b: 1}) => save two key a_1 and b_1 as a key in index
3. You use the query: db.collection.find({a: 1. b: 1})
4. The winning plans will be: a_1_b_1
5. The rejected plans will be a_1 and b_1

# TEXT INDEXES
- You only have one text index in one collection.
**[Example]: db.collection.createIndex({description: 'text'}) || db.collection.createIndex({description: 'text', name: 'text'})**
- Then you can search field has string you want, this feature is quite similar with $regex. No need to declare field to search.
**[Example]: db.collection.find({$text: {$search: "/"aaaa/""}})**

- You can integrate text index with sorting by use $meta, this will evaluate text score.
**[Example]: db.collection.find({$text: {$search: "/"aaaaa/""}}, {score: {$meta: 'textScore'}}).sort({score: {$meta: 'textScore'}})**
- You can find data by exclude world by [--]
**[Example]: db.collection.find({$text: {$search: "a a --b"}})** -> find data havey text contain a or a but not include b

- You can add key background for not to blocking when createindex and insertElement
**[Example]: db.collection.find({}, {background: true})**

# GEOSPATIAL DATA
- GEOJsonData sample: {
  name: 'HCM city',
  location: {
    type: 'Point',
    coordinates: [
      106.3655802,
      10
    ] ([lng, lat])
  }
}

- Step to search nearest place in geo data
1. Insert data with right sample.
2. Create index for location with type is **2dsphere**. **[Example]: db.collection.createIndex({location: '2dsphere'})**
3. Use query to research geo data with two important operators [$near], [$geomatry]. You can config max distance to search by operator [$maxDistance]. 
**[Example]: db.collection.find({location: {$near: {$geometry: {type: 'Point', coordinates: [lng, lat]}, $maxDistance: 1000}}})**

- If you want to find location inside a certain area
1. Declare list [lng, lat] to customize polygon
2. Same seconde step above
3. use query to research geo data within certain area. And operators [$geoWithin]
**[Example]: db.collection.find({location: {$geoWithin: {$geometry: {type: "Polygon", coordinates: [[p1, p2, p3, p4]]}}}})** p1,p2,p3,p4: [lng, lat]
- Notes: coordinates was an array and have list of polygon. And polygon was made by list of [lng, last].

- If you want to find are contain location point
1. Insert data. 
**[Example]: db.area.insertOne({name: 'Area1', area: {type: 'Polygon', coordinates: [[p1 ,p2, p3, p4]]}})**
2. Create index for area
**[Example]: db.area.createIndex({area: '2dsphere'})**
3. Use query to reseach if area contain location. And operators: [$geoIntersects]
**[Example]: db.area.find({area: {$geoIntersects: {$geometry: {type: 'Point', coordinates: [lng, lat]}}}})**

- If you want to find all location within center
**[Example]: db.location.find(location: {$geoWithin: {$centerSphere: [[lng, lat]], 1 / 6378.1}})**  

# AGGREATION
- same with find return list cursors
- [$match]: use in the aggreation to find the documents
**[Example]: db.collection.aggregate([{$match: {a: '1'}}])**

- [$group]: use in the aggreation to group the documents acording to key or group of keys. The output is one document for each unique group key. The key is required is **_id**
The key use should have $ before. The relation of [$group]: n:1, multiple document into one documents. You can sum, build Array, count, average
**[Example]: db.collection.aggregate([{$group: {_id: {keyIadd: '$key to use', keyIaddSecond: '$key to use next'}, countEachGroupKey: {$sum: 1}}}])**
- You can add some options to calculate about list collection acording to group key such as: [$sum], [$avg]
**[Example]: db.collection.aggregate([{$group: {_id: {gender: '$gender'}, sum: {$sum: 1}, avg: {$avg: '$age'}}}, {sort: {$sort: {sum: 1}}}])**
=> this example is describe group collection acording to gender, and calculate sum and avegare each group collection suit for group key, and after al, sort ascending by sum

- [$sort]: you can itegrate sort and group to find exact element you want. you can sort every field you want. With 1: Ascending and -1: Descending.
**[Example]: db.collection.aggregate([{group: {_id: {age: '$age'}, sum: {$sum: 1}}}, {$sort: {'_id.age': 1}}])**

- [$project]: this operator is same feature with projection. 1: show, 0. hide. The relation of [$project] is 1:1. It just transform fields within a single documents.
**[Example]: db.collection.aggregate([{$project: {name: 1, age: 1}}])**
- Some operators support for custom string is: [$concat], [$substr], [$substrCP], [$toUpper], [$strLenCP]
**[Example]: db.collection.aggregate([{$project: {fullName: {$concat: [{$toUpper: {$substrCP: [{'name.first', 0, 1}]}}, ' ' ,a]}}}])**

- Some operator to convert: [$convert], [$toDate], [$toString], ...
- Operator to get year from date: [$isoWeekYear]

- [$push]: when you [$group] collection, you can merge array by method [$push]
**[Example]: db.collection.aggregate([{$group: {_id: {age: '$age'}, allHobbies: {$push: '$hobbies'}}}])**
- You can easily remove duplicate element in array by [$addToset]
**[Example]: db.collection.aggregate([{$group: {_id: {age: '$age'}, allHobbies: {$addToset: '$hobbies'}}}])**

- [$unwind]: you can deconstruct an array field from input element to output elements for each element. Image you have {name: 'a', hobbies: ['a,b,c']} => it will return 
{name: 'a', hobbies: 'a'}, {name: 'a', hobbies: 'b'}, {name: 'a', hobbies: 'c'}
**[Example]: db.collection.aggregate([{$unwind: {path: '$hobbies', preserveNullAndEmptyArrays: null}}])**
*path: key you want to output elements for each element*
*preserveNullAndEmptyArrays: when the value of $path is null, empty array, or undefined, you set TRUE [$unwinds] still output that documents* 

- [$slices]: you can projection array field by operator slice.
**[Example]: db.collection.aggregate([{$project: {newArray: {$slices: ['$array', position, n]}}}])**
*if have position, it will start to position and get n elements, but none, it will be get n elements from start.*

- [$size]: you can get length of array by operator size
**[Example]: db.collection.aggregate([{$project: {newArrayLength: {$size: '$array'}}}])**
In some cases, if you want to group by length of array you can use $size to determine
**[Example]: db.collection.aggregate([{$group: {_id: {$size: '$arr'}}}])** 

- [$filter]: you can filter element array as you want.
**[Example]: db.collection.aggregate([{$project: {array: {input: '$array', as: 'eachElement', cond: {$gt: ['$$eachElement.value', 50]} }}}])**

- [$first]: when you group element, you can show get value of first document to show.
**[Example]: db.collection.aggregate([{$group: {_id: {name: '$name'}, keyNew: {$first: "$age"}}}])**

- [$max]: you can also find max value in [$group].
**[Example]: db.collection.aggregate([{$group: {_id: {_id: '$_id'}, maxValue: {$max: '$score'}}}])**

- [$bucket]: diving into documents into group
**[Example]: db.collection.aggregate([{$bucket: {groupBy: '$age', boundaries: [0, 30, 50, 80], default: 'Others'}}])**

- [$skip], [$limit]: you can skip element or limit number of elements to show.
**[Example]: db.collection.aggregate([{$match: {age: {$gt: 30}}}, {$skip: 10}, {$limit: 10}])**

- you can store previous aggregate by [$out]. And this will store in list collections in db
**[Example]: db.collection.aggregate([{$match: {age: {$gt: 30}}}], {$out: 'transformedData'})**

# MONGO SHELL
- Mongo shell is based on Javascript. => 12 and 12.0 is similar in JS