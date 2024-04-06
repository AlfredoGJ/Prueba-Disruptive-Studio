import { useNavigate } from "react-router-dom";
import { Button } from "../atoms";

interface IbannerProps {
  title: string;
  subtitle: string;
  description?: string;
}

export const Banner: React.FC<IbannerProps> = ({
  title,
  subtitle,
  description,
}) => {
  const navigate = useNavigate();
  return (
    <section className="text-white p-4 bg-gradient-to-r from-sky-600 to-indigo-700  ">
      <h1 className="text-4xl font-bold">{title}</h1>
      <h2 className="text-2xl">{subtitle}</h2>
      <p className="py-3 font-light">{description}</p>

      <div className="flex justify-end space-x-2 pt-3">
        <div>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </div>
        <div>
          <Button onClick={()=> navigate('/signIn')}>Register</Button>
        </div>
      </div>
    </section>
  );
};
