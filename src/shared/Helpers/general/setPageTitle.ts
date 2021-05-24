import { PROJECT_TITLE } from '@/shared/files/consts';

/**
 * setPageTitle
 * @param { string } pageTitle
 */

const setPageTitle = (pageTitle: string): void => {
  document.title = `${PROJECT_TITLE} | ${pageTitle}`;
};

export default setPageTitle;
