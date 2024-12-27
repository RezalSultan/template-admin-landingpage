<?php

namespace App\Http\Controllers;

use App\Http\Requests\GalleryRequest;
use App\Models\Gallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\UploadedFile;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
  public function index(): Response
  {
    $galleries = Gallery::orderBy('event_date', 'desc')->get();
    return Inertia::render(
      'Admin/Gallery/Gallery',
      [
        'dataGalleries' => $galleries,
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
      'Admin/Gallery/CreateGallery',
      [
        'errorMessage' => session('danger'),
      ]
    );
  }

  public function edit($id): Response
  {
    $gallery = Gallery::find($id);

    if (!$gallery) {
      return back()->with('danger', 'Galeri tidak ditemukan');
    }

    return Inertia::render(
      'Admin/Gallery/EditGallery',
      [
        'dataGallery' => $gallery,
        'errorMessage' => session('danger'),
      ]
    );
  }

  public function store(GalleryRequest $request): RedirectResponse
  {
    try {
      $validated = $request->validated();

      DB::beginTransaction();
      $gallery = new Gallery();
      $gallery->title = $validated['title'];
      $gallery->description = $validated['description'] === "" ? null : $validated['description'];
      $gallery->event_date = $validated['event_date'] === "" ? null : $validated['event_date'];
      if ($validated['name_url']) {
        $gallery->handleUploadImg();
      }
      DB::commit();
      return redirect()->route('gallery.index')->with('successAdd', 'Tambah Galeri Telah Berhasil');
    } catch (\Exception $e) {
      DB::rollBack();
      dd($e->getMessage(), $e->getTrace());
      return back()->with('danger', 'Tambah Galeri Gagal Dilakukan');
    }
  }

  public function update(GalleryRequest $request, $id): RedirectResponse
  {
    try {
      $validated = $request->validated();

      $gallery = Gallery::find($id);

      if (!$gallery) {
        return back()->with('danger', 'Galeri tidak ditemukan');
      }

      DB::beginTransaction();
      $gallery->title = $validated['title'];
      $gallery->description = $validated['description'] === "" ? null : $validated['description'];
      $gallery->event_date = $validated['event_date'] === "" ? null : $validated['event_date'];
      if ($validated['name_url'] instanceof UploadedFile) {
        $gallery->handleUploadImg();
      }
      DB::commit();
      return redirect()->route('gallery.index')->with('successEdit', 'Ubah Galeri Telah Berhasil');
    } catch (\Exception $e) {
      DB::rollBack();
      dd($e->getMessage(), $e->getTrace());
      return back()->with('danger', 'Ubah Galeri Gagal Dilakukan');
    }
  }

  public function destroy($id)
  {
    try {
      $gallery = Gallery::find($id);
      if (!$gallery) {
        return back()->with('danger', 'Galeri tidak ditemukan');
      }
      $gallery->handleDeleteImg();
      $gallery->delete();

      return redirect()->route("gallery.index")->with('successDelete', 'Hapus Galeri Berhasil Dilakukan');
    } catch (\Exception $e) {
      return back()->with('danger', 'Hapus Galeri Gagal Dilakukan');
    }
  }
}
