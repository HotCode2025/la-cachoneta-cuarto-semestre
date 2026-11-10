import { Card, Button, Input, Label, Container } from "../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: loginErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signin(data);
    if (user) {
      navigate("/tareas");
    }
  });

  return (
    <Container className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        {loginErrors &&
          loginErrors.map((error, index) => (
            <p className="bg-red-500 text-white text-center p-2" key={index}>
              {error}
            </p>
          ))}
        <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>

        <form onSubmit={onSubmit}>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            placeholder="Ingrese su email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">El email es obligatorio</p>
          )}

          <Label htmlFor="password">Contraseña:</Label>
          <Input
            type="password"
            id="password"
            placeholder="Ingrese su contraseña"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">La contraseña es obligatoria</p>
          )}
          <Button>Iniciar sesión</Button>
        </form>

        <div>
          <p className="mt-4">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </Card>
    </Container>
  );
}

export default LoginPage;
