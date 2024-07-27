import { useForm } from 'react-hook-form';
import img1 from '/public/Buffer-amico.svg'
function LoginPage() {
   const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm();
   const onSubmit = (data) => console.log(data);
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="hidden md:flex md:w-1/2 h-full">
        <img
          aria-hidden="true"
          alt="Illustration of devices"
          src={img1}
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="bg-card shadow-lg rounded-lg p-8 max-w-md w-full md:w-1/2">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-primary"
            >
              Email
            </label>
            <input
              autoComplete="email"
              type="email"
              id="email"
              {...register("email", { pattern:
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-
                  ]+\.[a-zA-Z]{2,}$/
               })}
              name="email"
              placeholder="john.doe@example.com"
              className="w-full px-4 py-3 mt-1 text-input border rounded-lg focus:outline-none focus:ring focus:ring-primary"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-primary"
            >
              Password
            </label>
            <input
              autoComplete="username"
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className="w-full px-4 py-3 mt-1 text-input border rounded-lg focus:outline-none focus:ring focus:ring-primary"
              required
            />
          </div>
          <button
            type="submit"
            onClick={() => window.location.replace("/admin")}
            className="w-full bg-primary text-white text-primary-foreground p-3 rounded-lg hover:bg-primary/80 focus:outline-none focus:ring focus:ring-primary transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage
