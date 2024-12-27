<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FAQRequest extends FormRequest
{
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'question' => 'required|string',
      'answer' => 'required|string',
    ];
  }

  public function messages(): array
  {
    return [
      'question.required' => 'Pertanyaan harus diisi.',
      'question.string' => 'Pertanyaan harus berupa teks.',
      'answer.required' => 'Jawaban harus diisi.',
      'answer.string' => 'Jawaban harus berupa teks.',
    ];
  }
}
