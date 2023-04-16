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
- $set: use for update. 
*[Example]: db.collection.updateOne({}, {$set: {key: value}})

- $gt: greater than. 
*[Example]: db.collection.find({key: {$gt: 50}})

- $lt: lower than. //

- $elemMatch: find document from collections that contain at least one element that matches with the filter.
*[Example]: db.collection.find({arrKey: {$elemMatch: {key: value}}})

- $ne

- $or: logical operation OR and select documents that satisfy at least one in the expression. Contain list expression in array.
*[Example]: db.collection.find({$or: [...]})

- $exists: check documents contain the field. contain or value of that key === null: true, not including: false. 
*[Example]: db.collection.find({key: {$exist: false}})

# METHODS:
- replaceOne(): replace all model, not similar with updateOne or updateMany just update property field in model. This method is similar with deprecated method: update.
And this cannot use ameratic operator
- find(): It's look like return back the data, but actually It's give us a cursor object. It's not Array. It basically used that cursor to fetch next bunch of data.
And This method give default 20 top element. You can forEach or toArray to show all data. Not get data immediately, then we get the cursor instead.
- pretty() only use with cursor object, return a cursor, not a list documents
- stats(): This method is provided by mongo shell to show the stats of this db.

# PROJECTION
- In mongoDb, when the data model has 5 field, if we want to response data with just 3 neccessary field, projection helps you to do that.
- In find(), you can pass second parameter in function to use projection. The data in that is key-value pair. With 0: hide, 1: show
* Example: db.collection.find({}, {name: 1}) => will return data with only two fields => _id, name
- _id is always display return unless you config _id: 0

# EMBEDDED DOCUMENTS
- JSON documents exists in other nested JSON documents
- If we have a nested data, and you need to find a data in deep object, it easyly use dot field to key to handle this, but you should wrap the key into ""
*[Example]: db.colection.find({"a.b.c": 'value'})

# WORKING WITH ARRAYS
- In mongodb, we can define data with type Array.
- If we have any field have data [a, b, c] => when you find({field: a}) => mongo so clever check any data have that a is contained in array => then return data exactly 
*[Example]: {a: [{b: 'c'}]} => db.collection.method({'a.b': 'c'})

# SCHEMAS
- MongoDB enforce no schema. Documents don't need to have same schema in colection.

# DATA TYPES
- ["Text"], [Boolean], [Number]: int32, int64, number decimal, [ObjectId], [ISODate]: Timestamp, [Embedded-Documents]: object, [Array]