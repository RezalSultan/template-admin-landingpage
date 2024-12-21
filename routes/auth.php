<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->prefix('/admin')->group(function () {
  Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('admin');

  Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('admin.login');

  Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');

  Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);

  Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');

  Route::post('/reset-password', [NewPasswordController::class, 'store']);
});

Route::middleware('auth')->prefix('/admin')->group(function () {
  Route::get('/confirm-password', [ConfirmablePasswordController::class, 'show']);

  Route::post('/confirm-password', [ConfirmablePasswordController::class, 'store']);

  Route::put('/password', [PasswordController::class, 'update']);

  Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});
