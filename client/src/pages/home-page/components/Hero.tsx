import { Button } from "../../../components/Button";

export default function Hero() {
  return (
    <div className="w-full h-screen flex flex-row justify-around items-center px-5 gap-5">
      <div className="text-4xl font-bold flex flex-col gap-5">
        Hi 👋, I'm a
        <span className="bg-third px-5 py-1 rounded-md text-white">
          Computer Science Student
        </span>
        and a
        <span className="bg-third px-5 py-1 rounded-md text-white w-max">
          Software Engineer.
        </span>
        <div className="flex flex-row gap-5">
          <Button
            buttonName={"My CV"}
            className={"bg-secondary text-2xl px-5 py-2 text-white rounded-md"}
          />
          <Button
            buttonName={"Blogs"}
            className={"bg-secondary text-2xl px-5 py-2 text-white rounded-md"}
            to={"/blogs"}
          />
        </div>
      </div>
      <div>[IMAGE]</div>
    </div>
  );
}
