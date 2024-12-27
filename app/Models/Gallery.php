<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Gallery extends Model
{
  use HasFactory;

  protected $table = 'galleries';
  protected $primaryKey = 'id';

  protected $fillable = [
    'name_url',
    'title',
    'description',
    'event_date',
    'width',
    'height',
  ];

  function handleUploadImg()
  {
    $this->handleDeleteImg();
    if (request()->hasFile('name_url')) {
      $image = request()->file('name_url');
      $destination = "/images/galleries";
      $randomStr = Str::random(5);
      $filename = time() . "-" . $randomStr . "." . $image->extension();
      $url = $image->storeAs($destination, $filename);
      list($width, $height) = getimagesize(storage_path('app/' . $url));
      $this->name_url = $url;
      $this->height = $height;
      $this->width = $width;
      $this->save();
    }
  }

  function handleDeleteImg()
  {
    $image = $this->image;
    if ($image) {
      $path = public_path($image);
      if (file_exists($path)) {
        unlink($path);
      }
      return true;
    }
  }
}
