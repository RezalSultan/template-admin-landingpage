<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BlogCreateRequest extends FormRequest
{
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    $rules = [
      'title' => 'required|string|max:255',
      'desc' => 'nullable',
      'cover_image' => 'nullable|file|mimes:jpg,jpeg,png|max:5120',
      'status' => 'required|in:DRAFT,PUBLISH',
      'author' => 'nullable|max:255',
      'tags' => 'array',
      'tags.*' => 'string|max:50',
      'sections' => 'array',
      'sections.*.id' => 'required|integer',
      'sections.*.order' => 'required|integer',
      'sections.*.type_view_content' => 'required|string|max:255',
      'sections.*.caption' => 'nullable|string|max:255',
      'sections.*.sub_title' => 'nullable|string|max:255',
      'sections.*.body' => 'nullable|string',
    ];

    foreach ($this->input('sections', []) as $index => $section) {
      $rules["sections.$index.url_asset"] = $section['type_view_content'] === 'IMAGE'
        ? 'nullable|file|mimes:jpg,jpeg,png|max:5120'
        : 'nullable|url';
    }

    return $rules;
  }

  public function messages(): array
  {
    return [
      'title.required' => 'Judul wajib diisi.',
      'title.string' => 'Judul harus berupa teks.',
      'title.max' => 'Judul maksimal 255 karakter.',
      'cover_image.file' => 'Cover image harus berupa file.',
      'cover_image.mimes' => 'Cover image hanya boleh berupa file dengan format jpg, jpeg, atau png.',
      'cover_image.max' => 'Ukuran file cover image maksimal 5 MB.',
      'status.required' => 'Status wajib diisi.',
      'status.in' => 'Status hanya boleh berisi nilai DRAFT atau PUBLISH.',
      'author.max' => 'Nama penulis maksimal 255 karakter.',
      'tags.array' => 'Tags harus berupa array.',
      'tags.*.string' => 'Setiap tag harus berupa teks.',
      'tags.*.max' => 'Setiap tag maksimal 50 karakter.',
      'sections.array' => 'Bagian harus berupa array.',
      'sections.*.id.required' => 'ID bagian wajib diisi.',
      'sections.*.id.integer' => 'ID bagian harus berupa angka.',
      'sections.*.order.required' => 'Urutan bagian wajib diisi.',
      'sections.*.order.integer' => 'Urutan bagian harus berupa angka.',
      'sections.*.type_view_content.required' => 'Tipe konten bagian wajib diisi.',
      'sections.*.type_view_content.string' => 'Tipe konten bagian harus berupa teks.',
      'sections.*.type_view_content.max' => 'Tipe konten bagian maksimal 255 karakter.',
      'sections.*.url_asset.url' => 'Kolom aset konten harus berupa URL yang valid.',
      'sections.*.url_asset.file' => 'Aset konten harus berupa file.',
      'sections.*.url_asset.mimes' => 'Aset konten hanya boleh berupa file dengan format jpg, jpeg, atau png.',
      'sections.*.url_asset.max' => 'Ukuran file URL aset maksimal 5 MB.',
      'sections.*.caption.string' => 'Caption harus berupa teks.',
      'sections.*.caption.max' => 'Caption maksimal 255 karakter.',
      'sections.*.sub_title.string' => 'Sub judul harus berupa teks.',
      'sections.*.sub_title.max' => 'Sub judul maksimal 255 karakter.',
      'sections.*.body.string' => 'Isi konten harus berupa teks.',
    ];
  }
}
