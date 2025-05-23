import axios from "axios";
export interface UserType {
  id: number;
  name: string;
  phone_one: string;
  phone_two?: string | null;
  email?: string | null;
  address_one?: string | null;
  address_two?: string | null;
  role: "user" | string;
  account_status: "active" | string;
  points: number;
  login_code?: string | null;
  password_hash: string;
  is_active: string;
  created_at: string; // or Date, depending on usage
  updated_at: string; // or Date, depending on usage
}

export interface ReturnType {
  status: boolean;
  data: UserType | undefined;
}
const checkAuth = async (): Promise<ReturnType> => {
  const backendDomainName: string = "http://localhost:1500";
  try {
    console.log("before authing");
    const response = await axios.get(`${backendDomainName}/api/admin/me`, {
      withCredentials: true,
    });
    console.log(response, "is response data");
    if (response.status == 200) {
      return { status: true, data: response.data.data };
    } else {
      console.log("no ok returning false");
      return false;
    }
  } catch (error) {
    console.log(error, "returning false");

    return {
      status: false,
      data: undefined,
    };
  }
};
export default checkAuth;
