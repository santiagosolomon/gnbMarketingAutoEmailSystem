import Header from "./layouts/header";
import Footer from "./layouts/footer";
import Sidebar from "./layouts/side";
import { useStore, useEffect } from "@/store/store";
import { ThemeProvider } from "./function/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import "@preact/signals-react/auto";
import { Providers } from "./Providers";

export default function Layout({ children }) {
  const openbar = useStore((state) => state.bar);

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <main className="font-primary">
          <Sidebar />
          <div
            className={` ${openbar ? "ml-0 lg:ml-[80px]" : "lg:ml-[300px]"}`}
          >
            <Header />

            <div className="bg-gray-50  h-[calc(100vh-73px)] dark:bg-slate-900">
              <Toaster />
              <div className="">
                <Providers>{children}</Providers>
              </div>

              {/* <div className={`bg-gray-50 dark:bg-slate-950 fixed bottom-0 w-full   ${openbar ? "lg:w-[calc(100%-79px)]" : "lg:w-[calc(100%-299px)]"}`}>
                <Footer />
              </div> */}

              <div className={`bg-gray-50 dark:bg-slate-900`}>
                <Footer />
              </div>
            </div>
          </div>

          {/* h-[calc(100vh-73px)] */}
        </main>
      </ThemeProvider>
    </>
  );
}
