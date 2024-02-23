import { HTMLInputTypeAttribute, MutableRefObject, ReactElement } from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

type inputFieldsType = {
  ref: MutableRefObject<string | null>;
  icon: ReactElement<IconType>;
  placeholder: string;
  type: HTMLInputTypeAttribute | undefined;
};

type AuthenticationProps = {
  pageHeader: string;
  inputFields: inputFieldsType[];
  buttonName: string;
  hyperLinkText: { text: string; link: string }[];
};

export default function Authentication({
  pageHeader,
  inputFields,
  buttonName,
  hyperLinkText,
}: AuthenticationProps) {
  return (
    <div className="w-full h-screen bg-fourth flex justify-center items-center">
      <form className="bg-primary w-96 min-h-min py-10 rounded-md">
        <h1 className="text-center text-4xl text-white font-bold px-10 h-1/4">
          {pageHeader}
        </h1>
        <div className="w-full h-3/4 bg-primary rounded-md flex flex-col justify-start items-center gap-5 px-10 pt-10">
          {inputFields.map((inputField, index) => {
            return (
              <div
                key={index}
                className="bg-secondary gap-2.5 w-full h-10 rounded-md flex justify-center items-center"
              >
                <div className="text-white">{inputField.icon}</div>

                <input
                  className="h-full rounded-md bg-secondary outline-none text-white"
                  defaultValue={inputField.ref.current?.toString()}
                  placeholder={inputField.placeholder}
                  type={inputField.type}
                  onChange={(e) => {
                    inputField.ref.current = e.target.value;
                  }}
                />
              </div>
            );
          })}
          <button className="w-3/4 h-10 bg-third text-white font-bold text-lg rounded-md mt-2.5">
            {buttonName}
          </button>
          <div className="flex gap-1.5 flex-col items-center">
            {hyperLinkText?.map((link, index) => {
              return (
                <Link
                  key={index}
                  to={link.link}
                  className="text-white underline-offset-4 underline"
                >
                  {link.text}
                </Link>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
}
