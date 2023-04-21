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
*[Example]: db.collection.find({arrKey: {$elemMatch: {key: value}}})*

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

# METHODS:
- [replaceOne()]: replace all model, not similar with updateOne or updateMany just update property field in model. This method is similar with deprecated method: update.
And this cannot use ameratic operator
- [find()]: It's look like return back the data, but actually It's give us a cursor object. It's not Array. It basically used that cursor to fetch next bunch of data.
And This method give default 20 top element. You can forEach or toArray to show all data. Not get data immediately, then we get the cursor instead. 
- [pretty()] only use with cursor object, return a cursor, not a list documents
- [stats()]: This method is provided by mongo shell to show the stats of this db.
- [aggreate()]: This method is calculated aggreate value for the data in the collection. firstParam: []

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
*[Example]: db.collection.find({}, {'array.$': 1})
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