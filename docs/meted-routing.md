# Nested routing

After changing up the backend layout and removing the replies table and just saving everything in the posts table with different depth levels to differentiate original posts from replies and also easily represent all the levels of nested replies

the initial request n the timeline will have null parent field and depth as 0

```sh
http://127.0.0.1:8090/custom_posts?id=undefined&depth=0&parent=&user=v7o41qltt4ttyy&created=YYYYescape+2023-01-16T06:47:26+03:00Z
```
 and the replies /sub replies will require a `parent`: the id of the post/reply t fetch replies for

 ```sh
 http://127.0.0.1:8090/custom_replies?id=undefined&depth=1&parent=1o599tvtue3ghwa&user=6wdrg4lavbr&created=YYYYescape+2023-01-16T06:47:26+03:00Z
 ``` 

we can now covert the routing strategy in this app is to have this little slice be responsible for all the posts , replies and sub replies


<details>
<summary> click to expand routes snippet</summary>

```ts
 return createBrowserRouter([
        {
          path: '/',
          element: <RootLayout user={user}  test_mode={test_mode}/>,
          // loader:userLoader(queryClient),
          errorElement: <ReactRouterError />,
          children: [
            { 
              element: <TimelineLayout user={user}/>,
              children:[
              {
                index:true,
                element:<Timeline user={user}/>
              }
            ]
            },
            {
              path: '/post',
              element: <PostLayout user={user} />,
              children: [
                {
                  path: ':id',
                  element: <Post user={user} />,
                  // loader: deferredBlogPostsLoader,
                },
              ],
            },]}
            ])
```
</details>

[complete routes.tsx](../src/routes.tsx)

The timeline component has a list of **posts** and clicking on one navigates you you to the post component with it's id as the query parameter and depth and search parameter

```ts
           {data?.pages?.map((page) => {
                return page.map((item) => {
                        return (<div
                        onClick={() => {
                            navigate({
                            pathname: 'post/' + item.post_id,
                            search: createSearchParams({
                                depth:(item.post_depth===""?0:item.post_depth).toString()
                            }).toString()
                                    })}
                                }
                        key={item.post_id}
                        className="w-[90%] md:w-[50%]  p-2 flex flex-col  border-black border-2 
                        dark:border-[1px]  dark:border-white rounded-lg gap-3">   
                        <PostsCard item={item}  user={user} />
                        </div>

                        )
                    })
```

> To like/comment on the post  without triggering the navigate event add a stop propagation to the parent with the click event to stop the event from propagating to the parent component

```ts
<div  onClick={(event) => event.stopPropagation()}>
        ....
</div>
```

The [Post.tsx](../src/pages/post/Post.tsx) component will fetch the posts and fetch all associated replies 

the depth searchParam and id queryParam will allow us to use this component recursively and open any clicked on reply as a post 

instinctively I tried using 

```ts
    navigate({
    pathname: 'post/' + item.post_id,
    search: createSearchParams({
    depth:(item.post_depth===""?0:item.post_depth).toString()
    }).toString()
    })
```
but in a result in a URL that looks like 

```sh
http://localhost:3000/post/0radtgd42swe3n8?depth=0/post/0radtdtdtdtn8?depth=1
```
 so we have to hop back a route and pass in a new id into the post `id param` to get it to work

 ```ts
 navigate({
pathname: '../' + item.post_id,
search: createSearchParams({
    depth: (item.post_depth === "" ? 0 : item.post_depth).toString()
    }).toString(),
    },
    )
 ```

To get 
```sh
http://localhost:3000/post/0radtdtdtdtn8?depth=1
```

