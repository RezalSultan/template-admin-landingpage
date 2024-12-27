<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\FAQController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ProfileAdminController;
use App\Http\Controllers\TestimonyController;
use App\Http\Controllers\WebController;
use Illuminate\Support\Facades\Route;

Route::get('/', [WebController::class, 'home'])->name('home');
Route::get('/about-us', [WebController::class, 'aboutUs'])->name('about-us');
Route::get('/blog', [WebController::class, 'blog'])->name('blog');
Route::get('/blog/{slug}', [WebController::class, 'detailBlog'])->name('detail.blog');
Route::get('/gallery-us', [WebController::class, 'galleryUs'])->name('gallery-us');
Route::get('/contact-us', [WebController::class, 'contactUs'])->name('contact-us');

Route::middleware('auth')->prefix('/admin')->group(function () {
  Route::group(['prefix' => '/profile', 'as' => 'profile.'], function () {
    Route::patch('/profile', [ProfileAdminController::class, 'update'])->name('edit.request');
    Route::patch('/profile/password', [ProfileAdminController::class, 'updatePassword'])->name('edit.pass.request');
  });

  Route::group(['prefix' => '/my-blog', 'as' => 'blog.'], function () {
    Route::get('/', [BlogController::class, 'index'])->name('index');
    Route::get('/create', [BlogController::class, 'create'])->name('create');
    Route::post('/create', [BlogController::class, 'store'])->name('create.request');
    Route::get('/{slug}', [BlogController::class, 'edit'])->name('edit');
    Route::post('/{id}', [BlogController::class, 'update'])->name('edit.request');
    Route::delete('/{id}', [BlogController::class, 'destroy'])->name('delete');
  });

  Route::group(['prefix' => '/my-faq', 'as' => 'faq.'], function () {
    Route::get('/', [FAQController::class, 'index'])->name('index');
    Route::get('/create', [FAQController::class, 'create'])->name('create');
    Route::post('/create', [FAQController::class, 'store'])->name('create.request');
    Route::get('/{id}/edit', [FAQController::class, 'edit'])->name('edit');
    Route::patch('/{id}/edit', [FAQController::class, 'update'])->name('edit.request');
    Route::delete('/{id}', [FAQController::class, 'destroy'])->name('delete');
    Route::get('/{id}', [FAQController::class, 'read'])->name('look');
  });

  Route::group(['prefix' => '/testimony', 'as' => 'testimony.'], function () {
    Route::get('/', [TestimonyController::class, 'index'])->name('index');
    Route::get('/create', [TestimonyController::class, 'create'])->name('create');
    Route::post('/create', [TestimonyController::class, 'store'])->name('create.request');
    Route::get('/{id}/edit', [TestimonyController::class, 'edit'])->name('edit');
    Route::post('/{id}/edit', [TestimonyController::class, 'update'])->name('edit.request');
    Route::delete('/{id}', [TestimonyController::class, 'destroy'])->name('delete');
    Route::get('/{id}', [TestimonyController::class, 'read'])->name('look');
  });

  Route::group(['prefix' => '/my-gallery', 'as' => 'gallery.'], function () {
    Route::get('/', [GalleryController::class, 'index'])->name('index');
    Route::get('/create', [GalleryController::class, 'create'])->name('create');
    Route::post('/create', [GalleryController::class, 'store'])->name('create.request');
    Route::get('/{id}/edit', [GalleryController::class, 'edit'])->name('edit');
    Route::post('/{id}/edit', [GalleryController::class, 'update'])->name('edit.request');
    Route::delete('/{id}', [GalleryController::class, 'destroy'])->name('delete');
  });

  Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

require __DIR__ . '/auth.php';
