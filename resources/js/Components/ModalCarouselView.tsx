import { DataGallerySchema } from "@/types/GalleryType";

const ModalCarouselView = ({
  indexImage,
  galleries,
  prev,
  next,
  handleClose,
}: {
  indexImage: number;
  galleries: DataGallerySchema[];
  prev?: () => void;
  next?: () => void;
  handleClose: () => void;
}) => {
  return (
    <>
      <div className="fixed inset-0 z-[300] mx-8 flex items-center justify-center overflow-hidden outline-none focus:outline-none">
        <div className="relative z-[310] mx-auto my-10 flex h-full w-full items-center justify-center">
          <button
            onClick={handleClose}
            type="button"
            className={`hover:text-body absolute right-3 top-10 z-[320] -mx-1 -my-1 ml-2 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg p-1 text-white ring-transparent hover:bg-slate-200 focus:ring-2 md:right-10`}
          >
            <span className="sr-only">close side bar</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
          {galleries.length === 1 ? null : (
            <button onClick={prev} className="group z-[320]">
              <svg
                width={24}
                height={24}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 rotate-90 cursor-pointer fill-white opacity-75 group-hover:fill-primary group-hover:opacity-100"
                preserveAspectRatio="xMidYMid meet"
              >
                <path d="M7.48182 11.8312L1.54795 5.89727C1.26177 5.61108 1.26177 5.1471 1.54795 4.86095L2.24004 4.16886C2.52574 3.88316 2.98877 3.88261 3.27514 4.16763L8 8.87035L12.7248 4.16763C13.0112 3.88261 13.4742 3.88316 13.7599 4.16886L14.452 4.86095C14.7382 5.14713 14.7382 5.61111 14.452 5.89727L8.51817 11.8312C8.23198 12.1173 7.76801 12.1173 7.48182 11.8312Z" />
              </svg>
            </button>
          )}
          <div className="relative z-[320] h-[80%] overflow-hidden rounded-xl md:w-[90vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[60vw]">
            <div
              className="z-20 flex h-full w-full text-white transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${indexImage * 100}%`,
              }}
            >
              {galleries.map((item, index) => (
                <div key={index}>
                  <div
                    className="flex h-full items-center justify-center md:w-[90vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[60vw]"
                    key={item.id}
                  >
                    <img
                      src={`/${item.name_url}`}
                      alt="carousel"
                      className="h-full w-fit overflow-hidden rounded-xl object-contain"
                      width={1500}
                      height={1200}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {galleries.length === 1 ? null : (
            <button onClick={next} className="group z-[320]">
              <svg
                width={24}
                height={24}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 -rotate-90 cursor-pointer fill-white opacity-75 group-hover:fill-primary group-hover:opacity-100"
                preserveAspectRatio="xMidYMid meet"
              >
                <path d="M7.48182 11.8312L1.54795 5.89727C1.26177 5.61108 1.26177 5.1471 1.54795 4.86095L2.24004 4.16886C2.52574 3.88316 2.98877 3.88261 3.27514 4.16763L8 8.87035L12.7248 4.16763C13.0112 3.88261 13.4742 3.88316 13.7599 4.16886L14.452 4.86095C14.7382 5.14713 14.7382 5.61111 14.452 5.89727L8.51817 11.8312C8.23198 12.1173 7.76801 12.1173 7.48182 11.8312Z" />
              </svg>
            </button>
          )}
          <div
            onClick={handleClose}
            className="fixed inset-0 z-[300] bg-black opacity-75"
          ></div>
        </div>
      </div>
    </>
  );
};

export default ModalCarouselView;
