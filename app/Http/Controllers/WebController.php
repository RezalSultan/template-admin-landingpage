<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class WebController extends Controller
{
  public function home(): Response
  {
    return Inertia::render(
      'Home',
    );
  }

  public function aboutUs(): Response
  {
    return Inertia::render(
      'AboutUs',
    );
  }

  public function blog(): Response
  {
    $blogs = Blog::with('blogTags.tag')->where('status', 'PUBLISH')->orderBy('updated_at', 'desc')->get();
    return Inertia::render(
      'Blog',
      [
        'blogs' => $blogs
      ]
    );
  }

  public function detailBlog(Request $request, $slug): Response
  {
    // Mengambil query parameter id dari request
    $id = $request->query('id');

    // Mencari blog berdasarkan id dan slug
    $blog = Blog::where('id', $id)
      ->where('slug', $slug)
      ->where('status', 'PUBLISH')
      ->with([
        'blogSections' => function ($query) {
          $query->orderBy('order', 'asc');
        },
        'blogTags.tag'
      ])
      ->first();

    return Inertia::render(
      'DetailBlog',
      [
        'blog' => $blog
      ]
    );
  }

  public function galleryUs(): Response
  {
    $galleries = Gallery::orderBy('event_date', 'desc')->get();
    return Inertia::render(
      'GalleryUs',
      [
        'dataGalleries' => $galleries,
      ]
    );
  }

  public function contactUs(): Response
  {
    return Inertia::render(
      'ContactUs',
    );
  }
}
