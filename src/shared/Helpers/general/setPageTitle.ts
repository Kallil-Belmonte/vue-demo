import { PROJECT_TITLE } from '@/shared/files/consts';

/**
 * setPageTitle
 * @param { string } title
 */

const setPageTitle = (title: string): void => {
  document.title = `${PROJECT_TITLE} | ${title}`;
};

export default setPageTitle;
