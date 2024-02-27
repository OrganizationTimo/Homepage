import {
  HTMLInputTypeAttribute,
  MutableRefObject,
  ReactElement,
  useState,
} from "react";
import { IconType } from "react-icons";
import { Link, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../../utils/baseUrl";
import axios, { AxiosError } from "axios";

type inputFieldsType = {
  ref: MutableRefObject<string | null>;
  payloadKey: string;
  icon: ReactElement<IconType>;
  placeholder: string;
  type: HTMLInputTypeAttribute | undefined;
};

type AuthenticationProps = {
  pageHeader: string;
  inputFields: inputFieldsType[];
  buttonName: string;
  hyperLinkText: { text: string; link: string }[];
  requestUrl: string;
};

export default function Authentication({
  pageHeader,
  inputFields,
  buttonName,
  hyperLinkText,
  requestUrl,
}: AuthenticationProps) {
  const [error, setError] = useState<{
    errorMessage?: string;
    errorStatus: boolean;
  }>({ errorMessage: "", errorStatus: false });

  const navigation = useNavigate();

  async function sendRequest(e: { preventDefault: () => void }) {
    e.preventDefault();

    type payloadType = {
      [key: string]: string | null;
    };
    const payload: payloadType = {};

    inputFields.forEach((inputField) => {
      payload[inputField.payloadKey] = inputField.ref.current;
    });

    console.log(payload);

    try {
      const response = await axios.post(apiBaseUrl + requestUrl, payload);
      console.log(response.data);
      localStorage.setItem("token", response.data.token);

      navigation("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err);
        setError({
          errorMessage: err?.response?.data.message,
          errorStatus: true,
        });
      }
    }
  }

  return (
    <div className="w-full h-screen bg-fourth flex justify-center items-center dark:bg-primary">
      <form
        className="bg-primary min-w-80 max-w-96 min-h-min py-10 mx-10 rounded-md dark:bg-fourth"
        onSubmit={sendRequest}
      >
        <h1 className="text-center text-4xl text-white font-bold px-10 h-1/4 dark:text-black">
          {pageHeader}
        </h1>
        <div className="w-full h-3/4 bg-primary rounded-md flex flex-col justify-start items-center gap-5 px-5 pt-10 dark:bg-fourth">
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
                    setError({ errorStatus: false });
                    inputField.ref.current = e.target.value;
                  }}
                />
              </div>
            );
          })}
          <button
            className="w-3/4 h-10 bg-third text-white font-bold text-lg rounded-md mt-2.5 hover:bg-opacity-75 transition-colors"
            type="submit"
          >
            {buttonName}
          </button>
          {error?.errorStatus && (
            <p className="text-red-500">{error?.errorMessage}</p>
          )}
          <div className="flex gap-1.5 flex-col items-center">
            {hyperLinkText?.map((link, index) => {
              return (
                <Link
                  key={index}
                  to={link.link}
                  className="text-white underline-offset-4 underline hover:text-gray-300 hover:bg-opacity-75 transition-colors dark:text-black dark:hover:text-gray-400"
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
