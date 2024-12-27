<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tag extends Model
{
  use HasFactory;

  protected $table = 'tags';
  protected $primaryKey = 'id';

  protected $fillable = [
    'name',
  ];

  public function blogTags(): HasMany
  {
    return $this->HasMany(BlogTag::class, 'tag_id', 'id');
  }
}
