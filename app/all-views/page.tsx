import Image from "next/image";

export default function Page() {
  return (
    <>
      <p> HWelcome!</p>
      <p> Hwhat do you hwant to do today? </p>
      <p>🦵🏽 🍑 💪🏽 🫁 🏋🏽‍♀️🤷🏽‍♀️</p>
      <br></br>
      <p>-</p>
      <br></br>
      <p>
        Here is a diagram of muscle groups in case you forgot, as one tends to
        do.
      </p>
      <div className="flex items-center justify-center p-4 md:w-3/5">
        <Image
          src="/muscle_groups_gym_bro_terms.png"
          width={560}
          height={620}
          className="block"
          alt="Diagram of muscle groups"
        />
      </div>
      <p className="text-xl text-purple-700 text-center">Happy exercising!</p>
    </>
  );
}
