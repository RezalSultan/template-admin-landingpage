<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlogTag extends Model
{
  use HasFactory;

  protected $table = 'blog_tags';
  protected $primaryKey = 'id';

  protected $fillable = [
    'blog_id',
    'tag_id',
  ];

  public function blog(): BelongsTo
  {
    return $this->BelongsTo(Blog::class, 'blog_id', 'id');
  }

  public function tag(): BelongsTo
  {
    return $this->BelongsTo(Tag::class, 'tag_id', 'id');
  }
}
