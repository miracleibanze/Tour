import { useRouter } from "next/navigation";

export const ErrorPopup = () => {
  const router = useRouter();
  return (
    <div className="fixed inset-0 flex items-center justify-center m-auto z-99 backdrop-brightness-50">
      <div className=" border border-secondary/20 w-sm bg-canva rounded-lg h-36 flex flex-col justify-between items-center overflow-hidden pt-6">
        <h2 className="text-3xl font-semibold leading-0">Error!</h2>
        <p>Can't load data at the moment!</p>
        <div className="flex w-full bg-secondary/50 pt-0.5 gap-0.5">
          <button
            className="flex-1 hover:bg-foreground/10 bg-canva py-3"
            onClick={() => router.back()}
          >
            Go back
          </button>
          <button
            className="flex-1 hover:bg-foreground/10 bg-canva py-3"
            onClick={() => router.refresh()}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};
