import axios from "axios";

const logout = async (): Promise<void> => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "token"
        )}`,
      },
    }
  );
};

export default logout;
