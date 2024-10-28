import NavBar from "@/components/shared/NavBar";
import Main from "@/components/shared/Main";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <NavBar />
      <Main />
      <Footer />
    </div>
  );
}
