import Image from "next/image";

export default function Page() {
  return (
    <>
      <p> Home</p>
      <p> Hwhat do you want to do today? </p>
      <p>
        Here is a diagram of muscle groups in case you forgot, as one tends to
        do.
      </p>
      <div className="flex items-center justify-center p-6 md:w-3/5">
        <Image
          src="/muscle_groups_gym_bro_terms.png"
          width={560}
          height={620}
          className="block"
          alt="Diagram of muscle groups"
        />
      </div>
    </>
  );
}
