
## the timeline
### extending pocketbase

useful references
- [OAUTH Authentication with pocketbase and react](https://dev.to/tigawanna/social-app-with-react-and-pocketbase-oauth-authentication-1nb7)
- [complete react code](https://github.com/tigawanna/devhub.git)
- [complete custom pocketbase code + built executable](https://github.com/tigawanna/devhub-backend.git)
- [pocketbase discussions](https://github.com/pocketbase/pocketbase/discussions) 


requirements for this part:
- a working environment with GO setup correctly 
- a SQL editor: in my case am using a 
[VSCODE extension](https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-database-client2) which is a database client for most databases , in our case we just need to give it our the path to the    `pb_data/data.db`  generated when we first start up our pocketbase



First we'll set up our pocketbase using the admin dashboard
>this can also be done using migrations , 
pocketbase is introducing JavaScript migrations using GOJA , 
but current migrations documentation is not very good so I didn't spend too much time on them and opted for direct SQL commands instead
 I'll leave the [repo link](https://github.com/tigawanna/devhub-backend.git) to the directory where I put all the experiments in . 

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

using the pocketbase JS SDK we can query the posts collection to populate our timeline

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

pocketbase admin panel has an API preview feature which is one of the best in the baas offerings

![pocketbase admin panel](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/412hj0g7i6vjce9r2bdj.png)

![pocketbase admin panel](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/aefct7oxlm4xpfidoeov.png)

but the return data doesn't give us all the data at once 

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
we do want to have the like count and information on whether the logged in user like the current post on first glance before clicking on the post to see the tweet details 

unfortunately server side aggregation isn't currently supported in pocketbase but is in the pipeline
[discussion ](https://github.com/pocketbase/pocketbase/discussions/695#discussioncomment-3782500)



pocketbase does support expanding relations in an inner-join kind of way 

![expanding relations](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sfd7g6s1up63dotl182p.png)

but that still won't satisfy our  needs so we'll have to go option 3 and open up pocketbase and use some of its exposed APIs 


for this part we'll use [pocketbase as a framework](https://pocketbase.io/docs/use-as-framework/) and make some slight modifications to return our desired shape of data


- step 1: clone the repo
```sh
git clone https://github.com/pocketbase/pocketbase.git
``` 

- step 2: open the `examples/base` directory
in it you'll have a main.go which you can use as the entry file to your new application



<details>
<summary>Click to expand main.go</summary>

```go

package main

import (
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/jsvm"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

func main() {
	app := pocketbase.New()

	// ---------------------------------------------------------------
	// Optional plugin flags:
	// ---------------------------------------------------------------

	var migrationsDir string
	app.RootCmd.PersistentFlags().StringVar(
		&migrationsDir,
		"migrationsDir",
		"",
		"the directory with the user defined migrations",
	)

	var automigrate bool
	app.RootCmd.PersistentFlags().BoolVar(
		&automigrate,
		"automigrate",
		true,
		"enable/disable auto migrations",
	)

	var publicDir string
	app.RootCmd.PersistentFlags().StringVar(
		&publicDir,
		"publicDir",
		defaultPublicDir(),
		"the directory to serve static files",
	)

	var indexFallback bool
	app.RootCmd.PersistentFlags().BoolVar(
		&indexFallback,
		"indexFallback",
		true,
		"fallback the request to index.html on missing static path (eg. when pretty urls are used with SPA)",
	)

	app.RootCmd.ParseFlags(os.Args[1:])

	// ---------------------------------------------------------------
	// Plugins and hooks:
	// ---------------------------------------------------------------

	// load js pb_migrations
	jsvm.MustRegisterMigrations(app, &jsvm.MigrationsOptions{
		Dir: migrationsDir,
	})

	// migrate command (with js templates)
	migratecmd.MustRegister(app, app.RootCmd, &migratecmd.Options{
		TemplateLang: migratecmd.TemplateLangJS,
		Automigrate:  automigrate,
		Dir:          migrationsDir,
	})

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		// serves static files from the provided public dir (if exists)
		e.Router.GET("/*", apis.StaticDirectoryHandler(os.DirFS(publicDir), indexFallback))
		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

// the default pb_public dir location is relative to the executable
func defaultPublicDir() string {
	if strings.HasPrefix(os.Args[0], os.TempDir()) {
		// most likely ran with go run
		return "./pb_public"
	}
	return filepath.Join(os.Args[0], "../pb_public")
}
```
</details>


at this point you can run 
```go
go run main.go serve
```

to output your custom pocketbase app
the pocketbase CLI and  dashboard will still work as expected but you can also extend some of the logic



for readability and maintainability I copied it out of there into a new directory and ran

```go
go mod init
go mod tidy
```


to setup the package enabling us to break up our logic into smaller packages living in their own files


our data models would look something like this

```json
devs
   {
      "id": "RECORD_ID",
    //   "collectionId": "5sckr8a13top3zs",
    //   "collectionName": "devs",
    //   "created": "2022-01-01 01:00:00.123Z",
    //   "updated": "2022-01-01 23:59:59.456Z",
      "username": "username123",
      "verified": false,
      "emailVisibility": true,
      "email": "test@example.com",
      "avatar": "https://example.com",
      "accessToken": "test",
      "displayname": "test"
    },
```

```json
posts
    {
      "id": "RECORD_ID",
    //   "collectionId": "vbse1l0qet8z4hu",
    //   "collectionName": "posts",
    //   "created": "2022-01-01 01:00:00.123Z",
    //   "updated": "2022-01-01 23:59:59.456Z",
      "title": "test",
      "body": "test",
      "media": "filename.jpg",
      "user": "RELATION_RECORD_ID"
    },
```

```json
reactions
    {
      "id": "RECORD_ID",
    //   "collectionId": "4wcaptlpivjve1o",
    //   "collectionName": "reactions",
    //   "created": "2022-01-01 01:00:00.123Z",
    //   "updated": "2022-01-01 23:59:59.456Z",
      "post": "RELATION_RECORD_ID",
      "user": "RELATION_RECORD_ID",
      "liked": "yes"
    },
```

So our first step would be to make sure only one reaction (like) per user is allowed 
the possible states will be 
- yes if the user likes a post
- no if the user unlikes a post
- virgin if the user hasn't liked the post meaning his user_id + post_id combination doesn't exist in the reactions table 

to avoid multiple likes by the same user to the same post we can add a unique index on the table 
using the migration by running 
```go
go run *.go migrate create 'reaction_user_post_idx'   
```
then replace the generated file contents inside `pb_migrations` with the below and it will be applied you restart pocketbase
```js
migrate((db) => {
  // add up queries...
  db.createUniqueIndex(
    'reactions',
    'reaction_user_post_idx',
    'user',
    'post'
  ).execute();
}, (db) => {
  // add down queries...
  db.dropIndex('reactions', 'reaction_user_post_idx').execute();
});
```

with that we can extend the router and add a custom route , I called mine `custom_posts`

1nside main.go
```go
	// ---------------------------------------------------------------
	// Plugins and hooks:
	// ---------------------------------------------------------------
	// Define the custom post route
	customPostRoute := CustomPostRoute(app)
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.AddRoute(customPostRoute)

		return nil
	})

```

inside posts.go

<details>
<summary>Click to expand posts.go</summary>

```go
package main

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
)

// CustomPostRoute defines the HTTP route for getting custom posts
func CustomPostRoute(app *pocketbase.PocketBase) echo.Route {
	return echo.Route{
		Method: http.MethodGet,
		Path:   "/custom_posts",
		Handler: func(c echo.Context) error {
			result := []*struct {
				CreatorId    string `db:"creator_id" json:"creator_id"`
				CreatorName  string `db:"creator_name" json:"creator_name"`
				CreatorImage string `db:"creator_image" json:"creator_image"`
				PostId       string `db:"post_id" json:"post_id"`
				PostBody     string `db:"post_body" json:"post_body"`
				PostMedia    string `db:"post_media" json:"post_media"`
				CreatedAT    string `db:"created_at" json:"created_at"`
				Likes        int    `db:"likes" json:"likes"`
				MyLike       string `db:"mylike" json:"mylike"`
				ReactionId   string `db:"reaction_id" json:"reaction_id"`
			}{}
			queryErr := app.Dao().DB().NewQuery(` 
SELECT 

pp.user creator_id,
dv.username creator_name,
dv.avatar creator_image,
pp.id post_id,
pp.body post_body,
pp.media post_media,
pp.created created_at,

(SELECT COUNT(*) FROM reactions WHERE liked = 'yes' AND post = pp.id) likes,
IFNULL((SELECT  liked FROM reactions WHERE user = {:user} AND post = pp.id),'virgin')mylike,
IFNULL((SELECT id FROM reactions WHERE user = {:user} AND post = pp.id),"virgin") reaction_id
FROM posts pp
LEFT JOIN devs dv on dv.id = pp.user
WHERE (pp.created < {:created} OR (pp.created = {:created} AND pp.id < {:id}))
ORDER BY pp.created DESC, pp.id DESC
LIMIT 10
							
`).Bind(dbx.Params{"user": c.QueryParam("user"), "id": c.QueryParam("id"), "created": c.QueryParam("created")}).All(&result)
			if queryErr != nil {
				fmt.Print("\n")
				return apis.NewBadRequestError("Failed to fetch custom posts ", queryErr)
			}
			return c.JSON(200, result)
		},
		Middlewares: []echo.MiddlewareFunc{apis.ActivityLogger(app)},
		Name:        "",
	}
}

```

</details>

that SQL is probably not the best neither is the GO code since am not an expert on neither but it gives me the expected results 
when we run our pocketbase and hit the `/custom_posts` endpoint

![custom posts endpoint](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hfm9dvemap4ipi7k0oxa.png)
btw that's the thunder client VSCODE extension that am using as my REST client



|query parameter|description|
|----------------|----------|
| user | logged in user id |
|id | record id 
| created   | SQLite date format  |


The initial request requires 
`user`: the logged in user id and `created`: the latest date the rest can be sent as empty strings 
```js
const currentdate = dayjs(new Date()).format("[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]")
```
the subsequent requests will  need `id`: the last record id in the previous request

At this point we can run 
```go
go build  *.go -o pocketbase 
```
and get our custom backend in one executable executable 

you can also use [a build script](https://github.com/tigawanna/devhub-backend/blob/master/builder)

to build a Linux and windows executable

### react part
now that we have an endpoint we can create a timeline route
and `useInfiniteQuery` to get our data

<details>
<summary>Click to expand useInfiniteQuery custom hook</summary>

```ts
custom hook

import dayjs from "dayjs";
import { pb_url } from "../../utils/env";
import { PBUser } from "../../utils/types/types";
import { UseInfiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

interface PaginationDeps {
    pageParam: {
        created: string;
        id: string;
    };
}

export const useInfiniteCustom = <T>(
    key: string,
    user: PBUser,
    options?:
        | Omit<UseInfiniteQueryOptions<T[], unknown, T[], T[], string[]>, "queryKey" | "queryFn">
        | undefined
) => {
    // custom-posts uses a where clause to paginate and needs the current
    //date formatted in sqlite date format as the starting point
    const currentdate = dayjs(new Date()).format("[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]");

    const fetchPosts = async (deps?: Partial<PaginationDeps>) => {
        // console.log("page params dependaces === ", deps, deps.pageParam?.id)
        const url = `${pb_url}/custom_posts/?id=${deps?.pageParam?.id ?? ""}&user=${
        user?.id ?? ""}&created=${deps?.pageParam?.created ?? currentdate}`;
        let headersList = {
            Accept: "*/*"
        };
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: headersList
            });
            const data = await response.json();
            console.log("response === ", data);
            if (data.code === 400) {
                throw new Error(data.message);
            }
            return data;
        } catch (e: any) {
            console.log("error fetching custom ", e);
            throw new Error(e.message);
        }
    };

   return useInfiniteQuery<T[], unknown, T[], string[]>(
        [key],
        fetchPosts,
        options
    );


};


```
</details>




then call it on our timeline component
<details>
<summary>Click to expand timeline.tsx </summary>

```ts
import React from 'react'
import { CustomPostType, PBUser } from '../../utils/types/types';
import { useInView } from 'react-intersection-observer'
import { useInfiniteCustom } from '../../shared/hooks/useInfiniteCustom';
import { QueryStateWrapper } from './../../shared/wrappers/QueryStateWrapper';
import { FaPlus } from 'react-icons/fa';
import { TheIcon } from '../../shared/wrappers/TheIcon';
import { PostsCard } from './../../components/timeline/PostCard';
import { PostForm } from './../../components/timeline/PostForm';
import { ReactModalWrapper } from './../../shared/wrappers/ReactModalWrapper';
interface TimelineProps {
    user: PBUser
}

export const Timeline = ({user}: TimelineProps) => {
const { ref, inView } = useInView()
const [isOpen, setIsOpen] = React.useState(false);
    
const customPostsQuery = useInfiniteCustom<CustomPostType>('custom-posts',user,{
    getNextPageParam: (lastPage, allPages) => {
        // console.log("last page ==== ",lastPage,allPages)
        if (lastPage && lastPage[lastPage.length - 1]) {
            return {
             created: lastPage[lastPage?.length - 1]?.created_at,
             id: lastPage[lastPage?.length - 1]?.post_id
            };
        }
        return;
    }
})

 React.useEffect(() => {
    if (inView) {
        customPostsQuery.fetchNextPage()
    }
}, [inView])

const data = customPostsQuery.data
// console.log("custom query === ",data)
return (
<QueryStateWrapper query={customPostsQuery}>
    <div className='w-full min-h-full  flex flex-col gap-2 items-center justify-center'>
        <div className='w-[95%] h-full flex flex-col items-center justify-center gap-2 py-2'>
            {data?.pages.map((page) => {
                    // console.log("page=== ",page)
                    return page.map((item) => {
                        return <PostsCard item={item} key={item.post_id} user={user} />
                    })
                  
                })
                }
        </div>

    <div className='w-fit h-fit p-2 bg-slate-500 text-white rounded-full fixed bottom-[10%] right-[5%]'>
            <TheIcon Icon={FaPlus} size={'40'} iconAction={() => setIsOpen(true)} />
        </div>
        
            <ReactModalWrapper
                child={
                <PostForm user={user} setIsOpen={setIsOpen} />}
                closeModal={() => setIsOpen(false)}
                delay={2}
                isOpen={isOpen}
                styles={{
                    overlay_top: '0%',
                    overlay_right: '0%',
                    overlay_left: '0%',
                    overlay_bottom: '0%',
                    content_bottom: '2%',
                    content_right: '2%',
                    content_left: '2%',
                    content_top: '2%'

                }}/>

            <div>
        <button ref={ref}
            onClick={() => customPostsQuery.fetchNextPage()}
            disabled={!customPostsQuery.hasNextPage || customPostsQuery.isFetchingNextPage}>
                {customPostsQuery.isFetchingNextPage ? 'Loading more...': customPostsQuery.hasNextPage ? 'Load More'
                : !customPostsQuery.isLoading ? 'Nothing more to load' : null}</button>
            </div>

        </div>
    </QueryStateWrapper>
);
}

```

</details>




### useful references
- [complete react code](https://github.com/tigawanna/devhub.git)
- [complete custom pocketbase code + built executable](https://github.com/tigawanna/devhub-backend.git)
- [pocketbase discussions](https://github.com/pocketbase/pocketbase/discussions) 
- [article](https://dev.to/tigawanna/social-media-timeline-with-pocketbase-and-react-4h81)
