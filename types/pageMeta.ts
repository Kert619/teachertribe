export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: [
    {
      url: string;
      label: string;
      active: boolean;
    }[]
  ];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Links {
  first: string;
  last: string;
  prev: string;
  next: string;
}
