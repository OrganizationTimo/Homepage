import { useRef } from "react";
import Authentication from "./components/Authentication";
import { MdAlternateEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";

export default function RegisterPage() {
  const emailRef = useRef<string | null>(null);
  const passwordRef = useRef<string | null>(null);
  const confirmPasswordRef = useRef<string | null>(null);

  return (
    <Authentication
      pageHeader="Register your Account!"
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
        {
          ref: confirmPasswordRef,
          icon: <MdOutlinePassword />,
          placeholder: "Enter password again",
          type: "password",
        },
      ]}
      buttonName={"Register"}
      hyperLinkText={[{ text: "Already have an account", link: "/login" }]}
    />
  );
}
