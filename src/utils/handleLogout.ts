export const handleLogout = (navigate: any) => {
  localStorage.removeItem('token');
  navigate('/');
};
