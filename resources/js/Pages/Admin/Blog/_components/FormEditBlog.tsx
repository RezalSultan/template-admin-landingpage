import { Button } from "@/Components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";
import { ChevronDown, ChevronUp, Plus, RotateCcw, Trash2 } from "lucide-react";
import { Fragment, KeyboardEvent, useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Label } from "@/Components/ui/label";
import InputError from "@/Components/InputError";
import { Textarea } from "@/Components/ui/textarea";
import { Separator } from "@/Components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import RichTextEditor from "@/Components/rich-text-editors/RichTextEditor";
import { useErrorNotifier } from "@/lib/useErrorNotifier";
import {
  AllBlogSchema,
  BlogSectionSchema,
  SectionRequestType,
  FormRequestType,
} from "@/types/BlogType";
import DeleteButton from "./DeleteButton";

const FormEditBlog = ({
  dataBlog,
  errorMessage,
  currentTab,
}: {
  dataBlog: AllBlogSchema;
  errorMessage?: string;
  currentTab: string;
}) => {
  const [activeTab, setActiveTab] = useState(currentTab || "preview");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tabs");
    if (tab) {
      setActiveTab(tab);
    }
  }, []);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    const params = new URLSearchParams(window.location.search);
    params.set("tabs", newTab);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  const [errorMessageAdd, setErrorMessageAdd] = useState("");
  const [collapsedSections, setCollapsedSections] = useState<number[]>([]);
  const dateNow = new Date(dataBlog.updated_at);
  const formattedDate = dateNow.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const transformSection = (
    sections: BlogSectionSchema[],
  ): SectionRequestType[] => {
    return sections
      .map((section) => ({
        id: section.id,
        order: section.order,
        type_view_content: section.type_view_content ?? "IMAGE",
        url_asset: section.url_asset ?? null,
        caption: section.caption ?? "",
        sub_title: section.sub_title ?? "",
        body: section.body ?? "",
      }))
      .sort((a, b) => {
        return a.order - b.order;
      });
  };

  const [sections, setSections] = useState<SectionRequestType[]>(
    dataBlog?.blog_sections
      ? transformSection(dataBlog.blog_sections)
      : [
          {
            id: 1,
            order: 1,
            type_view_content: "IMAGE",
            url_asset: null,
            caption: "",
            sub_title: "",
            body: "",
          },
        ],
  );
  const { data, setData, post, processing, errors, reset } =
    useForm<FormRequestType>({
      title: dataBlog.title,
      desc: dataBlog.desc ?? "",
      cover_image: dataBlog.cover_image ?? null,
      status: dataBlog.status,
      author: dataBlog.author ?? "",
      tags: dataBlog.blog_tags?.map((blogTag) => blogTag.tag.name) ?? [],
      sections: sections,
    });

  const convertToEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleTagsChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Mencegah pengiriman form hanya jika tombol Enter ditekan

      const input = e.target as HTMLInputElement;
      const newTag = input.value.trim().toLowerCase();

      if (newTag !== "" && !data.tags.includes(newTag)) {
        setData("tags", [...data.tags, newTag]);
      }

      input.value = ""; // Reset input setelah menambahkan tag
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setData(
      "tags",
      data.tags.filter((tag) => tag !== tagToRemove),
    );
  };

  const handleOrderChange = (id: number, newOrder: number) => {
    setSections((prevSections) => {
      const sectionToMove = prevSections.find((section) => section.id === id);
      if (!sectionToMove) return prevSections;
      const otherSections = prevSections.filter((section) => section.id !== id);
      let updatedSections = [...otherSections];

      if (newOrder === 1) {
        updatedSections = [sectionToMove, ...updatedSections];
      } else {
        updatedSections.splice(newOrder - 1, 0, sectionToMove);
      }

      const reorderedSections = updatedSections.map((section, index) => ({
        ...section,
        order: index + 1,
      }));
      setData("sections", reorderedSections);
      return reorderedSections;
    });
  };

  const toggleSection = (id: number) => {
    setCollapsedSections((prev) =>
      prev.includes(id)
        ? prev.filter((sectionId) => sectionId !== id)
        : [...prev, id],
    );
  };

  const getNextId = (sections: { id: number }[]) => {
    const highestId = sections.reduce(
      (max, section) => (section.id > max ? section.id : max),
      0,
    );
    return highestId + 1;
  };

  const addSection = () => {
    const lastSection = sections[sections.length - 1];
    console.log(lastSection);

    if (
      lastSection?.url_asset === null &&
      lastSection?.caption?.trim() === "" &&
      lastSection?.sub_title?.trim() === "" &&
      lastSection?.body?.trim() === ""
    ) {
      setErrorMessageAdd(
        "Salah satu konten harus diisi sebelum menambahkan bagian baru.",
      );
      return;
    }
    const newId = getNextId(sections);
    const newSection = {
      id: newId,
      order: sections.length + 1,
      type_view_content: "IMAGE",
      url_asset: null,
      caption: "",
      sub_title: "",
      body: "",
    };
    setSections([...sections, newSection]);
    setData("sections", [...sections, newSection]);
    setErrorMessageAdd("");
  };

  useEffect(() => {
    if (errorMessageAdd) {
      const timer = setTimeout(() => {
        setErrorMessageAdd("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorMessageAdd]);

  const handleFieldChange = (
    id: number,
    field: keyof SectionRequestType,
    value: string | File | null,
  ) => {
    const updatedSections: SectionRequestType[] = sections.map((section) => {
      if (section.id === id) {
        if (field === "type_view_content") {
          return {
            ...section,
            [field]: value,
            url_asset: null,
          } as SectionRequestType;
        } else {
          return {
            ...section,
            [field]: value,
          };
        }
      }
      return section;
    });
    setSections(updatedSections);
    setData("sections", updatedSections);
  };

  const removeSection = (id: number) => {
    const updatedSections = sections.filter((section) => section.id !== id);
    const sectionsWithUpdatedOrder = updatedSections.map((section, index) => ({
      ...section,
      order: index + 1,
    }));
    setSections(sectionsWithUpdatedOrder);
    setData("sections", sectionsWithUpdatedOrder);
  };

  const handleReset = () => {
    setSections(
      dataBlog?.blog_sections
        ? transformSection(dataBlog.blog_sections)
        : [
            {
              id: 1,
              order: 1,
              type_view_content: "IMAGE",
              url_asset: null,
              caption: "",
              sub_title: "",
              body: "",
            },
          ],
    );
    setErrorMessageAdd("");
    reset();
  };

  const { resetErrorCount } = useErrorNotifier(
    "Gagal Ubah Artikel",
    errorMessage,
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sections = data.sections || [];
    const validIds = dataBlog.blog_sections?.map((section) => section.id);
    const filteredSections = sections.filter((section) => {
      return !(
        section.url_asset === null &&
        section.caption?.trim() === "" &&
        section.sub_title?.trim() === "" &&
        section.body?.trim() === ""
      );
    });

    const updatedSections = filteredSections.map((section) => {
      if (!validIds?.includes(section.id)) {
        return {
          ...section,
          id: 0,
        };
      }
      return section;
    });

    const updatedData = {
      ...data,
      sections: updatedSections.length > 0 ? updatedSections : [],
    };

    console.log(updatedData);

    post(route("blog.edit.request", { id: dataBlog.id }), {
      data: updatedData,
      onError: (errors) => {
        console.log("Error:", errors);
      },
      onFinish: () => {
        resetErrorCount();
      },
    });
  };

  return (
    <>
      <div className="mt-1 w-full">
        <Tabs
          defaultValue={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="flex w-full flex-wrap items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="edit">Form Edit Artikel</TabsTrigger>
              <TabsTrigger value="preview">Preview Artikel</TabsTrigger>
            </TabsList>
            <div>
              <DeleteButton dataBlog={dataBlog} errorMessage={errorMessage} />
            </div>
          </div>

          <TabsContent value="edit">
            <form className="flex w-full flex-col gap-1" onSubmit={onSubmit}>
              <div className="flex w-full flex-col gap-x-4 gap-y-2 md:flex-row">
                <div className="flex-1">
                  <Label htmlFor="title" className="relative">
                    <span className="absolute -right-2 -top-1 text-red-400">
                      *
                    </span>
                    Judul Artikel
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    placeholder="judul artikel"
                    disabled={processing}
                  />
                  <InputError message={errors.title} className="mt-2" />
                </div>
                <div className="flex-1">
                  <Label htmlFor="cover_image">Upload Cover</Label>
                  <div className="flex items-center justify-center gap-2 overflow-hidden">
                    <label
                      htmlFor="cover_image"
                      className={`inline-flex h-10 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground ${processing && "!pointer-events-none !opacity-50"}`}
                    >
                      <Plus
                        size={16}
                        className="relative h-4 w-4 fill-foreground"
                      />
                      Tambah Foto
                      <Input
                        id="cover_image"
                        type="file"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files && files.length > 0) {
                            setData("cover_image", files[0]);
                          }
                        }}
                        placeholder="upload cover"
                        accept="image/png, image/jpeg, image/jpg"
                        disabled={processing}
                        className="hidden cursor-pointer"
                      />
                    </label>
                    <p className="line-clamp-1 w-full">
                      {data.cover_image &&
                      typeof data.cover_image !== "string" &&
                      "name" in data.cover_image
                        ? (data.cover_image as File).name
                        : typeof data.cover_image === "string"
                          ? data.cover_image.replace(/^images\/blogs\//, "")
                          : "No file"}
                    </p>
                  </div>
                  <InputError message={errors.cover_image} className="mt-2" />
                </div>
              </div>
              <div className="flex w-full flex-col gap-x-4 gap-y-2 md:flex-row">
                <div className="flex-1">
                  <Label htmlFor="desc">Deskripsi Artikel</Label>
                  <Textarea
                    id="desc"
                    value={data.desc}
                    onChange={(e) => setData("desc", e.target.value)}
                    placeholder="deskripsi artikel"
                    disabled={processing}
                  />
                  <InputError message={errors.desc} className="mt-2" />
                </div>
                <div className="flex-1">
                  <Label>Tag Artikel</Label>
                  <Input
                    type="text"
                    onKeyDown={handleTagsChange}
                    placeholder="tag artikel"
                    disabled={processing}
                  />
                  <div
                    className={`mt-2 flex w-full flex-col items-start justify-center overflow-x-auto rounded-lg border py-1 pl-2 pr-4 text-base font-normal ${
                      data.tags.length !== 0
                        ? "border-body h-fit gap-2"
                        : "border-disable h-8"
                    }`}
                  >
                    <ol className="flex flex-wrap items-center justify-start gap-2">
                      {data.tags.map((tag, index) => (
                        <li
                          key={index}
                          className="relative flex cursor-default items-center justify-center gap-1 whitespace-nowrap rounded-md border border-secondary bg-transparent px-2 py-0.5 text-center text-xs font-normal"
                        >
                          {tag}
                          <svg
                            className="h-2 w-2 cursor-pointer stroke-2 text-destructive hover:scale-125 hover:stroke-[3px]"
                            onClick={() => handleRemoveTag(tag)}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <InputError message={errors.tags} className="mt-2" />
                </div>
              </div>
              <div className="flex w-full flex-col gap-x-4 gap-y-2 md:flex-row">
                <div className="flex-1">
                  <Label htmlFor="author">Penulis Artikel</Label>
                  <Input
                    id="author"
                    type="text"
                    value={data.author}
                    onChange={(e) => setData("author", e.target.value)}
                    placeholder="penulis artikel"
                    disabled={processing}
                  />
                  <InputError message={errors.author} className="mt-2" />
                </div>
                <div className="flex-1">
                  <Label className="relative">
                    <span className="absolute -right-2 -top-1 text-red-400">
                      *
                    </span>
                    Status
                  </Label>
                  <Select
                    disabled={processing}
                    value={data.status}
                    onValueChange={(e: string) =>
                      setData("status", e as "DRAFT" | "PUBLISH")
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tipe">
                        {data.status ? (
                          data.status === "DRAFT" ? (
                            <p className="rounded-md bg-neutral-300 px-2.5 py-1 text-xs">
                              {data.status.toLocaleLowerCase()}
                            </p>
                          ) : (
                            <p className="rounded-md bg-success px-2.5 py-1 text-xs text-success-foreground">
                              {data.status.toLocaleLowerCase()}
                            </p>
                          )
                        ) : (
                          "status"
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="z-[110]">
                      <SelectItem value="DRAFT">
                        <p className="rounded-md bg-neutral-300 px-3 py-1">
                          draft
                        </p>
                      </SelectItem>
                      <SelectItem value="PUBLISH">
                        <p className="rounded-md bg-success px-3 py-1 text-success-foreground">
                          publish
                        </p>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <InputError message={errors.status} className="mt-2" />
                </div>
              </div>
              <div className="mt-2 flex flex-col gap-2">
                <Label className="text-xl font-bold">Konten Artikel</Label>
                <Separator className="hidden lg:block" />
                {sections.map((section, index) => {
                  const isCollapsed = collapsedSections.includes(section.id);
                  return (
                    <Fragment key={index}>
                      <div
                        className={`z-[99] flex items-center justify-between`}
                      >
                        <Label>Bagian {index + 1}</Label>
                        <div className="flex items-center justify-center gap-2">
                          <Select
                            disabled={processing}
                            value={section.order.toString()}
                            onValueChange={(e: string) =>
                              handleOrderChange(section.id, parseInt(e))
                            }
                          >
                            <SelectTrigger
                              className={`!h-8 w-fit z-[${99 - index}] `}
                            >
                              <SelectValue placeholder="Tipe">
                                <p className="mr-2">
                                  {section.order
                                    ? `bagian ${section.order}`
                                    : "status"}
                                </p>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Urutan</SelectLabel>
                                {sections.map((section, index) => (
                                  <SelectItem
                                    key={index}
                                    value={section.order.toString()}
                                  >
                                    {section.order}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <div
                            onClick={() => removeSection(section.id)}
                            className="group cursor-pointer rounded-full p-1.5 transition-all hover:bg-secondary/50"
                          >
                            <Trash2 size={18} className="text-destructive" />
                          </div>
                          <div
                            onClick={() => toggleSection(section.id)}
                            className="cursor-pointer rounded-full p-1.5 hover:bg-secondary/50"
                          >
                            {isCollapsed ? (
                              <ChevronDown
                                size={18}
                                className="text-foreground"
                              />
                            ) : (
                              <ChevronUp
                                size={18}
                                className="text-foreground"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <Separator className="hidden lg:block" />
                      <div
                        className={`flex w-full flex-col flex-wrap gap-x-4 gap-y-2 transition-all duration-300 ease-in-out md:flex-row ${
                          isCollapsed
                            ? "pointer-events-none -z-50 max-h-0 opacity-0"
                            : "z-[50] opacity-100"
                        }`}
                      >
                        <div className="flex w-full flex-col gap-x-4 gap-y-2 md:flex-row">
                          <div className="flex-1">
                            <Label htmlFor={`${section.sub_title}${index}`}>
                              Sub Judul Bagian
                            </Label>
                            <Input
                              id={`${section.sub_title}${index}`}
                              value={section.sub_title}
                              onChange={(e) => {
                                handleFieldChange(
                                  section.id,
                                  `sub_title`,
                                  e.target.value,
                                );
                              }}
                              placeholder="sub judul bagian"
                              disabled={processing}
                            />
                            <InputError
                              message={
                                (errors as Record<string, string>)?.[
                                  `sections.${index}.sub_title`
                                ]
                              }
                              className="mt-2"
                            />
                          </div>
                        </div>
                        <div className="flex w-full flex-col gap-x-4 gap-y-2 md:flex-row">
                          <div className="flex-1">
                            <Label
                              htmlFor={`${section.type_view_content}${index}`}
                            >
                              Tambah Asset Konten
                            </Label>
                            <div className="flex gap-2">
                              <Select
                                disabled={processing}
                                value={section.type_view_content}
                                onValueChange={(e: string) => {
                                  handleFieldChange(
                                    section.id,
                                    `type_view_content`,
                                    e,
                                  );
                                }}
                              >
                                <SelectTrigger className="w-fit">
                                  <SelectValue placeholder="Tipe">
                                    <p className="mr-1">
                                      {section.type_view_content
                                        ? section.type_view_content === "IMAGE"
                                          ? "Gambar"
                                          : section.type_view_content ===
                                              "IMAGE_LINK"
                                            ? "Link Gambar"
                                            : "Yotutube"
                                        : "Tipe Aset"}
                                    </p>
                                  </SelectValue>
                                </SelectTrigger>
                                <SelectContent className="z-[110]">
                                  <SelectItem value="IMAGE">Gambar</SelectItem>
                                  <SelectItem value="IMAGE_LINK">
                                    Link Gambar
                                  </SelectItem>
                                  <SelectItem value="YOUTUBE">
                                    Youtube
                                  </SelectItem>
                                </SelectContent>
                              </Select>

                              {section.type_view_content === "IMAGE" ? (
                                <div className="flex items-center justify-center gap-2 overflow-hidden">
                                  <label
                                    htmlFor={`url_asset${index}`}
                                    className={`inline-flex h-10 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground ${processing && "!pointer-events-none !opacity-50"}`}
                                  >
                                    <Plus
                                      size={16}
                                      className="relative h-4 w-4 fill-foreground"
                                    />
                                    Tambah Foto
                                    <Input
                                      id={`url_asset${index}`}
                                      type="file"
                                      onChange={(e) => {
                                        const files = e.target.files;
                                        if (files && files.length > 0) {
                                          handleFieldChange(
                                            section.id,
                                            `url_asset`,
                                            files[0],
                                          );
                                        }
                                      }}
                                      placeholder="upload cover"
                                      accept="image/png, image/jpeg, image/jpg"
                                      disabled={processing}
                                      className="hidden cursor-pointer"
                                    />
                                  </label>
                                  <p className="line-clamp-1 w-full">
                                    {section.url_asset &&
                                    typeof section.url_asset !== "string" &&
                                    "name" in section.url_asset
                                      ? (section.url_asset as File).name
                                      : typeof section.url_asset === "string"
                                        ? section.url_asset.replace(
                                            /^images\/body-blogs\//,
                                            "",
                                          )
                                        : "No file"}
                                  </p>
                                </div>
                              ) : section.type_view_content === "IMAGE_LINK" ? (
                                <div className="flex-1">
                                  <Input
                                    id={`url_asset_link${index}`}
                                    value={section?.url_asset as string}
                                    onChange={(e) => {
                                      handleFieldChange(
                                        section.id,
                                        `url_asset`,
                                        e.target.value,
                                      );
                                    }}
                                    placeholder="masukan link gambar"
                                    disabled={processing}
                                  />
                                </div>
                              ) : (
                                <div className="flex-1">
                                  <Input
                                    id={`url_asset_yt${index}`}
                                    value={section?.url_asset as string}
                                    onChange={(e) => {
                                      handleFieldChange(
                                        section.id,
                                        `url_asset`,
                                        e.target.value,
                                      );
                                    }}
                                    placeholder="masukan link youtube"
                                    disabled={processing}
                                  />
                                </div>
                              )}
                            </div>
                            <InputError
                              message={
                                (errors as Record<string, string>)?.[
                                  `sections.${index}.type_view_content`
                                ]
                              }
                              className="mt-2"
                            />
                            <InputError
                              message={
                                (errors as Record<string, string>)?.[
                                  `sections.${index}.url_asset`
                                ]
                              }
                              className="mt-2"
                            />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor={`caption${index}`}>
                              Caption Asset
                            </Label>
                            <Input
                              id={`caption${index}`}
                              type="text"
                              value={section.caption}
                              onChange={(e) =>
                                handleFieldChange(
                                  section.id,
                                  `caption`,
                                  e.target.value,
                                )
                              }
                              placeholder="caption asset"
                              disabled={processing}
                            />
                            <InputError
                              message={
                                (errors as Record<string, string>)?.[
                                  `sections.${index}.caption`
                                ]
                              }
                              className="mt-2"
                            />
                          </div>
                        </div>
                        <div className="flex w-full flex-col gap-x-4 gap-y-2 md:flex-row">
                          <div className="flex-1">
                            <Label htmlFor={`body${index}`}>
                              Isi Bagian Artikel
                            </Label>
                            <RichTextEditor
                              content={section.body}
                              onChange={(e: any) => {
                                handleFieldChange(section.id, `body`, e);
                              }}
                            />
                            <InputError
                              message={
                                (errors as Record<string, string>)?.[
                                  `sections.${index}.body`
                                ]
                              }
                              className="mt-2"
                            />
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
                {errorMessageAdd && (
                  <p className="z-[99] mt-1 text-sm font-medium text-destructive">
                    {errorMessageAdd}
                  </p>
                )}
                <Button
                  disabled={processing}
                  type="button"
                  variant="secondary"
                  size={"sm"}
                  className="z-[99] self-start"
                  onClick={addSection}
                >
                  <Plus size={16} /> tambah bagian
                </Button>
              </div>

              <div className="mt-4 flex w-full justify-end gap-4">
                <button
                  disabled={processing}
                  onClick={handleReset}
                  type="reset"
                  className="group flex items-center justify-center"
                >
                  <RotateCcw
                    size={20}
                    className="mr-2 transition-all duration-300 group-hover:-rotate-[320deg]"
                  />
                  Reset
                </button>
                <Button disabled={processing} type="submit">
                  Simpan
                </Button>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="preview">
            <div className="w-full sm:px-5 xl:px-20">
              {data.title && (
                <div className="flex w-full flex-wrap-reverse items-center justify-end gap-x-4 gap-y-4 pb-2">
                  <p className="whitespace-nowrap text-foreground/50">
                    {data.author || "admin"}, {formattedDate}
                  </p>

                  <div className="flex items-center justify-center gap-2">
                    <div>logo</div>
                    <div>logo</div>
                  </div>
                </div>
              )}

              <div className="text-start text-4xl font-bold xl:text-5xl">
                {data.title}
              </div>
              <ol className="mt-2 flex h-auto w-full cursor-default items-start justify-start gap-2">
                {data.tags.map((tag, index) => (
                  <li
                    key={index}
                    className="relative flex cursor-default items-center justify-center rounded-sm px-2.5 py-0.5 text-center text-sm font-medium text-foreground/75 odd:bg-accent even:bg-secondary md:text-base"
                  >
                    {tag}
                  </li>
                ))}
              </ol>

              {data.cover_image && (
                <div className="mt-4 flex w-full items-center justify-center">
                  <img
                    src={
                      typeof data.cover_image === "string"
                        ? `/${data.cover_image}`
                        : URL.createObjectURL(data.cover_image as File)
                    }
                    alt="Preview Cover Image"
                    className="rounded-sm md:h-[calc(100vh/2.3)] xl:h-[calc(100vh/1.5)]"
                  />
                </div>
              )}
              <p className="mt-4 indent-10 text-foreground/90">{data.desc}</p>
              {data.title && <Separator className="my-2" />}
              {data.sections.map((section) => (
                <Fragment key={section.id}>
                  <div className="text-start text-3xl font-bold">
                    {section.sub_title}
                  </div>
                  {section.type_view_content === "IMAGE" ? (
                    <>
                      {section.url_asset && (
                        <div className="mt-4 flex w-full flex-col items-center justify-center">
                          <img
                            src={
                              typeof section.url_asset === "string"
                                ? `/${section.url_asset}`
                                : URL.createObjectURL(section.url_asset as File)
                            }
                            alt="Preview URL Asset"
                            className="rounded-sm md:h-[calc(100vh/2.3)] xl:h-[calc(100vh/1.5)]"
                          />
                          <div className="mt-1 text-center text-sm italic text-foreground/75">
                            {section.caption}
                          </div>
                        </div>
                      )}
                    </>
                  ) : section.type_view_content === "IMAGE_LINK" ? (
                    <>
                      {section.url_asset && (
                        <div className="mt-4 flex w-full flex-col items-center justify-center">
                          <img
                            src={section.url_asset as string}
                            alt="Preview URL Asset"
                            className="rounded-sm md:h-[calc(100vh/2.3)] xl:h-[calc(100vh/1.5)]"
                          />
                          <div className="mt-1 text-center text-sm italic text-foreground/75">
                            {section.caption}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {section.url_asset && (
                        <div className="mt-4 flex w-full flex-col items-center justify-center">
                          <iframe
                            src={convertToEmbedUrl(section.url_asset as string)}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-sm md:h-[calc(100vh/2.3)] xl:h-[calc(100vh/1.5)] xl:w-9/12"
                            title="YouTube Video"
                          ></iframe>
                          <div className="mt-1 text-center text-sm italic text-foreground/75">
                            {section.caption}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  <div
                    className="tiptap preview"
                    dangerouslySetInnerHTML={{ __html: section.body }}
                  />
                </Fragment>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default FormEditBlog;
