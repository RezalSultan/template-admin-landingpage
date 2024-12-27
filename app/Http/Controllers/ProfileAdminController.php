<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasswordRequest;
use App\Http\Requests\ProfileRequest;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ProfileAdminController extends Controller
{
  public function update(ProfileRequest $request): RedirectResponse
  {
    try {
      $validated = $request->validated();

      $user = $request->user();
      DB::beginTransaction();
      $user->name = $validated['name'];
      $user->email = $validated['email'];
      $user->save();

      DB::commit();
      return back()->with('successEditProfile', 'Ubah Profil Telah Berhasil');
    } catch (\Exception $e) {
      DB::rollBack();
      return back()->with('danger', 'Ubah Profil Gagal Dilakukan');
    }
  }

  public function updatePassword(PasswordRequest $request): RedirectResponse
  {
    try {
      $validated = $request->validated();

      $user = $request->user();
      if (!Hash::check($validated['old_password'], $user->password)) {
        return back()->with('danger',  'Password lama yang Anda masukkan tidak valid.');
      }

      DB::beginTransaction();
      $user->password = Hash::make($request->new_password); // Mengenkripsi password baru
      $user->save();

      DB::commit();
      return back()->with('successEditPass', 'Ubah Password Telah Berhasil');
    } catch (\Exception $e) {
      DB::rollBack();
      return back()->with('danger', 'Ubah Password Gagal Dilakukan');
    }
  }
}
