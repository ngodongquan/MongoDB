db.createCollection("posts", {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'creator', 'text', 'comment'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'title must be a string and required'
        },
        creator: {
          bsonType: 'objectId',
          description: 'creator id must be required'
        },
        text: {
          bsonType: 'string',
          description: 'text must be required'
        },
        comment: {
          bsonType: 'array',
          description: 'comment must be an array',
          minItems: 0,
          items: {
            bsonType: 'object',
            required: ['commentId', 'text'],
            properties: {
              commentId: {
                bsonType: 'objectId',
                description: 'commentId must be required'
              },
              text: {
                bsonType: 'string',
                description: 'text comment be required'
              }
            }
          }
        }
      }
    }
  }
})

db.createCollection('user', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name']
    }
  }
})