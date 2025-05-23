import { useSelector } from 'react-redux';

function UserName() {
  const userInfo = useSelector((state) => state.user.userInfo);
  if (!userInfo) return null;
  return <span>{userInfo.userName}</span>;
}

export default UserName;
