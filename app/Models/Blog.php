<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Blog extends Model
{
  use HasFactory;

  protected $table = 'blogs';
  protected $primaryKey = 'id';

  protected $fillable = [
    'title',
    'slug',
    'desc',
    'cover_image',
    'status',
    'author'
  ];

  public function blogTags(): HasMany
  {
    return $this->hasMany(BlogTag::class, 'blog_id', 'id');
  }

  public function blogSections(): HasMany
  {
    return $this->hasMany(BlogSection::class, 'blog_id', 'id');
  }


  function handleUploadImg()
  {
    $this->handleDeleteImg();
    if (request()->hasFile('cover_image')) {
      $image = request()->file('cover_image');
      $destination = "/images/blogs";
      $randomStr = Str::random(5);
      $filename = $this->id . "-" . time() . "-" . $randomStr . "." . $image->extension();
      $url = $image->storeAs($destination, $filename);
      $this->cover_image = $url;
      $this->save();
    }
  }

  function handleDeleteImg()
  {
    $image = $this->cover_image;
    if ($image) {
      $path = public_path($image);
      if (file_exists($path)) {
        unlink($path);
      }
      return true;
    }
  }
}
