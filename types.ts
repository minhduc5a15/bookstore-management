export interface Book {
    title: string;
    subtitle?: string;
    id: string;
    authors: string[];
    publisher: string;
    description: string;
    categories: string[];
    pageCount?: number;
    imageLinks: {
        smallThumbnail: string;
        thumbnail: string;
    };
    language: string;
    price: string; // dollar
    publishedDate: string;
}