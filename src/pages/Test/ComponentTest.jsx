import { FaUser } from "react-icons/fa6";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useUI } from "../../context/UIContext";
import { FaEnvelope } from "react-icons/fa6";

export default function ComponentTest() {
  const { notify } = useUI();

  const handleClick = () => {
    notify.success("Button clicked!");
  };

  return (
    <div className="flex flex-col w-[100] min-h-[100vh] items-center justify-center">
      <h1 className="text-text font-bold text-2xl ">Component Test Page</h1>
      <div className="flex flex-col gap-3 p-6">
        <Button onClick={handleClick}>Primary Button</Button>
        <Button onClick={handleClick} variant="secondary">
          Secondary Button
        </Button>
        <Button onClick={handleClick} variant="outline_primary">
          Outline Primary Button
        </Button>
        <Button onClick={handleClick} variant="outline_secondary">
          Outline Secondary Button
        </Button>
        <Button disabled variant="primary">
          Disabled Button
        </Button>
        <Input type="text" placeholder="Enter text" icon={FaUser} />
        <Input type="password" placeholder="Enter password" />
        <Input type="email" placeholder="Enter email" icon={FaEnvelope} />
      </div>
    </div>
  );
}
