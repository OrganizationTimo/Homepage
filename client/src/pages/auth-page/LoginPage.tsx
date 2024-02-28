import { useRef } from "react";
import Authentication from "./components/Authentication";
import { MdOutlinePassword } from "react-icons/md";
import { CiUser } from "react-icons/ci";
export default function LoginPage() {
  const usernameRef = useRef<string | null>(null);
  const passwordRef = useRef<string | null>(null);

  return (
    <Authentication
      pageHeader="Login to your Account!"
      inputFields={[
        {
          ref: usernameRef,
          payloadKey: "username",
          icon: <CiUser />,
          placeholder: "Enter username",
          type: "text",
        },
        {
          ref: passwordRef,
          payloadKey: "password",
          icon: <MdOutlinePassword />,
          placeholder: "Enter password",
          type: "password",
        },
      ]}
      requestUrl="/api/user/login"
      buttonName={"Login"}
      hyperLinkText={[
        { text: "Forgot credentials?", link: "" },
        { text: "Don't have an account?", link: "/register" },
      ]}
    />
  );
}
