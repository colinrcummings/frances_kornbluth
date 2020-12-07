import { adapter } from './utils';
import { ICollectionGoogleSheetRow, ICollectionRecord } from '../types';

const deserializeCollection = (
  entry: ICollectionGoogleSheetRow[]
): ICollectionRecord[] =>
  entry.map(({ gsx$id, gsx$name, gsx$minimgurl }) => ({
    id: Number(gsx$id.$t),
    name: gsx$name.$t ? gsx$name.$t : 'Untitled',
    img: gsx$minimgurl.$t,
  }));

export const getCollection = async (): Promise<any> => {
  try {
    const response = await adapter.get(
      '/list/1IzGaO3pLokvuiuKkS2UccK4KuYvnQwM-osJf3WfciJU/1/public/full?alt=json'
    );
    return deserializeCollection(response.data.feed.entry);
  } catch (error) {
    throw new Error('Error fetching collection');
  }
};
