<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TestimonyRequest extends FormRequest
{
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    $rules = [
      'testimoni_name' => 'required|string|max:255',
      'satisfaction' => 'required|integer|between:1,5',
      'expression' => 'required|string',
    ];

    if ($this->hasFile('avatar_testimoni') && $this->file('avatar_testimoni')->isValid()) {
      $rules['avatar_testimoni'] = 'nullable|file|mimes:jpg,jpeg,png|max:5120';
    } elseif (is_string($this->input('avatar_testimoni'))) {
      $rules['avatar_testimoni'] = 'nullable';
    }

    return $rules;
  }

  public function messages(): array
  {
    return [
      'testimoni_name.required' => 'Nama testimoni wajib diisi.',
      'testimoni_name.string' => 'Nama testimoni harus berupa teks.',
      'testimoni_name.max' => 'Nama testimoni maksimal 255 karakter.',
      'satisfaction.required' => 'Tingkat kepuasan wajib diisi.',
      'satisfaction.integer' => 'Tingkat kepuasan harus berupa angka.',
      'satisfaction.between' => 'Tingkat kepuasan harus antara 1 sampai 5.',
      'expression.required' => 'Ekspresi wajib diisi.',
      'expression.string' => 'Ekspresi harus berupa teks.',
      'avatar_testimoni.image' => 'Avatar harus berupa file gambar.',
      'avatar_testimoni.mimes' => 'Avatar hanya boleh memiliki format jpeg, jpg, atau png.',
      'avatar_testimoni.max' => 'Ukuran avatar maksimal 5MB.',
    ];
  }
}
