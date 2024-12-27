<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'name' => 'required|string|max:255',
      'email' => 'required|email',
    ];
  }

  public function messages(): array
  {
    return [
      'name.required' => 'Nama wajib diisi.',
      'email.required' => 'Email wajib diisi.',
      'email.email' => 'Format email tidak valid.',
    ];
  }

  protected function prepareForValidation()
  {
    $this->merge([
      'name' => trim($this->name),
      'email' => strtolower($this->email),
    ]);
  }
}
