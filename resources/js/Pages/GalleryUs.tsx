import HomeLayout from "@/Layouts/HomeLayout";
import { Head } from "@inertiajs/react";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";

import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import { useState } from "react";
import { assetLink } from "@/lib/assetLink";
import { DataGallerySchema } from "@/types/GalleryType";

const GalleryUs = ({
  dataGalleries,
}: {
  dataGalleries: DataGallerySchema[];
}) => {
  const [index, setIndex] = useState(-1);
  const breakpoints = [3840, 1920, 1080, 640, 384, 256, 128];

  const slides = dataGalleries.map((gallery) => {
    const formattedDate = gallery.event_date
      ? new Intl.DateTimeFormat("id-ID", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }).format(new Date(gallery.event_date))
      : null;
    const descDate = `${formattedDate ? `${formattedDate}\n` : null}${gallery.description}`;
    const { name_url: asset, title: alt, width, height, title } = gallery;

    return {
      src: assetLink(asset, width as number),
      alt,
      width,
      height,
      title,
      date: formattedDate,
      oriDesc: gallery.description,
      description: descDate,
      srcSet: breakpoints.map((breakpoint) => ({
        src: assetLink(asset, breakpoint),
        width: breakpoint,
        height: Math.round(
          (Math.min(width as number, height as number) /
            Math.max(width as number, height as number)) *
            breakpoint,
        ),
      })),
    };
  });

  return (
    <>
      <HomeLayout>
        <Head title="Galeri Kami" />
        <div className="mx-auto mb-10 flex w-full flex-col gap-4 md:gap-8">
          <div className="mt-4 flex flex-col items-center justify-center">
            <p className="text-center text-4xl font-bold lg:w-10/12 xl:w-8/12">
              Gallery
            </p>
            <p className="text-center text-foreground/75">
              Here is an example of a photo gallery with a lightbox. You can
              click any photo to open it in a lightbox.
            </p>
          </div>
          {dataGalleries.length === 0 ? (
            <div className="flex h-[150px] w-full items-center justify-center sm:h-[200px] md:h-[300px]">
              <p className="text-base font-medium text-muted-foreground md:text-lg">
                Galeri belum tersedia
              </p>
            </div>
          ) : (
            <RowsPhotoAlbum
              photos={slides}
              targetRowHeight={300}
              onClick={({ index: current }) => setIndex(current)}
              render={{
                extras: (_, { photo, index }) => {
                  const { title, oriDesc, date } = slides[index] || {};
                  return (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 transition-opacity duration-300 hover:opacity-100">
                      <div className="p-4 text-center text-white">
                        <p className="text-lg font-semibold">
                          {title} {date ? `- ${date}` : null}
                        </p>
                        <p className="mt-1 text-sm">{oriDesc}</p>
                      </div>
                    </div>
                  );
                },
              }}
            />
          )}
        </div>
      </HomeLayout>
      <Lightbox
        index={index}
        plugins={[Captions, Counter]}
        slides={slides}
        open={index >= 0}
        close={() => setIndex(-1)}
        captions={{
          showToggle: false,
          descriptionTextAlign: "start",
          descriptionMaxLines: 3,
        }}
        counter={{
          container: {
            style: {
              position: "absolute",
              bottom: 0,
              right: 0,
              left: "unset",
              top: "unset",
              background: "rgba(0, 0, 0, 0.5)",
            },
          },
        }}
      />
    </>
  );
};

export default GalleryUs;
