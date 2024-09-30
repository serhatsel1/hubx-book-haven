export interface BookData {
  title: string;
  author: { name: string; country: string; birthDate: string };
  price: number;
  isbn: string;
  language: string;
  numberOfPages: number;
  publisher: string;
}
export interface CreateBookInput {
  title: string;
  author: { name: string; country: string; birthDate: string };
  price: number;
  language: string;
  numberOfPages: number;
  publisher: string;
  isbn: string;
}
export interface UpdateBookInput {
  id: string;
  title?: string;
  author?: { name: string; country: string; birthDate: string };
  price?: number;
  isbn?: string;
  language?: string;
  numberOfPages?: number;
  publisher?: string;
}
export interface DeleteBookInput {
  id: string;
}
