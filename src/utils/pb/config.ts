import PocketBase from "pocketbase";
import { pb_url } from './../env';
import { QueryClient } from "@tanstack/react-query";

export const client = new PocketBase(
pb_url
);

export const providers = await client.collection("devs").listAuthMethods()



export const getUser = async () => {
  return await client.authStore.model;
};








export const realTime = async (
  index: [string],
  queryClient: QueryClient
) => {
  return await client.realtime.subscribe(
    index[0],
    function (e) {
      console.log(
        "new real time response",
        e.record
      );
      appendToCache(index, queryClient, e.record);

      //    queryClient.setQueryData(["peeps", { id: e.record.id }], e.record);
    }
  );
};

export const appendToCache = async (
  index: [string],
  queryClient: QueryClient,
  newData: any
) => {
  queryClient.setQueryData(index, (old: any) => {
    // console.log("old to be unshifted === ",old)
    //     console.log(" new data === ",newData)
    if (old) {
      old.items.unshift(newData);
      return old;
    }
    return newData;
  });
};

export const getPrevdata = (
  index: [string],
  queryClient: QueryClient
) => {
  const previous =
    queryClient.getQueryData(index);
  // console.log("previous items", previous);
};

export const makeUrl = (
  coll_name: string,
  coll_id: string,
  media: string
) => {
  if (media) {
    return `${pb_url}/api/files/${coll_name}/${coll_id}/${media}`;
  }
  return;
};
