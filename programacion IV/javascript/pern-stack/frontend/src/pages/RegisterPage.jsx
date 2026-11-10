import { Button, Card, Container, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, errors: setUserErrors } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    const user = await signup(data);
    if (user) {
      navigate("/tareas");
    }
  });

  console.error(errors);

  return (
    <Container className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        {setUserErrors &&
          setUserErrors.map((error, index) => (
            <p className="bg-red-500 text-white text-center p-2" key={index}>
              {error}
            </p>
          ))}
        <h3 className="text-2xl font-bol">Registro</h3>
        <form onSubmit={onSubmit}>
          <Label htmlFor="name">Nombre:</Label>
          <Input
            type="text"
            id="name"
            placeholder="Ingrese su nombre"
            {...register("name", { required: true })}
          ></Input>
          {errors.name && (
            <span className="text-red-500">Este campo es requerido</span>
          )}

          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            placeholder="Ingrese su email"
            {...register("email", { required: true })}
          ></Input>
          {errors.email && (
            <span className="text-red-500">Este campo es requerido</span>
          )}
          <Label htmlFor="password">Contraseña:</Label>
          <Input
            type="password"
            id="password"
            placeholder="Ingrese su contraseña"
            {...register("password", { required: true })}
          ></Input>
          {errors.password && (
            <span className="text-red-500">Este campo es requerido</span>
          )}

          <Button>Registrarse</Button>
        </form>

        <div>
          <p className="mt-4">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </Card>
    </Container>
  );
}

export default RegisterPage;
