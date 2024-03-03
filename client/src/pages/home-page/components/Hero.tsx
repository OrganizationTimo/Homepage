import { Button } from "../../../components/Button";

export default function Hero() {
  return (
    <div className="w-full h-screen flex flex-row justify-around items-center px-5 gap-5">
      <div className="text-1xl font-bold flex flex-col gap-5 lg:text-4xl">
        <p className="text-black dark:text-white">Hi 👋, I'm a</p>
        <span className="bg-third px-5 py-1 rounded-md text-white">
          Computer Science Student
        </span>
        <p className="text-black dark:text-white"> and a</p>
        <span className="bg-third px-5 py-1 rounded-md text-white w-max">
          Software Engineer.
        </span>
        <div className="flex flex-row gap-5">
          <Button
            buttonName={"My CV"}
            className={
              "bg-secondary text-lg px-5 py-2 text-white rounded-md lg:text-2xl dark:bg-fourth dark:text-black"
            }
          />
          <Button
            buttonName={"Blogs"}
            className={
              "bg-secondary text-lg px-5 py-2 text-white rounded-md lg:text-2xl dark:bg-fourth dark:text-black"
            }
            to={"/blogs"}
          />
        </div>
      </div>
      <div>[IMAGE]</div>
    </div>
  );
}
