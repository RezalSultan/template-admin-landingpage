<?php

namespace App\Http\Controllers;

use App\Http\Requests\FAQRequest;
use App\Models\Faq;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class FAQController extends Controller
{
  public function index(): Response
  {
    $faqs = Faq::orderBy('updated_at', 'desc')->get();
    return Inertia::render(
      'Admin/FAQ/FAQ',
      [
        'dataFAQs' => $faqs,
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
    $faq = Faq::find($id);

    if (!$faq) {
      return back()->with('danger', 'FAQ tidak ditemukan');
    }
    return Inertia::render('Admin/FAQ/ReadFAQ', [
      'dataFAQ' => $faq,
    ]);
  }


  public function create(): Response
  {
    return Inertia::render(
      'Admin/FAQ/CreateFAQ',
      [
        'errorMessage' => session('danger'),
      ]
    );
  }

  public function edit($id): Response
  {
    $faq = Faq::find($id);

    if (!$faq) {
      return back()->with('danger', 'FAQ tidak ditemukan');
    }

    return Inertia::render(
      'Admin/FAQ/EditFAQ',
      [
        'dataFAQ' => $faq,
        'errorMessage' => session('danger'),
      ]
    );
  }

  public function store(FAQRequest $request): RedirectResponse
  {
    try {
      $validated = $request->validated();

      DB::beginTransaction();
      $faq = new Faq();
      $faq->question = $validated['question'];
      $faq->answer = $validated['answer'];
      $faq->save();
      DB::commit();
      return redirect()->route('faq.index')->with('successAdd', 'Tambah FAQ Telah Berhasil');
    } catch (\Exception $e) {
      DB::rollBack();
      return back()->with('danger', 'Tambah FAQ Gagal Dilakukan');
    }
  }

  public function update(FAQRequest $request, $id): RedirectResponse
  {
    try {

      $validated = $request->validated();

      $faq = Faq::find($id);

      if (!$faq) {
        return back()->with('danger', 'FAQ tidak ditemukan');
      }

      DB::beginTransaction();
      $faq->question = $validated['question'];
      $faq->answer = $validated['answer'];
      $faq->save();
      DB::commit();
      return redirect()->route('faq.index')->with('successEdit', 'Ubah FAQ Telah Berhasil');
    } catch (\Exception $e) {
      DB::rollBack();
      dd($e->getMessage(), $e->getTrace());
      return back()->with('danger', 'Ubah FAQ Gagal Dilakukan');
    }
  }

  public function destroy($id)
  {
    try {
      $faq = Faq::find($id);
      if (!$faq) {
        return back()->with('danger', 'FAQ tidak ditemukan');
      }
      $faq->delete();

      return redirect()->route("faq.index")->with('successDelete', 'Hapus FAQ Berhasil Dilakukan');
    } catch (\Exception $e) {
      return back()->with('danger', 'Hapus FAQ Gagal Dilakukan');
    }
  }
}
