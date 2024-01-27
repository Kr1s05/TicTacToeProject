import RegisterForm from "@/components/RegisterForm";

function RegisterPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-6">
      <h1 className="mb-7 font-bold text-2xl">Sign up</h1>
      <RegisterForm />
    </main>
  );
}

export default RegisterPage;
