export default function Footer() {
  return (
    <footer
      className="
        w-full
        bg-[#0a0e15]
        border-t border-white/20
        py-10
        px-12
        text-white
        valorant-font
        relative
        z-[9999]
      "
    >
      <div className="flex flex-col items-center text-center gap-6">

        <h3 className="text-2xl font-semibold tracking-wide text-[#9A00FF]">
          THE NEXUS TEAM
        </h3>

        <div className="flex flex-col sm:flex-row gap-12 items-center justify-center">

          <div className="text-center">
            <p className="font-semibold text-lg">Harshit Sharma</p>
            <p className="text-sm text-[#FF4655]">
              Frontend & Backend
            </p>
          </div>

          <div className="text-center">
            <p className="font-semibold text-lg">Shobhit Sahu</p>
            <p className="text-sm text-[#FF4655]">
              Machine Learning & AI
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
