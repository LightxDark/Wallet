import { NextRouter } from 'next/router';

export const redirectToPage = (router: NextRouter, page: string): void => {
  router.push(page);
};