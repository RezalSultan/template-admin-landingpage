<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlogSection extends Model
{
  use HasFactory;

  protected $table = 'blog_sections';
  protected $primaryKey = 'id';

  protected $fillable = [
    'blog_id',
    'order',
    'type_view_content',
    'url_asset',
    'caption',
    'sub_title',
    'body'
  ];

  public function blog(): BelongsTo
  {
    return $this->belongsTo(Blog::class, 'blog_id', 'id');
  }

  function handleUploadImgSection($urlAsset)
  {
    $this->handleDeleteImgSection();
    if ($urlAsset && file_exists($urlAsset)) {
      $image = $urlAsset;
      $destination = "/images/body-blogs";
      $randomStr = Str::random(5);
      $filename = $this->id . "-" . time() . "-" . $randomStr . "." . $image->extension();
      $url = $image->storeAs($destination, $filename);
      $this->url_asset = $url;
      $this->save();
    }
  }

  function handleDeleteImgSection()
  {
    $image = $this->url_asset;
    if ($image) {
      $path = public_path($image);
      if (file_exists($path)) {
        unlink($path);
      }
      return true;
    }
  }
}
