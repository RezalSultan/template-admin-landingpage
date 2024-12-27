<?php

namespace App\Http\Controllers;

use App\Http\Requests\TestimonyRequest;
use App\Models\Testimony;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\UploadedFile;
use Inertia\Inertia;
use Inertia\Response;

class TestimonyController extends Controller
{
  public function index(): Response
  {
    $testimonies = Testimony::orderBy('created_at', 'desc')->get();
    return Inertia::render(
      'Admin/Testimony/Testimony',
      [
        'dataTestimonies' => $testimonies,
        'successAddMessage' => session('successAdd'),
        'successEditMessage' => session('successEdit'),
        'successDeleteMessage' => session('successDelete'),
        'successProfileMessage' => session('successEditProfile'),
        'successPassMessage' => session('successEditPass'),
        'errorMessage' => session('danger')
      ]
    );
  }

  public function read($id): Response
  {
    $testimony = Testimony::find($id);

    if (!$testimony) {
      return back()->with('danger', 'Testimoni tidak ditemukan');
    }
    return Inertia::render('Admin/Testimony/ReadTestimony', [
      'dataTestimony' => $testimony,
    ]);
  }


  public function create(): Response
  {
    return Inertia::render(
      'Admin/Testimony/CreateTestimony',
      [
        'errorMessage' => session('danger'),
      ]
    );
  }

  public function edit($id): Response
  {
    $testimony = Testimony::find($id);

    if (!$testimony) {
      return back()->with('danger', 'Testimoni tidak ditemukan');
    }

    return Inertia::render(
      'Admin/Testimony/EditTestimony',
      [
        'dataTestimony' => $testimony,
        'errorMessage' => session('danger'),
      ]
    );
  }

  public function store(TestimonyRequest $request): RedirectResponse
  {
    try {
      $validated = $request->validated();

      DB::beginTransaction();
      $testimony = new Testimony();
      $testimony->testimoni_name = $validated['testimoni_name'];
      $testimony->satisfaction = $validated['satisfaction'];
      $testimony->expression = $validated['expression'];
      $testimony->save();
      if ($validated['avatar_testimoni']) {
        $testimony->handleUploadImg();
      }
      DB::commit();
      return redirect()->route('testimony.index')->with('successAdd', 'Tambah Testimoni Telah Berhasil');
    } catch (\Exception $e) {
      DB::rollBack();
      return back()->with('danger', 'Tambah Testimoni Gagal Dilakukan');
    }
  }

  public function update(TestimonyRequest $request, $id): RedirectResponse
  {
    try {

      $validated = $request->validated();

      $testimony = Testimony::find($id);

      if (!$testimony) {
        return back()->with('danger', 'Testimony tidak ditemukan');
      }

      DB::beginTransaction();
      $testimony->testimoni_name = $validated['testimoni_name'];
      $testimony->satisfaction = $validated['satisfaction'];
      $testimony->expression = $validated['expression'];
      $testimony->save();
      if ($validated['avatar_testimoni'] instanceof UploadedFile) {
        $testimony->handleUploadImg();
      }
      DB::commit();
      return redirect()->route('testimony.index')->with('successEdit', 'Ubah Testimoni Telah Berhasil');
    } catch (\Exception $e) {
      DB::rollBack();
      dd($e->getMessage(), $e->getTrace());
      return back()->with('danger', 'Ubah Testimoni Gagal Dilakukan');
    }
  }

  public function destroy($id)
  {
    try {
      $testimony = Testimony::find($id);
      if (!$testimony) {
        return back()->with('danger', 'Testimoni tidak ditemukan');
      }
      $testimony->handleDeleteImg();
      $testimony->delete();

      return redirect()->route("testimony.index")->with('successDelete', 'Hapus Testimoni Berhasil Dilakukan');
    } catch (\Exception $e) {
      return back()->with('danger', 'Hapus Testimoni Gagal Dilakukan');
    }
  }
}
