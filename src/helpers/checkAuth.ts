import axios from "axios";

const checkAuth = async (): Promise<boolean> => {
  const backendDomainName: string = "http://localhost:1500";
  try {
    console.log("before authing");
    const response = await axios.get(`${backendDomainName}/api/admin/me`, {
      withCredentials: true,
    });
    console.log(response, "is response data");
    if (response.status == 200) {
      return true;
    } else {
      console.log("no ok returning false");
      return false;
    }
  } catch (error) {
    console.log(error, "returning false");

    return false;
  }
};
export default checkAuth;
