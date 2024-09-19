import NavBar from "@/components/shared/NavBar";
import Main from "@/components/shared/Main";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Main />
      <Footer />
    </div>
  );
}
