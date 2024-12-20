<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;
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
  Route::get('/verify-email', EmailVerificationPromptController::class);

  Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['signed', 'throttle:6,1']);

  Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware('throttle:6,1');

  Route::get('/confirm-password', [ConfirmablePasswordController::class, 'show']);

  Route::post('/confirm-password', [ConfirmablePasswordController::class, 'store']);

  Route::put('/password', [PasswordController::class, 'update']);

  Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});
