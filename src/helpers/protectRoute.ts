import checkAuth, { type UserType } from "./checkAuth";

const ProtectRoute = async () => {
  const result = await checkAuth();
  const tokenStatus: boolean = result.status;
  const myUserData: UserType | undefined = result.data;
  if (myUserData != undefined && myUserData.role !== "admin") {
    return false;
  }
  if (!tokenStatus) {
    return false;
  }
  return true;
};
export default ProtectRoute;
