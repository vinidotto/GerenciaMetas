import { Roboto } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

const Header = () => {
  return (
    <header className="bg-blue-950 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-5">
          <Link
            className="text-white text-xl font-semibold hover:text-gray-300 transition-colors duration-300 cursor-pointer"
            href="/"
          >
            DottoTask
          </Link>
        </div>
        <nav className="flex gap-8 items-center">
          <Link
            className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
            href="/"
          >
            Página Inicial
          </Link>
          <Link
            className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
            href="/criarMeta"
          >
            Cadastrar Meta
          </Link>
          <Link
            className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
            href="/listarMeta"
          >
            Listar Metas
          </Link>
          <Link
            className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
            href="/signIn"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white py-4 fixed bottom-0 w-full">
      <div className="container mx-auto text-center">Desenvolvido por Vini Dotto</div>
    </footer>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        <div className="flex flex-col min-h-screen">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
