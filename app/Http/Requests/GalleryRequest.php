<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GalleryRequest extends FormRequest
{
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    $rules = [
      'name_url' => "required",
      'title' => 'required|string',
      'description' => 'nullable|string',
      'event_date' => 'nullable|date',
    ];

    if ($this->hasFile('name_url') && $this->file('name_url')->isValid()) {
      $rules['name_url'] = 'required|file|mimes:jpg,jpeg,png|max:5120';
    } elseif (is_string($this->input('name_url'))) {
      $rules['name_url'] = 'required';
    }

    return $rules;
  }

  public function messages(): array
  {
    return [
      'title' => 'Judul gambar harus diisi.',
      'title.string' => 'Pertanyaan harus berupa teks.',
      'description.string' => 'Pertanyaan harus berupa teks.',
      'event_date.date' => 'Tanggal acara harus berupa format tanggal yang valid.',
      'name_url.required' => 'Gambar harus diisi.',
      'name_url.image' => 'Gambar harus berupa file gambar.',
      'name_url.mimes' => 'Gambar hanya boleh memiliki format jpeg, jpg, atau png.',
      'name_url.max' => 'Ukuran gambar maksimal 5MB.',
    ];
  }
}
