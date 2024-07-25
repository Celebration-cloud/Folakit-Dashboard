
function LoginPage() {
  return (
    <div class="flex items-center justify-center min-h-screen bg-background">
      <div class="hidden md:flex md:w-1/2">
        <img
          aria-hidden="true"
          alt="Illustration of devices"
          src="https://openui.fly.dev/openui/387x292.svg?text=Illustration"
          class="w-full h-auto object-cover"
        />
      </div>
      <div class="bg-card shadow-lg rounded-lg p-8 max-w-md w-full md:w-1/2">
        <h2 class="text-3xl font-bold text-primary mb-6 text-center">
          Admin Login
        </h2>
        <form>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-primary">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john.doe@example.com"
              class="w-full px-4 py-3 mt-1 text-input border rounded-lg focus:outline-none focus:ring focus:ring-primary"
              required
            />
          </div>
          <div class="mb-6">
            <label
              for="password"
              class="block text-sm font-medium text-primary"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              class="w-full px-4 py-3 mt-1 text-input border rounded-lg focus:outline-none focus:ring focus:ring-primary"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary/80 focus:outline-none focus:ring focus:ring-primary transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage
