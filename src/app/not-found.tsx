import Link from "next/link";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="flex min-h-screen justify-center bg-muted">
      <div className="text-center flex flex-col items-center pt-40">
        <Image
          alt="აუთპოსტი"
          src="/aoe/outpost.png"
          width={150}
          height={150}
          className="mb-8"
        />
        <p className="mb-4 text-xl text-muted-foreground">
          გვერდი არ მოიძებნა!
        </p>
        <Link href="/" className="text-primary underline hover:text-primary/90">
          მთავარი გვერდი
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
