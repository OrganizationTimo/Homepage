import { useRef } from "react";
import Authentication from "./components/Authentication";
import { MdAlternateEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { CiUser } from "react-icons/ci";

export default function RegisterPage() {
  const emailRef = useRef<string | null>(null);
  const usernameRef = useRef<string | null>(null);
  const passwordRef = useRef<string | null>(null);
  const confirmPasswordRef = useRef<string | null>(null);

  return (
    <Authentication
      pageHeader="Register your Account!"
      inputFields={[
        {
          ref: emailRef,
          payloadKey: "email",
          icon: <MdAlternateEmail />,
          placeholder: "Enter e-mail address",
          type: "email",
        },
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
        {
          ref: confirmPasswordRef,
          payloadKey: "confirmPassword",
          icon: <MdOutlinePassword />,
          placeholder: "Enter password again",
          type: "password",
        },
      ]}
      requestUrl="/api/user/register"
      buttonName={"Register"}
      hyperLinkText={[{ text: "Already have an account?", link: "/login" }]}
    />
  );
}
