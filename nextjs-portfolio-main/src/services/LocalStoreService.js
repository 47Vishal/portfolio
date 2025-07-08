const LocalStoreToken = (value) => {
  if (typeof window !== 'undefined' && value) {
    console.log('Store Token');
    const { access, refresh } = value;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }
};

const getToken = () => {
  if (typeof window !== 'undefined') {
    let access_token = localStorage.getItem('access_token');
    let refresh_token = localStorage.getItem('refresh_token');
    return { access_token, refresh_token };
  }
  return { access_token: null, refresh_token: null };
};

const remove_Token = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};

export { LocalStoreToken, remove_Token, getToken };
