<?php

namespace App\Http\Controllers;

use App\Http\Requests\BlogCreateRequest;
use App\Http\Requests\BlogUpdateRequest;
use App\Models\Blog;
use App\Models\BlogSection;
use App\Models\Tag;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class BlogController extends Controller
{
  public function index(): Response
  {
    $blogs = Blog::orderBy('updated_at', 'desc')->get();
    return Inertia::render(
      'Admin/Blog/Blog',
      [
        'dataBlogs' => $blogs,
        'succesLogin' => session("success"),
        'successAddMessage' => session('successAdd'),
        'successEditMessage' => session('successEdit'),
        'successDeleteMessage' => session('successDelete'),
        'successProfileMessage' => session('successEditProfile'),
        'successPassMessage' => session('successEditPass'),
        'errorMessage' => session('danger')
      ]
    );
  }

  public function create(): Response
  {
    return Inertia::render(
      'Admin/Blog/CreateBlog',
      [
        'errorMessage' => session('danger'),
      ]
    );
  }

  public function edit(Request $request, $slug): Response
  {
    // Mengambil query parameter id dari request
    $id = $request->query('id');
    $tab = $request->query('tabs');

    // Mencari blog berdasarkan id dan slug
    $blog = Blog::where('id', $id)
      ->where('slug', $slug)
      ->with(['blogSections', 'blogTags.tag'])
      ->first();

    if (!$blog) {
      return back()->with('danger', 'Artikel tidak ditemukan');
    }

    return Inertia::render(
      'Admin/Blog/EditBlog',
      [
        'dataBlog' => $blog,
        'errorMessage' => session('danger'),
        'currentTab' => $tab
      ]
    );
  }

  public function store(BlogCreateRequest $request): RedirectResponse
  {
    try {
      $validated = $request->validated();

      DB::beginTransaction();
      $blog = new Blog();
      $blog->title = $validated['title'];
      $blog->slug = Str::slug($validated['title'], '-');
      $blog->status = $validated['status'];
      $blog->desc = $validated['desc'] === "" ? null : $validated['desc'];
      $blog->author = $validated['author'] === "" ? null : $validated['author'];
      $blog->save();
      if ($validated['cover_image']) {
        $blog->handleUploadImg();
      }

      if (isset($validated['tags'])) {
        foreach ($validated['tags'] as $tagName) {
          $tag = Tag::firstOrCreate([
            'name' => $tagName,
          ]);
          $blog->blogTags()->create([
            'tag_id' => $tag->id,
            'blog_id' => $blog->id
          ]);
        }
      }

      if (isset($validated['sections'])) {
        foreach ($validated['sections'] as $dataSection) {
          $section = new BlogSection();
          $section->blog_id = $blog->id;
          $section->order = $dataSection['order'];
          $section->type_view_content = $dataSection['type_view_content'];
          $section->caption = $dataSection['caption'] === "" ? null : $dataSection['caption'];
          $section->sub_title = $dataSection['sub_title'] === "" ? null : $dataSection['sub_title'];
          $section->body = $dataSection['body'] === "" ? null : $dataSection['body'];
          $section->save();

          if ($dataSection['type_view_content'] === "IMAGE" && $dataSection['url_asset']) {
            $section->handleUploadImgSection($dataSection['url_asset']);
          } else {
            if ($dataSection['url_asset']) {
              $section->url_asset = $dataSection['url_asset'];
              $section->save();
            }
          }
        }
      }

      DB::commit();
      return redirect()->route('blog.index')->with('successAdd', 'Tambah Artikel Telah Berhasil');
    } catch (\Exception $e) {
      DB::rollBack();
      return back()->with('danger', 'Tambah Artikel Gagal Dilakukan');
    }
  }

  public function update(BlogUpdateRequest $request, $id): RedirectResponse
  {
    try {

      // dd($request);
      $validated = $request->validated();

      $blog = Blog::find($id);

      if (!$blog) {
        return back()->with('danger', 'Artikel tidak ditemukan');
      }

      DB::beginTransaction();
      $blog->title = $validated['title'];
      $blog->slug = Str::slug($validated['title'], '-');
      $blog->status = $validated['status'];
      $blog->desc = $validated['desc'] === "" ? null : $validated['desc'];
      $blog->author = $validated['author'] === "" ? null : $validated['author'];
      $blog->save();
      if ($validated['cover_image'] instanceof UploadedFile) {
        $blog->handleUploadImg();
      }

      if (isset($validated['tags'])) {
        foreach ($validated['tags'] as $tagName) {
          $tagExist = Tag::where('name', $tagName)->first();

          if ($tagExist) {
            $existingBlogTag = $blog->blogTags()->where('tag_id', $tagExist->id)->first();
            if (!$existingBlogTag) {
              $blog->blogTags()->create([
                'tag_id' => $tagExist->id,
                'blog_id' => $blog->id
              ]);
            }
          } else {
            $tag = Tag::create([
              'name' => $tagName,
            ]);

            $blog->blogTags()->create([
              'tag_id' => $tag->id,
              'blog_id' => $blog->id
            ]);
          }
        }
        $existingTags = $blog->blogTags()->with('tag')->get()->pluck('tag.name')->toArray();
        $tagsToRemove = array_diff($existingTags, $validated['tags']);
        foreach ($tagsToRemove as $tagNameToRemove) {
          $tagToRemove = Tag::where('name', $tagNameToRemove)->first();
          if ($tagToRemove) {
            $blogTagToDelete = $blog->blogTags()->where('tag_id', $tagToRemove->id)->first();
            if ($blogTagToDelete) {
              $blogTagToDelete->delete();
            }
          }
        }
      }

      if (isset($validated['sections'])) {
        foreach ($validated['sections'] as $dataSection) {
          $sectionExist = BlogSection::where('id', $dataSection['id'])->first();

          if ($sectionExist) {
            $sectionExist->blog_id = $blog->id;
            $sectionExist->order = $dataSection['order'];
            $sectionExist->type_view_content = $dataSection['type_view_content'];
            $sectionExist->caption = $dataSection['caption'] === "" ? null : $dataSection['caption'];
            $sectionExist->sub_title = $dataSection['sub_title'] === "" ? null : $dataSection['sub_title'];
            $sectionExist->body = $dataSection['body'] === "" ? null : $dataSection['body'];
            $sectionExist->save();

            if ($dataSection['type_view_content'] === "IMAGE" && $dataSection['url_asset'] && $dataSection['url_asset'] instanceof UploadedFile) {
              $sectionExist->handleUploadImgSection($dataSection['url_asset']);
            } elseif ($dataSection['type_view_content'] === "YOUTUBE" || $dataSection['type_view_content'] === "IMAGE_LINK") {
              if ($dataSection['url_asset']) {
                $sectionExist->url_asset = $dataSection['url_asset'];
                $sectionExist->save();
              }
            }
          } else {
            $section = new BlogSection();
            $section->blog_id = $blog->id;
            $section->order = $dataSection['order'];
            $section->type_view_content = $dataSection['type_view_content'];
            $section->caption = $dataSection['caption'] === "" ? null : $dataSection['caption'];
            $section->sub_title = $dataSection['sub_title'] === "" ? null : $dataSection['sub_title'];
            $section->body = $dataSection['body'] === "" ? null : $dataSection['body'];
            $section->save();

            if ($dataSection['type_view_content'] === "IMAGE" && $dataSection['url_asset']) {
              $section->handleUploadImgSection($dataSection['url_asset']);
            } else {
              if ($dataSection['url_asset']) {
                $section->url_asset = $dataSection['url_asset'];
                $section->save();
              }
            }
          }
        }
      }

      DB::commit();
      return redirect()->route('blog.index')->with('successEdit', 'Ubah Artikel Telah Berhasil');
    } catch (\Exception $e) {
      DB::rollBack();
      dd($e->getMessage(), $e->getTrace());
      return back()->with('danger', 'Ubah Artikel Gagal Dilakukan');
    }
  }

  public function destroy($id)
  {
    try {
      $blog = Blog::find($id);
      if (!$blog) {
        return back()->with('danger', 'Artikel tidak ditemukan');
      }
      $blog->handleDeleteImg();
      foreach ($blog->blogSections as $dataSection) {
        if ($dataSection->type_view_content === "IMAGE" && $dataSection->url_asset) {
          $section = BlogSection::find($dataSection->id);
          $section->handleDeleteImgSection();
        }
      }
      $blog->delete();

      return redirect()->route("blog.index")->with('successDelete', 'Hapus Artikel Berhasil Dilakukan');
    } catch (\Exception $e) {
      return back()->with('danger', 'Hapus Artikel Gagal Dilakukan');
    }
  }
}
