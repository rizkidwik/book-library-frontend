import { Navbar } from './Navbar';
import { NavbarUser } from './NavbarUser';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    const roles = localStorage.getItem('roles')
  return (
    <div className="min-h-screen bg-gray-100">
      {roles == 'admin' ? <Navbar /> : <NavbarUser/>}
      <main className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};
