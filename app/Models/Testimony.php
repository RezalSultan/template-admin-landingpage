<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Testimony extends Model
{
  use HasFactory;

  protected $table = 'testimonies';
  protected $primaryKey = 'id';

  protected $fillable = [
    'testimoni_name',
    'satisfaction',
    'expression',
    'avatar_testimoni',
  ];

  function handleUploadImg()
  {
    $this->handleDeleteImg();
    if (request()->hasFile('avatar_testimoni')) {
      $image = request()->file('avatar_testimoni');
      $destination = "/images/testimonies";
      $randomStr = Str::random(5);
      $filename = $this->id . "-" . time() . "-" . $randomStr . "." . $image->extension();
      $url = $image->storeAs($destination, $filename);
      $this->avatar_testimoni = $url;
      $this->save();
    }
  }

  function handleDeleteImg()
  {
    $image = $this->avatar_testimoni;
    if ($image) {
      $path = public_path($image);
      if (file_exists($path)) {
        unlink($path);
      }
      return true;
    }
  }
}
