import { version } from '../../package.json';

export default {
  joinChats: [
    {
      name: 'ArcoDesign 用户群',
      id: '6659915789467910412',
    },
    {
      name: 'ArcoDesign 设计群',
      id: '6908243256979488771',
    },
  ],
  defaultVersion: version,
  loginHref: `/api/login?redirectUrl=${location.href}`,
  logoutHref: `/api/logout?redirectUrl=${location.href}`,
};
