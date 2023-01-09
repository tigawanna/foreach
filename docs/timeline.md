## The timeline


First we'll set up our pocketbase using the admin dashboard

<details>
<summary>Click to expand schema</summary>
```json
[
    {
        "id": "_pb_users_auth_",
        "name": "users",
        "type": "auth",
        "system": false,
        "schema": [
            {
                "id": "users_name",
                "name": "name",
                "type": "text",
                "system": false,
                "required": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "id": "users_avatar",
                "name": "avatar",
                "type": "file",
                "system": false,
                "required": false,
                "unique": false,
                "options": {
                    "maxSelect": 1,
                    "maxSize": 5242880,
                    "mimeTypes": [
                        "image/jpg",
                        "image/jpeg",
                        "image/png",
                        "image/svg+xml",
                        "image/gif"
                    ],
                    "thumbs": null
                }
            }
        ],
        "listRule": "id = @request.auth.id",
        "viewRule": "id = @request.auth.id",
        "createRule": "",
        "updateRule": "id = @request.auth.id",
        "deleteRule": "id = @request.auth.id",
        "options": {
            "allowEmailAuth": true,
            "allowOAuth2Auth": true,
            "allowUsernameAuth": true,
            "exceptEmailDomains": null,
            "manageRule": null,
            "minPasswordLength": 8,
            "onlyEmailDomains": null,
            "requireEmail": false
        }
    },
    {
        "id": "5sckr8a13top3zs",
        "name": "devs",
        "type": "auth",
        "system": false,
        "schema": [
            {
                "id": "dhr1v7xa",
                "name": "avatar",
                "type": "url",
                "system": false,
                "required": false,
                "unique": false,
                "options": {
                    "exceptDomains": null,
                    "onlyDomains": null
                }
            },
            {
                "id": "jojjscns",
                "name": "accessToken",
                "type": "text",
                "system": false,
                "required": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "id": "jqjtptoe",
                "name": "displayname",
                "type": "text",
                "system": false,
                "required": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            }
        ],
        "listRule": "",
        "viewRule": "",
        "createRule": "",
        "updateRule": "@request.auth.id = id",
        "deleteRule": null,
        "options": {
            "allowEmailAuth": true,
            "allowOAuth2Auth": true,
            "allowUsernameAuth": true,
            "exceptEmailDomains": null,
            "manageRule": null,
            "minPasswordLength": 8,
            "onlyEmailDomains": null,
            "requireEmail": false
        }
    },
    {
        "id": "vbse1l0qet8z4hu",
        "name": "posts",
        "type": "base",
        "system": false,
        "schema": [
            {
                "id": "chnflxdo",
                "name": "title",
                "type": "text",
                "system": false,
                "required": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "id": "a0u9jwo7",
                "name": "body",
                "type": "text",
                "system": false,
                "required": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "id": "ny6krdw9",
                "name": "media",
                "type": "file",
                "system": false,
                "required": false,
                "unique": false,
                "options": {
                    "maxSelect": 1,
                    "maxSize": 5242880,
                    "mimeTypes": [
                        "image/jpg",
                        "image/jpeg",
                        "image/png",
                        "image/svg+xml",
                        "image/gif"
                    ],
                    "thumbs": []
                }
            },
            {
                "id": "ijbw4tgl",
                "name": "user",
                "type": "relation",
                "system": false,
                "required": true,
                "unique": false,
                "options": {
                    "maxSelect": 1,
                    "collectionId": "5sckr8a13top3zs",
                    "cascadeDelete": false
                }
            }
        ],
        "listRule": "@request.auth.id != ''",
        "viewRule": "@request.auth.id != ''",
        "createRule": "@request.auth.id = user",
        "updateRule": "@request.auth.id = user",
        "deleteRule": "@request.auth.id = user",
        "options": {}
    },
    {
        "id": "4wcaptlpivjve1o",
        "name": "reactions",
        "type": "base",
        "system": false,
        "schema": [
            {
                "id": "nyreyfss",
                "name": "post",
                "type": "relation",
                "system": false,
                "required": true,
                "unique": false,
                "options": {
                    "maxSelect": 1,
                    "collectionId": "vbse1l0qet8z4hu",
                    "cascadeDelete": true
                }
            },
            {
                "id": "sgwol8dx",
                "name": "user",
                "type": "relation",
                "system": false,
                "required": true,
                "unique": false,
                "options": {
                    "maxSelect": 1,
                    "collectionId": "5sckr8a13top3zs",
                    "cascadeDelete": false
                }
            },
            {
                "id": "iyckrxwp",
                "name": "liked",
                "type": "select",
                "system": false,
                "required": true,
                "unique": false,
                "options": {
                    "maxSelect": 1,
                    "values": [
                        "yes",
                        "no"
                    ]
                }
            }
        ],
        "listRule": "",
        "viewRule": "",
        "createRule": "@request.auth.id != \"\"",
        "updateRule": "@request.auth.id = user",
        "deleteRule": "@request.auth.id = user",
        "options": {}
    }
]
```
</details>

using the pocketbase js sdk we can query the posts collection to populate our timeline

```ts
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

...

// fetch a paginated records list
const resultList = await pb.collection('posts').getList(1, 50, {
    filter: 'created >= "2022-01-01 00:00:00" && someFiled1 != someField2',
});

// you can also fetch all records at once via getFullList
const records = await pb.collection('posts').getFullList(200 /* batch size */, {
    sort: '-created',
});

// or fetch only the first record that matches the specified filter
const record = await pb.collection('posts').getFirstListItem('someField="test"', {
    expand: 'relField1,relField2.subRelField',
});
```

pocketbase admin panel has an api preview feature which is one of the best in the baas offerings

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/412hj0g7i6vjce9r2bdj.png)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/aefct7oxlm4xpfidoeov.png)

but the return data doesn't give us allthe data at once 

```json
    {
      "id": "RECORD_ID",
      "collectionId": "vbse1l0qet8z4hu",
      "collectionName": "posts",
      "created": "2022-01-01 01:00:00.123Z",
      "updated": "2022-01-01 23:59:59.456Z",
      "title": "test",
      "body": "test",
      "media": "filename.jpg",
      "user": "RELATION_RECORD_ID"
    }
```
we do want to have the like count and information on whether the logged in user like the current post on first glance before clicking on te post to see the tweet details 

unfortunately server side aggregation aren.t currently supported in pocketbase but is in the pipeline so maybe in the future it will be
[discussion ](https://github.com/pocketbase/pocketbase/discussions/695#discussioncomment-3782500)
the [pocketbase discussions](https://github.com/pocketbase/pocketbase/discussions) are very helpfull

pocketbase does support expanding relations in an inner-join kind of way 

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sfd7g6s1up63dotl182p.png)

but that still won't satisfly oir needs so we'll have to go option 3 and open up pocketbase and use some of their exposed apis 



for this part we'll use pocketbase as a framework and make soe slight modifications to return our desired sape of data






### useful references

- [pocketbase discussions](https://github.com/pocketbase/pocketbase/discussions) 

