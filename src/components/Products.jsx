import { Carousel } from "flowbite-react";
import { useEffect, useState } from "react";

export function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchingProducts() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const products = await response.json();
        setProducts(products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchingProducts();
  });

  const customTheme = {
    root: {
      base: "relative h-full w-full",
      leftControl:
        "absolute left-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
      rightControl:
        "absolute right-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
    },
    indicators: {
      active: {
        off: "bg-gray-300 hover:bg-gray-600 dark:bg-gray-800/50 dark:hover:bg-gray-800",
        on: "bg-gray-600 dark:bg-gray-800",
      },
      base: "h-3 w-3 rounded-full",
      wrapper: "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3",
    },
    item: {
      base: "absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
      wrapper: {
        off: "w-full flex-shrink-0 transform cursor-default snap-center",
        on: "w-full flex-shrink-0 transform cursor-grab snap-center",
      },
    },
    control: {
      base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-gray-500 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10 bg-gray-300",
      icon: "bg-gray-300 rounded-full h-full w-full text-white dark:text-gray-800 sm:h-6 sm:w-6",
    },
    scrollContainer: {
      base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
      snap: "snap-x",
    },
  };

  return (
    <main className="w-full min-h-screen p-10 items-center">
      <h1 className="text-center text-[32px] mb-10 animate-bounce">
        Products Carousel
      </h1>
      <div className=" h-56  gap-4 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel theme={customTheme} className=" p-10">
          {products &&
            products.map((p) => {
              return (
                <div key={p.id} className="w-[700px] m-auto flex gap-10">
                  <img
                    className="w-[300px] h-[300px]"
                    key={p.id}
                    src={p.image}
                    alt={p.title}
                  />
                  <article className="">
                    <h2 className="text-lg">{p.title}</h2>
                    <p className=" text-gray-600 font-bold">{`$${p.price}`}</p>
                  </article>
                </div>
              );
            })}
        </Carousel>
      </div>
    </main>
  );
}
