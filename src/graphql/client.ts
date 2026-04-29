import { ApolloClient, InMemoryCache, ApolloLink, Observable } from '@apollo/client';
import { mockImages } from './mockData';

const mockLink = new ApolloLink((operation) => {
  return new Observable((observer) => {
    setTimeout(() => {
      if (operation.operationName === 'GetImages') {
        observer.next({
          data: {
            images: mockImages,
          },
        });
      } else {
        observer.next({ data: null });
      }
      observer.complete();
    }, 800);
  });
});

export const client = new ApolloClient({
  link: mockLink,
  cache: new InMemoryCache(),
});
