export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface FilterSearchProps {
  page?: number;
  limit?: number;
  breed?: string[];
  zip_code?: string[];
}
