import fetch from '@/config/fetch';

/**
 * 登陆
 */

export const login = data => fetch('/mapi/shiro/login?phone=' + data.user_name + '&password=' + data.password, '', 'POST');

/**
 * 退出
 */

export const signout = () => fetch('/admin/singout');

/**
 * 管理员列表
 */

export const adminList = data => fetch('/admin/all', data);
