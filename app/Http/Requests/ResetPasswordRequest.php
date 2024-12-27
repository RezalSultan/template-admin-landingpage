<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
{
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'token' => 'required',
      'email' => 'required|email',
      'password' => [
        'required',
        'string',
        'min:8',
        'regex:/[a-z]/',
        'regex:/[A-Z]/',
        'regex:/\d/',
        'regex:/[@$!%*?&]/',
      ],
      'password_confirmation' => 'required|string|same:new_password',
    ];
  }

  public function messages(): array
  {
    return [
      'email.required' => 'Email wajib diisi!',
      'email.email' => 'Format email yang Anda masukkan tidak valid!',
      'password.required' => 'Password lama tidak boleh kosong.',
      'password_confirmation.required' => 'Password baru tidak boleh kosong.',
      'password.min' => 'Password minimal mempunyai 8 karakter.',
      'password.regex' => 'Password harus mengandung setidaknya satu huruf kecil, satu huruf besar, satu angka, dan satu simbol.',
      'password_confirmation.same' => 'Konfirmasi password harus sama dengan password.',
    ];
  }
}
