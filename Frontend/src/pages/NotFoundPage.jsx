const NotFound = () => {
  return (
    <section>
      <div className=" text-white">
        <div className="flex h-screen">
          <div className="m-auto text-center">
            <div>
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-illustration-download-in-svg-png-gif-file-formats--404-error-page-pack-network-communication-illustrations-6167023.png?f=webp"
                alt="404"
              />
            </div>
            <p className="text-sm md:text-base text-[#F6009B] p-2 mb-4">
              The stuff you were looking for {"doesn't"} exist
            </p>
            <a
              href="/"
              className="bg-transparent hover:bg-[#F6009B] text-[#F6009B] hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-[#F6009B] hover:border-transparent"
            >
              Take me home
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default NotFound;
