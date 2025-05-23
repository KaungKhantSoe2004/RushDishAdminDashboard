import axios from "axios";

const logout = async (): Promise<boolean> => {
  const backendDomainName: string = "http://localhost:1500";
  const response = await axios.get(`${backendDomainName}/api/admin/logout`, {
    withCredentials: true,
  });
  if (response.status == 200) {
    return true;
  } else {
    return false;
  }
};
export default logout;
