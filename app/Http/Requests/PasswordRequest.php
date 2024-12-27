<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PasswordRequest extends FormRequest
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
      'old_password' => 'required|string',
      'new_password' => [
        'required',
        'string',
        'min:8',
        'regex:/[a-z]/',
        'regex:/[A-Z]/',
        'regex:/\d/',
        'regex:/[@$!%*?&]/',
      ],
      'confirm_new_password' => 'required|string|same:new_password',
    ];
  }

  public function messages(): array
  {
    return [
      'old_password.required' => 'Password lama tidak boleh kosong.',
      'new_password.required' => 'Password baru tidak boleh kosong.',
      'new_password.min' => 'Password baru minimal mempunyai 8 karakter.',
      'new_password.regex' => 'Password baru harus mengandung setidaknya satu huruf kecil, satu huruf besar, satu angka, dan satu simbol.',
      'confirm_new_password.required' => 'Konfirmasi password tidak boleh kosong.',
      'confirm_new_password.min' => 'Konfirmasi password minimal mempunyai 8 karakter.',
      'confirm_new_password.same' => 'Konfirmasi password harus sama dengan password baru.',
    ];
  }
}
