type $T<T = string> = {
  $t: T;
};

export enum Status {
  Available = 'Available',
  Private = 'Private',
  Public = 'Public',
  Unknown = 'Unknown',
}

export interface ICollectionRecord {
  id: number;
  title: string;
  minImgSrc: string;
  year: number | null;
  medium: string;
  dimensions: string | null;
  status: Status;
  holder: string | null;
}

export interface ISerializedCollectionRecord {
  gsx$showonwebsite: $T;
  gsx$id: $T;
  gsx$title: $T;
  gsx$minimgsrc: $T;
  gsx$year: $T;
  gsx$medium: $T;
  gsx$dimensions: $T;
  gsx$status: $T<Status>;
  gsx$holder: $T;
}
