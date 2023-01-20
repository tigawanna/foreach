/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
import PocketBase from 'pocketbase';
import { QueryClient } from '@tanstack/react-query';
import { pb_url } from '../env';

export const client = new PocketBase(pb_url);

export const getProviders =async()=> await client.collection('devs').listAuthMethods();

export const getUser = async () => client.authStore.model;

export const appendToCache = async (
  index: [string],
  queryClient: QueryClient,
  newData: unknown
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryClient.setQueryData(index, (old: any) => {
    // //no-console("old to be unshifted === ",old)
    //     //no-console(" new data === ",newData)
    if (old) {
      old.items.unshift(newData);
      return old;
    }
    return newData;
  });
};

export const makeUrl = (coll_name: string, coll_id: string, media: string) => {
  if (media) {
    return `${pb_url}/api/files/${coll_name}/${coll_id}/${media}`;
  }
};

export const realTime = async (index: [string], queryClient: QueryClient) =>
  client.realtime.subscribe(index[0], (e) => {
    //no-console('new real time response', e.record);
    appendToCache(index, queryClient, e.record);

    //    queryClient.setQueryData(["peeps", { id: e.record.id }], e.record);
  });
