export const messageCode = () => {
  return {
    '-1': {
      'type': 3,
      'message': '系统错误，操作失败'
    },
    '403': {
      'type': 4,
      'message': '权限不足!'
    },
    '401': {
      'type': 5,
      'message': '请重新登录!'
    },
    '406': {
      'type': 6,
      'message': '请稍后重试!'
    }
  };
};
