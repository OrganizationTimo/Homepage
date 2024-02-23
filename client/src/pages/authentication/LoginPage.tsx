import { useRef } from "react";
import Authentication from "./components/Authentication";
import { MdAlternateEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";

export default function LoginPage() {
  const emailRef = useRef<string | null>(null);
  const passwordRef = useRef<string | null>(null);

  return (
    <Authentication
      pageHeader="Login to your Account!"
      inputFields={[
        {
          ref: emailRef,
          icon: <MdAlternateEmail />,
          placeholder: "Enter e-mail address",
          type: "email",
        },
        {
          ref: passwordRef,
          icon: <MdOutlinePassword />,
          placeholder: "Enter password",
          type: "password",
        },
      ]}
      buttonName={"Login"}
      hyperLinkText={[
        { text: "Forgot credentials?", link: "" },
        { text: "Don't have an account?", link: "/register" },
      ]}
    />
  );
}
