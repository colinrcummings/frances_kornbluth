export enum Decade {
  // label = value
  '1950s' = '1950s',
  '1960s' = '1960s',
  '1970s' = '1970s',
  '1980s' = '1980s',
  '1990s' = '1990s',
  '2000s' = '2000s',
  '2010s' = '2010s',
  Unknown = 'Unknown',
}

export enum MediumGroup {
  Acrylic = 'Acrylic',
  Charcoal = 'Charcoal',
  Collage = 'Collage',
  Ink = 'Ink',
  'Mixed Media' = 'MixedMedia',
  Monotype = 'Monotype',
  Oil = 'Oil',
  Pastel = 'Pastel',
  Watercolor = 'Watercolor',
  Unknown = 'Unknown',
}

export enum SizeGroup {
  'Very Small' = 'VerySmall',
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  'Very Large' = 'VeryLarge',
  Unknown = 'Unknown',
}

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
  decade: Decade;
  medium: string;
  mediumGroup: MediumGroup;
  dimensions: string | null;
  sizeGroup: SizeGroup;
  status: Status;
  holder: string | null;
}

type $T<T = string> = {
  $t: T;
};

export interface ISerializedCollectionRecord {
  gsx$showonwebsite: $T;
  gsx$id: $T;
  gsx$title: $T;
  gsx$minimgsrc: $T;
  gsx$year: $T;
  gsx$decade: $T;
  gsx$medium: $T;
  gsx$dimensions: $T;
  gsx$status: $T<Status>;
  gsx$holder: $T;
}
